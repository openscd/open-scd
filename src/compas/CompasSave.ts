import {
  css,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  query,
  TemplateResult,
} from 'lit-element';
import { get, translate } from 'lit-translate';
import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base';

import '@material/mwc-textfield';
import '@material/mwc-button';

import { newLogEvent } from '../foundation.js';
import { saveDocumentToFile } from '../file.js';

import '../WizardDivider.js';

import { CompasExistsIn } from './CompasExistsIn.js';
import { CompasChangeSetRadiogroup } from './CompasChangeSetRadiogroup.js';
import { CompasSclTypeSelect } from './CompasSclTypeSelect.js';
import { CompasCommentElement } from './CompasComment.js';
import { CompasLabelsFieldElement } from './CompasLabelsField.js';
import { CompasSclDataService } from '../compas-services/CompasSclDataService.js';
import { createLogEvent } from '../compas-services/foundation.js';
import {
  COMPAS_SCL_PRIVATE_TYPE,
  createPrivate,
  getPrivate,
} from './private.js';
import {
  getTypeFromDocName,
  stripExtensionFromName,
  updateDocumentInOpenSCD,
} from './foundation.js';

import './CompasChangeSetRadiogroup.js';
import './CompasComment.js';
import './CompasLabelsField.js';
import './CompasLoading.js';
import './CompasSclTypeSelect.js';
import { nothing } from 'lit-html';

/* Event that will be used when an SCL Document is saved. */
export type DocSavedEvent = CustomEvent<void>;
export function newDocSavedEvent(): DocSavedEvent {
  return new CustomEvent<void>('doc-saved', {
    bubbles: true,
    composed: true,
  });
}

@customElement('compas-save')
export default class CompasSaveElement extends CompasExistsIn(LitElement) {
  @property()
  doc!: XMLDocument;
  @property()
  allowLocalFile = true;

  @query('mwc-textfield#name')
  private nameField!: TextFieldBase;

  @query('compas-scltype-select')
  private sclTypeRadioGroup!: CompasSclTypeSelect;

  @query('compas-changeset-radiogroup')
  private changeSetRadiogroup!: CompasChangeSetRadiogroup;

  @query('compas-comment')
  private commentField!: CompasCommentElement;

  @query('compas-labels-field')
  private labelsField!: CompasLabelsFieldElement;

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the document is updated, we reset the selected IED.
    if (_changedProperties.has('doc')) {
      if (this.commentField) {
        this.commentField.value = null;
      }
    }
  }

  valid(): boolean {
    if (!this.existInCompas) {
      return this.nameField.checkValidity() && this.sclTypeRadioGroup.valid();
    }
    return this.changeSetRadiogroup.valid();
  }

  private getCleanFileName(): string {
    return stripExtensionFromName(this.docName);
  }

  private updateLabels() {
    const sclElement = this.doc.documentElement;
    const privateElement = getPrivate(sclElement, COMPAS_SCL_PRIVATE_TYPE);
    this.labelsField.updateLabelsInPrivateElement(privateElement!);
  }

  private processUpdatedDocument(
    sclDocument: Document,
    messageKey: string
  ): void {
    updateDocumentInOpenSCD(this, sclDocument);

    this.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get(messageKey),
      })
    );

    this.dispatchEvent(newDocSavedEvent());
  }

  private async addSclToCompas(doc: XMLDocument): Promise<void> {
    const name = stripExtensionFromName(this.nameField.value);
    const comment = this.commentField.value;
    const docType = this.sclTypeRadioGroup.getSelectedValue() ?? '';

    await CompasSclDataService()
      .addSclDocument(this, docType, {
        sclName: name,
        comment: comment,
        doc: doc,
      })
      .then((sclDocument: Document) => {
        this.processUpdatedDocument(sclDocument, 'compas.save.addSuccess');
      })
      .catch(reason => createLogEvent(this, reason));
  }

  private async updateSclInCompas(
    docId: string,
    docName: string,
    doc: XMLDocument
  ): Promise<void> {
    const changeSet = this.changeSetRadiogroup.getSelectedValue();
    const comment = this.commentField.value;
    const docType = getTypeFromDocName(docName);

    await CompasSclDataService()
      .updateSclDocument(this, docType, docId, {
        changeSet: changeSet!,
        comment: comment,
        doc: doc,
      })
      .then(sclDocument => {
        this.processUpdatedDocument(sclDocument, 'compas.save.updateSuccess');
      })
      .catch(reason => createLogEvent(this, reason));
  }

  async saveToCompas(): Promise<void> {
    this.updateLabels();
    if (!this.docId || !this.existInCompas) {
      await this.addSclToCompas(this.doc);
    } else {
      await this.updateSclInCompas(this.docId, this.docName, this.doc);
    }
  }

  private renderSaveFilePart(): TemplateResult {
    return html`
      <mwc-button
        label="${translate('compas.save.saveFileButton')}"
        @click=${() => {
          this.updateLabels();
          saveDocumentToFile(this.doc, this.docName);

          this.dispatchEvent(newDocSavedEvent());
        }}
      >
      </mwc-button>
    `;
  }

  private renderSaveCompasPart(): TemplateResult {
    if (this.existInCompas === undefined) {
      return html` <compas-loading></compas-loading> `;
    }

    if (!this.existInCompas) {
      return html`
        <div id="content">
          <mwc-textfield
            dialogInitialFocus
            id="name"
            label="${translate('scl.name')}"
            value="${this.getCleanFileName()}"
            required
          >
          </mwc-textfield>

          <compas-scltype-select
            .value="${getTypeFromDocName(this.docName)}"
          ></compas-scltype-select>
          <compas-comment></compas-comment>
        </div>
      `;
    }
    return html`
      <div id="content">
        <compas-changeset-radiogroup></compas-changeset-radiogroup>
        <compas-comment></compas-comment>
      </div>
    `;
  }

  private renderLabelsPart(): TemplateResult {
    const sclElement = this.doc.documentElement;
    let privateElement = getPrivate(sclElement, COMPAS_SCL_PRIVATE_TYPE);
    if (!privateElement) {
      privateElement = createPrivate(sclElement, COMPAS_SCL_PRIVATE_TYPE);
      sclElement.prepend(privateElement);
    }

    return html`<compas-labels-field
      .privateElement="${privateElement}"
    ></compas-labels-field>`;
  }

  render(): TemplateResult {
    return html`
      ${this.allowLocalFile
        ? html` <wizard-divider></wizard-divider>
            <section>
              <h3>${translate('compas.save.localTitle')}</h3>
              ${this.renderSaveFilePart()}
            </section>`
        : nothing}
      <wizard-divider></wizard-divider>
      <section>
        <h3>${translate('compas.save.compasTitle')}</h3>
        ${this.renderSaveCompasPart()}
      </section>
      <wizard-divider></wizard-divider>
      <section>
        <h3>${translate('compas.save.labelsTitle')}</h3>
        ${this.renderLabelsPart()}
      </section>
    `;
  }

  static styles = css`
    #content > * {
      display: block;
      margin-top: 16px;
    }

    h3 {
      color: var(--mdc-theme-on-surface);
    }
  `;
}
