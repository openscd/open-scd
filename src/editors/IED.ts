import { css, html, LitElement, property, state, TemplateResult } from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

import '../zeroline-pane.js';
import './ied/ied-container.js'

import { translate } from 'lit-translate';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { compareNames, getDescriptionAttribute, getNameAttribute } from '../foundation.js';

/*
 * We need a variable outside the plugin to save the selected IED, because the Plugin is created
 * more than once during working with the IED Editor, for instance when opening a Wizard to edit the IED.
 */
let iedEditorSelectedIed: Element | undefined;
function onOpenDocResetSelectedIed() {
  iedEditorSelectedIed = undefined;
}
addEventListener('open-doc', onOpenDocResetSelectedIed);

/** An editor [[`plugin`]] for editing the `IED` section. */
export default class IedPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  private get alphabeticOrderedIeds() : Element[] {
    return Array.from(this.doc?.querySelectorAll(':root > IED'))
                .sort((a,b) => compareNames(a,b));
  }

  @state()
  private set selectedIed(element: Element | undefined) {
    iedEditorSelectedIed = element;
  }

  private get selectedIed(): Element {
    if (iedEditorSelectedIed === undefined) {
      iedEditorSelectedIed = this.alphabeticOrderedIeds[0];
    }
    return iedEditorSelectedIed;
  }

  /**
   * When selecting drop down, update the search query.
   * Because an event only returns an index, we need to retrieve the
   * actual IED before getting the actual value (in this case the name).
   */
  private onSelect(event: SingleSelectedEvent): void {
    this.selectedIed = this.alphabeticOrderedIeds[event.detail.index];
    this.requestUpdate("selectedIed");
  }

  render(): TemplateResult {
    const iedList = this.alphabeticOrderedIeds;
    return (iedList.length > 0)
      ? html `
          <section>
            <mwc-select
              id="iedSelect"
              label="${translate("iededitor.searchHelper")}"
              @selected=${this.onSelect}>
              ${iedList.map(
                ied =>
                  html`
                    <mwc-list-item
                      ?selected=${ied == this.selectedIed}
                      value="${getNameAttribute(ied)}"
                    >${getNameAttribute(ied)} ${ied.hasAttribute('desc') ? translate('iededitor.searchHelperDesc', {
                      description: getDescriptionAttribute(ied)!,
                    }) : ''}
                    </mwc-list-item>`
              )}
            </mwc-select>
            <ied-container .element=${this.selectedIed}></ied-container>
          </section>`
      : html `
          <h1>
            <span style="color: var(--base1)">${translate('iededitor.missing')}</span>
          </h1>`
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
