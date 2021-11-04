import { css, LitElement, query, TemplateResult } from 'lit-element';

import { html, newWizardEvent } from '../foundation.js';
import { mergeWizard } from '../wizards.js';

export default class MergePlugin extends LitElement {
  doc!: XMLDocument;

  @query('#merge-plugin-input') pluginFileUI!: HTMLInputElement;

  mergeDoc(event: Event): void {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (file)
      file.text().then(text => {
        const doc = new DOMParser().parseFromString(text, 'application/xml');
        // FIXME: Dirty hack should not be necessary!
        document
          .querySelector('open-scd')!
          .dispatchEvent(
            newWizardEvent(
              mergeWizard(this.doc.documentElement, doc.documentElement)
            )
          );
      });
    this.pluginFileUI.onchange = null;
  }

  async run(): Promise<void> {
    this.pluginFileUI.click();
  }

  render(): TemplateResult {
    return html`<input @click=${(event: MouseEvent) =>
      ((<HTMLInputElement>event.target).value = '')} @change=${
      this.mergeDoc
    } id="merge-plugin-input" accept=".sed,.scd,.ssd,.iid,.cid,.icd" type="file"></input>`;
  }

  static styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
}
