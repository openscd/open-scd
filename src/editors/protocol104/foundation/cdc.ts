import {
  Create,
  getNameAttribute,
  getTypeAttribute,
  newLogEvent,
  newWizardEvent,
} from '../../../foundation.js';

import {
  addPrefixAndNamespaceToDocument,
  createPrivateAddress,
  createPrivateElement,
  getPrivateElement,
} from './private.js';
import {
  findElementInOriginalLNStructure,
  getCdcValueFromDOElement,
  getEnumOrds,
  isEnumDataAttribute,
} from './foundation.js';
import { editAddressWizard } from '../wizards/address.js';
import {
  determineUninitializedStructure,
  initializeElements,
} from '../../../foundation/dai.js';
import { get } from 'lit-translate';

/**
 * List of supported Common Data Classes in the 104 protocol.
 */
export const supportedCdcTypes = [
  'ACT',
  'APC',
  'ASG',
  'BAC',
  'BCR',
  'BSC',
  'CMV',
  'DPC',
  'DPS',
  'ENG',
  'INC',
  'ING',
  'INS',
  'ISC',
  'MV',
  'SEC',
  'SPC',
  'SPG',
  'SPS',
] as const;
export type SupportedCdcType = typeof supportedCdcTypes[number];

export type CreateFunction = (
  lnElement: Element,
  lnClonedElement: Element,
  doElement: Element,
  wizard: Element,
  ti: string,
  daPaths: DaSelector[],
  inverted: boolean
) => Create[];
export type CreateCheckFunction = (
  lnElement: Element,
  lnClonedElement: Element,
  doElement: Element,
  wizard: Element,
  ti: string,
  daPaths: DaSelector[]
) => Create[];

export interface DaSelector {
  path: string[];
}
export interface TiInformation {
  daPaths: DaSelector[];
  create: CreateFunction;
  checkDaPaths?: DaSelector[];
  checkCreate?: CreateCheckFunction;
  inverted?: boolean;
}

/**
 * Record with configuration information on how to create Address elements for the 104 protocol.
 * Per supported Common Data Class (CDC) two record sets can be configured, one for the monitoring part
 * and one for the control part.
 * Per set the key of the record will be the ti value, meaning the list of keys will be the supported
 * ti values allowed for the CDC.
 * For each supported ti value there is information on how to find the DAI Element to which to create
 * the Address element(s).
 */
export const cdcProcessings: Record<
  SupportedCdcType,
  {
    monitor: Record<string, TiInformation>;
    control: Record<string, TiInformation>;
  }
> = {
  ACT: {
    monitor: {
      '30': {
        daPaths: [
          { path: ['general'] },
          { path: ['phsA'] },
          { path: ['phsB'] },
          { path: ['phsC'] },
          { path: ['neut'] },
        ],
        create: createAddressAction,
        inverted: true,
      },
      '39': {
        daPaths: [{ path: ['general'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  APC: {
    monitor: {
      '36': {
        daPaths: [{ path: ['mxVal', 'f'] }],
        create: createAddressAction,
      },
    },
    control: {
      '63': {
        daPaths: [{ path: ['Oper', 'ctlVal', 'f'] }],
        create: createAddressAction,
        checkDaPaths: [{ path: ['Oper', 'Check'] }],
        checkCreate: createCheckAddressAction,
      },
    },
  },
  ASG: {
    monitor: {
      '63': {
        daPaths: [{ path: ['setMag', 'f'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  BAC: {
    monitor: {
      '36': {
        daPaths: [{ path: ['mxVal', 'f'] }],
        create: createAddressAction,
      },
    },
    control: {
      '60': {
        daPaths: [{ path: ['Oper', 'ctlVal'] }],
        create: createAddressAction,
        checkDaPaths: [{ path: ['Oper', 'Check'] }],
        checkCreate: createCheckAddressAction,
      },
    },
  },
  BCR: {
    monitor: {
      '37': {
        daPaths: [{ path: ['actVal'] }, { path: ['frVal'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  BSC: {
    monitor: {
      '32': {
        daPaths: [{ path: ['valWTr', 'posVal'] }],
        create: createAddressAction,
      },
    },
    control: {
      '60': {
        daPaths: [{ path: ['Oper', 'ctlVal'] }],
        create: createAddressAction,
        checkDaPaths: [{ path: ['Oper', 'Check'] }],
        checkCreate: createCheckAddressAction,
      },
    },
  },
  CMV: {
    monitor: {
      '35': {
        daPaths: [{ path: ['mag', 'i'] }, { path: ['ang', 'i'] }],
        create: createAddressAction,
      },
      '36': {
        daPaths: [{ path: ['mag', 'f'] }, { path: ['ang', 'f'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  DPC: {
    monitor: {
      '31': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
      },
    },
    control: {
      '59': {
        daPaths: [{ path: ['Oper', 'ctlVal'] }],
        create: createAddressAction,
        checkDaPaths: [{ path: ['Oper', 'Check'] }],
        checkCreate: createCheckAddressAction,
      },
    },
  },
  DPS: {
    monitor: {
      '31': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  ENG: {
    monitor: {
      '58': {
        daPaths: [{ path: ['setVal'] }],
        create: createAddressWithExpectValueAction,
      },
      '62': {
        daPaths: [{ path: ['setVal'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  INC: {
    monitor: {
      '35': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
      },
    },
    control: {
      '62': {
        daPaths: [{ path: ['Oper', 'ctlVal'] }],
        create: createAddressAction,
        checkDaPaths: [{ path: ['Oper', 'Check'] }],
        checkCreate: createCheckAddressAction,
      },
    },
  },
  ING: {
    monitor: {
      '62': {
        daPaths: [{ path: ['setVal'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  INS: {
    monitor: {
      '30': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: true,
      },
      '33': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
      },
      '35': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  ISC: {
    monitor: {
      '32': {
        daPaths: [{ path: ['valWTr', 'posVal'] }],
        create: createAddressAction,
      },
    },
    control: {
      '62': {
        daPaths: [{ path: ['Oper', 'ctlVal'] }],
        create: createAddressAction,
        checkDaPaths: [{ path: ['Oper', 'Check'] }],
        checkCreate: createCheckAddressAction,
      },
    },
  },
  MV: {
    monitor: {
      '35': {
        daPaths: [{ path: ['mag', 'i'] }],
        create: createAddressAction,
      },
      '36': {
        daPaths: [{ path: ['mag', 'f'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  SEC: {
    monitor: {
      '37': {
        daPaths: [{ path: ['cnt'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  SPC: {
    monitor: {
      '30': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: true,
      },
    },
    control: {
      '58': {
        daPaths: [{ path: ['Oper', 'ctlVal'] }],
        create: createAddressAction,
        checkDaPaths: [{ path: ['Oper', 'Check'] }],
        checkCreate: createCheckAddressAction,
      },
    },
  },
  SPG: {
    monitor: {
      '58': {
        daPaths: [{ path: ['setVal'] }],
        create: createAddressAction,
      },
    },
    control: {},
  },
  SPS: {
    monitor: {
      '30': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: true,
      },
    },
    control: {},
  },
};

/**
 * Creates a new SCL Private element and add 104 Address element(s) below this.
 * Set the attribute value of 'ti' to the passed ti value.
 *
 * @param lnElement - The LN(0) Element.
 * @param doElement - The DO Element.
 * @param wizard    - Wizard Element to dispatch events on.
 * @param ti        - The value to be set on the attribute 'ti'.
 * @param daPaths   - The Array of DAI Elements to search or create and add the Private Element on.
 * @param inverted  - Indicates if extra Address Elements should be created with 'inverted=true'.
 * @returns An array of Create Action that the wizard action will return.
 */
function createAddressAction(
  lnElement: Element,
  lnClonedElement: Element,
  doElement: Element,
  wizard: Element,
  ti: string,
  daPaths: DaSelector[],
  inverted: boolean
): Create[] {
  const actions: Create[] = [];

  const [initializeActions, daiElements] = findOrCreateDaiElements(
    lnElement,
    lnClonedElement,
    doElement,
    wizard,
    daPaths
  );
  if (initializeActions.length > 0) {
    actions.push(...initializeActions);
  }

  if (daiElements.length > 0) {
    addPrefixAndNamespaceToDocument(lnElement.ownerDocument);

    daiElements.forEach(daiElement => {
      const addressElements = createAddressElements(
        daiElement.ownerDocument,
        ti,
        inverted
      );
      actions.push(...createActionsForPrivate(daiElement, addressElements));
    });
  }

  startEditWizards(wizard, lnElement, lnClonedElement, doElement, actions);
  return actions;
}

/**
 * Creates a new SCL Private element and add 104 Address element(s) below this.
 * Set the attribute value of 'ti' to the passed ti value.
 *
 * @param lnElement - The LN(0) Element.
 * @param doElement - The DO Element.
 * @param wizard    - Wizard Element to dispatch events on.
 * @param ti        - The value to be set on the attribute 'ti'.
 * @param daPaths   - The Array of DAI Elements to search or create and add the Private Element on.
 * @param inverted  - Indicates if extra Address Elements should be created with 'inverted=true'.
 * @returns An array of Create Action that the wizard action will return.
 */
function createAddressWithExpectValueAction(
  lnElement: Element,
  lnClonedElement: Element,
  doElement: Element,
  wizard: Element,
  ti: string,
  daPaths: DaSelector[],
  inverted: boolean
): Create[] {
  const actions: Create[] = [];

  const [initializeActions, daiElements] = findOrCreateDaiElements(
    lnElement,
    lnClonedElement,
    doElement,
    wizard,
    daPaths
  );
  if (initializeActions.length > 0) {
    actions.push(...initializeActions);
  }
  if (daiElements.length > 0) {
    addPrefixAndNamespaceToDocument(lnElement.ownerDocument);

    const addressElements: Element[] = [];
    daiElements.forEach(daiElement => {
      if (isEnumDataAttribute(daiElement)) {
        getEnumOrds(daiElement).forEach(ord =>
          addressElements.push(
            ...createAddressElements(
              daiElement.ownerDocument,
              ti,
              inverted,
              ord
            )
          )
        );
      } else {
        addressElements.push(
          ...createAddressElements(daiElement.ownerDocument, ti, inverted)
        );
      }

      actions.push(...createActionsForPrivate(daiElement, addressElements));
    });
  }

  startEditWizards(wizard, lnElement, lnClonedElement, doElement, actions);
  return actions;
}

/**
 * Create a new SCL Private element and add 104 Address element(s) below this.
 * Set the attribute value of 'ti' to the passed ti value.
 *
 * @param lnElement - The LN(0) Element.
 * @param doElement - The DO Element.
 * @param wizard    - Wizard Element to dispatch events on.
 * @param ti        - The value to be set on the attribute 'ti'.
 * @param daPaths   - The Array of DAI Elements to search or create and add the Private Element on.
 * @returns An array of Create Action that the wizard action will return.
 */
function createCheckAddressAction(
  lnElement: Element,
  lnClonedElement: Element,
  doElement: Element,
  wizard: Element,
  ti: string,
  daPaths: DaSelector[]
): Create[] {
  const actions: Create[] = [];

  const [initializeActions, daiElements] = findOrCreateDaiElements(
    lnElement,
    lnClonedElement,
    doElement,
    wizard,
    daPaths
  );
  if (initializeActions.length > 0) {
    actions.push(...initializeActions);
  }
  if (daiElements.length > 0) {
    addPrefixAndNamespaceToDocument(lnElement.ownerDocument);

    daiElements.forEach(daiElement => {
      const address1Element = createPrivateAddress(
        daiElement.ownerDocument,
        ti
      );
      address1Element.setAttribute('check', 'interlocking');

      const address2Element = createPrivateAddress(
        daiElement.ownerDocument,
        ti
      );
      address2Element.setAttribute('check', 'synchrocheck');

      actions.push(
        ...createActionsForPrivate(daiElement, [
          address1Element,
          address2Element,
        ])
      );
    });
  }

  startEditWizards(wizard, lnElement, lnClonedElement, doElement, actions);
  return actions;
}

export function createActionsForPrivate(
  daiElement: Element,
  addressElements: Element[]
): Create[] {
  const actions: Create[] = [];
  let privateElement = getPrivateElement(daiElement);
  if (privateElement) {
    addressElements.forEach(addressElement => {
      actions.push({
        new: { parent: privateElement!, element: addressElement },
      });
    });
  } else {
    privateElement = createPrivateElement(daiElement.ownerDocument);
    privateElement.append(...addressElements);

    actions.push({ new: { parent: daiElement, element: privateElement } });
  }
  return actions;
}

/**
 * Creates one or two Address Elements, depending on the value of inverted.
 *
 * @param document      - The Owner Document used to create the new Address Element with.
 * @param ti            - The value to be set on the attribute 'ti'.
 * @param inverted      - Indicates if extra Address Elements should be created with 'inverted=true'.
 * @param expectedValue - The optional value of the attribute 'expectedValue' if needed.
 * @returns Array of one or two Address Elements created.
 */
export function createAddressElements(
  document: Document,
  ti: string,
  inverted: boolean,
  expectedValue?: string
): Element[] {
  const addressElements: Element[] = [];
  const addressElement = createPrivateAddress(document, ti);
  if (expectedValue) {
    addressElement.setAttribute('expectedValue', expectedValue);
  }
  addressElements.push(addressElement);

  if (inverted) {
    const addressElement = createPrivateAddress(document, ti);
    addressElement.setAttribute('inverted', 'true');
    if (expectedValue) {
      addressElement.setAttribute('expectedValue', expectedValue);
    }
    addressElements.push(addressElement);
  }
  return addressElements;
}

function startEditWizards(
  wizard: Element,
  lnElement: Element,
  lnClonedElement: Element,
  doElement: Element,
  actions: Create[]
): void {
  actions.forEach(createAction => {
    const newElement = <Element>createAction.new.element;
    let addressElements: Element[];
    if (newElement.tagName === 'Address') {
      addressElements = [newElement];
    } else {
      addressElements = Array.from(newElement.querySelectorAll('Address'));
    }
    const parentElement = <Element>createAction.new.parent;
    const daiElement = parentElement.closest('DAI');
    if (daiElement) {
      const iedElement = lnElement.closest('IED')!;
      const doiElement = lnClonedElement.querySelector(
        `:scope > DOI[name="${getNameAttribute(doElement)}"]`
      )!;

      addressElements.forEach(addressElement => {
        wizard.dispatchEvent(
          newWizardEvent(() =>
            editAddressWizard(
              iedElement,
              doiElement,
              daiElement,
              addressElement
            )
          )
        );
      });
    }
  });
}

function createTemplateStructure(
  doElement: Element,
  daPath: DaSelector
): Element[] | null {
  let templateStructure: Element[] | null = [doElement];

  const doc = doElement.ownerDocument;
  const doType = doElement.getAttribute('type') ?? '';
  let typeElement = doc.querySelector(`DOType[id="${doType}"]`);

  daPath.path.forEach(name => {
    // There should be a DOType or DAType set for the current element in the list.
    if (!typeElement) {
      templateStructure = null;
      return;
    }
    const daElement = typeElement.querySelector(
      `:scope > DA[name="${name}"], :scope > BDA[name="${name}"]`
    );
    // If there is no DA/BDA Element found the structure is incorrect, so just stop.
    if (daElement === null) {
      templateStructure = null;
      return;
    }
    templateStructure!.push(daElement);

    const bType = daElement.getAttribute('bType') ?? '';
    if (bType === 'Struct') {
      const type = daElement.getAttribute('type') ?? '';
      typeElement = doc.querySelector(`DAType[id="${type}"]`);
    } else {
      typeElement = null;
    }
  });
  return templateStructure;
}

function findOrCreateDaiElements(
  lnElement: Element,
  lnClonedElement: Element,
  doElement: Element,
  wizard: Element,
  daPaths: DaSelector[]
): [Create[], Element[]] {
  const daiElements: Element[] = [];
  const actions: Create[] = [];

  daPaths.forEach(daPath => {
    const filter = createDaiFilter(doElement, daPath);
    const foundDaiElements = lnClonedElement.querySelectorAll(filter);
    if (foundDaiElements.length > 0) {
      daiElements.push(...Array.from(foundDaiElements));
    } else {
      const templateStructure = createTemplateStructure(doElement, daPath);
      if (templateStructure) {
        const [parentClonedElement, uninitializedTemplateStructure] =
          determineUninitializedStructure(lnClonedElement, templateStructure);
        // Next create all missing elements (DOI/SDI/DOI)
        const newElement = initializeElements(uninitializedTemplateStructure);

        // Always add it to the cloned LN Structure.
        parentClonedElement.append(newElement);

        // If the parent is the LN Element then use the original LN Element in the action.
        const parentElement = findElementInOriginalLNStructure(
          lnElement,
          parentClonedElement
        );
        if (parentElement) {
          actions.push({ new: { parent: parentElement, element: newElement } });
        }

        if (newElement.tagName === 'DAI') {
          daiElements.push(newElement);
        } else {
          const daiElement = newElement.querySelector('DAI')!;
          daiElements.push(daiElement);
        }
      } else {
        const cdc = getCdcValueFromDOElement(doElement) ?? '';
        const doType = getTypeAttribute(doElement) ?? '';
        wizard.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('protocol104.wizard.error.addAddressError', {
              structure: daPath.path.join(' > '),
              cdc,
              doType,
            }),
          })
        );
      }
    }
  });
  return [actions, daiElements];
}

function createDaiFilter(doElement: Element, daPath: DaSelector): string {
  const doName = getNameAttribute(doElement);
  let filter = `:scope > DOI[name="${doName}"] > `;
  daPath.path.forEach((value, index) => {
    if (index < daPath.path.length - 1) {
      filter = filter + `SDI[name="${value}"] > `;
    } else {
      filter = filter + `DAI[name="${value}"]`;
    }
  });
  return filter;
}

/**
 * Indicates if the combination cdc/ti should handle/process the attribute "unitMultiplier" of the Address Element.
 *
 * @param cdc - The Common Data Class.
 * @param ti  - The TI Value.
 * @returns true, if the combination should handle/process the attribute "unitMultiplier".
 */
export function hasUnitMultiplierField(cdc: string, ti: string): boolean {
  return (
    (cdc === 'MV' && ['35', '36'].includes(ti)) ||
    (cdc === 'INS' && ti === '35')
  );
}

/**
 * Indicates if the combination cdc/ti should handle/process the attributes "scaleMultiplier" and "scaleOffset" of
 * the Address Element.
 *
 * @param cdc - The Common Data Class.
 * @param ti  - The TI Value.
 * @returns true, if the combination should handle/process the attributes "scaleMultiplier" and "scaleOffset".
 */
export function hasScaleFields(cdc: string, ti: string): boolean {
  return cdc === 'MV' && ['35', '36'].includes(ti);
}
