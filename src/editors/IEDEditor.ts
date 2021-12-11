import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import '@material/mwc-fab';

import '../zeroline-pane.js';
import './iededitor/ied-container.js'
import { IEDSelector } from './iededitor/foundation.js';

/** An editor [[`plugin`]] for editing the `IED Editor` section. */
export default class IedEditorPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`<section>
    ${Array.from(this.doc?.querySelectorAll(IEDSelector.IED) ?? []).map(
      ied => html`<ied-container
        .element=${ied}
      ></ied-container>`
    )}</section>`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }

    section {
      padding: 8px 12px 16px;
    }
  `;
}
