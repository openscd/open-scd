import { html, TemplateResult } from "lit-element";
import { get} from "lit-translate";

import '../../../finder-list.js';

import { getDisplayString, getReader } from "../../../wizards/foundation/finder.js";
import { FinderList } from "../../../finder-list.js";
import {
  compareNames,
  ComplexAction,
  newSubWizardEvent, newWizardEvent,
  selector, Wizard,
  WizardActor,
  WizardInputElement
} from "../../../foundation.js";

import { getCdcValue, getFullPath, PRIVATE_TYPE_104 } from "../foundation/foundation.js";
import { cdcProcessings, SupportedCdcType, supportedCdcTypes } from "../foundation/cdc.js";
import { editAddressWizard } from "./address.js";
import { selectTiWizard } from "./selectTi.js";

function filterAvailableDoiElement(child: Element): boolean {
  let doiElements: Element[];
  if (child.tagName === 'DOI') {
    doiElements = [child];
  } else {
    doiElements = Array.from(child.querySelectorAll('DOI'));
  }

  return doiElements
    .filter(subChild => subChild.querySelectorAll(`DAI > Private[type="${PRIVATE_TYPE_104}"]`).length <= 0)
    .filter(doiElement => {
      const cdc = getCdcValue(doiElement) ?? '';
      return supportedCdcTypes.includes(<SupportedCdcType>cdc);
    }).length > 0;
}

function getDataChildren(parent: Element): Element[] {
  let children;
  if (parent.tagName === 'IED') {
    children = Array.from(parent.querySelectorAll('LN0, LN'));
  } else {
    children = Array.from(parent.children)
      .filter(child => ['IED', 'LN0', 'LN', 'DOI'].includes(child.tagName))
      .sort((a,b) => compareNames(a,b));
  }

  return children.filter(filterAvailableDoiElement);
}

function createAddressActionFromDoi(doc: XMLDocument): WizardActor {
  return (_: WizardInputElement[], wizard: Element) => {
    const finder = wizard.shadowRoot?.querySelector<FinderList>('finder-list');
    const path = finder?.path ?? [];

    if (path.length === 0) return [];

    const [tagName, id] = path.pop()!.split(': ');
    if (tagName !== 'DOI') return [];

    const doiElement = doc.querySelector(selector(tagName, id));
    if (!doiElement) return [];

    const cdc = getCdcValue(doiElement) ?? '';
    const cdcProcessing = cdcProcessings[<SupportedCdcType>cdc];
    if (cdcProcessing === undefined) {
      // Close wizard nothing to do anymore.
      wizard.dispatchEvent(newWizardEvent());
      return [];
    }

    const monitorTis = Object.keys(cdcProcessing.monitor);
    if (monitorTis.length == 0) {
      // Close wizard nothing to do anymore.
      wizard.dispatchEvent(newWizardEvent());
      return [];
    }
    if (monitorTis.length > 1) {
      wizard.dispatchEvent(newSubWizardEvent(selectTiWizard(doiElement, monitorTis)));
      return [];
    }

    const monitorTi = monitorTis[0];
    // There is only one TI available to select from, so the new Address element can be created.
    const daiElements = doiElement.querySelectorAll(cdcProcessing.monitor[monitorTi].filter);
    if (daiElements.length <= 0) {
      // Close wizard nothing to do anymore.
      wizard.dispatchEvent(newWizardEvent());
      return [];
    }

    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.values.addedAddress', { name: getFullPath(doiElement, 'IED') }),
    };
    if (cdcProcessing.monitor[monitorTi]) {
      daiElements.forEach(daiElement => {
        const createActions = cdcProcessing.monitor[monitorTi].create(daiElement, monitorTi);
        complexAction.actions.push(...createActions);

        createActions.forEach(createAction => {
          const privateElement = <Element>createAction.new.element;
          Array.from(privateElement.querySelectorAll('Address'))
            .forEach(addressElement => {
              wizard.dispatchEvent(newWizardEvent(editAddressWizard(daiElement, addressElement)));
            });
        });
      });
    }
    return [complexAction];
  };
}

function doiPicker(doc: XMLDocument): TemplateResult {
  return html`
    <finder-list path="${JSON.stringify(['SCL: '])}"
                 .read=${getReader(doc, getDataChildren)}
                 .getDisplayString=${getDisplayString}
                 .getTitle=${(path: string[]) => path[path.length - 1]}>
    </finder-list>`;
}

export function selectDoiWizard(doc: Document): Wizard {
  return [
    {
      title: get('wizard.title.add', { tagName: 'Address' }),
      primary: {
        label: 'add',
        icon: 'add',
        action: createAddressActionFromDoi(doc),
      },
      content: [doiPicker(doc)],
    },
  ];
}
