import {isPublic, SimpleAction} from "../../foundation.js";

const referenceInfoTags = ['IED', 'Substation', 'VoltageLevel', 'Bay'] as const;
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
    queryOnDocument: boolean;
    elementQuery: string;
    attribute: string | null;
  }[]
> = {
  IED:
    [{
      queryOnDocument: true,
      elementQuery: `Association`,
      attribute: 'iedName'
    }, {
      queryOnDocument: true,
      elementQuery: `ClientLN`,
      attribute: 'iedName'
    }, {
      queryOnDocument: true,
      elementQuery: `ConnectedAP`,
      attribute: 'iedName'
    }, {
      queryOnDocument: true,
      elementQuery: `ExtRef`,
      attribute: 'iedName'
    }, {
      queryOnDocument: true,
      elementQuery: `KDC`,
      attribute: 'iedName'
    }, {
      queryOnDocument: true,
      elementQuery: `LNode`,
      attribute: 'iedName'
    }, {
      queryOnDocument: true,
      elementQuery: `GSEControl > IEDName`,
      attribute: null
    }, {
      queryOnDocument: true,
      elementQuery: `SampledValueControl > IEDName`,
      attribute: null
    }],
  Substation:
    [{
      queryOnDocument: true,
      elementQuery: `Terminal`,
      attribute: 'substationName'
    }],
  VoltageLevel:
    [{
      queryOnDocument: false,
      elementQuery: `Terminal`,
      attribute: 'voltageLevelName'
    }],
  Bay:
    [{
      queryOnDocument: false,
      elementQuery: `Terminal`,
      attribute: 'bayName'
    }],
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
    let queryRoot: Document | Element | null = element.ownerDocument;
    if (!info.queryOnDocument) {
      queryRoot = element.parentElement;
    }

    if (queryRoot) {
      if (info.attribute !== null) {
        Array.from(queryRoot.querySelectorAll(`${info.elementQuery}[${info.attribute}="${oldValue}"]`))
          .filter(isPublic)
          .forEach(element => {
            const newElement = cloneElement(element, info.attribute!, newValue);
            actions.push({old: {element}, new: {element: newElement}});
          })
      } else {
        Array.from(queryRoot.querySelectorAll(`${info.elementQuery}`))
          .filter(element => element.textContent === oldValue)
          .filter(isPublic)
          .forEach(element => {
            const newElement = cloneElementAndTextContent(element, newValue);
            actions.push({old: {element}, new: {element: newElement}});
          })
      }
    }
  })
  return actions;
}
