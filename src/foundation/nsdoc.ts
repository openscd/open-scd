import { iec6185073, iec6185074, iec6185081 } from "../validators/templates/foundation.js";

export interface Nsdoc {
  nsdoc73?: XMLDocument;
  nsdoc74?: XMLDocument;
  nsdoc81?: XMLDocument;
  getDataDescription: (elements: Element[]) => { label: string; }
}

const [nsd73, nsd74, nsd81] = await Promise.all([iec6185073, iec6185074, iec6185081]);

/**
 * Initialize the full Nsdoc object.
 * @returns A fully initialized Nsdoc object for wizards/editors to use.
 */
export async function initializeNsdoc(): Promise<Nsdoc> {
  const [nsdoc73, nsdoc74, nsdoc81] = [
    localStorage.getItem('IEC 61850-7-3') ? new DOMParser().parseFromString(localStorage.getItem('IEC 61850-7-3')!, 'application/xml') : undefined,
    localStorage.getItem('IEC 61850-7-4') ? new DOMParser().parseFromString(localStorage.getItem('IEC 61850-7-4')!, 'application/xml') : undefined,
    localStorage.getItem('IEC 61850-8-1') ? new DOMParser().parseFromString(localStorage.getItem('IEC 61850-8-1')!, 'application/xml') : undefined
  ]

  const iedElementTagNames = ['LN', 'LN0', 'DO', 'SDO', 'DOI', 'DA', 'BDA', 'DAI'] as const;
  type IEDElementTagNames = typeof iedElementTagNames[number];
  type GetDataDescription = (elements: Element[]) => { label: string; };

  const getDataDescriptions: Record<
  IEDElementTagNames,
    {
      getDataDescription: GetDataDescription;
    }
  > = {
    LN: {
      getDataDescription: getLNDataDescription
    },
    LN0: {
      getDataDescription: getLNDataDescription
    },
    DO: {
      getDataDescription: getDODataDescription
    },
    SDO: {
      getDataDescription: getDODataDescription
    },
    DOI: {
      getDataDescription: getDODataDescription
    },
    DA: {
      getDataDescription: getDADataDescription
    },
    BDA: {
      getDataDescription: getBDADataDescription
    },
    DAI: {
      getDataDescription: getDADataDescription
    }
  };

  /**
   * Getting data descriptions for LN(0) elements out of the IEC 61850-7-4 .nsdoc file.
   * @param elements - The elements to use for searching the LN description.
   * @returns Documentation from the .nsdoc file for this LN(0) file, or the lnClass attribute in case no description can be found.
   */
  function getLNDataDescription(elements: Element[]): { label: string; } {
    const lnClassAttribute = elements[0].getAttribute('lnClass')!;
    const lnClass = nsd74.querySelector(`NS > LNClasses > LNClass[name="${lnClassAttribute}"]`);
    const titleId = lnClass?.getAttribute('titleID');

    return {
      label: getNsdocDocumentation(nsdoc74!, titleId!) ?? lnClassAttribute
    };
  }

  /**
   * Getting data descriptions for DO(I) elements out of the IEC 61850-7-4 .nsdoc file.
   * @param elements - The elements to use for searching the DO description.
   * @returns Documentation from the .nsdoc file for this DO(I) file, or the name attribute in case no description can be found.
   */
  function getDODataDescription(elements: Element[]): { label: string; } {
    const doName = elements[0].getAttribute('name')!;
    const lnClass = nsd74.querySelector(`NS > LNClasses > LNClass[name="${elements[0].parentElement?.getAttribute('lnClass')}"]`);
    const base = lnClass?.getAttribute('base');

    const dObject = lnClass?.querySelector(`DataObject[name="${doName}"]`) ?? getInheritedDataObject(base!, doName);
    const descId = dObject?.getAttribute('descID');

    return {
      label: getNsdocDocumentation(nsdoc74!, descId!) ?? doName
    };
  }

  /**
   * Getting data descriptions for DA(I) elements out of the IEC 61850-7-3 .nsdoc file.
   * @param elements - The elements to use for searching the DA description.
   * @returns Documentation from the .nsdoc file for this DA(I) file, or the name attribute in case no description can be found.
   */
  function getDADataDescription(elements: Element[]): { label: string; } {
    const daElementName = elements[0].getAttribute('name')!;
    const cdcName = elements[0].closest('DOType')!.getAttribute('cdc');

    const dataAttr = nsd73.querySelector(`NS > CDCs > CDC[name="${cdcName}"] > DataAttribute[name="${daElementName}"]`);
    const descId = dataAttr?.getAttribute('descID');

    return {
      label: getNsdocDocumentation(nsdoc73!, descId!) ?? daElementName
    };
  }

  function getBDADataDescription(elements: Element[]): { label: string; } {
    const bdaElementName = elements[0].getAttribute('name')!;
    const bdaParent = elements[1];
    const cdcName = bdaParent.closest('DOType')?.getAttribute('cdc');

    const dataAttr = nsd73.querySelector(`NS > CDCs > CDC[name="${cdcName}"] > DataAttribute[name="${bdaParent.getAttribute('name')}"]`)
    const subDataAttribute = nsd73.querySelector(`ConstructedAttributes >
      ConstructedAttribute[name="${dataAttr?.getAttribute('type')}"] > SubDataAttribute[name="${bdaElementName}"]`)
    const descId = subDataAttribute?.getAttribute('descID');

    return {
      label: getNsdocDocumentation(nsdoc73!, descId!) ?? bdaElementName
    };
  }

  /**
   * Get the potential inherited data object based on a LNClass base.
   * @param lnClassBase - The base of a LNClass element.
   * @param doName - The name of the DO(I) to search for. 
   * @returns the DataObject in case found, otherwise null.
   */
  function getInheritedDataObject(lnClassBase: string, doName: string): Element | null {
    if (!lnClassBase) return null;
    const lnClass = nsd74.querySelector(`NS > LNClasses > AbstractLNClass[name="${lnClassBase}"]`);
    const base = lnClass?.getAttribute('base');

    return lnClass?.querySelector(`DataObject[name="${doName}"]`) ?? getInheritedDataObject(base!, doName);
  }

  return {
    nsdoc73: nsdoc73,
    nsdoc74: nsdoc74,
    nsdoc81: nsdoc81,
    getDataDescription: function getDataDescription(elements: Element[]): { label: string; } {
      return getDataDescriptions[elements[0].tagName as keyof Record<IEDElementTagNames,
        {
          getDataDescription: GetDataDescription;
        }
        >].getDataDescription(elements);
    }
    
  }
}

/**
 * Get the documentation from a given nsdoc file.
 * @param nsdoc - The .nsdoc file to use for searching
 * @param id - The id of the doc to search for.
 * @returns - The documentation belonging to the id.
 */
function getNsdocDocumentation(nsdoc: XMLDocument, id: string): string | null | undefined {
  return nsdoc?.querySelector(`NSDoc > Doc[id="${id ?? ''}"]`)?.textContent;
}