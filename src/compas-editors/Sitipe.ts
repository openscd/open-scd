import { css, html, LitElement, property, TemplateResult } from 'lit-element';
import { translate } from 'lit-translate';

import './sitipe/sitipe-substation.js';
import { isPublic } from '../foundation.js';

/** An editor [[`plugin`]] for Sitipe based configuration */
export default class SitipePlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({
    type: Number,
  })
  editCount = -1;

  header(): string {
    return 'Sitipe';
  }

  private renderSubstations(): TemplateResult {
    return html`${this.doc?.querySelector(':root > Substation')
      ? html`<section>
          ${Array.from(this.doc.querySelectorAll('Substation') ?? [])
            .filter(isPublic)
            .map(
              substation =>
                html`<sitipe-substation
                  .doc=${this.doc}
                  .element=${substation}
                  .editCount=${this.editCount}
                ></sitipe-substation>`
            )}
        </section>`
      : html`<h1>
          <span style="color: var(--base1)"
            >${translate('substation.missing')}</span
          >
        </h1>`}`;
  }

  render(): TemplateResult {
    return html`<div class="container">${this.renderSubstations()}</div>`;
  }

  static styles = css`
    :host {
      width: 100vw;
      padding: 16px;
    }

    .container {
      display: flex;
      padding: 8px 6px 16px;
      height: calc(100vh - 136px);
      box-sizing: border-box;
      width: 100%;
    }
    section {
      flex: 1;
    }
  `;
}
