import { iec6185073, iec6185074, iec6185081 } from "../validators/templates/foundation.js";

export interface Nsdoc {
  nsdoc73?: XMLDocument;
  nsdoc74?: XMLDocument;
  nsdoc81?: XMLDocument;
  getDataDescription: (element: Element, ancestors?: Element[]) => { label: string; }
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
  type GetDataDescription = (element: Element, ancestors?: Element[]) => { label: string; };

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
      getDataDescription: getSDODataDescription
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
   * @param element - The element to use for searching the LN description.
   * @returns Documentation from the .nsdoc file for this LN(0) file, or the lnClass attribute in case no description can be found.
   */
  function getLNDataDescription(element: Element): { label: string; } {
    const lnClassAttribute = element.getAttribute('lnClass')!;
    const lnClass = nsd74.querySelector(`NS > LNClasses > LNClass[name="${lnClassAttribute}"]`);

    return {
      label: getNsdocDocumentation(nsdoc74!, lnClass?.getAttribute('titleID')) ?? lnClassAttribute
    };
  }

  /**
   * Getting data descriptions for DO(I) elements out of the IEC 61850-7-4 .nsdoc file.
   * @param element - The element to use for searching the DO description.
   * @returns Documentation from the .nsdoc file for this DO(I) file, or the name attribute in case no description can be found.
   */
  function getDODataDescription(element: Element): { label: string; } {
    const doName = element.getAttribute('name')!;
    const lnClass = nsd74.querySelector(`NS > LNClasses > LNClass[name="${element.parentElement?.getAttribute('lnClass')}"]`);
    const base = lnClass?.getAttribute('base');
    const dObject = lnClass?.querySelector(`DataObject[name="${doName}"]`) ?? getInheritedDataObject(base!, doName);

    return {
      label: getNsdocDocumentation(nsdoc74!, dObject?.getAttribute('descID')) ?? doName
    };
  }

  /**
   * Getting data descriptions for SDO elements out of the IEC 61850-7-3 .nsdoc file.
   * @param element - The element to use for searching the SDO description.
   * @returns Documentation from the .nsdoc file for this SDO element, or the name attribute in case no description can be found.
   */
  function getSDODataDescription(element: Element): { label: string; } {
    const sdoName = element.getAttribute('name')!;
    const cdc =  element.parentElement?.getAttribute('cdc');
    const subDataObject = nsd73.querySelector(`CDCs > CDC[name="${cdc}"] > SubDataObject[name="${sdoName}"]`);
    
    return {
      label: getNsdocDocumentation(nsdoc73!, subDataObject?.getAttribute('descID')) ?? sdoName
    };
  }

  /**
   * Getting data descriptions for DA(I) elements out of the IEC 61850-7-3 and IEC 61850-8-1 .nsdoc file.
   * @param element - The element to use for searching the DA description.
   * @returns Documentation from the .nsdoc file for this DA(I) element, or the name attribute in case no description can be found.
   */
  function getDADataDescription(element: Element): { label: string; } {
    const daElementName = element.getAttribute('name')!;
    const cdcName = element.closest('DOType')!.getAttribute('cdc');
    const serviceDataAttr = nsd81.querySelector(`ServiceCDCs > ServiceCDC[cdc="${cdcName}"] > ServiceDataAttribute[name="${daElementName}"]`);

    if (serviceDataAttr) {
      const id = serviceDataAttr?.getAttribute('descID') ??
        nsd81.querySelector(`ServiceConstructedAttributes > ServiceConstructedAttribute[name="${daElementName}"]`)?.getAttribute('titleID') ?? '';
      return {
        label: getNsdocDocumentation(nsdoc81!, id) ?? daElementName
      };
    } else {
      const dataAttr = nsd73.querySelector(`NS > CDCs > CDC[name="${cdcName}"] > DataAttribute[name="${daElementName}"]`);
      return {
        label: getNsdocDocumentation(nsdoc73!, dataAttr?.getAttribute('descID')) ?? daElementName
      };
    }
  }

  /**
   * Getting data descriptions for BDA elements out of the IEC 61850-7-3 and IEC 61850-8-1 .nsdoc file.
   * @param element - The element to use for searching the BDA description.
   * @param ancestors - In this function, we need an ancestor to get a 'CDC' attribute.
   * @returns Documentation from the .nsdoc file for this BDA element, or the name attribute in case no description can be found.
   */
  function getBDADataDescription(element: Element, ancestors?: Element[]): { label: string; } {
    const bdaElementName = element.getAttribute('name')!;
    const bdaParent = ancestors![0];
    const serviceDataAttr = nsd81.querySelector(`ServiceConstructedAttributes > ServiceConstructedAttribute[name="${bdaParent.getAttribute('name')}"]`);

    if (serviceDataAttr) {
      const subDataAttr = serviceDataAttr.querySelector(`SubDataAttribute[name="${bdaElementName}"]`);
      
      return {
        label: getNsdocDocumentation(nsdoc81!, subDataAttr?.getAttribute('descID')) ?? bdaElementName
      };
    } else {
      const cdcName = bdaParent.closest('DOType')?.getAttribute('cdc');
      const dataAttr = nsd73.querySelector(`NS > CDCs > CDC[name="${cdcName}"] > DataAttribute[name="${bdaParent.getAttribute('name')}"]`)
      const subDataAttribute = nsd73.querySelector(`ConstructedAttributes > ConstructedAttribute[name="${dataAttr?.getAttribute('type')}"] > SubDataAttribute[name="${bdaElementName}"]`);

      return {
        label: getNsdocDocumentation(nsdoc73!, subDataAttribute?.getAttribute('descID')) ?? bdaElementName
      };
    }
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
    getDataDescription: function getDataDescription(element: Element, ancestors?: Element[]): { label: string; } {
      return getDataDescriptions[element.tagName as keyof Record<IEDElementTagNames,
        {
          getDataDescription: GetDataDescription;
        }
        >].getDataDescription(element, ancestors);
    }
    
  }
}

/**
 * Get the documentation from a given nsdoc file.
 * @param nsdoc - The .nsdoc file to use for searching
 * @param id - The id of the doc to search for.
 * @returns - The documentation belonging to the id.
 */
function getNsdocDocumentation(nsdoc: XMLDocument, id: string | null | undefined): string | null | undefined {
  return nsdoc?.querySelector(`NSDoc > Doc[id="${id ?? ''}"]`)?.textContent;
}