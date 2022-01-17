import { TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import { Wizard} from '../../../foundation.js';

import '../../../wizard-textfield.js';
import { renderBayWizard } from "../../../wizards/bay.js";
import {
  getDescAttribute,
  getNameAttribute,
  getXCoordinateAttribute,
  getYCoordinateAttribute,
  updateNamingAndCoordinatesAction,
  renderXYCoordinateFields
} from "./foundation.js";

function render(
  name: string | null,
  desc: string | null,
  xCoordinate: string | null,
  yCoordinate: string | null,
): TemplateResult[] {
  return renderBayWizard(name, desc)
    .concat(renderXYCoordinateFields(xCoordinate, yCoordinate));
}

export function editBayWizard(element: Element): Wizard {
  return [
    {
      title: get('bay.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateNamingAndCoordinatesAction(element),
      },
      content: render(
        getNameAttribute(element),
        getDescAttribute(element),
        getXCoordinateAttribute(element),
        getYCoordinateAttribute(element),
      ),
    },
  ];
}
