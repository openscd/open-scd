import { get } from 'lit-translate';

import { identity } from '@openscd/open-scd/src/foundation.js';
import { LogDetailBase } from '@openscd/core/foundation/deprecated/history.js';
import {
  getAdjacentClass,
  validateChildren,
} from './foundation.js';
import {
  iec6185073,
  iec6185074,
  iec6185081,
} from '@openscd/open-scd/src/foundation/nsd.js';

async function getSpecificDataObject(
  lnClass: string | null | undefined,
  doName: string | null | undefined
): Promise<Element | null> {
  if (!lnClass || !doName) return null;

  const lnodeclasses = getAdjacentClass(await iec6185074, lnClass!);

  return (
    lnodeclasses
      .flatMap(lnodeclass =>
        Array.from(lnodeclass.querySelectorAll(`DataObject`))
      )
      .find(dataObject => dataObject.getAttribute('name') === doName) ?? null
  );
}

async function getNsdReference(element: Element): Promise<Element | null> {
  const id = element.getAttribute('id');

  if (!id) return null;

  const doorsdo = element
    .closest('DataTypeTemplates')
    ?.querySelector(
      `LNodeType > DO[type="${id}"], LNodeType > SDO[type="${id}"]`
    );
  const doName = doorsdo?.getAttribute('name');

  const lNodeType = doorsdo?.parentElement;
  const lnClass = lNodeType?.getAttribute('lnClass');

  return await getSpecificDataObject(lnClass, doName);
}

function getControlServicePresConditions(
  ctlModel: string | null | undefined
): string[] {
  if (!ctlModel || ctlModel === 'status-only') return [];

  if (ctlModel.includes('direct')) return ['MOctrl'];

  if (ctlModel.includes('normal')) return ['MOctrl', 'MOsbo', 'MOsboNormal'];

  if (ctlModel.includes('enhanced'))
    return ['MOctrl', 'MOsbo', 'MOsboEnhanced'];

  return [];
}

async function getMandatoryDataAttribute(
  dotype: Element,
  cdc: string
): Promise<Element[]> {
  const nsd73 = await iec6185073;
  const nsd81 = await iec6185081;

  const dataAttributes = Array.from(
    nsd73.querySelectorAll(`CDC[name="${cdc}"] > DataAttribute[presCond="M"]`)
  );

  const servicePresConds = getControlServicePresConditions(
    dotype.querySelector('DA[name="ctlModel"] > Val')?.textContent?.trim()
  );
  const serviceDataAttribute = Array.from(
    nsd81.querySelectorAll(`ServiceCDC[cdc="${cdc}"] > ServiceDataAttribute`)
  ).filter(da => servicePresConds.includes(da.getAttribute('presCond')!));

  return dataAttributes.concat(serviceDataAttribute);
}

async function validateAttributes(
  dotype: Element,
  cdc: string
): Promise<LogDetailBase[]> {
  const reference = await getNsdReference(dotype);
  if (reference && cdc !== reference.getAttribute('type'))
    return [
      {
        title: get('validator.templates.incorrectAttribute', {
          attr: 'cdc',
          element: 'DOType',
        }),
        message: `${identity(dotype)}`,
      },
    ];

  return [];
}

async function missingMandatoryChildren(
  dotype: Element,
  cdc: string
): Promise<LogDetailBase[]> {
  const errors: LogDetailBase[] = [];

  const mandatorydas = (await getMandatoryDataAttribute(dotype, cdc)).map(
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

export async function dOTypeValidator(
  dotype: Element
): Promise<LogDetailBase[]> {
  const errors: LogDetailBase[] = [];

  if (dotype.tagName !== 'DOType') return [];

  const cdc = dotype.getAttribute('cdc');
  if (!cdc)
    return [
      {
        title: get('validator.templates.missingAttribute', {
          attr: 'cdc',
          element: dotype.tagName,
        }),
        message: `${identity(dotype)}`,
      },
    ];

  const incorrectAttributes = await validateAttributes(dotype, cdc);
  const missingChildren = await missingMandatoryChildren(dotype, cdc);
  const issuesChildren = await validateChildren(dotype);

  return errors.concat(missingChildren, issuesChildren, incorrectAttributes);
}
