import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate } from 'lit-translate';

import { getReference, newActionEvent, newWizardEvent } from '../foundation.js';

import { styles } from './templates/foundation.js';
import './templates/enum-type-editor.js';
import { EnumTypeEditor } from './templates/enum-type-editor.js';

const templates = fetch('public/xml/templates.scd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

/** An editor [[`plugin`]] for editing the `DataTypeTemplates` section. */
export default class TemplatesPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  async openCreateEnumWizard(): Promise<void> {
    if (!this.doc.querySelector(':root > DataTypeTemplates'))
      this.dispatchEvent(
        newActionEvent({
          new: {
            parent: this.doc.documentElement,
            element: this.doc.createElement('DataTypeTemplates'),
            reference: getReference(
              this.doc.documentElement,
              'DataTypeTemplates'
            ),
          },
        })
      );

    this.dispatchEvent(
      newWizardEvent(
        EnumTypeEditor.wizard({
          parent: this.doc.querySelector(':root > DataTypeTemplates')!,
          templates: await templates,
        })
      )
    );
  }

  createDataTypeTemplates(): void {
    if (!this.doc.querySelector(':root > DataTypeTemplates'))
      this.dispatchEvent(
        newActionEvent({
          new: {
            parent: this.doc.documentElement,
            element: this.doc.createElement('DataTypeTemplates'),
            reference: getReference(
              this.doc.documentElement,
              'DataTypeTemplates'
            ),
          },
        })
      );
  }

  render(): TemplateResult {
    if (!this.doc?.querySelector(':root > DataTypeTemplates'))
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('templates.missing')}</span
        >
        <mwc-fab
          extended
          icon="add"
          label="${translate('templates.add')}"
          @click=${() => this.createDataTypeTemplates()}
        ></mwc-fab>
      </h1>`;
    return html`
      <section tabindex="0">
        <h1>
          ${translate('scl.EnumType')}
          <nav>
            <abbr title="${translate('add')}">
              <mwc-icon-button
                icon="playlist_add"
                @click=${() => this.openCreateEnumWizard()}
              ></mwc-icon-button>
            </abbr>
          </nav>
        </h1>
        <mwc-list>
          ${Array.from(
            this.doc.querySelectorAll(':root > DataTypeTemplates > EnumType') ??
              []
          ).map(
            enumType =>
              html`<enum-type-editor .element=${enumType}></enum-type-editor>`
          )}
        </mwc-list>
      </section>
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
