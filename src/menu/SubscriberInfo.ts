import { LitElement } from 'lit-element';
import { get } from 'lit-translate';
import {
  createElement,
  getVersion,
  newActionEvent,
  SimpleAction,
} from '../foundation.js';

function getElementIndexOf(list: (Element | null)[], match: Element): number {
  for (let i = 0; list.length; i++) if (list[i]?.isEqualNode(match)) return i;

  return -1;
}

function addIEDName(extRef: Element, gseControl: Element): Element | null {
  const [ied, accPoint, lDevice, ln, ln0] = [
    'IED',
    'AccessPoint',
    'LDevice',
    'LN',
    'LN0',
  ].map(element => extRef.closest(element));
  const anyln = ln ? ln : ln0;

  if (
    getVersion(extRef) === '2007' &&
    Array.from(gseControl.getElementsByTagName('IEDName'))
      .filter(item => !item.closest('Private'))
      .filter(
        iedName =>
          iedName.innerHTML === ied.getAttribute('name') &&
          (iedName.getAttribute('apRef') ?? '') ===
            (accPoint.getAttribute('name') ?? '') &&
          (iedName.getAttribute('ldInst') ?? '') ===
            (lDevice.getAttribute('inst') ?? '') &&
          (iedName.getAttribute('prefix') ?? '') ===
            (anyln.getAttribute('prefix') ?? '') &&
          (iedName.getAttribute('lnClass') ?? '') ===
            (anyln.getAttribute('lnClass') ?? '') &&
          (iedName.getAttribute('lnInst') ?? '') ===
            (anyln.getAttribute('inst') ?? '')
      ).length === 0
  ) {
    const iedName: Element = createElement(
      gseControl.ownerDocument,
      'IEDName',
      {
        apRef: accPoint.getAttribute('name') ?? '',
        ldInst: lDevice.getAttribute('inst') ?? '',
        prefix: anyln.getAttribute('prefix') ?? '',
        lnClass: anyln.getAttribute('lnClass') ?? '',
        lnInst: anyln.getAttribute('inst') || null,
      }
    );
    iedName.innerHTML = ied.getAttribute('name')!;

    return iedName;
  }

  if (
    Array.from(gseControl.getElementsByTagName('IEDName'))
      .filter(item => !item.closest('Private'))
      .filter(iedName => iedName.innerHTML === ied.getAttribute('name'))
      .length === 0
  ) {
    const iedName: Element = createElement(
      gseControl.ownerDocument,
      'IEDName',
      {}
    );
    iedName.innerHTML = ied.getAttribute('name')!;

    return iedName;
  }

  return null;
}

function getDestination(data: Element, doc: Document): Element[] {
  return Array.from(doc.getElementsByTagName('ExtRef'))
    .filter(item => !item.closest('Private'))
    .filter(
      extRef =>
        (extRef.getAttribute('iedName') ?? '') ===
          (data.closest('IED')?.getAttribute('name') ?? '') &&
        (extRef.getAttribute('ldInst') ?? '') ===
          (data.getAttribute('ldInst') ?? '') &&
        (extRef.getAttribute('prefix') ?? '') ===
          (data.getAttribute('prefix') ?? '') &&
        (extRef.getAttribute('lnClass') ?? '') ===
          (data.getAttribute('lnClass') ?? '') &&
        (extRef.getAttribute('lnInst') ?? '') ===
          (data.getAttribute('lnInst') ?? '') &&
        (extRef.getAttribute('doName') ?? '') ===
          (data.getAttribute('doName') ?? '') &&
        (extRef.getAttribute('daName') ?? '') ===
          (data.getAttribute('daName') ?? '')
    );
}

export function createMissingIEDNameSubscriberInfo(
  doc: Document
): SimpleAction[] {
  const controlList = Array.from(
    doc.querySelectorAll(
      ':root > IED > AccessPoint > Server > LDevice > LN0 > GSEControl,' +
        ':root > IED > AccessPoint > Server > LDevice > LN0 > SampledValueControl'
    )
  );

  const simpleAction: SimpleAction[] = [];
  controlList.forEach(controlBlock => {
    if (!controlBlock.getAttribute('datSet') || !controlBlock.parentElement)
      return simpleAction;

    const ln0: Element = controlBlock.parentElement;
    const dataList: Element[] = Array.from(
      ln0.querySelectorAll(
        `:root >  IED > AccessPoint > Server > LDevice > LN0 > DataSet[name="${controlBlock.getAttribute(
          'datSet'
        )}"] > FCDA`
      )
    );

    const destList: Element[] = dataList
      .flatMap(data => getDestination(data, doc))
      .filter(dest => dest !== null)
      .filter((v, i, a) => a.indexOf(v) === i);

    const iedNameList: (Element | null)[] = destList
      .map(dest => addIEDName(dest, controlBlock))
      .filter(iedName => iedName !== null)
      .filter((v, i, a) => getElementIndexOf(a, v!) === i);

    iedNameList.forEach(iedName => {
      simpleAction.push({
        new: {
          parent: controlBlock,
          element: iedName!,
        },
      });
    });
  });

  return simpleAction;
}

export default class SubscriberInfoPlugin extends LitElement {
  doc!: XMLDocument;

  async run(): Promise<void> {
    const actions: SimpleAction[] = createMissingIEDNameSubscriberInfo(
      this.doc!
    );

    if (!actions.length)
      throw new Error(
        get('subscriber.description') + get('subscriber.nonewitems')
      );

    this.dispatchEvent(
      newActionEvent({
        title:
          get('subscriber.description') +
          get('subscriber.message', {
            updatenumber: actions.length,
          }),
        actions: actions,
      })
    );

    return;
  }
}
