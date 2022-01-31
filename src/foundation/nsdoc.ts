import { iec6185073, iec6185074 } from "../validators/templates/foundation.js";

export interface Nsdoc {
  nsdoc73?: XMLDocument;
  nsdoc74?: XMLDocument;
  getDataDescription: (element: Element) => { label: string; }
}

/**
 * Initialize the full Nsdoc object.
 * @returns A fully initialized Nsdoc object for wizards/editors to use.
 */
export async function initializeNsdoc(): Promise<Nsdoc> {
  const [nsdoc73, nsdoc74] = [
    localStorage.getItem('IEC 61850-7-3') ? new DOMParser().parseFromString(localStorage.getItem('IEC 61850-7-3')!, 'application/xml') : undefined,
    localStorage.getItem('IEC 61850-7-4') ? new DOMParser().parseFromString(localStorage.getItem('IEC 61850-7-4')!, 'application/xml') : undefined
  ]

  const [nsd73, nsd74] = await Promise.all([iec6185073, iec6185074])

  const iedElementTagNames = ['LN', 'LN0', 'DO', 'DOI', 'DA', 'DAI'] as const;
  type IEDElementTagNames = typeof iedElementTagNames[number];
  type GetDataDescription = (element: Element) => { label: string; };

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
    DOI: {
      getDataDescription: getDODataDescription
    },
    DA: {
      getDataDescription: getDADataDescription
    },
    DAI: {
      getDataDescription: getDADataDescription
    }
  };

  /**
   * Getting data descriptions for LN(0) elements out of the IEC 61850-7-4 .nsdoc file.
   * @param lnElement - The LN(0) element to use.
   * @returns Documentation from the .nsdoc file for this LN(0) file, or the lnClass attribute in case no description can be found.
   */
  function getLNDataDescription(lnElement: Element): { label: string; } {
    const lnClassAttribute = lnElement.getAttribute('lnClass')!;
    const lnClass = nsd74.querySelector(`NS > LNClasses > LNClass[name="${lnClassAttribute}"]`);
    const titleId = lnClass?.getAttribute('titleID');

    return {
      label: getNsdocDocumentation(nsdoc74!, titleId!) ?? lnClassAttribute
    };
  }

  /**
   * Getting data descriptions for DO(I) elements out of the IEC 61850-7-4 .nsdoc file.
   * @param doElement - The DO(I) element to use.
   * @returns Documentation from the .nsdoc file for this DO(I) file, or the name attribute in case no description can be found.
   */
  function getDODataDescription(doElement: Element): { label: string; } {
    const doName = doElement.getAttribute('name')!;
    const lnClass = nsd74.querySelector(`NS > LNClasses > LNClass[name="${doElement.parentElement?.getAttribute('lnClass')}"]`);
    const base = lnClass?.getAttribute('base');

    const dObject = lnClass?.querySelector(`DataObject[name="${doName}"]`) ?? getInheritedDataObject(base!, doName);
    const descId = dObject?.getAttribute('descID');

    return {
      label: getNsdocDocumentation(nsdoc74!, descId!) ?? doName
    };
  }

  /**
   * Getting data descriptions for DA(I) elements out of the IEC 61850-7-3 .nsdoc file.
   * @param daElement - The DA(I) element to use.
   * @returns Documentation from the .nsdoc file for this DA(I) file, or the name attribute in case no description can be found.
   */
  function getDADataDescription(daElement: Element): { label: string; } {
    const daElementName = daElement.getAttribute('name')!;
    const daParentCdc = daElement.parentElement!.getAttribute('cdc');

    const dObject = nsd73.querySelector(`NS > CDCs > CDC[name="${daParentCdc}"] > DataAttribute[name="${daElementName}"]`);
    const descId = dObject?.getAttribute('descID');

    return {
      label: getNsdocDocumentation(nsdoc73!, descId!) ?? daElementName
    };
  }

  /**
   * Get the potential inherited data object based on a LNClass base.
   * @param lnClassBase - The base of a LNClass element.
   * @param doName - The name of the DO(I) to search for. 
   * @returns the DataObject in case found, otherwise null.
   */
  function getInheritedDataObject(lnClassBase: string, doName: string): Element | null {
    const lnClass = nsd74.querySelector(`NS > LNClasses > AbstractLNClass[name="${lnClassBase}"]`);
    const base = lnClass?.getAttribute('base');

    return lnClass?.querySelector(`DataObject[name="${doName}"]`) ?? getInheritedDataObject(base!, doName);
  }

  return {
    nsdoc73: nsdoc73,
    nsdoc74: nsdoc74,
    getDataDescription: function getDataDescription(element: Element): { label: string; } {
      return getDataDescriptions[element.tagName as keyof Record<IEDElementTagNames,
        {
          getDataDescription: GetDataDescription;
        }
        >].getDataDescription(element);
    }
    
  }
}

/**
 * Get the documentation from a given nsdoc file.
 * @param nsdoc - The .nsdoc file to use for searching
 * @param id - The id of the doc to search for.
 * @returns - The documentation belonging to the id.
 */
function getNsdocDocumentation(nsdoc: XMLDocument, id: string) {
  return nsdoc?.querySelector(`NSDoc > Doc[id="${id}"]`)?.textContent;
}