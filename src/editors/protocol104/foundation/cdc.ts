import { Create } from "../../../foundation.js";

import {addPrefixAndNamespaceToDocument, createPrivateAddress, createPrivateElement} from "./private.js";

/**
 * List of supported Common Data Classes in the 104 protocol.
 */
export const supportedCdcTypes =
  [ 'ACT', 'APC', 'ASG', 'BAC', 'BCR', 'BSC', 'CMV',
    'DPC', 'DPS', 'INC', 'ING', 'INS', 'ISC', 'MV',
    'SEC', 'SPC', 'SPG', 'SPS'] as const;
export type SupportedCdcType = typeof supportedCdcTypes[number];

export type CreateFunction = (daiElement: Element, selectedTi: string) => Create[];

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
    monitor: Record<string, {
      filter: string;
      create: CreateFunction;
    }>,
    control: Record<string, {
      filter: string;
      create: CreateFunction;
    }>,
  }
  > = {
  ACT: {
    monitor: {
      '30': {
        filter: ':scope > DAI[name="general"], ' +
          ':scope > DAI[name="phsA"], ' +
          ':scope > DAI[name="phsB"], ' +
          ':scope > DAI[name="phsC"], ' +
          ':scope > DAI[name="neut"]',
        create: createSingleAddressAction
      },
      '39': {
        filter: ':scope > DAI[name="general"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
  APC: {
    monitor: {
      '36': {
        filter: ':scope > SDI[name="mxVal"] > DAI[name="f"]',
        create: createSingleAddressAction
      },
    },
    control: {
      '63': {
        filter: ':scope > SDI[name="Oper"] > SDI[name="ctlVal"] > DAI[name="f"]',
        create: createSingleAddressAction
      },
    }
  },
  ASG: {
    monitor: {
      '63': {
        filter: ':scope > SDI[name="setMag"] > DAI[name="f"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
  BAC: {
    monitor: {
      '36': {
        filter: ':scope > SDI[name="mxVal"] > DAI[name="f"]',
        create: createSingleAddressAction
      },
    },
    control: {
      '60': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"]',
        create: createSingleAddressAction
      },
    }
  },
  BCR: {
    monitor: {
      '37': {
        filter: ':scope > DAI[name="actVal"], ' +
          ':scope > DAI[name="frVal"]',
        create: createSingleAddressAction
      },
    },
    control: {}
  },
  BSC: {
    monitor: {
      '32': {
        filter: ':scope > SDI[name="valWTr"] > DAI[name="posVal"]',
        create: createSingleAddressAction
      },
    },
    control: {
      '60': {
        filter: ':scope > SDI[name="Oper"] > DAI[name=“ctlVal”]',
        create: createSingleAddressAction
      },
    }
  },
  CMV: {
    monitor: {
      '35': {
        filter: ':scope > SDI[name="mag"] > DAI[name="i"], ' +
          ':scope > SDI[name="ang"] > DAI[name="i"]',
        create: createSingleAddressAction
      },
      '36': {
        filter: ':scope > SDI[name="mag"] > DAI[name="f"], ' +
          ':scope > SDI[name="ang"] > DAI[name="f"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
  DPC: {
    monitor: {
      '31': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSingleAddressAction
      },
    },
    control: {
      '59': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"]',
        create: createSingleAddressAction
      },
    }
  },
  DPS: {
    monitor: {
      '31': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
  INC: {
    monitor: {
      '35': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSingleAddressAction
      },
    },
    control: {
      '62': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"]',
        create: createSingleAddressAction
      },
    }
  },
  ING: {
    monitor: {
      '62': {
        filter: ':scope > DAI[name="setVal"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
  INS: {
    monitor: {
      '30': {
        filter: ':scope > DAI[name="stVal"]',
        create: createInvertedAddressAction
      },
      '33': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSingleAddressAction
      },
      '35': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
  ISC: {
    monitor: {
      '32': {
        filter: ':scope > SDI[name="valWTr"] > DAI[name="posVal"]',
        create: createSingleAddressAction
      },
    },
    control: {
      '62': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"]',
        create: createSingleAddressAction
      },
    }
  },
  MV: {
    monitor: {
      '35': {
        filter: ':scope > SDI[name="mag"] > DAI[name="i"]',
        create: createSingleAddressAction
      },
      '36': {
        filter: ':scope > SDI[name="mag"] > DAI[name="f"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
  SEC: {
    monitor: {
      '37': {
        filter: ':scope > DAI[name="cnt"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
  SPC: {
    monitor: {
      '30': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSingleAddressAction
      },
    },
    control: {
      '58': {
        filter: ':scope > SDI[name="Oper"] > DAI[name="ctlVal"], ' +
          ':scope > SDI[name="Oper"] > DAI[name="Check"]',
        create: createSingleAddressAction
      },
    }
  },
  SPG: {
    monitor: {
      '58': {
        filter: ':scope > DAI[name="setVal"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
  SPS: {
    monitor: {
      '30': {
        filter: ':scope > DAI[name="stVal"]',
        create: createSingleAddressAction
      }
    },
    control: {}
  },
};

/**
 * Create a new SCL Private element and add one 104 Address element below this.
 * Set the attribute value of 'ti' to the passed ti value.
 *
 * @param daiElement - The DAI Element to use to set namespace on the root element and create new elements.
 * @param ti         - The value to be set on the attribute 'ti'.
 */
function createSingleAddressAction(daiElement: Element, ti: string): Create[] {
  addPrefixAndNamespaceToDocument(daiElement);

  const privateElement = createPrivateElement(daiElement);
  createPrivateAddress(daiElement, privateElement, ti);
  return [{new: {parent: daiElement, element: privateElement}}];
}

/**
 * Create a new SCL Private element and add two 104 Address elements, one without the attribute 'inverted' meaning
 * 'false' and the other element with the attribute 'inverted' to 'true'.
 * Also set the attribute value of 'ti' to the passed ti value.
 *
 * @param daiElement - The DAI Element to use to set namespace on the root element and create new elements.
 * @param ti         - The value to be set on the attribute 'ti'.
 */
function createInvertedAddressAction(daiElement: Element, ti: string): Create[] {
  addPrefixAndNamespaceToDocument(daiElement);

  const privateElement = createPrivateElement(daiElement);
  createPrivateAddress(daiElement, privateElement, ti);
  const invertedAddressElement = createPrivateAddress(daiElement, privateElement, ti);
  invertedAddressElement.setAttribute('inverted', 'true');
  return [{new: {parent: daiElement, element: privateElement}}];
}
