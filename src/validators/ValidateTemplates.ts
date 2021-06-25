import { LitElement, property } from 'lit-element';
import { LogDetail, newLogEvent } from '../foundation.js';

const iec6185074 = fetch('public/xml/IEC_61850-7-4_2007B3.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

const iec6185073 = fetch('public/xml/IEC_61850-7-3_2007B3.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

const iec6185072 = fetch('public/xml/IEC_61850-7-2_2007B3.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

const iec6185081 = fetch('public/xml/IEC_61850-8-1_2003A2.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

const serviceSCD = ['SPC', 'DPC', 'INC', 'ENC', 'BSC', 'ISC', 'APC', 'BAC'];

async function validateCoOperStructure(
  oper: Element | null
): Promise<LogDetail[]> {
  if (!oper)
    return [
      {
        title: `Controlable data objects Oper is missing`,
        kind: 'error',
      },
    ];

  const type = oper.getAttribute('type');
  if (!type) return [];

  const structure =
    oper.closest('DataTypeTemplates')?.querySelector(`DAType[id="${type}"]`) ??
    null;

  const nsd81 = await iec6185081;

  const errors: LogDetail[] = [];
  const mendatoryDAs = Array.from(
    nsd81.querySelectorAll(
      `ServiceConstructedAttributes > ServiceConstructedAttribute[name="Oper"] > SubDataAttribute[presCond="M"]`
    )
  ).map(data => data.getAttribute('name')!);

  for (const mendatoryDA of mendatoryDAs)
    if (structure && !structure.querySelector(`BDA[name="${mendatoryDA}"]`))
      errors.push({
        title: `Data structure SBOw is missing mandatory data ${mendatoryDA}`,
        kind: 'error',
      });

  return errors;
}

async function validateCoSBOwStructure(
  sbow: Element | null
): Promise<LogDetail[]> {
  if (!sbow)
    return [
      {
        title: `Controlable data objects SBOw is missing`,
        kind: 'error',
      },
    ];

  const type = sbow.getAttribute('type');
  if (!type) return [];

  const structure =
    sbow.closest('DataTypeTemplates')?.querySelector(`DAType[id="${type}"]`) ??
    null;

  const nsd81 = await iec6185081;

  const errors: LogDetail[] = [];
  const mendatoryDAs = Array.from(
    nsd81.querySelectorAll(
      `ServiceConstructedAttributes > ServiceConstructedAttribute[name="SBOw"] > SubDataAttribute[presCond="M"]`
    )
  ).map(data => data.getAttribute('name')!);

  for (const mendatoryDA of mendatoryDAs)
    if (structure && !structure.querySelector(`BDA[name="${mendatoryDA}"]`))
      errors.push({
        title: `Data structure SBOw is missing mandatory data ${mendatoryDA}`,
        kind: 'error',
      });

  return errors;
}

async function validateCoCancelStructure(
  cancel: Element | null
): Promise<LogDetail[]> {
  if (!cancel)
    return [
      {
        title: `Controlable data objects Cancel is missing`,
        kind: 'error',
      },
    ];

  const type = cancel.getAttribute('type');
  if (!type) return [];

  const structure =
    cancel
      .closest('DataTypeTemplates')
      ?.querySelector(`DAType[id="${type}"]`) ?? null;

  const nsd81 = await iec6185081;

  const errors: LogDetail[] = [];
  const mendatoryDAs = Array.from(
    nsd81.querySelectorAll(
      `ServiceConstructedAttributes > ServiceConstructedAttribute[name="Cancel"] > SubDataAttribute[presCond="M"]`
    )
  ).map(data => data.getAttribute('name')!);

  for (const mendatoryDA of mendatoryDAs)
    if (structure && !structure.querySelector(`BDA[name="${mendatoryDA}"]`))
      errors.push({
        title: `Data structure Cancel is missing mandatory data ${mendatoryDA}`,
        kind: 'error',
      });

  return errors;
}

async function validateControlCDC(dotype: Element): Promise<LogDetail[]> {
  //characteristic for controlable CDCs is the third and last character that must be xxC
  if (
    dotype.getAttribute('cdc') &&
    !serviceSCD.includes(dotype.getAttribute('cdc')!)
  )
    return [];

  let errors: LogDetail[] = [];
  const ctlModel = dotype.querySelector('DA[name="ctlModel"] > Val')?.innerHTML;

  if (ctlModel === 'sbo-with-enhanced-security') {
    const error1 = await validateCoSBOwStructure(
      dotype.querySelector('DA[fc="CO"][name="SBOw"][bType="Struct"]')
    );
    errors.concat(error1);
    const error2 = await validateCoCancelStructure(
      dotype.querySelector('DA[fc="CO"][name="Cancel"][bType="Struct"]')
    );
    errors = error1.concat(error2);
  } else if (ctlModel === 'sbo-with-normal-security') {
    if (!dotype.querySelector('DA[fc="CO"][name="SBO"][bType="ObjRef"]'))
      errors.push({
        title: `Mendatory data SBO is missing`,
        kind: 'error',
      });
    errors = await validateCoCancelStructure(
      dotype.querySelector('DA[fc="CO"][name="Cancel"][bType="Struct"]')
    );
  } else if (ctlModel !== 'status-only') {
    errors = await validateCoOperStructure(
      dotype.querySelector('DA[fc="CO"][name="Oper"][bType="Struct"]')
    );
  }

  return errors;
}

async function getMendatorySubDataAttributes(
  datype: Element
): Promise<Element[]> {
  const parentDAs =
    Array.from(
      datype
        .closest('DataTypeTemplates')!
        .querySelectorAll<Element>(
          `DOType > DA[type="${datype.getAttribute('id')}"]`
        )
    ) ?? [];

  const nsd = await iec6185073;
  const dataAttributes = parentDAs.map(parentDA => {
    const parentCDC = <Element>parentDA.parentElement!;
    return nsd.querySelector(
      `CDC[name="${parentCDC.getAttribute(
        'cdc'
      )}"] > DataAttribute[name="${parentDA.getAttribute('name')}"]`
    );
  });

  const type = dataAttributes
    .filter(data => data && data.getAttribute('typeKind') === 'CONSTRUCTED')
    .map(data => data?.getAttribute('type') ?? '')
    .filter(type => type !== '');

  return (
    Array.from(
      nsd.querySelectorAll(
        `ConstructedAttributes > ConstructedAttribute[name="${type[0]}"] > SubDataAttribute[presCond="M"]`
      )
    ) ?? []
  );
}

async function validateMandatorySubDAs(datype: Element): Promise<LogDetail[]> {
  const errors: LogDetail[] = [];

  const mandatorysubdas = await (
    await getMendatorySubDataAttributes(datype)
  ).map(DA => DA.getAttribute('name')!);

  mandatorysubdas.forEach(mandatorysubda => {
    if (!datype.querySelector(`BDA[name="${mandatorysubda}"]`))
      errors.push({
        title: `The element DA ${mandatorysubda} is mendatory DAType ${datype.getAttribute(
          'id'
        )}`,
        kind: 'error',
      });
  });

  return errors;
}

async function getMendatoryDataAttribute(base: string): Promise<Element[]> {
  const nsd = await iec6185073;
  const cdc = nsd.querySelector(`CDC[name="${base}"]`);

  if (!cdc) return [];

  return Array.from(cdc.querySelectorAll('DataAttribute[presCond="M"]'));
}

async function validateMandatoryDAs(dotype: Element): Promise<LogDetail[]> {
  const errors: LogDetail[] = [];
  const cdc = dotype.getAttribute('cdc');
  if (!cdc) return [];

  const mandatorydas = await (
    await getMendatoryDataAttribute(cdc)
  ).map(DA => DA.getAttribute('name')!);

  mandatorydas.forEach(mandatoryda => {
    if (!dotype.querySelector(`DA[name="${mandatoryda}"]`))
      errors.push({
        title: `The element DA ${mandatoryda} is mendatory in Common Data Class ${cdc}`,
        kind: 'error',
      });
  });

  return errors;
}

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

async function validateMandatoryDOs(lnodetype: Element): Promise<LogDetail[]> {
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
    for (const lnodetype of Array.from(
      this.doc.querySelectorAll('LNodeType')
    )) {
      validateMandatoryDOs(lnodetype).then(errors => {
        errors.forEach(error =>
          document.querySelector('open-scd')?.dispatchEvent(newLogEvent(error))
        );
      });

      validateDoCDCSetting(lnodetype).then(errors => {
        errors.forEach(error =>
          document.querySelector('open-scd')?.dispatchEvent(newLogEvent(error))
        );
      });
    }

    for (const dotype of Array.from(this.doc.querySelectorAll('DOType'))) {
      validateMandatoryDAs(dotype).then(errors => {
        errors.forEach(error =>
          document.querySelector('open-scd')?.dispatchEvent(newLogEvent(error))
        );
      });
      validateControlCDC(dotype).then(errors => {
        errors.forEach(error =>
          document.querySelector('open-scd')?.dispatchEvent(newLogEvent(error))
        );
      });
    }

    for (const datype of Array.from(this.doc.querySelectorAll('DAType')))
      validateMandatorySubDAs(datype).then(errors => {
        errors.forEach(error =>
          document.querySelector('open-scd')?.dispatchEvent(newLogEvent(error))
        );
      });
  }
}
