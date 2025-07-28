import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../openscd/src/wizard-checkbox.js";
import "../../../openscd/src/wizard-select.js";
import {cloneElement} from "../../../_snowpack/link/packages/xml/dist/index.js";
import {
  getValue
} from "../../../openscd/src/foundation.js";
export function contentTrgOpsWizard(option) {
  return Object.entries(option).map(([key, value]) => html`<wizard-checkbox
        label="${key}"
        .maybeValue=${value}
        nullable
        helper="${get(`scl.${key}`)}"
      ></wizard-checkbox>`);
}
function updateTrgOpsAction(element) {
  return (inputs) => {
    const dchg = getValue(inputs.find((i) => i.label === "dchg"));
    const qchg = getValue(inputs.find((i) => i.label === "qchg"));
    const dupd = getValue(inputs.find((i) => i.label === "dupd"));
    const period = getValue(inputs.find((i) => i.label === "period"));
    const gi = getValue(inputs.find((i) => i.label === "gi"));
    if (dchg === element.getAttribute("dchg") && qchg === element.getAttribute("qchg") && dupd === element.getAttribute("dupd") && period === element.getAttribute("period") && gi === element.getAttribute("gi"))
      return [];
    const newElement = cloneElement(element, {
      dchg,
      qchg,
      dupd,
      period,
      gi
    });
    const trgOptAction = {old: {element}, new: {element: newElement}};
    return [trgOptAction];
  };
}
export function editTrgOpsWizard(element) {
  const [dchg, qchg, dupd, period, gi] = [
    "dchg",
    "qchg",
    "dupd",
    "period",
    "gi"
  ].map((trgOp) => element.getAttribute(trgOp));
  return [
    {
      title: get("wizard.title.edit", {tagName: element.tagName}),
      primary: {
        icon: "save",
        label: get("save"),
        action: updateTrgOpsAction(element)
      },
      content: contentTrgOpsWizard({dchg, qchg, dupd, period, gi})
    }
  ];
}
