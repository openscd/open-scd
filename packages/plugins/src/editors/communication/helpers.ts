export function getCurrentConnectedAP(element: Element): Element | null {
    return element.closest('ConnectedAP');
  }
  
  export function getAllConnectedAPsOfSameIED(
    element: Element,
    doc: XMLDocument
  ): Element[] {
    if (!element || !doc) {
      return [];
    }
  
    const currentConnectedAP = getCurrentConnectedAP(element);
    if (!currentConnectedAP) {
      return [];
    }
  
    const iedName = currentConnectedAP.getAttribute('iedName');
  
    return Array.from(
      doc.querySelectorAll('SubNetwork > ConnectedAP')
    ).filter(connectedAP => connectedAP.getAttribute('iedName') === iedName);
  }