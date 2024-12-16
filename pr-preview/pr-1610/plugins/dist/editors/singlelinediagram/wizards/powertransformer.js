import { get } from '../../../../../_snowpack/pkg/lit-translate.js';
import '../../../../../openscd/src/wizard-textfield.js';
import { reservedNamesPowerTransformer, renderPowerTransformerWizard, } from '../../../wizards/powertransformer.js';
import { getDescAttribute, getNameAttribute, getXCoordinateAttribute, getYCoordinateAttribute, updateNamingAndCoordinatesAction, renderXYCoordinateFields, } from './foundation.js';
function render(name, desc, type, xCoordinate, yCoordinate, reservedNames) {
    return renderPowerTransformerWizard(name, desc, type, reservedNames).concat(renderXYCoordinateFields(xCoordinate, yCoordinate));
}
export function editPowerTransformerWizard(element) {
    return [
        {
            title: get('powertransformer.wizard.title.edit'),
            element,
            primary: {
                icon: 'edit',
                label: get('save'),
                action: updateNamingAndCoordinatesAction(element),
            },
            content: render(getNameAttribute(element), getDescAttribute(element), element.getAttribute('type'), getXCoordinateAttribute(element), getYCoordinateAttribute(element), reservedNamesPowerTransformer(element)),
        },
    ];
}
//# sourceMappingURL=powertransformer.js.map