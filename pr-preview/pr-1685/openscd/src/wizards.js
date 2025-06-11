import {html} from "../../_snowpack/pkg/lit-element.js";
import {repeat} from "../../_snowpack/pkg/lit-html/directives/repeat.js";
import {get} from "../../_snowpack/pkg/lit-translate.js";
import "../../_snowpack/pkg/@material/mwc-icon.js";
import "../../_snowpack/pkg/@material/mwc-list.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import {
  identity,
  isEqual,
  isSame,
  newWizardEvent
} from "./foundation.js";
function describe(element) {
  const id = identity(element);
  return typeof id === "string" ? id.replace(/^>/, "") : get("unidentifiable");
}
function mergeWizardAction(attrDiffs, childDiffs, sink, source, options) {
  return (_, wizard) => {
    const actions = [];
    const checkList = wizard.shadowRoot.querySelector("mwc-list");
    const selectedAttrDiffs = checkList.selected.filter((item) => item.classList.contains("attr")).map((item) => attrDiffs[item.value]);
    const newSink = sink.cloneNode(false);
    const parent = selectedAttrDiffs.length ? newSink : sink;
    if (selectedAttrDiffs.length) {
      if (sink.childElementCount === 0)
        newSink.textContent = sink.textContent;
      for (const [name, diff] of selectedAttrDiffs)
        if (name === "value") {
          newSink.textContent = diff.theirs;
        } else if (diff.theirs === null)
          newSink.removeAttribute(name);
        else
          newSink.setAttribute(name, diff.theirs);
      actions.push({old: {element: sink}, new: {element: newSink}});
    }
    let acted = false;
    const selectedChildDiffs = checkList.selected.filter((item) => item.classList.contains("child")).map((item) => childDiffs[item.value]);
    if (selectedChildDiffs.length) {
      for (const diff of selectedChildDiffs)
        if (!diff.ours)
          actions.push({
            new: {parent, element: diff.theirs}
          });
        else if (!diff.theirs)
          actions.push({
            old: {
              parent,
              element: diff.ours,
              reference: diff.ours.nextSibling
            }
          });
        else {
          acted = true;
          wizard.dispatchEvent(newWizardEvent(mergeWizard(diff.ours, diff.theirs, {
            ...options,
            title: void 0
          })));
        }
    }
    if (actions.length === 0 && !acted)
      wizard.dispatchEvent(newWizardEvent());
    return [
      {
        actions,
        title: get("merge.log", {
          sink: describe(sink),
          source: describe(source),
          tag: sink.tagName
        })
      }
    ];
  };
}
export function mergeWizard(sink, source, options) {
  const attrDiffs = [];
  const ourText = sink.textContent ?? "";
  const theirText = source.textContent ?? "";
  if (sink.childElementCount === 0 && source.childElementCount === 0 && theirText !== ourText)
    attrDiffs.push(["value", {ours: ourText, theirs: theirText}]);
  const attributeNames = new Set(source.getAttributeNames().concat(sink.getAttributeNames()));
  for (const name of attributeNames)
    if (source.getAttribute(name) !== sink.getAttribute(name))
      attrDiffs.push([
        name,
        {
          theirs: source.getAttribute(name),
          ours: sink.getAttribute(name)
        }
      ]);
  const childDiffs = [];
  const ourChildren = Array.from(sink.children);
  const theirChildren = Array.from(source.children);
  theirChildren.forEach((theirs) => {
    const twinIndex = ourChildren.findIndex((ourChild) => isSame(theirs, ourChild));
    const ours = twinIndex > -1 ? ourChildren[twinIndex] : null;
    if (ours)
      ourChildren.splice(twinIndex, 1);
    if (ours && isEqual(theirs, ours))
      return;
    if (!ours || !isEqual(theirs, ours))
      childDiffs.push({theirs, ours});
  });
  ourChildren.forEach((ours) => childDiffs.push({theirs: null, ours}));
  return [
    {
      title: options?.title ?? get("merge.defaultTitle", {
        sink: describe(sink),
        source: describe(source),
        tag: sink.tagName
      }),
      primary: {
        label: get("merge.title"),
        icon: "merge_type",
        action: mergeWizardAction(attrDiffs, childDiffs, sink, source, options),
        auto: options?.auto?.(sink, source) ?? false
      },
      content: [
        html`
          <mwc-list multi>
            ${repeat(attrDiffs, (e) => e, ([name, diff], index) => html`<mwc-check-list-item
                  value=${index}
                  class="attr"
                  twoline
                  left
                  hasMeta
                  .selected=${options?.selected?.(diff) ?? false}
                  .disabled=${options?.disabled?.(diff) ?? false}
                  style="--mdc-checkbox-checked-color: var(--mdc-theme-${diff.ours ? diff.theirs ? "secondary" : "error" : "primary"});"
                >
                  <span>${name}</span>
                  <span slot="secondary"
                    >${diff.ours ?? ""}
                    ${diff.ours && diff.theirs ? html`&cularr;` : " "}
                    ${diff.theirs ?? ""}</span
                  >
                  <mwc-icon slot="meta"
                    >${diff.ours ? diff.theirs ? "edit" : "delete" : "add"}</mwc-icon
                  >
                </mwc-check-list-item>`)}
            ${childDiffs.length ? html`<mwc-list-item noninteractive
                    >${get("merge.children")}</mwc-list-item
                  >
                  <li padded divider role="separator"></li>` : ""}
            ${repeat(childDiffs, (e) => e, (diff, index) => html`<mwc-check-list-item
                  value=${index}
                  class="child"
                  twoline
                  left
                  hasMeta
                  .selected=${options?.selected?.(diff) ?? false}
                  .disabled=${options?.disabled?.(diff) ?? false}
                  style="--mdc-checkbox-checked-color: var(--mdc-theme-${diff.ours ? diff.theirs ? "secondary" : "error" : "primary"});"
                >
                  <span>${diff.ours?.tagName ?? diff.theirs?.tagName}</span>
                  <span slot="secondary"
                    >${diff.ours ? describe(diff.ours) : ""}
                    ${diff.ours && diff.theirs && describe(diff.ours) + describe(diff.theirs) ? html`&cularr;` : " "}
                    ${diff.theirs ? describe(diff.theirs) : ""}</span
                  >
                  <mwc-icon slot="meta"
                    >${diff.ours ? diff.theirs ? "merge_type" : "delete" : "add"}</mwc-icon
                  >
                </mwc-check-list-item>`)}
          </mwc-list>
        `
      ]
    }
  ];
}
