import { iec6185072, iec6185073, iec6185074, iec6185081 } from "../validators/templates/foundation.js";

export interface Nsdoc {
  nsdoc72?: XMLDocument;
  nsdoc73?: XMLDocument;
  nsdoc74?: XMLDocument;
  nsdoc81?: XMLDocument;
  getDataDescription: (element: Element, ancestors?: Element[]) => { label: string; }
}

const [nsd72, nsd73, nsd74, nsd81] = await Promise.all([iec6185072, iec6185073, iec6185074, iec6185081]);

/**
 * Initialize the full Nsdoc object.
 * @returns A fully initialized Nsdoc object for wizards/editors to use.
 */
export function initializeNsdoc(): Nsdoc {
  const [nsdoc72, nsdoc73, nsdoc74, nsdoc81] = [
    localStorage.getItem('IEC 61850-7-2') ? new DOMParser().parseFromString(localStorage.getItem('IEC 61850-7-2')!, 'application/xml') : undefined,
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
    const lnClassDescription = getNsdocDocumentation(nsdoc74!, lnClass?.getAttribute('titleID'));

    return {
      label: lnClassDescription ? lnClassDescription + ' (' + lnClassAttribute + ')' : lnClassAttribute
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
    const subDataObject = nsd73.querySelector(`CDCs > CDC[name="${element.parentElement?.getAttribute('cdc')}"] > SubDataObject[name="${sdoName}"]`);

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
    const daParent = ancestors?.filter(x => x.tagName === 'DA')[0];
    const serviceDataAttr = nsd81.querySelector(`ServiceConstructedAttributes > ServiceConstructedAttribute[name="${daParent!.getAttribute('name')}"]`);

    if (serviceDataAttr) {
      if (serviceDataAttr.querySelector(`SubDataAttribute[name="${ancestors![0].getAttribute('name')}"]`)?.getAttribute('type') == 'Originator') {
        const subDataAttr = nsd72.querySelector(`ConstructedAttributes > ConstructedAttribute[name="Originator"] > SubDataAttribute[name="${bdaElementName}"]`);
        return {
          label: getNsdocDocumentation(nsdoc72!, subDataAttr?.getAttribute('descID')) ?? bdaElementName
        };
      }
      return {
        label: getNsdocDocumentation(nsdoc81!,
          serviceDataAttr.querySelector(`SubDataAttribute[name="${bdaElementName}"]`)?.getAttribute('descID')) ?? bdaElementName
      };
    } else {
      const dataAttrParent = nsd73.querySelector(`NS > CDCs > CDC[name="${daParent!.closest('DOType')?.getAttribute('cdc')}"] >
        DataAttribute[name="${daParent!.getAttribute('name')}"]`);
      return {
        label: getNsdocDocumentation(nsdoc73!, getSubDataAttribute(dataAttrParent!, bdaElementName)?.getAttribute('descID')) ?? bdaElementName
      };
    }
  }

  /**
   * Get the SubDataAttribute from the IEC-61850-7-3.
   * @param parent - The parent element in which to search for a SubDataAttribute.
   * @param bdaElementName - The name of the element to search.
   * @returns A SubDataAttribute, or null.
   */
  function getSubDataAttribute(parent: Element | undefined, bdaElementName: string): Element | null {
    if (!parent) return null;
    const subDataAttr = nsd73.querySelector(`ConstructedAttributes > ConstructedAttribute[name="${parent?.getAttribute('type')}"] > SubDataAttribute[name="${bdaElementName}"]`);
    return subDataAttr ?? getSubDataAttribute(nsd73.querySelector(`ConstructedAttributes > ConstructedAttribute[name="${parent?.getAttribute('type')}"] > SubDataAttribute`)!, bdaElementName);
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
    nsdoc72: nsdoc72,
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
