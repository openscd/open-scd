var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {css, html, LitElement, query} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../../openscd/src/filtered-list.js";
import {
  find,
  identity,
  isPublic,
  newWizardEvent
} from "../../../openscd/src/foundation.js";
import {cloneElement} from "../../../_snowpack/link/packages/xml/dist/index.js";
function addDescriptionToSEL(ied, signalList) {
  const iedName = ied.getAttribute("name");
  const manufacturer = ied.getAttribute("manufacturer");
  if (!iedName || manufacturer !== "SEL")
    return [];
  return Array.from(ied.getElementsByTagName("DAI")).filter((element) => isPublic(element)).filter((dai) => {
    const datasrc = dai.getAttributeNS("http://www.selinc.com/2006/61850", "datasrc");
    return datasrc?.startsWith("db:");
  }).map((dai) => {
    const datasrc = dai.getAttributeNS("http://www.selinc.com/2006/61850", "datasrc");
    const tag = datasrc ? datasrc.replace("db:", "") : null;
    const desc = signalList.find((row) => row[2] === tag && row[1] === iedName)?.[0] ?? null;
    return desc ? {desc, tag: "DAI", identity: identity(dai)} : null;
  }).filter((signalDescription) => signalDescription);
}
function addDescriptionAction(doc) {
  return (_, wizard, list) => {
    const selectedItems = list.selected;
    const actions = selectedItems.map((item) => {
      const desc = item.querySelector("span").textContent;
      const [tag, identity2] = item.value.split(" | ");
      const oldElement = find(doc, tag, identity2);
      const newElement = cloneElement(oldElement, {desc});
      return {old: {element: oldElement}, new: {element: newElement}};
    });
    return [
      {
        title: get("updatedesc.sel"),
        actions
      }
    ];
  };
}
function createLogWizard(doc, items) {
  return [
    {
      title: get("wizard.title.add", {tagName: "desc"}),
      primary: {
        label: get("save"),
        icon: "save",
        action: addDescriptionAction(doc)
      },
      content: [
        html`<filtered-list multi
          >${Array.from(items.map((item) => html`<mwc-check-list-item
                  twoline
                  selected
                  value="${item.tag + " | " + item.identity}"
                  ><span>${item.desc}</span
                  ><span slot="secondary"
                    >${item.tag + " | " + item.identity}</span
                  ></mwc-check-list-item
                >`))}</filtered-list
        >`
      ]
    }
  ];
}
function parseCsv(str, delimiter) {
  const quoteChar = '"', escapeChar = "\\";
  const entries = [];
  let isInsideQuote = false;
  for (let row = 0, col = 0, char = 0; char < str.length; char++) {
    const currentChar = str[char];
    const nextChar = str[char + 1];
    entries[row] = entries[row] || [];
    entries[row][col] = entries[row][col] || "";
    if (currentChar === escapeChar) {
      entries[row][col] += nextChar;
      ++char;
      continue;
    }
    if (currentChar === quoteChar) {
      isInsideQuote = !isInsideQuote;
      continue;
    }
    if (!isInsideQuote) {
      if (currentChar === delimiter) {
        ++col;
        entries[row][col] = "";
        continue;
      }
      if (currentChar === "\n" || currentChar === "\r") {
        ++row;
        col = 0;
        if (currentChar === "\r" && nextChar === "\n")
          ++char;
        continue;
      }
    }
    entries[row][col] += currentChar;
  }
  return entries;
}
function getGuessDelimiter(csvString) {
  let numberComma = 0, numberSemicolon = 0;
  const quoteChar = '"';
  let isInsideQuote = false;
  for (const currentChar of csvString) {
    if (currentChar === quoteChar) {
      isInsideQuote = !isInsideQuote;
      continue;
    }
    if (!isInsideQuote) {
      if (currentChar === ";") {
        numberSemicolon++;
        continue;
      }
      if (currentChar === ",") {
        numberComma++;
        continue;
      }
    }
  }
  return numberComma > numberSemicolon ? "," : ";";
}
export default class UpdateDescriptionSel extends LitElement {
  processSignalList(csvString) {
    const signalList = parseCsv(csvString, getGuessDelimiter(csvString));
    const items = Array.from(this.doc.querySelectorAll("IED")).filter((ied) => isPublic(ied)).flatMap((ied) => addDescriptionToSEL(ied, signalList));
    this.dispatchEvent(newWizardEvent(createLogWizard(this.doc, items)));
  }
  async onFileInput(e) {
    const file = e.target?.files?.item(0) ?? false;
    if (!file)
      return;
    this.processSignalList(await file.text());
  }
  async run() {
    this.pluginFileUI.click();
  }
  render() {
    return html`<input @click=${(event) => event.target.value = ""} @change=${(e) => this.onFileInput(e)} id="plugin-input" accept=".csv" type="file"></input>`;
  }
}
UpdateDescriptionSel.styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
__decorate([
  query("#plugin-input")
], UpdateDescriptionSel.prototype, "pluginFileUI", 2);
