import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';
import {
  identity,
  LogDetail,
  LogDetailBase,
  newIssueEvent,
  newLogEvent,
} from '../foundation.js';
import { getSchema } from '../schemas.js';

type ValidationResult = LogDetailBase | LogDetail;

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

const serviceCDCs = ['SPC', 'DPC', 'INC', 'ENC', 'BSC', 'ISC', 'APC', 'BAC'];

function dispatch(
  detail: ValidationResult,
  statusNumber: number,
  validatorId: string
): void {
  const title = (<LogDetailBase>detail).title;
  const message = (<LogDetailBase>detail).message;
  document.querySelector('open-scd')?.dispatchEvent(
    newIssueEvent({
      validatorId,
      statusNumber: statusNumber,
      title,
      message,
    })
  );
}

async function validateCoOperStructure(
  oper: Element
): Promise<ValidationResult[]> {
  const type = oper.getAttribute('type');
  if (!type) return [];

  const datype =
    oper.closest('DataTypeTemplates')?.querySelector(`DAType[id="${type}"]`) ??
    null;

  const nsd81 = await iec6185081;

  const errors: ValidationResult[] = [];
  const mandatoryBDAs = Array.from(
    nsd81.querySelectorAll(
      `ServiceConstructedAttributes > ServiceConstructedAttribute[name="Oper"] > SubDataAttribute[presCond="M"]`
    )
  ).map(data => data.getAttribute('name')!);

  for (const mandatoryBDA of mandatoryBDAs)
    if (datype && !datype.querySelector(`BDA[name="${mandatoryBDA}"]`))
      errors.push({
        title: get('validator.templates.mandatoryChild', {
          tag: 'DAType',
          id: type,
          childTag: 'BDA',
          childId: mandatoryBDA,
        }),
        message: `${identity(datype)}`,
      });

  return errors;
}

async function validateCoSBOwStructure(
  sbow: Element
): Promise<ValidationResult[]> {
  const type = sbow.getAttribute('type');
  if (!type) return [];

  const datype =
    sbow.closest('DataTypeTemplates')?.querySelector(`DAType[id="${type}"]`) ??
    null;

  const nsd81 = await iec6185081;

  const errors: ValidationResult[] = [];
  const mandatoryBDAs = Array.from(
    nsd81.querySelectorAll(
      `ServiceConstructedAttributes > ServiceConstructedAttribute[name="SBOw"] > SubDataAttribute[presCond="M"]`
    )
  ).map(data => data.getAttribute('name')!);

  for (const mandatoryBDA of mandatoryBDAs)
    if (datype && !datype.querySelector(`BDA[name="${mandatoryBDA}"]`))
      errors.push({
        title: get('validator.templates.mandatoryChild', {
          tag: 'SBOw',
          id: type,
          childTag: 'BDA',
          childId: mandatoryBDA,
        }),
        message: `${identity(datype)}`,
      });

  return errors;
}

async function validateCoCancelStructure(
  cancel: Element
): Promise<ValidationResult[]> {
  const type = cancel.getAttribute('type');
  if (!type) return [];

  const datype =
    cancel
      .closest('DataTypeTemplates')
      ?.querySelector(`DAType[id="${type}"]`) ?? null;

  const nsd81 = await iec6185081;

  const errors: ValidationResult[] = [];
  const mandatoryBDAs = Array.from(
    nsd81.querySelectorAll(
      `ServiceConstructedAttributes > ServiceConstructedAttribute[name="Cancel"] > SubDataAttribute[presCond="M"]`
    )
  ).map(data => data.getAttribute('name')!);

  for (const mandatoryBDA of mandatoryBDAs)
    if (datype && !datype.querySelector(`BDA[name="${mandatoryBDA}"]`))
      errors.push({
        title: get('validator.templates.mandatoryChild', {
          tag: 'DAType',
          id: type,
          childTag: 'BDA',
          childId: mandatoryBDA,
        }),
        message: `${identity(datype)}`,
      });

  return errors;
}

function missingCoDataToLog(
  reference: string | number,
  type: 'Oper' | 'SBOw' | 'SBO' | 'Cancel'
): ValidationResult {
  return {
    title: get('validator.templates.missingCoDO', { type }),
    message: `${reference}`,
  };
}

export async function validateControlCDC(
  dotype: Element
): Promise<ValidationResult[]> {
  //characteristic for controlable CDCs is the third and last character that must be xxC
  if (
    dotype.getAttribute('cdc') &&
    !serviceCDCs.includes(dotype.getAttribute('cdc')!)
  )
    return [];

  let errors: ValidationResult[] = [];
  const ctlModel = dotype
    .querySelector('DA[name="ctlModel"] > Val')
    ?.textContent?.trim();
  const oper = dotype.querySelector('DA[fc="CO"][name="Oper"][bType="Struct"]');
  const sbo = dotype.querySelector('DA[fc="CO"][name="SBO"][bType="ObjRef"]');
  const cancel = dotype.querySelector(
    'DA[fc="CO"][name="Cancel"][bType="Struct"]'
  );
  const sbow = dotype.querySelector('DA[fc="CO"][name="SBOw"][bType="Struct"]');

  if (ctlModel === 'sbo-with-enhanced-security') {
    const errorsSBOw = sbow
      ? await validateCoSBOwStructure(sbow)
      : [missingCoDataToLog(identity(dotype), 'SBOw')];
    const errorsCancel = cancel
      ? await validateCoCancelStructure(cancel)
      : [missingCoDataToLog(identity(dotype), 'Cancel')];
    errors = errorsSBOw.concat(errorsCancel);
  } else if (ctlModel === 'sbo-with-normal-security') {
    errors = cancel
      ? await validateCoCancelStructure(cancel)
      : [missingCoDataToLog(identity(dotype), 'Cancel')];
    if (!sbo) errors.push(missingCoDataToLog(identity(dotype), 'SBO'));
  } else if (
    ctlModel === 'direct-with-normal-security' ||
    ctlModel === 'direct-with-enhanced-security'
  ) {
    errors = oper
      ? await validateCoOperStructure(oper)
      : [missingCoDataToLog(identity(dotype), 'Oper')];
  } else if (ctlModel !== 'status-only') {
    return [
      {
        title: get('validator.templates.missingCtlModelDef', {
          tag: 'DOType',
          id: dotype.id || 'UNIDENTIFIABLE',
          childTag: 'ctlModel',
          childId: 'Val',
        }),
        message: <string>(identity(dotype) || 'UNIDENTIFIABLE'),
      },
    ];
  }

  return errors;
}

async function getMandatorySubDAs(datype: Element): Promise<Element[]> {
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

export async function validateMandatorySubDAs(
  datype: Element
): Promise<ValidationResult[]> {
  const mandatorySubDAs = await getMandatorySubDAs(datype);
  const subDANames = mandatorySubDAs.map(
    DA => DA.getAttribute('name') ?? 'NONAME'
  );
  const missingDANames = subDANames.filter(
    da => !datype.querySelector(`BDA[name="${da}"]`)
  );

  return missingDANames.map(da => {
    return {
      title: get('validator.templates.mandatoryChild', {
        tag: 'DAType',
        id: datype.getAttribute('id') ?? '',
        childTag: 'DA',
        childId: da,
      }),
      message: `${datype}`,
    };
  });
}

async function getMandatoryDataAttribute(base: string): Promise<Element[]> {
  const nsd = await iec6185073;
  const cdc = nsd.querySelector(`CDC[name="${base}"]`);

  if (!cdc) return [];

  return Array.from(cdc.querySelectorAll('DataAttribute[presCond="M"]'));
}

export async function validateMandatoryDAs(
  dotype: Element
): Promise<ValidationResult[]> {
  const errors: ValidationResult[] = [];
  const cdc = dotype.getAttribute('cdc');
  if (!cdc) return [];

  const mandatorydas = (await getMandatoryDataAttribute(cdc)).map(
    DA => DA.getAttribute('name')!
  );

  mandatorydas.forEach(mandatoryda => {
    if (!dotype.querySelector(`DA[name="${mandatoryda}"]`))
      errors.push({
        title: get('validator.templates.mandatoryChild', {
          tag: 'Common Data Class',
          id: cdc,
          childTag: 'DA',
          childId: mandatoryda,
        }),
        message: `${identity(dotype)}`,
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

async function getAllDataObjects(base: string): Promise<Element[]> {
  const lnodeclasses = getAdjacentClass(await iec6185074, base);

  return lnodeclasses.flatMap(lnodeclass =>
    Array.from(lnodeclass.querySelectorAll('DataObject'))
  );
}

export async function validateDoCDCSetting(
  lnodetype: Element
): Promise<ValidationResult[]> {
  const errors: ValidationResult[] = [];
  const lnClass = lnodetype.getAttribute('lnClass');
  if (!lnClass) return [];

  const alldos = await getAllDataObjects(lnClass);

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
        title: get('validator.templates.cannotValidate', {
          tag: 'LNodeType',
          id: lnClass,
          childTag: 'DO',
          childId: DO.getAttribute('name') || 'UNNAMED',
        }),
        message: `${identity(lnodetype)}`,
      });
      continue;
    }

    if (dOType!.getAttribute('cdc') !== DO.getAttribute('type'))
      errors.push({
        title: get('validator.templates.mandatoryChild', {
          tag: 'DOType',
          id: dOType.getAttribute('cdc') || 'UNCLASSIFIED',
          childTag: 'DO',
          childId: DO.getAttribute('type') || 'UNTYPED',
        }),
        message: `${identity(dOType)} > ${DO.getAttribute('name')}`,
      });
  }

  return errors;
}

async function getMandatoryDataObject(base: string): Promise<Element[]> {
  const lnodeclasses = getAdjacentClass(await iec6185074, base);

  return lnodeclasses.flatMap(lnodeclass =>
    Array.from(lnodeclass.querySelectorAll('DataObject[presCond="M"]'))
  );
}

export async function validateMandatoryDOs(
  lnodetype: Element
): Promise<LogDetailBase[]> {
  const errors: LogDetailBase[] = [];
  const lnClass = lnodetype.getAttribute('lnClass');
  if (!lnClass) return [];

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

export default class ValidateTemplates extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property()
  docName!: string;

  @property()
  pluginId!: string;

  async validate(identity: string, statusNumber: number): Promise<void> {
    const promises: Promise<void>[] = [];

    const [version, revision, release] = [
      this.doc.documentElement.getAttribute('version') ?? '',
      this.doc.documentElement.getAttribute('revision') ?? '',
      this.doc.documentElement.getAttribute('release') ?? '',
    ];

    if (version === '2003' || revision === 'A' || Number(release) < 3) {
      document.querySelector('open-scd')?.dispatchEvent(
        newIssueEvent({
          validatorId: this.pluginId,
          statusNumber: statusNumber,
          title: get('diag.missingnsd'),
          message: '',
        })
      );
      return;
    }

    for (const lnodetype of Array.from(
      this.doc.querySelectorAll('LNodeType')
    )) {
      promises.push(
        validateMandatoryDOs(lnodetype).then(errors => {
          errors.forEach(error => dispatch(error, statusNumber, this.pluginId));
        })
      );

      promises.push(
        validateDoCDCSetting(lnodetype).then(errors => {
          errors.forEach(error => dispatch(error, statusNumber, this.pluginId));
        })
      );
    }

    for (const dotype of Array.from(this.doc.querySelectorAll('DOType'))) {
      promises.push(
        validateMandatoryDAs(dotype).then(errors => {
          errors.forEach(error => dispatch(error, statusNumber, this.pluginId));
        })
      );
      promises.push(
        validateControlCDC(dotype).then(errors => {
          errors.forEach(error => dispatch(error, statusNumber, this.pluginId));
        })
      );
    }

    for (const datype of Array.from(this.doc.querySelectorAll('DAType')))
      promises.push(
        validateMandatorySubDAs(datype).then(errors => {
          errors.forEach(error => dispatch(error, statusNumber, this.pluginId));
        })
      );

    await Promise.allSettled(promises);
  }
}
