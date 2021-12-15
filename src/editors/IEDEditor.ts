import { css, html, LitElement, property, query, TemplateResult } from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

import '../zeroline-pane.js';
import './ied/ied-container.js'
import { translate } from 'lit-translate';
import { IEDSelector } from './ied/foundation.js';
import { Select } from '@material/mwc-select';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { getNameAttribute } from '../foundation.js';

/** An editor [[`plugin`]] for editing the `IED Editor` section. */
export default class IedEditorPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** Query holding the current selected IEDs. */
  @property()
  query:string = IEDSelector.IED;

  @query('#iedSearch') iedSelector?: Select;

  /**
   * When selecting drop down, update the search query.
   * Because an event only returns an index, we need to retrieve the
   * actual IED before getting the actual value (in this case the name).
   */
  onSelect(event: SingleSelectedEvent): void {
    const ied = this.doc?.querySelectorAll(IEDSelector.IED)[event.detail.index];
    this.query = `IED[name="${getNameAttribute(ied)}"]`;
  }

  render(): TemplateResult {
    return html`<section>
      <mwc-select
        id="iedSearch"
        label="${translate("iededitor.searchHelper")}"
        @selected=${this.onSelect}>
        ${Array.from(this.doc?.querySelectorAll(IEDSelector.IED) ?? []).map(
          ied =>
            html`<mwc-list-item
              ?selected=${ied == this.doc?.querySelector(IEDSelector.IED)}
              value="${getNameAttribute(ied)}"
              >${getNameAttribute(ied)}</mwc-list-item>`
        )}
      </mwc-select>
      ${Array.from(this.doc?.querySelectorAll(this.query) ?? []).map(
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

    #iedSearch {
      width: 30%;
      padding-bottom: 20px;
    }
  `;
}
