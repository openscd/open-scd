import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import {
  cloneElement,
  createElement,
  getChildElementsByTagName
} from "../../../_snowpack/link/packages/xml/dist/index.js";
import {
  getValue
} from "../../../openscd/src/foundation.js";
function createTransformerWindingAction(parent) {
  return (inputs) => {
    const transformerWindingAttrs = {};
    const transformerWindingKeys = ["name", "desc", "type", "virtual"];
    transformerWindingKeys.forEach((key) => {
      transformerWindingAttrs[key] = getValue(inputs.find((i) => i.label === key));
    });
    const transformerWinding = createElement(parent.ownerDocument, "TransformerWinding", transformerWindingAttrs);
    return [{new: {parent, element: transformerWinding}}];
  };
}
export function createTransformerWindingWizard(parent) {
  const name = "";
  const desc = null;
  const type = null;
  const virtual = null;
  const reservedNames = Array.from(parent.querySelectorAll("TransformerWinding")).map((TransformerWinding) => TransformerWinding.getAttribute("name"));
  return [
    {
      title: get("wizard.title.add", {tagName: "TransformerWinding"}),
      primary: {
        icon: "save",
        label: get("save"),
        action: createTransformerWindingAction(parent)
      },
      content: [
        ...contentTransformerWindingWizard({
          name,
          desc,
          type,
          virtual,
          reservedNames
        })
      ]
    }
  ];
}
function updateTransformerWindingAction(element) {
  return (inputs) => {
    const transformerWindingAttrs = {};
    const transformerWindingKeys = ["name", "desc", "type", "virtual"];
    transformerWindingKeys.forEach((key) => {
      transformerWindingAttrs[key] = getValue(inputs.find((i) => i.label === key));
    });
    if (transformerWindingKeys.some((key) => transformerWindingAttrs[key] !== element.getAttribute(key))) {
      const newElement = cloneElement(element, transformerWindingAttrs);
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
export function contentTransformerWindingWizard(content) {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${content.name}
      helper="${get("scl.name")}"
      required
      validationMessage="${get("textfield.required")}"
      .reservedValues=${content.reservedNames}
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${content.desc}
      nullable
      helper="${get("scl.desc")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="type"
      .maybeValue=${content.type}
      disabled
      helper="${get("scl.type")}"
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="virtual"
      .maybeValue=${content.virtual}
      helper="${get("scl.virtual")}"
      nullable
    ></wizard-checkbox>`
  ];
}
export function editTransformerWindingWizard(element) {
  const name = element.getAttribute("name");
  const desc = element.getAttribute("desc");
  const type = element.getAttribute("type");
  const virtual = element.getAttribute("virtual");
  const reservedNames = getChildElementsByTagName(element.parentElement, "TransformerWinding").filter((sibling) => sibling !== element).map((sibling) => sibling.getAttribute("name"));
  return [
    {
      title: get("wizard.title.edit", {tagName: "TransformerWinding"}),
      primary: {
        icon: "save",
        label: get("save"),
        action: updateTransformerWindingAction(element)
      },
      content: [
        ...contentTransformerWindingWizard({
          name,
          desc,
          type,
          virtual,
          reservedNames
        })
      ]
    }
  ];
}
