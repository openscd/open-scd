import {
  cloneElement,
  ComplexAction,
  createUpdateAction,
  EditorAction,
  getValue,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';
import { get } from "lit-translate";
import { updateReferences } from "./references.js";

export function replaceNamingAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc')
    ) {
      return [];
    }

    const newElement = cloneElement(element, {name, desc} );

    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function replaceNamingAttributeWithReferencesAction(
  element: Element,
  messageTitleKey: string
): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const newName = getValue(inputs.find(i => i.label === 'name')!)!;
    const oldName = element.getAttribute('name');
    const newDesc = getValue(inputs.find(i => i.label === 'desc')!);

    if (
      newName === oldName &&
      newDesc === element.getAttribute('desc')
    ) {
      return [];
    }

    const newElement = cloneElement(element, { name: newName, desc: newDesc });

    const complexAction: ComplexAction = {
      actions: [],
      title: get(messageTitleKey, {name: newName}),
    };
    complexAction.actions.push({ old: { element }, new: { element: newElement } });
    complexAction.actions.push(...updateReferences(element, oldName, newName));
    return complexAction.actions.length ? [complexAction] : [];
  };
}

export function updateNamingAttributeWithReferencesAction(
  element: Element,
  messageTitleKey: string
): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const newAttributes: Record<string, string | null> = {};
    processNamingAttributes(newAttributes, element, inputs);
    if (Object.keys(newAttributes).length == 0) {
      return [];
    }
    addMissingAttributes(element, newAttributes)

    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const complexAction: ComplexAction = {
      actions: [],
      title: get(messageTitleKey, {name}),
    };
    complexAction.actions.push(createUpdateAction(
      element,
      newAttributes));
    complexAction.actions.push(...updateReferences(
      element,
      element.getAttribute('name'),
      name));
    return complexAction.actions.length ? [complexAction] : [];
  };
}

export function processNamingAttributes(
  newAttributes: Record<string, string | null>,
  element: Element,
  inputs: WizardInputElement[]
): void {
  const name = getValue(inputs.find(i => i.label === 'name')!)!;
  const desc = getValue(inputs.find(i => i.label === 'desc')!);

  if (name !== element.getAttribute('name')) {
    newAttributes['name'] = name;
  }
  if (desc !== element.getAttribute('desc')) {
    newAttributes['desc'] = desc;
  }
}

export function addMissingAttributes(
  element: Element,
  newAttributes: Record<string, string | null>
): Record<string, string | null> {
  const newAttributeKeys = Object.keys(newAttributes);
  Array.from(element.attributes)
    .filter(attr => !newAttributeKeys.includes(attr.name))
    .forEach(attr => {
      newAttributes[attr.name] = attr.value;
    });

  return newAttributes;
}
