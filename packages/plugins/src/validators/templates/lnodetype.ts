import { get } from 'lit-translate';
import { identity } from '@openscd/open-scd/src/foundation.js';
import { LogDetailBase } from '@openscd/core/foundation/deprecated/history.js';
import {
  getAdjacentClass,
  validateChildren,
} from './foundation.js';
import { iec6185074 } from '@openscd/open-scd/src/foundation/nsd.js';

async function getMandatoryDataObject(base: string): Promise<Element[]> {
  const lnodeclasses = getAdjacentClass(await iec6185074, base);

  return lnodeclasses.flatMap(lnodeclass =>
    Array.from(lnodeclass.querySelectorAll('DataObject[presCond="M"]'))
  );
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
