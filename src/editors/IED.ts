import { css, html, LitElement, property, query, state, TemplateResult } from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

import '../zeroline-pane.js';
import './ied/ied-container.js'

import { translate } from 'lit-translate';
import { Select } from '@material/mwc-select';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { compareNames, getDescriptionAttribute, getNameAttribute } from '../foundation.js';
import { Nsdocs } from '../Setting.js';

/** An editor [[`plugin`]] for editing the `IED` section. */
export default class IedPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** All the nsdoc files that are being uploaded via the settings. */
  @property()
  nsdocs!: Nsdocs;

  /** Query holding the current selected IEDs. */
  @state()
  currentSelectedIEDs = ':root > IED';

  @query('#iedSelect') iedSelector?: Select;

  private get alphabeticOrderedIeds() : Element[] {
    return Array.from(this.doc?.querySelectorAll(':root > IED'))
    .sort((a,b) => compareNames(a,b));
  }

  /**
   * When selecting drop down, update the search query.
   * Because an event only returns an index, we need to retrieve the
   * actual IED before getting the actual value (in this case the name).
   */
  private onSelect(event: SingleSelectedEvent): void {
    const ied = this.alphabeticOrderedIeds[event.detail.index];
    this.currentSelectedIEDs = `:root > IED[name="${getNameAttribute(ied)}"]`;
  }

  render(): TemplateResult {
    return this.doc?.querySelector(':root > IED')
      ? html`<section>
        <mwc-select
          id="iedSelect"
          label="${translate("iededitor.searchHelper")}"
          @selected=${this.onSelect}>
          ${this.alphabeticOrderedIeds.map(
            ied =>
              html`<mwc-list-item
                ?selected=${ied == this.alphabeticOrderedIeds[0]}
                value="${getNameAttribute(ied)}"
                >${getNameAttribute(ied)} ${ied.hasAttribute('desc') ? translate('iededitor.searchHelperDesc', {
                  description: getDescriptionAttribute(ied)!,
                }) : ''}
              </mwc-list-item>`
          )}
        </mwc-select>
        ${Array.from(this.doc?.querySelectorAll(this.currentSelectedIEDs)).map(
          ied => html`<ied-container
            .element=${ied}
            .nsdocs=${this.nsdocs}
          ></ied-container>`
        )}</section>`
      : html`<h1>
          <span style="color: var(--base1)"
            >${translate('iededitor.missing')}</span
          >
        </h1>`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }

    section {
      padding: 8px 12px 16px;
    }

    #iedSelect {
      width: 35vw;
      padding-bottom: 20px;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
    }
  `;
}
