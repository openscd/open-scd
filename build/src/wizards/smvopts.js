import {html} from "../../_snowpack/pkg/lit-element.js";
import {get, translate} from "../../_snowpack/pkg/lit-translate.js";
import {
  cloneElement,
  getValue
} from "../foundation.js";
export function contentSmvOptsWizard(option) {
  return Object.entries(option).map(([key, value]) => html`<wizard-checkbox
        label="${key}"
        .maybeValue=${value}
        nullable
        helper="${translate(`scl.${key}`)}"
      ></wizard-checkbox>`);
}
function updateSmvOptsAction(element) {
  return (inputs) => {
    const attributes = {};
    const attributeKeys = [
      "refreshTime",
      "sampleRate",
      "dataSet",
      "security",
      "synchSourceId"
    ];
    attributeKeys.forEach((key) => {
      attributes[key] = getValue(inputs.find((i) => i.label === key));
    });
    if (!attributeKeys.some((key) => attributes[key] !== element.getAttribute(key)))
      return [];
    const newElement = cloneElement(element, attributes);
    return [{old: {element}, new: {element: newElement}}];
  };
}
export function editSmvOptsWizard(element) {
  const [refreshTime, sampleRate, dataSet, security, synchSourceId] = [
    "refreshTime",
    "sampleRate",
    "dataSet",
    "security",
    "synchSourceId"
  ].map((smvopt) => element.getAttribute(smvopt));
  return [
    {
      title: get("wizard.title.edit", {tagName: element.tagName}),
      element,
      primary: {
        icon: "save",
        label: get("save"),
        action: updateSmvOptsAction(element)
      },
      content: [
        ...contentSmvOptsWizard({
          refreshTime,
          sampleRate,
          dataSet,
          security,
          synchSourceId
        })
      ]
    }
  ];
}
