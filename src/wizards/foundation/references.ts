import {isPublic, SimpleAction} from "../../foundation.js";

const referenceInfoTags = ['IED'] as const;
type ReferencesInfoTag = typeof referenceInfoTags[number];

/*
 * For every supported tag a list of information about which elements to search for and which attribute value
 * to replace with the new value typed in the screen by the user. This is used to update references to a name
 * of an element by other elements.
 * If the attribute is null the text content of the found element will be replaced.
 */
const referenceInfos: Record<
  ReferencesInfoTag,
  {
    elementQuery: string;
    attribute: string | null;
  }[]
> = {
  IED:
    [{
      elementQuery: `Association`,
      attribute: 'iedName'
    }, {
      elementQuery: `ClientLN`,
      attribute: 'iedName'
    }, {
      elementQuery: `ConnectedAP`,
      attribute: 'iedName'
    }, {
      elementQuery: `ExtRef`,
      attribute: 'iedName'
    }, {
      elementQuery: `KDC`,
      attribute: 'iedName'
    }, {
      elementQuery: `LNode`,
      attribute: 'iedName'
    }, {
      elementQuery: `GSEControl > IEDName`,
      attribute: null
    }, {
      elementQuery: `SampledValueControl > IEDName`,
      attribute: null
    }]
}

function cloneElement(element: Element, attributeName: string, value: string | null): Element {
  const newElement = <Element>element.cloneNode(false);
  if (value === null) {
    newElement.removeAttribute(attributeName);
  } else {
    newElement.setAttribute(attributeName, value);
  }
  return newElement;
}

function cloneElementAndTextContent(element: Element, value: string | null): Element {
  const newElement = <Element>element.cloneNode(false);
  newElement.textContent = value;
  return newElement;
}

export function updateReferences(element: Element, oldValue: string | null, newValue: string): SimpleAction[] {
  if (oldValue === newValue) {
    return [];
  }

  const referenceInfo = referenceInfos[<ReferencesInfoTag>element.tagName];
  if (referenceInfo === undefined) {
    return [];
  }

  const actions: SimpleAction[] = [];
  referenceInfo.forEach(info => {
    if (info.attribute !== null) {
      Array.from(element.ownerDocument.querySelectorAll(`${info.elementQuery}[${info.attribute}="${oldValue}"]`))
        .filter(isPublic)
        .forEach(element => {
          const newElement = cloneElement(element, info.attribute!, newValue);
          actions.push({old: {element}, new: {element: newElement}});
        })
    } else {
      Array.from(element.ownerDocument.querySelectorAll(`${info.elementQuery}`))
        .filter(element => element.textContent === oldValue)
        .filter(isPublic)
        .forEach(element => {
          const newElement = cloneElementAndTextContent(element, newValue);
          actions.push({old: {element}, new: {element: newElement}});
        })
    }
  })
  return actions;
}
