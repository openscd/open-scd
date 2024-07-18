import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@openscd/open-scd/src/finder-list.js';

import {
  getDisplayString,
  getReader,
} from '../../../wizards/foundation/finder.js';
import { FinderList, Path } from '@openscd/open-scd/src/finder-list.js';
import {
  compareNames,
  getNameAttribute,
  identity,
  newSubWizardEvent,
  find,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';
import { createAddressesWizard } from './createAddresses.js';
import { SupportedCdcType, supportedCdcTypes } from '../foundation/cdc.js';
import { PROTOCOL_104_PRIVATE } from '../foundation/private.js';
import {
  getCdcValueFromDOElement,
  getDoElements,
} from '../foundation/foundation.js';

/**
 * Check if the passed DO Element is supported by the 104 protocol and isn't initiated.
 *
 * @param lnElement - The LN Element used to search for Address Element below DOI, if available.
 * @param doElement - The DO Element to check.
 */
function filterAvailableDOElements(
  lnElement: Element,
  doElement: Element
): boolean {
  // First check if this DO Element is supported by the 104 Protocol.
  const cdc = getCdcValueFromDOElement(doElement) ?? '';
  if (!supportedCdcTypes.includes(<SupportedCdcType>cdc)) {
    return false;
  }

  // Use the parent (LN) to find the DOI that's linked to the DO Element
  // And check if there is DOI if it doesn't already contain Address Elements for the 104 Protocol.
  const doName = getNameAttribute(doElement);
  return (
    lnElement.querySelectorAll(
      `:scope > DOI[name="${doName}"] DAI > Private[type="${PROTOCOL_104_PRIVATE}"] > Address`
    ).length <= 0
  );
}

/**
 * Check if there are DO Elements that aren't initiated and are supported by the 104 protocol. If this is the
 * case the Element can be shown in the Finder.
 *
 * @param child  - The child to check if it should still be displayed in the finder list.
 */
function filterAvailableElements(child: Element): boolean {
  // For other elements create a list of LN Elements for processing the DO Element from the LN Elements.
  let lnElements: Element[];
  if (['LN0', 'LN'].includes(child.tagName)) {
    lnElements = [child];
  } else {
    // For the other Elements we will just retrieve all the DOI Elements.
    lnElements = Array.from(child.querySelectorAll('LN0, LN'));
  }

  // If after filtering there are still LN/DO Element(s) to be displayed, this element will be included.
  return (
    lnElements.filter(
      lnElement =>
        // Check if there are available DO Elements that aren't initiated and supported by 104 protocol
        getDoElements(lnElement).filter(doElement =>
          filterAvailableDOElements(lnElement, doElement)
        ).length > 0
    ).length > 0
  );
}

/**
 * Retrieve the Data Children needed for the filter-list to display, the elements shown are
 * 'IED' -&gt; 'AccessPoint' -&gt; 'LDevice' -&gt; 'LN(0)' -&gt; 'DO'.
 *
 * @param parent - The previous element selected, starting with SCL Element.
 */
export function getDataChildren(parent: Element): Element[] {
  let children;
  if (['LN0', 'LN'].includes(parent.tagName)) {
    // For LN Element we will not search for the children, but the DO Element linked to LN from the Template Section.
    const lnType = parent.getAttribute('lnType') ?? '';
    children = Array.from(
      parent.ownerDocument.querySelectorAll(
        `:root > DataTypeTemplates > LNodeType[id="${lnType}"] > DO`
      )
    )
      .filter(child => filterAvailableDOElements(parent, child))
      .sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
  } else if (parent.tagName === 'AccessPoint') {
    // From the Access Point we will skip directly to the LDevice Element and skip the Server element.
    // Or retrieve the LN Elements directly below the AccessPoint.
    children = Array.from(parent.querySelectorAll('LDevice, :scope > LN'))
      .filter(child => filterAvailableElements(child))
      .sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
  } else {
    // The other element, just retrieve the children and if the tagName is one we need return that child.
    children = Array.from(parent.children)
      .filter(child =>
        ['IED', 'AccessPoint', 'LN0', 'LN'].includes(child.tagName)
      )
      .filter(child => filterAvailableElements(child))
      .sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
  }

  return children;
}

/**
 * Action executed when 'next' is pressed. It will start the 'create address'-wizard when a DO Element
 * is selected, otherwise nothing happens.
 *
 * @param doc - The XML Document loaded to search element in.
 */
function openPrepareAddressWizard(doc: XMLDocument): WizardActor {
  return (_: WizardInputElement[], wizard: Element) => {
    const finder = wizard.shadowRoot?.querySelector<FinderList>('finder-list');
    const path = finder?.path ?? [];

    if (path.length === 0) return [];

    const doElement = checkAndGetLastElementFromPath(doc, path, ['DO']);
    const lnElement = checkAndGetLastElementFromPath(doc, path, ['LN0', 'LN']);

    if (lnElement && doElement) {
      wizard.dispatchEvent(
        newSubWizardEvent(createAddressesWizard(lnElement, doElement))
      );
    }
    return [];
  };
}

/**
 * Simple function to retrieve the next element from the path selected.
 * Also check if that element is the expected element.
 *
 * @param doc         - The XML Document to be used for querying.
 * @param path        - The array of selected element to pop the last element name from.
 * @param expectedTag - The tagname expected to be found when popping the lats element.
 */
function checkAndGetLastElementFromPath(
  doc: XMLDocument,
  path: Path,
  expectedTag: string[]
): Element | null {
  const [tagName, id] = path.pop()!.split(': ');
  if (!expectedTag.includes(tagName)) return null;

  return find(doc, tagName, id);
}

/**
 * Start a Finder List to select a DO that can be initiated to be used for the 104 protocol.
 *
 * @param doc - The XML Document loaded.
 * @returns The Wizard to be displayed in a dialog.
 */
export function selectDoWizard(doc: Document): Wizard {
  function renderTemplate(doc: XMLDocument): TemplateResult {
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
      content: [renderTemplate(doc)],
    },
  ];
}
