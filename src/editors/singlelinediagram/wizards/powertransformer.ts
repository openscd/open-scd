import { TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import { Wizard} from '../../../foundation.js';

import '../../../wizard-textfield.js';
import {
  reservedNamesPowerTransformer,
  renderPowerTransformerWizard
} from "../../../wizards/powertransformer.js";
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
  type: string | null,
  xCoordinate: string | null,
  yCoordinate: string | null,
  reservedNames: string[]
): TemplateResult[] {
  return renderPowerTransformerWizard(name, desc, type, reservedNames)
    .concat(renderXYCoordinateFields(xCoordinate, yCoordinate));
}

export function editPowerTransformerWizard(element: Element): Wizard {
  return [
    {
      title: get('powertransformer.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateNamingAndCoordinatesAction(element),
      },
      content: render(
        getNameAttribute(element),
        getDescAttribute(element),
        element.getAttribute('type'),
        getXCoordinateAttribute(element),
        getYCoordinateAttribute(element),
        reservedNamesPowerTransformer(element)
      ),
    },
  ];
}
