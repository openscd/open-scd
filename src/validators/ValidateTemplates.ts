import { LitElement, property } from 'lit-element';
import { LogDetail, newLogEvent } from '../foundation.js';

const iec6185074 = fetch('public/xml/IEC_61850-7-4_2007B3.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

function getAdjacentClass(nsd: XMLDocument, base: string): Element[] {
  if (base === '') return [];
  const adjacents = getAdjacentClass(
    nsd,
    nsd
      .querySelector(`LNClass[name="${base}"], AbstractLNClass[name="${base}"]`)
      ?.getAttribute('base') ?? ''
  );
  return Array.from(
    nsd.querySelectorAll(
      `LNClass[name="${base}"], AbstractLNClass[name="${base}"]`
    )
  ).concat(adjacents);
}

async function getMendatoryDataObject(base: string): Promise<Element[]> {
  const lnodeclasses = getAdjacentClass(await iec6185074, base);

  return lnodeclasses.flatMap(lnodeclass =>
    Array.from(lnodeclass.querySelectorAll('DataObject[presCond="M"]'))
  );
}

async function validateMandatoryDo(
  lnodetypes: Element[]
): Promise<LogDetail[]> {
  const errors: LogDetail[] = [];

  for (const lnodetype of lnodetypes) {
    const lnClass = lnodetype.getAttribute('lnClass')!;

    const mandatorydos = await (
      await getMendatoryDataObject(lnClass)
    ).map(DO => DO.getAttribute('name')!);

    mandatorydos.forEach(mandatorydo => {
      if (!lnodetype.querySelector(`DO[name="${mandatorydo}"]`))
        errors.push({
          title: `The element DO ${mandatorydo} is mendatory in LN Class ${lnClass}`,
          kind: 'error',
        });
    });
  }

  return errors;
}

export default class ValidateTemplates extends LitElement {
  @property()
  doc!: XMLDocument;

  @property()
  docName!: string;

  async validate(): Promise<void> {
    validateMandatoryDo(
      Array.from(this.doc.querySelectorAll('LNodeType'))
    ).then(errors => {
      if (errors.length !== 0)
        errors.forEach(error =>
          document.querySelector('open-scd')?.dispatchEvent(newLogEvent(error))
        );
      else
        document.querySelector('open-scd')?.dispatchEvent(
          newLogEvent({
            title: 'No missing data objects found',
            kind: 'info',
          })
        );
    });
  }
}
