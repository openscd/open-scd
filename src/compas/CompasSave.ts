import {
  css,
  customElement,
  html,
  LitElement,
  property,
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

@customElement('compas-save')
export default class CompasSaveElement extends CompasExistsIn(LitElement) {
  @property()
  doc!: XMLDocument;

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
    // We will just add or replace the complete Labels Element, so if it exists
    // first remove it and always add the new one.
    if (this.labelsField.originalLabelsElement) {
      privateElement?.removeChild(this.labelsField.originalLabelsElement);
    }
    privateElement?.append(this.labelsField.newLabelsElement);
    this.labelsField.originalLabelsElement = this.labelsField.newLabelsElement;
  }

  private async addSclToCompas(doc: XMLDocument): Promise<boolean> {
    const name = stripExtensionFromName(this.nameField.value);
    const comment = this.commentField.value;
    const docType = this.sclTypeRadioGroup.getSelectedValue() ?? '';
    let success = false;

    await CompasSclDataService()
      .addSclDocument(docType, { sclName: name, comment: comment, doc: doc })
      .then(sclDocument => {
        this.commentField.value = null;
        updateDocumentInOpenSCD(this, sclDocument);

        this.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: get('compas.save.addSuccess'),
          })
        );
        success = true;
      })
      .catch(reason => createLogEvent(this, reason));

    return success;
  }

  private async updateSclInCompas(
    docId: string,
    docName: string,
    doc: XMLDocument
  ): Promise<boolean> {
    const changeSet = this.changeSetRadiogroup.getSelectedValue();
    const comment = this.commentField.value;
    const docType = getTypeFromDocName(docName);
    let success = false;

    await CompasSclDataService()
      .updateSclDocument(docType, docId, {
        changeSet: changeSet!,
        comment: comment,
        doc: doc,
      })
      .then(sclDocument => {
        this.commentField.value = null;
        updateDocumentInOpenSCD(this, sclDocument);

        this.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: get('compas.save.updateSuccess'),
          })
        );
        success = true;
      })
      .catch(reason => createLogEvent(this, reason));

    return success;
  }

  async saveToCompas(): Promise<boolean> {
    this.updateLabels();
    if (!this.docId || !this.existInCompas) {
      return this.addSclToCompas(this.doc);
    } else {
      return this.updateSclInCompas(this.docId, this.docName, this.doc);
    }
  }

  private renderSaveFilePart(): TemplateResult {
    return html`
      <mwc-button
        label="${translate('compas.save.saveFileButton')}"
        @click=${() => {
          this.updateLabels();
          saveDocumentToFile(this.doc, this.docName);
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
      <wizard-divider></wizard-divider>
      <section>
        <h3>${translate('compas.save.localTitle')}</h3>
        ${this.renderSaveFilePart()}
      </section>
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
