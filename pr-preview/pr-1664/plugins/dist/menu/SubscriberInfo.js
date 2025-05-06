import { LitElement } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { getVersion } from '../../../openscd/src/foundation.js';
import { createElement } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent, } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
function getElementIndexOf(list, match) {
    for (let i = 0; list.length; i++)
        if (list[i]?.isEqualNode(match))
            return i;
    return -1;
}
function addIEDName(extRef, gseControl) {
    const [ied, accPoint, lDevice, ln, ln0] = [
        'IED',
        'AccessPoint',
        'LDevice',
        'LN',
        'LN0',
    ].map(element => extRef.closest(element));
    const anyln = ln ? ln : ln0;
    if (getVersion(extRef) === '2007' &&
        Array.from(gseControl.getElementsByTagName('IEDName'))
            .filter(item => !item.closest('Private'))
            .filter(iedName => iedName.innerHTML === ied?.getAttribute('name') &&
            (iedName.getAttribute('apRef') ?? '') ===
                (accPoint?.getAttribute('name') ?? '') &&
            (iedName.getAttribute('ldInst') ?? '') ===
                (lDevice?.getAttribute('inst') ?? '') &&
            (iedName.getAttribute('prefix') ?? '') ===
                (anyln?.getAttribute('prefix') ?? '') &&
            (iedName.getAttribute('lnClass') ?? '') ===
                (anyln?.getAttribute('lnClass') ?? '') &&
            (iedName.getAttribute('lnInst') ?? '') ===
                (anyln?.getAttribute('inst') ?? '')).length === 0) {
        const iedName = createElement(gseControl.ownerDocument, 'IEDName', {
            apRef: accPoint?.getAttribute('name') ?? '',
            ldInst: lDevice?.getAttribute('inst') ?? '',
            prefix: anyln?.getAttribute('prefix') ?? '',
            lnClass: anyln?.getAttribute('lnClass') ?? '',
            lnInst: anyln?.getAttribute('inst') || null,
        });
        iedName.innerHTML = ied?.getAttribute('name');
        return iedName;
    }
    if (Array.from(gseControl.getElementsByTagName('IEDName'))
        .filter(item => !item.closest('Private'))
        .filter(iedName => iedName.innerHTML === ied?.getAttribute('name'))
        .length === 0) {
        const iedName = createElement(gseControl.ownerDocument, 'IEDName', {});
        iedName.innerHTML = ied?.getAttribute('name');
        return iedName;
    }
    return null;
}
function getDestination(data, doc) {
    return Array.from(doc.getElementsByTagName('ExtRef'))
        .filter(item => !item.closest('Private'))
        .filter(extRef => (extRef.getAttribute('iedName') ?? '') ===
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
            (data.getAttribute('daName') ?? ''));
}
export function createMissingIEDNameSubscriberInfo(doc) {
    const controlList = Array.from(doc.querySelectorAll(':root > IED > AccessPoint > Server > LDevice > LN0 > GSEControl,' +
        ':root > IED > AccessPoint > Server > LDevice > LN0 > SampledValueControl'));
    const simpleAction = [];
    controlList.forEach(controlBlock => {
        if (!controlBlock.getAttribute('datSet') || !controlBlock.parentElement)
            return simpleAction;
        const ln0 = controlBlock.parentElement;
        const dataList = Array.from(ln0.querySelectorAll(`:root >  IED > AccessPoint > Server > LDevice > LN0 > DataSet[name="${controlBlock.getAttribute('datSet')}"] > FCDA`));
        const destList = dataList
            .flatMap(data => getDestination(data, doc))
            .filter(dest => dest !== null)
            .filter((v, i, a) => a.indexOf(v) === i);
        const iedNameList = destList
            .map(dest => addIEDName(dest, controlBlock))
            .filter(iedName => iedName !== null)
            .filter((v, i, a) => getElementIndexOf(a, v) === i);
        iedNameList.forEach(iedName => {
            simpleAction.push({
                new: {
                    parent: controlBlock,
                    element: iedName,
                },
            });
        });
    });
    return simpleAction;
}
export default class SubscriberInfoPlugin extends LitElement {
    async run() {
        const actions = createMissingIEDNameSubscriberInfo(this.doc);
        if (!actions.length)
            throw new Error(get('subscriber.description') + get('subscriber.nonewitems'));
        this.dispatchEvent(newActionEvent({
            title: get('subscriber.description') +
                get('subscriber.message', {
                    updatenumber: actions.length,
                }),
            actions: actions,
        }));
        return;
    }
}
//# sourceMappingURL=SubscriberInfo.js.map