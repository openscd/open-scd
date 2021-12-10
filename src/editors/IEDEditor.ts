import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import '@material/mwc-fab';

import '../zeroline-pane.js';
import './iededitor/ied-container.js'

/** An editor [[`plugin`]] for editing the `IED Editor` section. */
export default class IedEditorPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`
    ${Array.from(this.doc?.querySelectorAll('IED') ?? []).map(
      ied => html`<ied-container
        .element=${ied}
      ></ied-container>`
    )}`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }
  `;
}
