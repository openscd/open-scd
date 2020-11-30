import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate, get } from 'lit-translate';

import '@material/mwc-fab';

import {
  CloseableElement,
  newWizardEvent,
  WizardInput,
  getValue,
} from '../foundation.js';

import { selectors, styles } from './substation/foundation.js';

import './substation/substation-editor.js';

/** An editor [[`plugin`]] for editing the `Substation` section. */
export default class SubstationPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  openCreateSubstationWizard(): void {
    const event = newWizardEvent([
      {
        title: get('substation.wizard.title.add'),
        primary: {
          icon: 'add',
          action: (inputs: WizardInput[], dialog: CloseableElement) => {
            const name = inputs.find(i => i.label === 'name')!.value;
            const desc = getValue(inputs.find(i => i.label === 'desc')!);
            dialog.close();
            return [
              {
                new: {
                  parent: this.doc.documentElement,
                  element: new DOMParser().parseFromString(
                    `<Substation name="${name}"${
                      desc === null ? '' : ` desc="${desc}"`
                    }></Substation>`,
                    'application/xml'
                  ).documentElement,
                  reference: null,
                },
              },
            ];
          },
          label: get('add'),
        },
        content: [
          html`<wizard-textfield
            .maybeValue=""
            helper="${translate('substation.wizard.nameHelper')}"
            label="name"
            required
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            .maybeValue=${null}
            helper="${translate('substation.wizard.descHelper')}"
            label="desc"
            nullable
          ></wizard-textfield>`,
        ],
      },
    ]);
    this.dispatchEvent(event);
  }

  render(): TemplateResult {
    if (!this.doc.querySelector(selectors.Substation))
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('substation.missing')}</span
        >
        <mwc-fab
          extended
          icon="add"
          label="${get('substation.wizard.title.add')}"
          @click=${() => this.openCreateSubstationWizard()}
        ></mwc-fab>
      </h1>`;
    return html`
      ${Array.from(this.doc.querySelectorAll(selectors.Substation) ?? []).map(
        substation =>
          html`<substation-editor .element=${substation}></substation-editor>`
      )}
    `;
  }

  static styles = css`
    ${styles}

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    :host {
      width: 100vw;
    }
  `;
}
