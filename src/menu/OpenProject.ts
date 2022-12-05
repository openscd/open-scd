import { css, html, LitElement, query, TemplateResult } from 'lit-element';

import { newLogEvent, newOpenDocEvent } from '../foundation.js';

export default class OpenProjectPlugin extends LitElement {
  @query('#open-plugin-input') pluginFileUI!: HTMLInputElement;

  async openDoc(event: Event): Promise<void> {
    const file =
      (<HTMLInputElement | null>event.target)?.files?.item(0) ?? false;
    if (!file) return;

    const text = await file.text();
    const docName = file.name;
    const doc = new DOMParser().parseFromString(text, 'application/xml');

    this.dispatchEvent(newLogEvent({ kind: 'reset' }));
    this.dispatchEvent(newOpenDocEvent(doc, docName));
    this.pluginFileUI.onchange = null;
  }

  async run(): Promise<void> {
    this.pluginFileUI.click();
  }

  render(): TemplateResult {
    return html`<input @click=${(event: MouseEvent) =>
      ((<HTMLInputElement>event.target).value = '')} @change=${
      this.openDoc
    } id="open-plugin-input" accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd" type="file"></input>`;
  }

  static styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
}
