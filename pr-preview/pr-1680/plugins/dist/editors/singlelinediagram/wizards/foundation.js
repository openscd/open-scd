import { html } from '../../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../../_snowpack/pkg/lit-translate.js';
import { getValue, } from '../../../../../openscd/src/foundation.js';
import { cloneElement } from '../../../../../_snowpack/link/packages/xml/dist/index.js';
import { SCL_COORDINATES_NAMESPACE } from '../foundation.js';
export function getNameAttribute(element) {
    return element.getAttribute('name');
}
export function getDescAttribute(element) {
    return element.getAttribute('desc');
}
export function getXCoordinateAttribute(element) {
    return element.getAttributeNS(SCL_COORDINATES_NAMESPACE, 'x');
}
export function getYCoordinateAttribute(element) {
    return element.getAttributeNS(SCL_COORDINATES_NAMESPACE, 'y');
}
export function getFixedCoordinateValue(value) {
    if (value === null) {
        return value;
    }
    let convertedValue = Number(value);
    if (isNaN(convertedValue) || convertedValue < 0) {
        convertedValue = 0;
    }
    return convertedValue.toString();
}
function updateXYAttribute(element, attributeName, value) {
    if (value === null) {
        element.removeAttributeNS(SCL_COORDINATES_NAMESPACE, attributeName);
    }
    else {
        element.setAttributeNS(SCL_COORDINATES_NAMESPACE, attributeName, value);
    }
}
export function updateNamingAndCoordinatesAction(element) {
    return (inputs) => {
        const name = getValue(inputs.find(i => i.label === 'name'));
        const desc = getValue(inputs.find(i => i.label === 'desc'));
        const xCoordinate = getValue(inputs.find(i => i.label === 'xCoordinate'));
        const yCoordinate = getValue(inputs.find(i => i.label === 'yCoordinate'));
        if (name === getNameAttribute(element) &&
            desc === getDescAttribute(element) &&
            xCoordinate === getXCoordinateAttribute(element) &&
            yCoordinate === getYCoordinateAttribute(element)) {
            return [];
        }
        const newElement = cloneElement(element, { name, desc });
        updateXYAttribute(newElement, 'x', getFixedCoordinateValue(xCoordinate));
        updateXYAttribute(newElement, 'y', getFixedCoordinateValue(yCoordinate));
        return [{ old: { element }, new: { element: newElement } }];
    };
}
export function renderXYCoordinateFields(xCoordinate, yCoordinate) {
    return [
        html `<wizard-textfield
      label="xCoordinate"
      nullable
      .maybeValue=${xCoordinate}
      helper="${get('sld.wizard.xCoordinateHelper')}"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="yCoordinate"
      .maybeValue=${yCoordinate}
      nullable
      helper="${get('sld.wizard.yCoordinateHelper')}"
    ></wizard-textfield>`,
    ];
}
//# sourceMappingURL=foundation.js.map