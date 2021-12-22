import { html, TemplateResult } from "lit-element";
import { translate } from "lit-translate";

import {
  cloneElement,
  EditorAction,
  getValue,
  WizardActor,
  WizardInput,
} from '../../../foundation.js';
import { SCL_COORDINATES_NAMESPACE } from "../foundation.js";

export function getNameAttribute(element: Element): string | null {
  return element.getAttribute('name');
}

export function getDescAttribute(element: Element): string | null {
  return element.getAttribute('desc');
}

export function getXCoordinateAttribute(element: Element): string | null {
  return element.getAttributeNS(SCL_COORDINATES_NAMESPACE, 'x');
}

export function getYCoordinateAttribute(element: Element): string | null {
  return element.getAttributeNS(SCL_COORDINATES_NAMESPACE, 'y');
}

function updateXYAttribute(element: Element, attributeName: string, value: string | null): void {
  if (value === null) {
    element.removeAttributeNS(SCL_COORDINATES_NAMESPACE, attributeName)
  } else {
    element.setAttributeNS(SCL_COORDINATES_NAMESPACE, attributeName, value);
  }
}

export function updateNamingAndCoordinatesAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const xCoordinate = getValue(inputs.find(i => i.label === 'xCoordinate')!);
    const yCoordinate = getValue(inputs.find(i => i.label === 'yCoordinate')!);

    if (
      name === getNameAttribute(element) &&
      desc === getDescAttribute(element) &&
      xCoordinate === getXCoordinateAttribute(element) &&
      yCoordinate === getYCoordinateAttribute(element)
    ) {
      return [];
    }

    const newElement = cloneElement(element, { name, desc });
    updateXYAttribute(newElement, 'x', xCoordinate);
    updateXYAttribute(newElement, 'y', yCoordinate);

    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function renderXYCoordinateFields(
  xCoordinate: string | null,
  yCoordinate: string | null,
) : TemplateResult[] {
  return [
    html`<wizard-textfield
      label="xCoordinate"
      nullable
      .maybeValue=${xCoordinate}
      helper="${translate('sld.wizard.xCoordinateHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="yCoordinate"
      .maybeValue=${yCoordinate}
      nullable
      helper="${translate('sld.wizard.yCoordinateHelper')}"
    ></wizard-textfield>`,
  ];
}
