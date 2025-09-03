import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import "../../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../../_snowpack/pkg/@material/mwc-select.js";
import "../../../../../openscd/src/wizard-textfield.js";
import {
  getDescAttribute,
  getNameAttribute,
  getXCoordinateAttribute,
  getYCoordinateAttribute,
  updateNamingAndCoordinatesAction,
  renderXYCoordinateFields
} from "./foundation.js";
import {
  renderConductingEquipmentWizard,
  reservedNamesConductingEquipment,
  typeName
} from "../../../wizards/conductingequipment.js";
export function render(name, desc, xCoordinate, yCoordinate, option, type, reservedNames) {
  return renderConductingEquipmentWizard(name, desc, option, type, reservedNames).concat(renderXYCoordinateFields(xCoordinate, yCoordinate));
}
export function editConductingEquipmentWizard(element) {
  const reservedNames = reservedNamesConductingEquipment(element.parentNode, element.getAttribute("name"));
  return [
    {
      title: get("conductingequipment.wizard.title.edit"),
      element,
      primary: {
        icon: "edit",
        label: get("save"),
        action: updateNamingAndCoordinatesAction(element)
      },
      content: render(getNameAttribute(element), getDescAttribute(element), getXCoordinateAttribute(element), getYCoordinateAttribute(element), "edit", typeName(element), reservedNames)
    }
  ];
}
