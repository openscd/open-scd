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

async function getAllDataObject(base: string): Promise<Element[]> {
  const lnodeclasses = getAdjacentClass(await iec6185074, base);

  return lnodeclasses.flatMap(lnodeclass =>
    Array.from(lnodeclass.querySelectorAll('DataObject'))
  );
}

async function validateDoCDCSetting(lnodetype: Element): Promise<LogDetail[]> {
  const errors: LogDetail[] = [];
  const lnClass = lnodetype.getAttribute('lnClass');
  if (!lnClass) return [];

  const alldos = await getAllDataObject(lnClass);

  for (const DO of alldos) {
    const type = lnodetype
      .querySelector(`DO[name="${DO.getAttribute('name')}"]`)
      ?.getAttribute('type');

    if (!type) continue;

    const dOType = lnodetype
      .closest('DataTypeTemplates')
      ?.querySelector(`DOType[id="${type}"]`);

    if (!dOType) {
      errors.push({
        title: `Cannot validate data object ${DO.getAttribute(
          'name'
        )} in LNodeType ${lnClass}`,
        kind: 'warning',
      });
      continue;
    }

    if (dOType!.getAttribute('cdc') !== DO.getAttribute('type'))
      errors.push({
        title: `The element DOs ${DO.getAttribute(
          'name'
        )} class definition ${dOType!.getAttribute(
          'cdc'
        )} is expected to be ${DO.getAttribute('type')}`,
        kind: 'error',
      });
  }

  return errors;
}

async function getMendatoryDataObject(base: string): Promise<Element[]> {
  const lnodeclasses = getAdjacentClass(await iec6185074, base);

  return lnodeclasses.flatMap(lnodeclass =>
    Array.from(lnodeclass.querySelectorAll('DataObject[presCond="M"]'))
  );
}

async function validateMandatoryDo(lnodetype: Element): Promise<LogDetail[]> {
  const errors: LogDetail[] = [];
  const lnClass = lnodetype.getAttribute('lnClass');
  if (!lnClass) return [];

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

  return errors;
}

export default class ValidateTemplates extends LitElement {
  @property()
  doc!: XMLDocument;

  @property()
  docName!: string;

  async validate(): Promise<void> {
    Array.from(this.doc.querySelectorAll('LNodeType')).forEach(lnodetype => {
      validateMandatoryDo(lnodetype).then(errors => {
        errors.forEach(error =>
          document.querySelector('open-scd')?.dispatchEvent(newLogEvent(error))
        );
      });

      validateDoCDCSetting(lnodetype).then(errors => {
        errors.forEach(error =>
          document.querySelector('open-scd')?.dispatchEvent(newLogEvent(error))
        );
      });
    });
  }
}
