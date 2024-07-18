import { TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';

import '@openscd/open-scd/src/wizard-textfield.js';
import { Wizard } from '@openscd/open-scd/src/foundation.js';
import {
  getDescAttribute,
  getNameAttribute,
  getXCoordinateAttribute,
  getYCoordinateAttribute,
  updateNamingAndCoordinatesAction,
  renderXYCoordinateFields,
} from './foundation.js';
import {
  renderConductingEquipmentWizard,
  reservedNamesConductingEquipment,
  typeName,
} from '../../../wizards/conductingequipment.js';

export function render(
  name: string | null,
  desc: string | null,
  xCoordinate: string | null,
  yCoordinate: string | null,
  option: 'edit' | 'create',
  type: string,
  reservedNames: string[]
): TemplateResult[] {
  return renderConductingEquipmentWizard(
    name,
    desc,
    option,
    type,
    reservedNames
  ).concat(renderXYCoordinateFields(xCoordinate, yCoordinate));
}

export function editConductingEquipmentWizard(element: Element): Wizard {
  const reservedNames = reservedNamesConductingEquipment(
    <Element>element.parentNode!,
    element.getAttribute('name')
  );

  return [
    {
      title: get('conductingequipment.wizard.title.edit'),
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
        'edit',
        typeName(element),
        reservedNames
      ),
    },
  ];
}
