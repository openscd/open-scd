import { get } from 'lit-translate';
import { identity, LogDetailBase } from '../../foundation.js';
import { dOValidator } from './dosdo.js';
import { getAdjacentClass, iec6185074 } from './foundation.js';

async function getMandatoryDataObject(base: string): Promise<Element[]> {
  const lnodeclasses = getAdjacentClass(await iec6185074, base);

  return lnodeclasses.flatMap(lnodeclass =>
    Array.from(lnodeclass.querySelectorAll('DataObject[presCond="M"]'))
  );
}

async function validateChildren(lnodetype: Element): Promise<LogDetailBase[]> {
  const issues: LogDetailBase[] = [];
  const children = Array.from(lnodetype.children);

  for (const child of children) {
    const childIssues = await dOValidator(child);
    if (childIssues.length)
      for (const childIssue of childIssues) issues.push(childIssue);
  }

  return issues;
}

async function missingMandatoryChildren(
  lnodetype: Element,
  lnClass: string
): Promise<LogDetailBase[]> {
  const errors: LogDetailBase[] = [];

  const mandatorydos = await (
    await getMandatoryDataObject(lnClass)
  ).map(DO => DO.getAttribute('name')!);

  mandatorydos.forEach(mandatorydo => {
    if (!lnodetype.querySelector(`DO[name="${mandatorydo}"]`))
      errors.push({
        title: get('validator.templates.mandatoryChild', {
          tag: 'lnClass',
          id: lnClass,
          childTag: 'DO',
          childId: mandatorydo,
        }),
        message: `${identity(lnodetype)} > ${mandatorydo}`,
      });
  });

  return errors;
}

export async function lNodeTypeValidator(
  element: Element
): Promise<LogDetailBase[]> {
  const errors: LogDetailBase[] = [];

  const lnClass = element.getAttribute('lnClass');
  if (!lnClass)
    return [
      {
        title: get('validator.templates.missingAttribute', {
          attr: 'lnClass',
          element: element.tagName,
        }),
        message: `${identity(element)}`,
      },
    ];

  const missingChildren = await missingMandatoryChildren(element, lnClass);
  const issuesChildren = await validateChildren(element);

  return errors.concat(missingChildren, issuesChildren);
}
