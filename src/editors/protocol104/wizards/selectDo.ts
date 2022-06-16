import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '../../../finder-list.js';

import {
  getDisplayString,
  getReader,
} from '../../../wizards/foundation/finder.js';
import { FinderList, Path } from '../../../finder-list.js';
import {
  compareNames,
  identity,
  newSubWizardEvent,
  selector,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../../foundation.js';
import { createAddressesWizard } from './createAddresses.js';
import { cdcProcessings } from '../foundation/cdc.js';

// function filterAvailableDoiElement(child: Element): boolean {
//   let doiElements: Element[];
//   if (child.tagName === 'DOI') {
//     doiElements = [child];
//   } else {
//     doiElements = Array.from(child.querySelectorAll('DOI'));
//   }
//
//   return (
//     doiElements
//       .filter(
//         subChild =>
//           subChild.querySelectorAll(`DAI > Private[type="${PROTOCOL_104_PRIVATE}"] > Address`)
//             .length <= 0
//       )
//       .filter(doiElement => {
//         const cdc = getCdcValue(doiElement) ?? '';
//         return supportedCdcTypes.includes(<SupportedCdcType>cdc);
//       }).length > 0
//   );
// }

function filterOnSupportedCDC(child: Element): boolean {
  if (child.tagName === 'DO') {
    // For a DO Element we will retrieve the DO Type and check if that CDC Value is supported for the 104.
    const doType = child.getAttribute('type') ?? '';
    const doTypeElement = child.ownerDocument.querySelector(
      `DOType[id="${doType}"]`
    );
    const cdc = doTypeElement?.getAttribute('cdc') ?? '';
    return Object.keys(cdcProcessings).includes(cdc);
  } else if (['LN0', 'LN'].includes(child.tagName)) {
    const lnType = child.getAttribute('lnType') ?? '';
    return (
      Array.from(
        child.ownerDocument.querySelectorAll(`LNodeType[id="${lnType}"] > DO`)
      ).filter(filterOnSupportedCDC).length > 0
    );
  } else {
    return (
      Array.from(child.querySelectorAll(`LN0, LN`)).filter(filterOnSupportedCDC)
        .length > 0
    );
  }
}

export function getDataChildren(parent: Element): Element[] {
  let children;
  if (['LN0', 'LN'].includes(parent.tagName)) {
    const lnType = parent.getAttribute('lnType') ?? '';
    children = Array.from(
      parent.ownerDocument.querySelectorAll(`LNodeType[id="${lnType}"] > DO`)
    ).sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
  } else if (parent.tagName === 'IED') {
    children = Array.from(parent.querySelectorAll('LDevice')).sort((a, b) =>
      compareNames(`${identity(a)}`, `${identity(b)}`)
    );
  } else {
    children = Array.from(parent.children)
      .filter(child => ['IED', 'LN0', 'LN'].includes(child.tagName))
      .sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
  }

  return children.filter(filterOnSupportedCDC);
}

function openPrepareAddressWizard(doc: XMLDocument): WizardActor {
  return (_: WizardInputElement[], wizard: Element) => {
    const finder = wizard.shadowRoot?.querySelector<FinderList>('finder-list');
    const path = finder?.path ?? [];

    if (path.length === 0) return [];

    const doElement = getElement(doc, path, ['DO']);
    const lnElement = getElement(doc, path, ['LN0', 'LN']);

    if (lnElement && doElement) {
      wizard.dispatchEvent(
        newSubWizardEvent(createAddressesWizard(lnElement, doElement))
      );
    }
    return [];
  };
}

function getElement(
  doc: XMLDocument,
  path: Path,
  expectedTag: string[]
): Element | null {
  const [tagName, id] = path.pop()!.split(': ');
  if (!expectedTag.includes(tagName)) return null;

  return doc.querySelector(selector(tagName, id));
}

export function selectDoWizard(doc: Document): Wizard {
  function doPicker(doc: XMLDocument): TemplateResult {
    return html` <finder-list
      path="${JSON.stringify(['SCL: '])}"
      .read=${getReader(doc, getDataChildren)}
      .getDisplayString=${getDisplayString}
      .getTitle=${(path: string[]) => path[path.length - 1]}
    >
    </finder-list>`;
  }

  return [
    {
      title: get('wizard.title.select', { tagName: 'DO(I)' }),
      primary: {
        icon: '',
        label: get('next'),
        action: openPrepareAddressWizard(doc),
      },
      content: [doPicker(doc)],
    },
  ];
}
