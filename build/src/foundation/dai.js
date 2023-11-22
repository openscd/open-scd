import {SCL_NAMESPACE} from "../schemas.js";
export function determineUninitializedStructure(parentElement, templateStructure) {
  const templateElement = templateStructure.shift();
  if (templateStructure.length > 0) {
    let instanceElement;
    if (templateElement.tagName === "DO") {
      instanceElement = parentElement.querySelector(`DOI[name="${templateElement.getAttribute("name")}"]`);
    } else {
      instanceElement = parentElement.querySelector(`SDI[name="${templateElement.getAttribute("name")}"]`);
    }
    if (instanceElement) {
      return determineUninitializedStructure(instanceElement, templateStructure);
    } else {
      templateStructure.unshift(templateElement);
      return [parentElement, templateStructure];
    }
  } else {
    return [parentElement, [templateElement]];
  }
}
export function initializeElements(uninitializedTemplateStructure) {
  const element = uninitializedTemplateStructure.shift();
  if (uninitializedTemplateStructure.length > 0) {
    let newElement;
    if (element.tagName === "DO") {
      newElement = element.ownerDocument.createElementNS(SCL_NAMESPACE, "DOI");
    } else {
      newElement = element.ownerDocument.createElementNS(SCL_NAMESPACE, "SDI");
    }
    newElement.setAttribute("name", element?.getAttribute("name") ?? "");
    const childElement = initializeElements(uninitializedTemplateStructure);
    newElement.append(childElement);
    return newElement;
  } else {
    const newValElement = element.ownerDocument.createElementNS(SCL_NAMESPACE, "Val");
    const valElement = element.querySelector("Val");
    if (valElement) {
      newValElement.textContent = valElement.textContent;
    }
    const daiElement = element.ownerDocument.createElementNS(SCL_NAMESPACE, "DAI");
    daiElement.setAttribute("name", element?.getAttribute("name") ?? "");
    daiElement.append(newValElement);
    return daiElement;
  }
}
export function createTemplateStructure(lnElement, path) {
  let templateStructure = [];
  const doc = lnElement.ownerDocument;
  const lnType = lnElement.getAttribute("lnType") ?? "";
  let typeElement = doc.querySelector(`LNodeType[id="${lnType}"]`);
  path.forEach((name) => {
    if (!typeElement) {
      templateStructure = null;
      return;
    }
    const dataElement = typeElement.querySelector(`:scope > DO[name="${name}"], :scope > SDO[name="${name}"], :scope > DA[name="${name}"], :scope > BDA[name="${name}"]`);
    if (dataElement === null) {
      templateStructure = null;
      return;
    }
    templateStructure.push(dataElement);
    if (dataElement.tagName === "DO" || dataElement.tagName === "SDO") {
      const type = dataElement.getAttribute("type") ?? "";
      typeElement = doc.querySelector(`DataTypeTemplates > DOType[id="${type}"]`);
    } else {
      const bType = dataElement.getAttribute("bType") ?? "";
      if (bType === "Struct") {
        const type = dataElement.getAttribute("type") ?? "";
        typeElement = doc.querySelector(`DataTypeTemplates > DAType[id="${type}"]`);
      } else {
        typeElement = null;
      }
    }
  });
  return templateStructure;
}
