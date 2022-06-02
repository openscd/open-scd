import { html, TemplateResult } from "lit-element";
import { get} from "lit-translate";

import '../../../finder-list.js';

import { getDisplayString, getReader } from "../../../wizards/foundation/finder.js";
import { FinderList } from "../../../finder-list.js";
import {
  compareNames,
  newSubWizardEvent,
  selector,
  Wizard,
  WizardActor,
  WizardInputElement
} from "../../../foundation.js";

import { getCdcValue, PRIVATE_TYPE_104 } from "../foundation/foundation.js";
import { SupportedCdcType, supportedCdcTypes } from "../foundation/cdc.js";
import { prepareAddressWizard } from "./prepareAddress.js";

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

export function getDataChildren(parent: Element): Element[] {
  let children;
  if (parent.tagName === 'IED') {
    children = Array.from(parent.querySelectorAll('LDevice'));
  } else {
    children = Array.from(parent.children)
      .filter(child => ['IED', 'LDevice', 'LN0', 'LN', 'DOI'].includes(child.tagName))
      .sort((a,b) => compareNames(a,b));
  }

  return children.filter(filterAvailableDoiElement);
}

function openPrepareAddressWizard(doc: XMLDocument): WizardActor {
  return (_: WizardInputElement[], wizard: Element) => {
    const finder = wizard.shadowRoot?.querySelector<FinderList>('finder-list');
    const path = finder?.path ?? [];

    if (path.length === 0) return [];

    const [tagName, id] = path.pop()!.split(': ');
    if (tagName !== 'DOI') return [];

    const doiElement = doc.querySelector(selector(tagName, id));
    if (!doiElement) return [];

    wizard.dispatchEvent(newSubWizardEvent(prepareAddressWizard(doiElement)));
    return [];
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
      title: get('wizard.title.select', { tagName: 'DO(I)' }),
      primary: {
        icon: '',
        label: get('next'),
        action: openPrepareAddressWizard(doc),
      },
      content: [doiPicker(doc)],
    },
  ];
}
