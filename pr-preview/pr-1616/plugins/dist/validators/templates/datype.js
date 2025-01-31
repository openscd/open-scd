import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import { identity } from '../../../../openscd/src/foundation.js';
import { validateChildren } from './foundation.js';
import { iec6185073, iec6185081 } from '../../../../openscd/src/foundation/nsd.js';
async function getChildren(cdc, daName) {
    const nsd73 = await iec6185073;
    const dataAttribute = nsd73
        .querySelector(`CDC[name="${cdc}"] > DataAttribute[name="${daName}"]`)
        ?.getAttribute('type');
    return Array.from(nsd73.querySelectorAll(`ConstructedAttributes > ConstructedAttribute[name="${dataAttribute}"] > SubDataAttribute[presCond="M"]`));
}
async function getServiceChildren(daName) {
    const nsd81 = await iec6185081;
    return Array.from(nsd81.querySelectorAll(`ServiceConstructedAttributes > ServiceConstructedAttribute[name="${daName}"] > ` +
        ` SubDataAttribute[presCond="M"]`));
}
async function getMandatoryChildren(datype) {
    const id = datype.getAttribute('id');
    if (!id)
        return [];
    const dataAttribute = datype
        .closest('DataTypeTemplates')
        ?.querySelector(`DOType > DA[type="${id}"]`);
    const daName = dataAttribute?.getAttribute('name');
    if (daName && ['Oper', 'SBOw', 'SBO', 'Cancel'].includes(daName))
        return await getServiceChildren(daName);
    const cdc = dataAttribute?.parentElement?.getAttribute('cdc');
    return getChildren(cdc, daName);
}
async function missingMandatoryChildren(datype) {
    const mandatoryChildren = await getMandatoryChildren(datype);
    const mandatoryChildNames = mandatoryChildren.map(DA => DA.getAttribute('name'));
    const missingDaNames = mandatoryChildNames.filter(da => !datype.querySelector(`BDA[name="${da}"]`));
    return missingDaNames.map(missingDa => {
        return {
            title: get('validator.templates.mandatoryChild', {
                tag: 'DAType',
                id: datype.getAttribute('id'),
                childTag: 'BDA',
                childId: missingDa,
            }),
            message: `${identity(datype)}`,
        };
    });
}
export async function dATypeValidator(datype) {
    const errors = [];
    if (datype.tagName !== 'DAType')
        return [];
    const missingChildren = await missingMandatoryChildren(datype);
    const issuesChildren = await validateChildren(datype);
    return errors.concat(missingChildren, issuesChildren);
}
//# sourceMappingURL=datype.js.map