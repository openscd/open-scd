import {iec6185072, iec6185073, iec6185074, iec6185081} from "./nsd.js";
const [nsd72, nsd73, nsd74, nsd81] = await Promise.all([iec6185072, iec6185073, iec6185074, iec6185081]);
export function initializeNsdoc() {
  const [nsdoc72, nsdoc73, nsdoc74, nsdoc81] = [
    localStorage.getItem("IEC 61850-7-2") ? new DOMParser().parseFromString(localStorage.getItem("IEC 61850-7-2"), "application/xml") : void 0,
    localStorage.getItem("IEC 61850-7-3") ? new DOMParser().parseFromString(localStorage.getItem("IEC 61850-7-3"), "application/xml") : void 0,
    localStorage.getItem("IEC 61850-7-4") ? new DOMParser().parseFromString(localStorage.getItem("IEC 61850-7-4"), "application/xml") : void 0,
    localStorage.getItem("IEC 61850-8-1") ? new DOMParser().parseFromString(localStorage.getItem("IEC 61850-8-1"), "application/xml") : void 0
  ];
  const iedElementTagNames = ["LN", "LN0", "DO", "SDO", "DOI", "DA", "BDA", "DAI"];
  const getDataDescriptions = {
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
  function getLNDataDescription(element) {
    const lnClassAttribute = element.getAttribute("lnClass");
    const lnClass = nsd74.querySelector(`NS > LNClasses > LNClass[name="${lnClassAttribute}"]`);
    const lnClassDescription = getNsdocDocumentation(nsdoc74, lnClass?.getAttribute("titleID"));
    return {
      label: lnClassDescription ? lnClassDescription + " (" + lnClassAttribute + ")" : lnClassAttribute
    };
  }
  function getDODataDescription(element) {
    const doName = element.getAttribute("name");
    const lnClass = nsd74.querySelector(`NS > LNClasses > LNClass[name="${element.parentElement?.getAttribute("lnClass")}"]`);
    const base = lnClass?.getAttribute("base");
    const dObject = lnClass?.querySelector(`DataObject[name="${doName}"]`) ?? getInheritedDataObject(base, doName);
    return {
      label: getNsdocDocumentation(nsdoc74, dObject?.getAttribute("descID")) ?? doName
    };
  }
  function getSDODataDescription(element) {
    const sdoName = element.getAttribute("name");
    const subDataObject = nsd73.querySelector(`CDCs > CDC[name="${element.parentElement?.getAttribute("cdc")}"] > SubDataObject[name="${sdoName}"]`);
    return {
      label: getNsdocDocumentation(nsdoc73, subDataObject?.getAttribute("descID")) ?? sdoName
    };
  }
  function getDADataDescription(element) {
    const daElementName = element.getAttribute("name");
    const cdcName = element.closest("DOType").getAttribute("cdc");
    const serviceDataAttr = nsd81.querySelector(`ServiceCDCs > ServiceCDC[cdc="${cdcName}"] > ServiceDataAttribute[name="${daElementName}"]`);
    if (serviceDataAttr) {
      const id = serviceDataAttr?.getAttribute("descID") ?? nsd81.querySelector(`ServiceConstructedAttributes > ServiceConstructedAttribute[name="${daElementName}"]`)?.getAttribute("titleID") ?? "";
      return {
        label: getNsdocDocumentation(nsdoc81, id) ?? daElementName
      };
    } else {
      const dataAttr = nsd73.querySelector(`NS > CDCs > CDC[name="${cdcName}"] > DataAttribute[name="${daElementName}"]`);
      return {
        label: getNsdocDocumentation(nsdoc73, dataAttr?.getAttribute("descID")) ?? daElementName
      };
    }
  }
  function getBDADataDescription(element, ancestors) {
    const bdaElementName = element.getAttribute("name");
    const daParent = ancestors?.filter((x) => x.tagName === "DA")[0];
    const serviceDataAttr = nsd81.querySelector(`ServiceConstructedAttributes > ServiceConstructedAttribute[name="${daParent.getAttribute("name")}"]`);
    if (serviceDataAttr) {
      if (serviceDataAttr.querySelector(`SubDataAttribute[name="${ancestors[0].getAttribute("name")}"]`)?.getAttribute("type") == "Originator") {
        const subDataAttr = nsd72.querySelector(`ConstructedAttributes > ConstructedAttribute[name="Originator"] > SubDataAttribute[name="${bdaElementName}"]`);
        return {
          label: getNsdocDocumentation(nsdoc72, subDataAttr?.getAttribute("descID")) ?? bdaElementName
        };
      }
      return {
        label: getNsdocDocumentation(nsdoc81, serviceDataAttr.querySelector(`SubDataAttribute[name="${bdaElementName}"]`)?.getAttribute("descID")) ?? bdaElementName
      };
    } else {
      const dataAttrParent = nsd73.querySelector(`NS > CDCs > CDC[name="${daParent.closest("DOType")?.getAttribute("cdc")}"] >
        DataAttribute[name="${daParent.getAttribute("name")}"]`);
      return {
        label: getNsdocDocumentation(nsdoc73, getSubDataAttribute(dataAttrParent, bdaElementName)?.getAttribute("descID")) ?? bdaElementName
      };
    }
  }
  function getSubDataAttribute(parent, bdaElementName) {
    if (!parent)
      return null;
    const subDataAttr = nsd73.querySelector(`ConstructedAttributes > ConstructedAttribute[name="${parent?.getAttribute("type")}"] > SubDataAttribute[name="${bdaElementName}"]`);
    return subDataAttr ?? getSubDataAttribute(nsd73.querySelector(`ConstructedAttributes > ConstructedAttribute[name="${parent?.getAttribute("type")}"] > SubDataAttribute`), bdaElementName);
  }
  function getInheritedDataObject(lnClassBase, doName) {
    if (!lnClassBase)
      return null;
    const lnClass = nsd74.querySelector(`NS > LNClasses > AbstractLNClass[name="${lnClassBase}"]`);
    const base = lnClass?.getAttribute("base");
    return lnClass?.querySelector(`DataObject[name="${doName}"]`) ?? getInheritedDataObject(base, doName);
  }
  return {
    nsdoc72,
    nsdoc73,
    nsdoc74,
    nsdoc81,
    getDataDescription: function getDataDescription(element, ancestors) {
      return getDataDescriptions[element.tagName].getDataDescription(element, ancestors);
    }
  };
}
function getNsdocDocumentation(nsdoc, id) {
  return nsdoc?.querySelector(`NSDoc > Doc[id="${id ?? ""}"]`)?.textContent;
}
