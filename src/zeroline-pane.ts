import {
  LitElement,
  html,
  TemplateResult,
  property,
  customElement,
  css,
} from 'lit-element';
import { until } from 'lit-html/directives/until';
import { translate } from 'lit-translate';

import { isPublic } from './foundation.js';
import { styles } from './zeroline/foundation.js';

import './zeroline/substation-editor.js';
import './zeroline/ied-editor.js';

/** [[`Zeroline`]] pane for displaying `Substation` and/or `IED` sections. */
@customElement('zeroline-pane')
export class ZerolinePane extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Boolean })
  readonly = false;

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Promise<Element[]> = async () => {
    return [];
  };

  async renderIedContainer(): Promise<TemplateResult> {
    const ieds = await this.getAttachedIeds?.(this.doc.documentElement);

    await new Promise(requestAnimationFrame);
    return ieds
      ? html`<div id="iedcontainer">
          ${ieds.map(ied => html`<ied-editor .element=${ied}></ied-editor>`)}
        </div>`
      : html``;
  }

  render(): TemplateResult {
    return html`${until(
      this.renderIedContainer(),
      html`<span>loading ieds...</span>`
    )}
    ${!this.doc?.querySelector(':root > Substation')
      ? html`<h1>
          <span style="color: var(--base1)"
            >${translate('substation.missing')}</span
          >
        </h1>`
      : html`<section tabindex="0">
          ${Array.from(this.doc.querySelectorAll('Substation') ?? [])
            .filter(isPublic)
            .map(
              substation =>
                html`<substation-editor
                  .element=${substation}
                  .getAttachedIeds=${this.getAttachedIeds}
                  ?readonly=${this.readonly}
                ></substation-editor>`
            )}
        </section>`}`;
  }

  static styles = css`
    ${styles}
  `;
}
