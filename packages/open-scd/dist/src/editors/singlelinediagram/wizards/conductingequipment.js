import { get } from 'lit-translate';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '../../../wizard-textfield.js';
import { getDescAttribute, getNameAttribute, getXCoordinateAttribute, getYCoordinateAttribute, updateNamingAndCoordinatesAction, renderXYCoordinateFields, } from './foundation.js';
import { renderConductingEquipmentWizard, reservedNamesConductingEquipment, typeName, } from '../../../wizards/conductingequipment.js';
export function render(name, desc, xCoordinate, yCoordinate, option, type, reservedNames) {
    return renderConductingEquipmentWizard(name, desc, option, type, reservedNames).concat(renderXYCoordinateFields(xCoordinate, yCoordinate));
}
export function editConductingEquipmentWizard(element) {
    const reservedNames = reservedNamesConductingEquipment(element.parentNode, element.getAttribute('name'));
    return [
        {
            title: get('conductingequipment.wizard.title.edit'),
            element,
            primary: {
                icon: 'edit',
                label: get('save'),
                action: updateNamingAndCoordinatesAction(element),
            },
            content: render(getNameAttribute(element), getDescAttribute(element), getXCoordinateAttribute(element), getYCoordinateAttribute(element), 'edit', typeName(element), reservedNames),
        },
    ];
}
//# sourceMappingURL=conductingequipment.js.map