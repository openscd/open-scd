export const PROTOCOL_104_PRIVATE = 'IEC_60870_5_104';
export const PROTOCOL_104_NS =
  'http://www.iec.ch/61850-80-1/2007/IEC_60870-5-104';
export const PROTOCOL_104_PREFIX = 'IEC_60870_5_104';

/**
 * Will add the namespace of the 104 Protocol to the Root Element of the Document (SCL) as prefix to
 * be used with all 104 elements (Address).
 *
 * @param element - Element to get the Document and Root Element from.
 */
export function addPrefixAndNamespaceToDocument(element: Element): void {
  const rootElement = element.ownerDocument.firstElementChild!;
  if (!rootElement.hasAttribute('xmlns:' + PROTOCOL_104_PREFIX)) {
    rootElement.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:' + PROTOCOL_104_PREFIX,
      PROTOCOL_104_NS
    );
  }
}

/**
 * Create an SCL Private Element with the type set to the 104 Protocol.
 *
 * @param daiElement - The DAI Element used to create the new element from.
 * @returns The created Private Element, <b>not</b> yet added to the DAI Element.
 */
export function createPrivateElement(daiElement: Element): Element {
  const privateElement = daiElement.ownerDocument.createElement('Private');
  privateElement.setAttribute('type', PROTOCOL_104_PRIVATE);
  return privateElement;
}

/**
 * Creates one or two Address Elements, depending on the value of inverted.
 *
 * @param document      - The Owner Document used to create the new Address Element with.
 * @param ti            - The value to be set on the attribute 'ti'.
 * @param inverted      - Indicates if extra Address Elements should be created with 'inverted=true'.
 * @param expectedValue - The optional value of the attribute 'expectedValue' if needed.
 * @returns Array of one or two Address Elements created.
 */
export function createAddressElements(
  document: Document,
  ti: string,
  inverted: boolean,
  expectedValue?: string
): Element[] {
  const addressElements: Element[] = [];
  const addressElement = createPrivateAddress(document, ti);
  if (expectedValue) {
    addressElement.setAttribute('expectedValue', expectedValue);
  }
  addressElements.push(addressElement);
  if (inverted) {
    const addressElement = createPrivateAddress(document, ti);
    addressElement.setAttribute('inverted', 'true');
    if (expectedValue) {
      addressElement.setAttribute('expectedValue', expectedValue);
    }
    addressElements.push(addressElement);
  }
  return addressElements;
}

/**
 * Create a 104 Address element which can be added to the Private element.
 * The attribute 'ti' will also be set to value passed.
 *
 * @param document - The Owner Document used to create the new Address Element with.
 * @param ti       - The value for the attribute 'ti'.
 */
export function createPrivateAddress(document: Document, ti: string): Element {
  const addressElement = document.createElementNS(PROTOCOL_104_NS, 'Address');
  addressElement.setAttribute('ti', ti);
  return addressElement;
}

function createInstanceChain(daiElement: Element) {
  const instanceElementChain: Element[] = [daiElement];
  let child = daiElement;
  if (child.parentElement) {
    do {
      child = child.parentElement;
      instanceElementChain.unshift(child);
    } while (!['LN', 'LN0'].includes(child.tagName) && child.parentElement);
  }
  return instanceElementChain;
}

function createTemplateChain(
  document: Document,
  instanceChain: Element[]
): Element[] {
  const templateChain: Element[] = [];
  let typeElement: Element | null;
  instanceChain.forEach(element => {
    if (['LN', 'LN0'].includes(element.tagName)) {
      const typeId = element.getAttribute('lnType') ?? '';
      typeElement = document.querySelector(`LNodeType[id="${typeId}"]`);
    } else if (element.tagName === 'DOI') {
      const name = element.getAttribute('name');
      const doElement = typeElement?.querySelector(
        `:scope > DO[name="${name}"]`
      );
      if (doElement) {
        templateChain.push(doElement);

        const typeId = doElement.getAttribute('type') ?? '';
        typeElement = document.querySelector(`DOType[id="${typeId}"]`);
      }
    } else if (['SDI', 'DAI'].includes(element.tagName)) {
      const name = element.getAttribute('name');
      const daElement = typeElement?.querySelector(
        `:scope > DA[name="${name}"], :scope > BDA[name="${name}"]`
      );
      if (daElement) {
        templateChain.push(daElement);

        if (daElement.getAttribute('bType') === 'Struct') {
          const typeId = element.getAttribute('type') ?? '';
          typeElement = document.querySelector(`DAType[id="${typeId}"]`);
        }
      }
    }
  });
  return templateChain;
}

export function isEnumDataAttribute(
  document: Document,
  daiElement: Element
): boolean {
  let enumType = false;
  // First step is to create the list of instance elements
  const instanceChain = createInstanceChain(daiElement);
  const templateChain = createTemplateChain(document, instanceChain);

  if (templateChain.length > 0) {
    const daElement = templateChain.pop();
    if (['DA', 'BDA'].includes(daElement!.tagName)) {
      enumType = daElement!.getAttribute('bType') === 'Enum';
    }
  }
  return enumType;
}

export function getEnumVal(
  document: Document,
  daiElement: Element,
  ord: string
): string | null {
  // First step is to create the list of instance elements
  const instanceChain = createInstanceChain(daiElement);
  const templateChain = createTemplateChain(document, instanceChain);

  if (templateChain.length > 0) {
    const daElement = templateChain.pop();
    if (['DA', 'BDA'].includes(daElement!.tagName)) {
      const enumType = daElement!.getAttribute('type');
      const enumVal = daiElement.ownerDocument.querySelector(
        `EnumType[id="${enumType}"] > EnumVal[ord="${ord}"]`
      );
      if (enumVal) {
        return enumVal.textContent;
      }
    }
  }
  return null;
}

export function getEnumOrds(document: Document, daiElement: Element): string[] {
  const ords: string[] = [];
  // First step is to create the list of instance elements
  const instanceChain = createInstanceChain(daiElement);
  const templateChain = createTemplateChain(document, instanceChain);

  if (templateChain.length > 0) {
    const daElement = templateChain.pop();
    if (['DA', 'BDA'].includes(daElement!.tagName)) {
      const enumType = daElement!.getAttribute('type');
      const enumVals = daiElement.ownerDocument.querySelectorAll(
        `EnumType[id="${enumType}"] > EnumVal`
      );
      Array.from(enumVals)
        .filter(valElement => valElement.getAttribute('ord'))
        .map(valElement => ords.push(valElement.getAttribute('ord')!));
    }
  }

  return ords;
}
