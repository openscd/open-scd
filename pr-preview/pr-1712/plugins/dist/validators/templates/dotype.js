import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import { identity } from '../../../../openscd/src/foundation.js';
import { getAdjacentClass, validateChildren, } from './foundation.js';
import { iec6185073, iec6185074, iec6185081, } from '../../../../openscd/src/foundation/nsd.js';
async function getSpecificDataObject(lnClass, doName) {
    if (!lnClass || !doName)
        return null;
    const lnodeclasses = getAdjacentClass(await iec6185074, lnClass);
    return (lnodeclasses
        .flatMap(lnodeclass => Array.from(lnodeclass.querySelectorAll(`DataObject`)))
        .find(dataObject => dataObject.getAttribute('name') === doName) ?? null);
}
async function getNsdReference(element) {
    const id = element.getAttribute('id');
    if (!id)
        return null;
    const doorsdo = element
        .closest('DataTypeTemplates')
        ?.querySelector(`LNodeType > DO[type="${id}"], LNodeType > SDO[type="${id}"]`);
    const doName = doorsdo?.getAttribute('name');
    const lNodeType = doorsdo?.parentElement;
    const lnClass = lNodeType?.getAttribute('lnClass');
    return await getSpecificDataObject(lnClass, doName);
}
function getControlServicePresConditions(ctlModel) {
    if (!ctlModel || ctlModel === 'status-only')
        return [];
    if (ctlModel.includes('direct'))
        return ['MOctrl'];
    if (ctlModel.includes('normal'))
        return ['MOctrl', 'MOsbo', 'MOsboNormal'];
    if (ctlModel.includes('enhanced'))
        return ['MOctrl', 'MOsbo', 'MOsboEnhanced'];
    return [];
}
async function getMandatoryDataAttribute(dotype, cdc) {
    const nsd73 = await iec6185073;
    const nsd81 = await iec6185081;
    const dataAttributes = Array.from(nsd73.querySelectorAll(`CDC[name="${cdc}"] > DataAttribute[presCond="M"]`));
    const servicePresConds = getControlServicePresConditions(dotype.querySelector('DA[name="ctlModel"] > Val')?.textContent?.trim());
    const serviceDataAttribute = Array.from(nsd81.querySelectorAll(`ServiceCDC[cdc="${cdc}"] > ServiceDataAttribute`)).filter(da => servicePresConds.includes(da.getAttribute('presCond')));
    return dataAttributes.concat(serviceDataAttribute);
}
async function validateAttributes(dotype, cdc) {
    const reference = await getNsdReference(dotype);
    if (reference && cdc !== reference.getAttribute('type'))
        return [
            {
                title: get('validator.templates.incorrectAttribute', {
                    attr: 'cdc',
                    element: 'DOType',
                }),
                message: `${identity(dotype)}`,
            },
        ];
    return [];
}
async function missingMandatoryChildren(dotype, cdc) {
    const errors = [];
    const mandatorydas = (await getMandatoryDataAttribute(dotype, cdc)).map(DA => DA.getAttribute('name'));
    mandatorydas.forEach(mandatoryda => {
        if (!dotype.querySelector(`DA[name="${mandatoryda}"]`))
            errors.push({
                title: get('validator.templates.mandatoryChild', {
                    tag: 'Common Data Class',
                    id: cdc,
                    childTag: 'DA',
                    childId: mandatoryda,
                }),
                message: `${identity(dotype)}`,
            });
    });
    return errors;
}
export async function dOTypeValidator(dotype) {
    const errors = [];
    if (dotype.tagName !== 'DOType')
        return [];
    const cdc = dotype.getAttribute('cdc');
    if (!cdc)
        return [
            {
                title: get('validator.templates.missingAttribute', {
                    attr: 'cdc',
                    element: dotype.tagName,
                }),
                message: `${identity(dotype)}`,
            },
        ];
    const incorrectAttributes = await validateAttributes(dotype, cdc);
    const missingChildren = await missingMandatoryChildren(dotype, cdc);
    const issuesChildren = await validateChildren(dotype);
    return errors.concat(missingChildren, issuesChildren, incorrectAttributes);
}
//# sourceMappingURL=dotype.js.map