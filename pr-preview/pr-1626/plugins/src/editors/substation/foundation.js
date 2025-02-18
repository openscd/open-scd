import {css, html} from "../../../../_snowpack/pkg/lit-element.js";
import {classMap} from "../../../../_snowpack/pkg/lit-html/directives/class-map.js";
import "./function-editor.js";
import {identity, isPublic} from "../../../../openscd/src/foundation.js";
import {getChildElementsByTagName} from "../../../../_snowpack/link/packages/xml/dist/index.js";
import {newActionEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {
  circuitBreakerIcon,
  disconnectorIcon,
  currentTransformerIcon,
  voltageTransformerIcon,
  earthSwitchIcon,
  generalConductingEquipmentIcon
} from "../../../../openscd/src/icons/icons.js";
import {typeStr} from "../../wizards/conductingequipment.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
function containsReference(element, iedName) {
  return Array.from(element.getElementsByTagName("LNode")).filter(isPublic).some((lnode) => lnode.getAttribute("iedName") === iedName);
}
function isReferencedItself(element, iedName) {
  return Array.from(element.children).some((child) => child.tagName === "LNode" && child.getAttribute("iedName") === iedName);
}
function hasReferencedChildren(element, iedName) {
  const threshold = element.tagName === "Bay" ? 0 : 1;
  return Array.from(element.children).filter((child) => containsReference(child, iedName)).length > threshold;
}
function hasOurs(element, iedName) {
  return Array.from(element.getElementsByTagName("LNode")).filter(isPublic).some((lnode) => lnode.getAttribute("iedName") === iedName);
}
function getOurs(element, iedName) {
  return Array.from(element.getElementsByTagName("LNode")).filter(isPublic).filter((lnode) => lnode.getAttribute("iedName") === iedName);
}
function hasTheirs(element, iedName) {
  const ours = getOurs(element, iedName);
  const scl = element.closest("SCL");
  return Array.from(scl.getElementsByTagName("LNode")).filter(isPublic).filter((lnode) => lnode.getAttribute("iedName") === iedName).some((lnode) => !ours.includes(lnode));
}
export function attachedIeds(element, remainingIeds) {
  const attachedIeds2 = [];
  for (const ied of remainingIeds) {
    const iedName = ied.getAttribute("name");
    if (element.tagName === "SCL") {
      if (!hasOurs(element, iedName) || hasReferencedChildren(element, iedName))
        attachedIeds2.push(ied);
      continue;
    }
    if (hasTheirs(element, iedName))
      continue;
    if (hasReferencedChildren(element, iedName) || isReferencedItself(element, iedName))
      attachedIeds2.push(ied);
  }
  for (const ied of attachedIeds2) {
    remainingIeds.delete(ied);
  }
  return attachedIeds2;
}
export function getAttachedIeds(doc) {
  return (element) => {
    const ieds = new Set(Array.from(doc.querySelectorAll("IED")).filter(isPublic));
    return attachedIeds(element, ieds);
  };
}
function validRelativeReference(ied, lNode) {
  const [ldInst, prefix, lnClass, lnInst] = [
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst"
  ].map((name) => lNode.getAttribute(name));
  return Array.from(ied.querySelectorAll("LN, LN0")).filter(isPublic).find((anyLn) => anyLn?.closest("LDevice")?.getAttribute("inst") === ldInst && (anyLn.getAttribute("prefix") ?? "") === (prefix ?? "") && (anyLn.getAttribute("lnClass") ?? "") === (lnClass ?? "") && (anyLn.getAttribute("inst") ?? "") === (lnInst ?? ""));
}
function lNodeRegistry(doc) {
  const lNodes = new Set(Array.from(doc.querySelectorAll("LNode")).filter(isPublic).map((lNode) => identity(lNode)));
  return (newLNode) => {
    if (lNodes.has(identity(newLNode)))
      return true;
    lNodes.add(identity(newLNode));
    return false;
  };
}
export function substationElementClone(cloneEntity, newName, iedRedirect) {
  const usedLNodes = lNodeRegistry(cloneEntity.ownerDocument);
  const clone = cloneEntity.cloneNode(true);
  clone.querySelectorAll("LNode").forEach((lNode) => {
    const oldIedName = lNode.getAttribute("iedName");
    if (oldIedName === "None")
      return;
    if (!oldIedName) {
      lNode.parentElement?.removeChild(lNode);
      return;
    }
    if (!iedRedirect || !iedRedirect[oldIedName]) {
      lNode.parentElement?.removeChild(lNode);
      return;
    }
    if (iedRedirect[oldIedName] === "No") {
      lNode.parentElement?.removeChild(lNode);
      return;
    }
    lNode.setAttribute("iedName", iedRedirect[oldIedName]);
    if (usedLNodes(lNode)) {
      lNode.parentElement?.removeChild(lNode);
      return;
    }
    const ied = cloneEntity.ownerDocument.querySelector(`IED[name="${iedRedirect[oldIedName]}"]`);
    if (!ied || !validRelativeReference(ied, lNode)) {
      lNode.parentElement?.removeChild(lNode);
      return;
    }
  });
  clone.querySelectorAll('Terminal:not([cNodeName="grounded"])').forEach((terminal) => terminal.parentElement?.removeChild(terminal));
  clone.querySelectorAll("ConnectivityNode").forEach((condNode) => condNode.parentElement?.removeChild(condNode));
  clone.setAttribute("name", newName);
  return clone;
}
function cloneWithRedirect(evt, cloneEntity) {
  const dialog = evt.target?.parentElement;
  if (!dialog)
    return;
  const children = Array.from(dialog.querySelectorAll("mwc-select, wizard-textfield"));
  if (!children.every((child) => child.checkValidity()))
    return;
  const nameField = dialog.querySelector("wizard-textfield");
  const iedRedirects = Array.from(dialog.querySelectorAll("mwc-select"));
  const iedRedirect = {};
  iedRedirects.forEach((ied) => {
    if (iedRedirect[ied.label])
      return;
    iedRedirect[ied.label] = ied.value;
  });
  if (!cloneEntity.parentElement)
    return;
  const element = substationElementClone(cloneEntity, nameField.value, iedRedirect);
  dialog.dispatchEvent(newActionEvent({
    new: {
      parent: cloneEntity.parentElement,
      element,
      reference: cloneEntity.nextSibling
    }
  }));
}
function someUnreferencedLNode(ied, lNodes) {
  const iedName = ied.getAttribute("name");
  return !lNodes.some((lNode) => {
    const [ldInst, prefix, lnClass, lnInst] = [
      "ldInst",
      "prefix",
      "lnClass",
      "lnInst"
    ].map((name) => lNode.getAttribute(name));
    return !Array.from(ied.ownerDocument.querySelectorAll(`LNode[iedName="${iedName}"][ldInst="${ldInst}"]`)).filter(isPublic).every((otherLNode) => (otherLNode.getAttribute("prefix") ?? "") === (prefix ?? "") && (otherLNode.getAttribute("lnClass") ?? "") === (lnClass ?? "") && (otherLNode.getAttribute("inst") ?? "") === (lnInst ?? ""));
  });
}
function someValidReference(ied, lNodes) {
  return lNodes.some((lNode) => validRelativeReference(ied, lNode));
}
function validUnreferencedIEDs(ied, cloneEntity) {
  const lNodes = Array.from(cloneEntity.querySelectorAll(`LNode[iedName="${ied.getAttribute("name")}"]`));
  return Array.from(ied.ownerDocument.querySelectorAll("IED")).filter((otherIED) => ied !== otherIED && someValidReference(otherIED, lNodes) && someUnreferencedLNode(otherIED, lNodes));
}
function referencedIEDs(substationElement) {
  const usedIEDs = Array.from(substationElement.querySelectorAll('LNode:not([iedName="None"])')).map((lNode) => substationElement.ownerDocument.querySelector(`IED[name="${lNode.getAttribute("iedName")}"]`)).filter((ied) => ied).filter((ied) => isPublic(ied));
  return new Set(usedIEDs);
}
export function uniqueSubstationElementName(parent, tagName, namesake) {
  const siblingNames = getChildElementsByTagName(parent, tagName).map((child) => child.getAttribute("name") ?? child.tagName);
  if (!siblingNames.length)
    return tagName + "01";
  const lastDigit = namesake ? namesake.match(/\d+$/)?.[0] : void 0;
  let newName = "";
  for (let i = 0; i < siblingNames.length; i++) {
    if (!lastDigit)
      newName = (namesake ?? tagName) + (i + 1);
    else {
      const newDigit = (Number.parseInt(lastDigit, 10) + (i + 1)).toString().padStart(lastDigit.length, "0");
      newName = namesake.replace(lastDigit, newDigit);
    }
    if (!siblingNames.includes(newName))
      return newName;
  }
  return newName;
}
export function redirectDialog(cloneEntity) {
  const parent = cloneEntity.parentElement;
  const tagName = cloneEntity.tagName;
  const namesake = cloneEntity.getAttribute("name");
  const newName = parent && namesake ? uniqueSubstationElementName(parent, tagName, namesake) : parent ? uniqueSubstationElementName(parent, tagName) : "";
  const entitySiblings = (parent ? getChildElementsByTagName(parent, tagName) : []).map((sibling) => sibling.getAttribute("name")).filter((name) => name);
  return html` <mwc-dialog
    stacked
    heading="${get("substation.clone.redirect")}"
  >
    <wizard-textfield
      label="${get("substation.clone.newname")}"
      value="${newName}"
      .reservedValues="${entitySiblings}"
    ></wizard-textfield>
    ${Array.from(referencedIEDs(cloneEntity)).map((ied) => {
    const validOtherIEDs = validUnreferencedIEDs(ied, cloneEntity).map((ied2) => ied2.getAttribute("name"));
    const userChoice = ["no"].concat(validOtherIEDs);
    return html`<mwc-select
        required
        fixedMenuPosition
        value="${userChoice[0]}"
        label="${ied.getAttribute("name")}"
        >${userChoice.map((iedName) => html`<mwc-list-item value="${iedName}"
            >${iedName}</mwc-list-item
          >`)}</mwc-select
      >`;
  })}
    <mwc-button
      slot="secondaryAction"
      dialogAction="close"
      label="${get("close")}"
      style="--mdc-theme-primary: var(--mdc-theme-error)"
    ></mwc-button>
    <mwc-button
      slot="primaryAction"
      dialogAction="close"
      label="${get("substation.clone.cloneclose")}"
      icon="content_copy"
      @click=${(evt) => cloneWithRedirect(evt, cloneEntity)}
    ></mwc-button>
    <mwc-button
      slot="primaryAction"
      label="${get("substation.clone.cloneproc")}"
      icon="content_copy"
      @click=${(evt) => cloneWithRedirect(evt, cloneEntity)}
    ></mwc-button>
  </mwc-dialog>`;
}
export function someAvailableRedirection(cloneEntity) {
  return !Array.from(referencedIEDs(cloneEntity)).every((ied) => !validUnreferencedIEDs(ied, cloneEntity).length);
}
export async function cloneSubstationElement(editor) {
  const cloneEntity = editor.element;
  if (someAvailableRedirection(cloneEntity)) {
    editor.cloneUI = true;
    await editor.updateComplete;
    editor.dialog.show();
  } else {
    const parent = editor.element.parentElement;
    const namesake = editor.element.getAttribute("name") ?? void 0;
    if (!parent)
      return;
    const newName = uniqueSubstationElementName(parent, editor.element.tagName, namesake);
    const element = substationElementClone(editor.element, newName);
    editor.dispatchEvent(newActionEvent({new: {parent, element}}));
  }
}
export function startMove(editor, childClass, parentClasses) {
  if (!editor.element)
    return;
  editor.classList.add("moving");
  const moveToTarget = (e) => {
    if (e instanceof KeyboardEvent && e.key !== "Escape" && e.key !== " " && e.key !== "Enter")
      return;
    e.preventDefault();
    e.stopImmediatePropagation();
    editor.classList.remove("moving");
    window.removeEventListener("keydown", moveToTarget, true);
    window.removeEventListener("click", moveToTarget, true);
    if (e instanceof KeyboardEvent && e.key === "Escape")
      return;
    const targetEditor = e.composedPath().find((et) => et instanceof childClass || checkInstanceOfParentClass(et, parentClasses));
    if (targetEditor === void 0 || targetEditor === editor)
      return;
    const destination = targetEditor instanceof childClass ? {
      parent: targetEditor.element.parentElement,
      reference: targetEditor.element
    } : {parent: targetEditor.element, reference: null};
    if (!destination.parent)
      return;
    if (editor.element.parentElement !== destination.parent || editor.element.nextElementSibling !== destination.reference)
      editor.dispatchEvent(newActionEvent({
        old: {
          element: editor.element,
          parent: editor.element.parentElement,
          reference: editor.element.nextSibling
        },
        new: destination
      }));
  };
  window.addEventListener("click", moveToTarget, true);
  window.addEventListener("keydown", moveToTarget, true);
}
function checkInstanceOfParentClass(et, classes) {
  const targetEditor = classes.find((clazz) => et instanceof clazz);
  return targetEditor !== void 0;
}
export function getIcon(condEq) {
  return typeIcons[typeStr(condEq)] ?? generalConductingEquipmentIcon;
}
export function renderGeneralEquipment(doc, element, showfunctions) {
  const generalEquipment = getChildElementsByTagName(element, "GeneralEquipment");
  return generalEquipment.length ? html` <div
        class="${classMap({
    content: true,
    actionicon: !showfunctions
  })}"
      >
        ${generalEquipment.map((gEquipment) => html`<general-equipment-editor
              .doc=${doc}
              .element=${gEquipment}
              ?showfunctions=${showfunctions}
            ></general-equipment-editor>`)}
      </div>` : html``;
}
const typeIcons = {
  CBR: circuitBreakerIcon,
  DIS: disconnectorIcon,
  CTR: currentTransformerIcon,
  VTR: voltageTransformerIcon,
  ERS: earthSwitchIcon
};
const substationPath = [
  ":root",
  "Substation",
  "VoltageLevel",
  "Bay",
  "ConductingEquipment"
];
export const selectors = Object.fromEntries(substationPath.map((e, i, a) => [e, a.slice(0, i + 1).join(" > ")]));
export const styles = css`
  abbr {
    text-decoration: none;
    border-bottom: none;
  }

  .ptrContent.actionicon {
    display: grid;
    grid-gap: 12px;
    padding: 8px 12px 16px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(64px, auto));
  }

  .content.actionicon {
    display: grid;
    grid-gap: 12px;
    padding: 8px 12px 16px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(64px, auto));
  }

  #iedcontainer {
    display: grid;
    grid-gap: 12px;
    padding: 8px 12px 16px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(64px, auto));
  }

  .container.lnode {
    display: grid;
    grid-gap: 12px;
    padding: 8px 12px 16px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(64px, auto));
  }

  mwc-dialog {
    display: flex;
    flex-direction: column;
  }

  mwc-dialog > * {
    display: block;
    margin-top: 16px;
  }

  powertransformer-editor[showfunctions] {
    margin: 4px 8px 16px;
  }

  general-equipment-editor[showfunctions] {
    margin: 4px 8px 16px;
  }

  .substation-editor-icon {
    width: 24px;
    height: 24px;
  }
`;
