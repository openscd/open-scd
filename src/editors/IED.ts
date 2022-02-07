import { css, html, LitElement, property, state, TemplateResult } from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

import '../zeroline-pane.js';
import './ied/ied-container.js'

import { translate } from 'lit-translate';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { compareNames, getDescriptionAttribute, getNameAttribute } from '../foundation.js';
import { Nsdoc } from '../foundation/nsdoc.js';

/*
 * We need a variable outside the plugin to save the selected IED, because the Plugin is created
 * more than once during working with the IED Editor, for instance when opening a Wizard to edit the IED.
 */
let iedEditorSelectedIedName: string | undefined;
/*
 * We will also add an Event Listener when a new document is opened. We then want to reset the selection
 * so setting it to undefined will set the selected IED again on the first in the list.
 */
function onOpenDocResetSelectedIed() {
  iedEditorSelectedIedName = undefined;
}
addEventListener('open-doc', onOpenDocResetSelectedIed);

/** An editor [[`plugin`]] for editing the `IED` section. */
export default class IedPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** All the nsdoc files that are being uploaded via the settings. */
  @property()
  nsdoc!: Nsdoc;

  private get alphabeticOrderedIeds() : Element[] {
    return (this.doc)
      ? Array.from(this.doc.querySelectorAll(':root > IED'))
             .sort((a,b) => compareNames(a,b))
      : [];
  }

  @state()
  private set selectedIed(element: Element | undefined) {
    iedEditorSelectedIedName = (element) ? getNameAttribute(element) : undefined;
  }

  private get selectedIed(): Element {
    if (iedEditorSelectedIedName === undefined) {
      iedEditorSelectedIedName = getNameAttribute(this.alphabeticOrderedIeds[0]);
    }
    return this.doc.querySelector(`:root > IED[name="${iedEditorSelectedIedName}"]`)!;
  }

  private onSelect(event: SingleSelectedEvent): void {
    this.selectedIed = this.alphabeticOrderedIeds[event.detail.index];
    this.requestUpdate("selectedIed");
  }

  render(): TemplateResult {
    const iedList = this.alphabeticOrderedIeds;
    if (iedList.length > 0) {
      let selectedIedElement = this.selectedIed;
      if (!selectedIedElement) {
        // Fix: If the selected IED can't be found, because the name is changed, will select the first one again.
        selectedIedElement = iedList[0];
      }
      return html `
        <section>
          <mwc-select
            id="iedSelect"
            label="${translate("iededitor.searchHelper")}"
            @selected=${this.onSelect}>
            ${iedList.map(
              ied =>
                html`
                  <mwc-list-item
                    ?selected=${ied == selectedIedElement}
                    value="${getNameAttribute(ied)}"
                  >${getNameAttribute(ied)} ${ied.hasAttribute('desc') ? translate('iededitor.searchHelperDesc', {
                    description: getDescriptionAttribute(ied)!,
                  }) : ''}
                  </mwc-list-item>`
            )}
          </mwc-select>
          <ied-container
            .element=${selectedIedElement}
            .nsdoc=${this.nsdoc}
          ></ied-container>
        </section>`;
    }
    return html `
          <h1>
            <span style="color: var(--base1)">${translate('iededitor.missing')}</span>
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
