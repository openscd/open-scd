import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import '@material/mwc-fab';

import '../zeroline-pane.js';
import './iededitor/ied-container.js'

/** An editor [[`plugin`]] for editing the `IED Editor` section. */
export default class IedEditorPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;
  /** Are the (sub)containers read-only? */
  @property({ type: Boolean })
  readonly = true;

  renderIeds(): TemplateResult {
    const ieds = Array.from(this.doc.querySelectorAll('IED')) ?? [];
    return ieds?.length
      ? html`<div>
          ${ieds.map(ied => html`
            <ied-container
              .element="${ied}"
              ?readonly=${this.readonly}>
            </ied-container>`)}
        </div>`
      : html``;
  }

  render(): TemplateResult {
    return html`${this.renderIeds()}`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }
  `;
}
