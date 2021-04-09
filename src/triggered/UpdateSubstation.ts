import { css, html, LitElement, query, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import { identity, newWizardEvent, selector } from '../foundation.js';
import { Diff, mergeWizard } from '../wizards.js';

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
              this.doc.querySelector('Substation')!,
              doc.querySelector('Substation')!,
              {
                title: get('updatesubstation.title'),
                selected: (diff: Diff<Element | string>): boolean =>
                  diff.theirs instanceof Element
                    ? diff.theirs.tagName === 'LNode'
                      ? this.doc.querySelector(
                          selector('LNode', identity(diff.theirs))
                        ) !== null
                      : true
                    : diff.theirs !== null,
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
      ((<HTMLInputElement>event.target).value = '')} @change=${
      this.updateSubstation
    } id="update-substation-plugin-input" accept=".sed,.scd,.ssd,.iid,.cid" type="file"></input>`;
  }

  static styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
}
