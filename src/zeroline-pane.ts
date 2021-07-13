import {
  LitElement,
  html,
  TemplateResult,
  property,
  customElement,
} from 'lit-element';

import { isPublic } from './foundation.js';
import { unreferencedIeds } from './zeroline/foundation.js';

import './zeroline/substation-editor.js';

/** [[`Zeroline`]] pane for displaying `Substation` and/or `IED` sections. */
@customElement('zeroline-pane')
export class ZerolinePane extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  showieds = false;

  renderIedContainer(): TemplateResult {
    return html`<div id="iedcontainer">
      ${unreferencedIeds(this.doc).map(
        ied => html`<ied-editor .element=${ied}></ied-editor>`
      )}
    </div>`;
  }

  render(): TemplateResult {
    return html`
      <section tabindex="0">
        ${this.showieds ? this.renderIedContainer() : html``}
        ${Array.from(this.doc.querySelectorAll('Substation') ?? [])
          .filter(isPublic)
          .map(
            substation =>
              html`<substation-editor
                .element=${substation}
                .readonly=${this.readonly}
                .showieds=${this.showieds}
              ></substation-editor>`
          )}
      </section>
    `;
  }
}
