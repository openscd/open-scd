import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import "../../../../../openscd/src/wizard-textfield.js";
import {renderBayWizard} from "../../../wizards/bay.js";
import {
  getDescAttribute,
  getNameAttribute,
  getXCoordinateAttribute,
  getYCoordinateAttribute,
  updateNamingAndCoordinatesAction,
  renderXYCoordinateFields
} from "./foundation.js";
function render(name, desc, xCoordinate, yCoordinate) {
  return renderBayWizard(name, desc).concat(renderXYCoordinateFields(xCoordinate, yCoordinate));
}
export function editBayWizard(element) {
  return [
    {
      title: get("bay.wizard.title.edit"),
      element,
      primary: {
        icon: "edit",
        label: get("save"),
        action: updateNamingAndCoordinatesAction(element)
      },
      content: render(getNameAttribute(element), getDescAttribute(element), getXCoordinateAttribute(element), getYCoordinateAttribute(element))
    }
  ];
}
