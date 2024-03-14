import { css, html, LitElement, query, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import {
  crossProduct,
  find,
  identity,
  newWizardEvent,
  SCLTag,
  tags,
} from '@openscd/open-scd/src/foundation.js';
import { Diff, mergeWizard } from '@openscd/open-scd/src/wizards.js';

export function isValidReference(
  doc: XMLDocument,
  identity: string | number
): boolean {
  if (typeof identity !== 'string') return false;
  const [iedName, ldInst, prefix, lnClass, lnInst] = identity.split(/[ /]/);

  if (!iedName || !lnClass) return false;

  if (ldInst === '(Client)') {
    const [
      iedNameSelectors,
      prefixSelectors,
      lnClassSelectors,
      lnInstSelectors,
    ] = [
      [`IED[name="${iedName}"]`],
      prefix ? [`[prefix="${prefix}"]`] : [':not([prefix])', '[prefix=""]'],
      [`LN[lnClass="${lnClass}"]`],
      lnInst ? [`[inst="${lnInst}"]`] : [':not([inst])', '[inst=""]'],
    ];

    return (
      doc.querySelector(
        crossProduct(
          iedNameSelectors,
          ['>AccessPoint>'],
          lnClassSelectors,
          prefixSelectors,
          lnInstSelectors
        )
          .map(strings => strings.join(''))
          .join(',')
      ) !== null
    );
  }

  const [
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  ] = [
    [`IED[name="${iedName}"]`],
    [`LDevice[inst="${ldInst}"]`],
    prefix ? [`[prefix="${prefix}"]`] : [':not([prefix])', '[prefix=""]'],
    lnClass === 'LLN0' ? [`LN0`] : [`LN[lnClass="${lnClass}"]`],
    lnInst ? [`[inst="${lnInst}"]`] : [':not([inst])', '[inst=""]'],
  ];

  return (
    doc.querySelector(
      crossProduct(
        iedNameSelectors,
        [' '],
        ldInstSelectors,
        ['>'],
        lnClassSelectors,
        prefixSelectors,
        lnInstSelectors
      )
        .map(strings => strings.join(''))
        .join(',')
    ) !== null
  );
}

export function mergeSubstation(
  element: Element,
  currentDoc: Document,
  docWithSubstation: Document
): void {
  element.dispatchEvent(
    newWizardEvent(
      mergeWizard(
        // FIXME: doesn't work with multiple Substations!
        currentDoc.documentElement,
        docWithSubstation.documentElement,
        {
          title: get('updatesubstation.title'),
          selected: (diff: Diff<Element | string>): boolean =>
            diff.theirs instanceof Element
              ? diff.theirs.tagName === 'LNode'
                ? find(currentDoc, 'LNode', identity(diff.theirs)) === null &&
                  isValidReference(docWithSubstation, identity(diff.theirs))
                : diff.theirs.tagName === 'Substation' ||
                  !tags['SCL'].children.includes(<SCLTag>diff.theirs.tagName)
              : diff.theirs !== null,
          disabled: (diff: Diff<Element | string>): boolean =>
            diff.theirs instanceof Element &&
            diff.theirs.tagName === 'LNode' &&
            (find(currentDoc, 'LNode', identity(diff.theirs)) !== null ||
              !isValidReference(docWithSubstation, identity(diff.theirs))),
          auto: (): boolean => true,
        }
      )
    )
  );
}

export default class UpdateSubstationPlugin extends LitElement {
  doc!: XMLDocument;

  @query('#update-substation-plugin-input') pluginFileUI!: HTMLInputElement;

  async updateSubstation(event: Event): Promise<void> {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (!file) {
      return;
    }
    const text = await file.text();
    const doc = new DOMParser().parseFromString(text, 'application/xml');

    mergeSubstation(this, this.doc, doc);
    this.pluginFileUI.onchange = null;
  }

  async run(): Promise<void> {
    this.pluginFileUI.click();
  }

  render(): TemplateResult {
    return html`<input @click=${(event: MouseEvent) =>
      ((<HTMLInputElement>event.target).value = '')}
                       @change=${this.updateSubstation}
                       id="update-substation-plugin-input" accept=".sed,.scd,.ssd,.iid,.cid" type="file"></input>`;
  }

  static styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
}
