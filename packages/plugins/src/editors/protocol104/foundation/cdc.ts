import {
  getNameAttribute,
  newWizardEvent,
} from '@openscd/open-scd/src/foundation.js';
import { Create } from '@openscd/core/foundation/deprecated/editor.js';
import { newLogEvent } from '@openscd/core/foundation/deprecated/history.js';

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
  getTypeAttribute,
  isEnumDataAttribute,
} from './foundation.js';
import { editAddressWizard } from '../wizards/address.js';
import {
  determineUninitializedStructure,
  initializeElements,
} from '@openscd/open-scd/src/foundation/dai.js';
import { get } from 'lit-translate';

/**
 * List of supported Common Data Classes in the 104 protocol.
 */
export const supportedCdcTypes = [
  'ACD',
  'ACT',
  'APC',
  'ASG',
  'BAC',
  'BCR',
  'BSC',
  'CMV',
  'DEL',
  'DPC',
  'DPS',
  'ENC',
  'ENG',
  'ENS',
  'INC',
  'ING',
  'INS',
  'ISC',
  'MV',
  'SEC',
  'SPC',
  'SPG',
  'SPS',
  'WYE',
] as const;
export type SupportedCdcType = (typeof supportedCdcTypes)[number];

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
  ACD: {
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
      '40': {
        daPaths: [
          { path: ['general'] },
          { path: ['phsA'] },
          { path: ['phsB'] },
          { path: ['phsC'] },
          { path: ['neut'] },
        ],
        create: createAddressAction,
      },
    },
    control: {},
  },
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
        inverted: true,
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
        inverted: true,
      },
    },
    control: {},
  },
  BAC: {
    monitor: {
      '36': {
        daPaths: [{ path: ['mxVal', 'f'] }],
        create: createAddressAction,
        inverted: true,
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
        inverted: true,
      },
    },
    control: {},
  },
  BSC: {
    monitor: {
      '32': {
        daPaths: [{ path: ['valWTr', 'posVal'] }],
        create: createAddressAction,
        inverted: true,
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
        inverted: true,
      },
      '36': {
        daPaths: [{ path: ['mag', 'f'] }, { path: ['ang', 'f'] }],
        create: createAddressAction,
        inverted: true,
      },
    },
    control: {},
  },
  DEL: {
    monitor: {
      '35': {
        daPaths: [
          { path: ['phsAB', 'cVal', 'mag', 'f'] },
          { path: ['phsBC', 'cVal', 'mag', 'f'] },
          { path: ['phsCA', 'cVal', 'mag', 'f'] },
        ],
        create: createAddressAction,
        inverted: false,
      },
      '36': {
        daPaths: [
          { path: ['phsAB', 'cVal', 'mag', 'f'] },
          { path: ['phsBC', 'cVal', 'mag', 'f'] },
          { path: ['phsCA', 'cVal', 'mag', 'f'] },
        ],
        create: createAddressAction,
        inverted: false,
      },
    },
    control: {},
  },
  DPC: {
    monitor: {
      '31': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: true,
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
        inverted: true,
      },
    },
    control: {},
  },
  ENC: {
    monitor: {
      '30': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: true,
      },
      '35': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: false,
      },
    },
    control: {
      '58': {
        daPaths: [{ path: ['Oper', 'ctlVal'] }],
        create: createAddressWithExpectValueAction,
        checkDaPaths: [{ path: ['Oper', 'Check'] }],
        checkCreate: createCheckAddressAction,
      },
      '62': {
        daPaths: [{ path: ['Oper', 'ctlVal'] }],
        create: createAddressWithExpectValueAction,
        checkDaPaths: [{ path: ['Oper', 'Check'] }],
        checkCreate: createCheckAddressAction,
      },
    },
  },
  ENG: {
    monitor: {
      '58': {
        daPaths: [{ path: ['setVal'] }],
        create: createAddressWithExpectValueAction,
        inverted: true,
      },
      '62': {
        daPaths: [{ path: ['setVal'] }],
        create: createAddressAction,
        inverted: true,
      },
    },
    control: {},
  },
  ENS: {
    monitor: {
      '30': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: true,
      },
      '35': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: true,
      },
    },
    control: {},
  },
  INC: {
    monitor: {
      '35': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: true,
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
        inverted: true,
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
        inverted: true,
      },
      '35': {
        daPaths: [{ path: ['stVal'] }],
        create: createAddressAction,
        inverted: true,
      },
    },
    control: {},
  },
  ISC: {
    monitor: {
      '32': {
        daPaths: [{ path: ['valWTr', 'posVal'] }],
        create: createAddressAction,
        inverted: true,
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
        inverted: true,
      },
      '36': {
        daPaths: [{ path: ['mag', 'f'] }],
        create: createAddressAction,
        inverted: true,
      },
    },
    control: {},
  },
  SEC: {
    monitor: {
      '37': {
        daPaths: [{ path: ['cnt'] }],
        create: createAddressAction,
        inverted: true,
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
        inverted: true,
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
  WYE: {
    monitor: {
      '35': {
        daPaths: [
          { path: ['phsA', 'cVal', 'mag', 'f'] },
          { path: ['phsB', 'cVal', 'mag', 'f'] },
          { path: ['phsC', 'cVal', 'mag', 'f'] },
        ],
        create: createAddressAction,
        inverted: false,
      },
      '36': {
        daPaths: [
          { path: ['phsA', 'cVal', 'mag', 'f'] },
          { path: ['phsB', 'cVal', 'mag', 'f'] },
          { path: ['phsC', 'cVal', 'mag', 'f'] },
        ],
        create: createAddressAction,
        inverted: false,
      },
    },
    control: {},
  },
};

/**
 * Creates a new SCL Private element and add 104 Address element(s) below this.
 * Set the attribute value of 'ti' to the passed ti value.
 *
 * @param lnElement       - The LN(0) Element.
 * @param lnClonedElement - The Cloned LN Element, used to create new structure and determine which Create actions are needed.
 * @param doElement       - The DO Element.
 * @param wizard          - Wizard Element to dispatch events on.
 * @param ti              - The value to be set on the attribute 'ti'.
 * @param daPaths         - The Array of DAI Elements to search or create and add the Private Element on.
 * @param inverted        - Indicates if extra Address Elements should be created with 'inverted=true'.
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
 * @param lnElement       - The LN(0) Element.
 * @param lnClonedElement - The Cloned LN Element, used to create new structure and determine which Create actions are needed.
 * @param doElement       - The DO Element.
 * @param wizard          - Wizard Element to dispatch events on.
 * @param ti              - The value to be set on the attribute 'ti'.
 * @param daPaths         - The Array of DAI Elements to search or create and add the Private Element on.
 * @param inverted        - Indicates if extra Address Elements should be created with 'inverted=true'.
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
 * @param lnElement       - The LN(0) Element.
 * @param lnClonedElement - The Cloned LN Element, used to create new structure and determine which Create actions are needed.
 * @param doElement       - The DO Element.
 * @param wizard          - Wizard Element to dispatch events on.
 * @param ti              - The value to be set on the attribute 'ti'.
 * @param daPaths         - The Array of DAI Elements to search or create and add the Private Element on.
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

/**
 * Create or update the 104 Private Element, if the Private already exists, the new Address Elements are
 * added, otherwise a new Private Element is created to which the Address Elements are added.
 * The correct Create Action is returned.
 *
 * @param daiElement      - The DAI Element which will hold the new or existing Private Element
 * @param addressElements - The Address Elements to be created with Create Actions.
 */
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

/**
 * Use all Create Action to determine which Address Elements are created and start an Edit Address Wizard
 * for every Address Element found.
 *
 * @param wizard          - The current Wizard used to dispatch the new Wizards on.
 * @param lnElement       - The LN Element used to search for specific parent elements.
 * @param lnClonedElement - The cloned LN Element to search for child elements.
 * @param doElement       - The DO Element for which the Address Elements where created.
 * @param actions         - The list of all the Create Actions.
 */
function startEditWizards(
  wizard: Element,
  lnElement: Element,
  lnClonedElement: Element,
  doElement: Element,
  actions: Create[]
): void {
  actions.forEach(createAction => {
    // Loop over all Actions and collect all Address Elements in an Array.
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

/**
 * Use the DA Path configuration of a Common Data Class to search for all DO/BDA/DA Elements to create
 * a structure for which DOI/SDI/DAI Elements should be created later. Null will be returned when an invalid
 * Template Structure is described by the DA Path.
 *
 * @param doElement - The DO Element to start searching for DA/BDA Elements.
 * @param daPath    - The (B)DA Elements to find in the template structure.
 * @returns List of Elements starting with the DO Element followed by one or more (B)DA Elements describing the structure.
 */
function createTemplateStructure(
  doElement: Element,
  daPath: DaSelector
): Element[] | null {
  let templateStructure: Element[] | null = [doElement];

  const doc = doElement.ownerDocument;
  const doType = getTypeAttribute(doElement) ?? '';
  let typeElement = doc.querySelector(`DOType[id="${doType}"]`);

  daPath.path.forEach(name => {
    // There should be a DOType or DAType set for the current element in the list.
    if (!typeElement) {
      templateStructure = null;
      return;
    }
    const sdoElement = typeElement.querySelector(
      `:scope > SDO[name="${name}"]`
    );
    const sdoType = sdoElement?.getAttribute('type');

    if (sdoType) typeElement = doc.querySelector(`DOType[id="${sdoType}"]`);

    const daElement = typeElement!.querySelector(
      `:scope > DA[name="${name}"], :scope > BDA[name="${name}"]`
    );
    // If there is no DA/BDA Element found the structure is incorrect, so just stop.
    if (daElement === null && sdoElement === null) {
      templateStructure = null;
      return;
    }

    templateStructure!.push(sdoElement ? sdoElement : daElement!);

    if (sdoElement) return;

    const bType = daElement!.getAttribute('bType') ?? '';
    if (bType === 'Struct') {
      const type = getTypeAttribute(daElement!) ?? '';
      typeElement = doc.querySelector(`DAType[id="${type}"]`);
    } else {
      typeElement = null;
    }
  });
  return templateStructure;
}

/**
 * Search for existing DAI Elements below the DO Element matching the DA Paths passed or create the DAI Element
 * if the DA Path doesn't exist yet.
 *
 * @param lnElement       - The LN(0) Element.
 * @param lnClonedElement - The Cloned LN Element, used to create new structure and determine which Create actions are needed.
 * @param doElement       - The DO Element.
 * @param wizard          - The current Wizard to dispatch Log Events, if needed.
 * @param daPaths         - The DA Structures for which the DAI Structure needs to be created below the DO Element.
 */
function findOrCreateDaiElements(
  lnElement: Element,
  lnClonedElement: Element,
  doElement: Element,
  wizard: Element,
  daPaths: DaSelector[]
): [Create[], Element[]] {
  const daiElements: Element[] = [];
  const actions: Create[] = [];

  // Start searching and creating for each DA Path passed.
  daPaths.forEach(daPath => {
    const filter = createDaiFilter(doElement, daPath);
    const foundDaiElements = lnClonedElement.querySelectorAll(filter);
    if (foundDaiElements.length > 0) {
      // Existing DAI Element found, so use that Element.
      foundDaiElements.forEach(clonedDaiElement => {
        const daiElement = findElementInOriginalLNStructure(
          lnElement,
          clonedDaiElement
        );
        if (daiElement) {
          daiElements.push(daiElement);
        } else {
          daiElements.push(clonedDaiElement);
        }
      });
    } else {
      // DAI Element doesn't exist yet, so create the structure using the DA Path.
      const templateStructure = createTemplateStructure(doElement, daPath);
      if (templateStructure) {
        const [parentClonedElement, uninitializedTemplateStructure] =
          determineUninitializedStructure(lnClonedElement, templateStructure);
        // Next create all missing elements (DOI/SDI/DOI)
        const newElement = initializeElements(uninitializedTemplateStructure);

        // Always add it to the cloned LN Structure.
        parentClonedElement.append(newElement);

        // Search if the parent already exists in the current LN Element Structure.
        // If so we will add a new Create Action for it.
        // If it is already there because one of the parents of the parent is used in a Create Action.
        const parentElement = findElementInOriginalLNStructure(
          lnElement,
          parentClonedElement
        );
        if (parentElement) {
          actions.push({ new: { parent: parentElement, element: newElement } });
        }

        // Add new DAI Elements to the list to return.
        if (newElement.tagName === 'DAI') {
          daiElements.push(newElement);
        } else {
          const daiElement = newElement.querySelector('DAI')!;
          daiElements.push(daiElement);
        }
      } else {
        // The DA Path can't be mapped on the Template structure of the current document.
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

/**
 * Use the DO Element and a DA Selector to create a CSS Query to search for a DAI Element
 * below the LN Element.
 *
 * @param doElement - The DO Element for which to search a DOI Element.
 * @param daPath    - The DA Selector to create the query to find the SDI/DAI Elements.
 */
function createDaiFilter(doElement: Element, daPath: DaSelector): string {
  const doName = getNameAttribute(doElement);
  let filter = `:scope > DOI[name="${doName}"] > `;
  daPath.path.forEach((value, index) => {
    if (index < daPath.path.length - 1) {
      filter = `${filter} SDI[name="${value}"] > `;
    } else {
      filter = `${filter} DAI[name="${value}"]`;
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
