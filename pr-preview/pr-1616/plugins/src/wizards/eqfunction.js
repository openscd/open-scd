import {get} from "../../../_snowpack/pkg/lit-translate.js";
import {
  getValue
} from "../../../openscd/src/foundation.js";
import {
  cloneElement,
  createElement,
  getChildElementsByTagName
} from "../../../_snowpack/link/packages/xml/dist/index.js";
import {contentFunctionWizard} from "./function.js";
function updateEqFunctionAction(element) {
  return (inputs) => {
    const functionAttrs = {};
    const functionKeys = ["name", "desc", "type"];
    functionKeys.forEach((key) => {
      functionAttrs[key] = getValue(inputs.find((i) => i.label === key));
    });
    if (functionKeys.some((key) => functionAttrs[key] !== element.getAttribute(key))) {
      const newElement = cloneElement(element, functionAttrs);
      return [
        {
          old: {element},
          new: {element: newElement}
        }
      ];
    }
    return [];
  };
}
export function editEqFunctionWizard(element) {
  const name = element.getAttribute("name");
  const desc = element.getAttribute("desc");
  const type = element.getAttribute("type");
  const reservedNames = getChildElementsByTagName(element.parentElement, "EqFunction").filter((sibling) => sibling !== element).map((sibling) => sibling.getAttribute("name"));
  return [
    {
      title: get("wizard.title.edit", {tagName: "EqFunction"}),
      element,
      primary: {
        icon: "save",
        label: get("save"),
        action: updateEqFunctionAction(element)
      },
      content: [
        ...contentFunctionWizard({
          name,
          desc,
          type,
          reservedNames
        })
      ]
    }
  ];
}
function createEqFunctionAction(parent) {
  return (inputs) => {
    const eqFunctionAttrs = {};
    const eqFunctionKeys = ["name", "desc", "type"];
    eqFunctionKeys.forEach((key) => {
      eqFunctionAttrs[key] = getValue(inputs.find((i) => i.label === key));
    });
    const eqFunction = createElement(parent.ownerDocument, "EqFunction", eqFunctionAttrs);
    return [{new: {parent, element: eqFunction}}];
  };
}
export function createEqFunctionWizard(parent) {
  const name = "";
  const desc = null;
  const type = null;
  const reservedNames = Array.from(parent.querySelectorAll("EqFunction")).map((fUnction) => fUnction.getAttribute("name"));
  return [
    {
      title: get("wizard.title.add", {tagName: "EqFunction"}),
      primary: {
        icon: "save",
        label: get("save"),
        action: createEqFunctionAction(parent)
      },
      content: [
        ...contentFunctionWizard({
          name,
          desc,
          type,
          reservedNames
        })
      ]
    }
  ];
}
