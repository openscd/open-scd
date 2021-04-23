import { css, html, LitElement, query, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import {
  crossProduct,
  identity,
  newWizardEvent,
  selector,
  tags,
} from '../foundation.js';
import { Diff, mergeWizard } from '../wizards.js';

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

export default class UpdateSubstationPlugin extends LitElement {
  doc!: XMLDocument;

  @query('#update-substation-plugin-input') pluginFileUI!: HTMLInputElement;

  updateSubstation(event: Event): void {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (file)
      file.text().then(text => {
        const doc = new DOMParser().parseFromString(text, 'application/xml');
        // FIXME: Dirty hack should not be necessary!
        document.querySelector('open-scd')!.dispatchEvent(
          newWizardEvent(
            mergeWizard(
              // FIXME: doesn't work with multiple Substations!
              this.doc.documentElement,
              doc.documentElement,
              {
                title: get('updatesubstation.title'),
                selected: (diff: Diff<Element | string>): boolean =>
                  diff.theirs instanceof Element
                    ? diff.theirs.tagName === 'LNode'
                      ? this.doc.querySelector(
                          selector('LNode', identity(diff.theirs))
                        ) === null &&
                        isValidReference(doc, identity(diff.theirs))
                      : diff.theirs.tagName === 'Substation' ||
                        !tags['SCL'].children.includes(diff.theirs.tagName)
                    : diff.theirs !== null,
                disabled: (diff: Diff<Element | string>): boolean =>
                  diff.theirs instanceof Element &&
                  diff.theirs.tagName === 'LNode' &&
                  (this.doc.querySelector(
                    selector('LNode', identity(diff.theirs))
                  ) !== null ||
                    !isValidReference(doc, identity(diff.theirs))),
              }
            )
          )
        );
      });
    this.pluginFileUI.onchange = null;
  }

  async trigger(): Promise<void> {
    this.pluginFileUI.click();
  }

  render(): TemplateResult {
    return html`<input @click=${(event: MouseEvent) =>
      ((<HTMLInputElement>event.target).value = '')} @change=${(e: Event) =>
      this.updateSubstation(
        e
      )} id="update-substation-plugin-input" accept=".sed,.scd,.ssd,.iid,.cid" type="file"></input>`;
  }

  static styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
}
