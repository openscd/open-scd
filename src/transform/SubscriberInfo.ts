import { createElement, SimpleAction } from '../foundation.js';

function getElementIndexOf(list: (Element | null)[], match: Element): number {
  for (let i = 0; list.length; i++) if (list[i]?.isEqualNode(match)) return i;

  return -1;
}

function addIEDName(extRef: Element, gseControl: Element): Element | null {
  if (!extRef.parentElement?.parentElement?.getAttribute('lnClass'))
    return null;
  const ln = extRef.parentElement?.parentElement;

  if (!ln.parentElement?.getAttribute('inst')) return null;
  const lDevice = ln.parentElement;

  if (!lDevice.parentElement?.parentElement?.getAttribute('name')) return null;
  const accessPoint = lDevice.parentElement?.parentElement;

  if (!accessPoint.parentElement?.getAttribute('name')) return null;
  const ied = accessPoint.parentElement;

  if (
    Array.from(gseControl.querySelectorAll('IEDName')).filter(
      iedName =>
        iedName.getAttribute('apRef') === accessPoint.getAttribute('name') &&
        iedName.getAttribute('ldInst') === lDevice.getAttribute('inst') &&
        iedName.getAttribute('lnClass') === ln.getAttribute('lnClass') &&
        iedName.innerHTML === ied.getAttribute('name')
    ).length !== 0
  )
    return null;

  const iedName: Element = createElement(gseControl.ownerDocument, 'IEDName', {
    apRef: accessPoint.getAttribute('name'),
    lnInst: lDevice.getAttribute('inst'),
    lnClass: ln.getAttribute('lnClass'),
  });

  iedName.innerHTML = ied.getAttribute('name')!;

  return iedName;
}

function getDestination(data: Element, doc: Document): Element[] {
  if (
    !data.parentElement?.parentElement?.parentElement?.parentElement
      ?.parentElement?.parentElement
  )
    return [];

  const sendIED: Element =
    data.parentElement?.parentElement?.parentElement?.parentElement
      ?.parentElement?.parentElement;

  if (!sendIED.getAttribute('name')) return [];

  const base = `ExtRef[iedName="${sendIED.getAttribute(
    'name'
  )}"][ldInst="${data.getAttribute('ldInst')}"][lnClass="${data.getAttribute(
    'lnClass'
  )}"][lnInst="${data.getAttribute('lnInst')}"][doName="${data.getAttribute(
    'doName'
  )}"]`;

  const prefix = data.getAttribute('prefix')
    ? `[prefix="${data.getAttribute('prefix')}"]`
    : '';

  return Array.from(
    doc.querySelectorAll(
      `:root > IED > AccessPoint > Server > LDevice > LN0 > Inputs > ${base}${prefix}, 
       :root > IED > AccessPoint > Server > LDevice > LN > Inputs > ${base}${prefix}`
    )
  );
}

export function createMissingIEDNameSubscriberInfo(
  doc: Document
): SimpleAction[] {
  // Get all extRef variables
  const gseControlList = Array.from(
    doc.querySelectorAll(
      ':root > IED > AccessPoint > Server > LDevice > LN0 > GSEControl'
    )
  );

  const simpleAction: SimpleAction[] = [];

  gseControlList.forEach(gseControl => {
    if (!gseControl.getAttribute('datSet') || !gseControl.parentElement)
      return simpleAction;

    const ln0: Element = gseControl.parentElement;

    const dataList: Element[] = Array.from(
      ln0.querySelectorAll(
        `:root >  IED > AccessPoint > Server > LDevice > LN0 > DataSet[name="${gseControl.getAttribute(
          'datSet'
        )}"] > FCDA`
      )
    );

    const destList: Element[] = dataList
      .flatMap(data => getDestination(data, doc))
      .filter(dest => dest !== null)
      .filter((v, i, a) => a.indexOf(v) === i);

    const iedNameList: (Element | null)[] = destList
      .map(dest => addIEDName(dest, gseControl))
      .filter(iedName => iedName !== null)
      .filter((v, i, a) => getElementIndexOf(a, v!) === i);

    iedNameList.forEach(iedName => {
      simpleAction.push({
        new: { parent: gseControl, element: iedName!, reference: null },
      });
    });
  });

  return simpleAction;
}
