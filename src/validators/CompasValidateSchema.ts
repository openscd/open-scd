import { LitElement, property } from 'lit-element';

import { newIssueEvent } from '../foundation.js';

import {
  CompasSclValidatorService,
  SVS_NAMESPACE,
} from '../compas-services/CompasValidatorService.js';
import { createLogEvent } from '../compas-services/foundation.js';
import { getTypeFromDocName } from '../compas/foundation.js';

export default class CompasValidateSchema extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: String })
  docName!: string;

  @property()
  pluginId!: string;

  // Boolean to prevent running the validation multiple times at the same time.
  private compasValidationSchemaRunning = false;

  async validate(manual: boolean): Promise<void> {
    // We don't want to externally validate every time a save is done. So only start the validation when manually triggered.
    // And also if one is already running we don't want to start another one, wait until it's finished.
    if (!manual || this.compasValidationSchemaRunning) {
      return;
    }

    // Block running another validation until this one is finished.
    this.compasValidationSchemaRunning = true;

    const docType = getTypeFromDocName(this.docName);
    const service = CompasSclValidatorService();
    if (service.useWebsocket()) {
      service.validateSCLUsingWebsockets(
        this,
        docType,
        this.doc,
        doc => {
          this.processValidationResponse(doc);
        },
        () => {
          this.compasValidationSchemaRunning = false;
        }
      );
    } else {
      const response = await service
        .validateSCLUsingRest(docType, this.doc)
        .catch(reason => createLogEvent(this, reason));
      if (response instanceof Document) {
        this.processValidationResponse(response);
      }
      this.compasValidationSchemaRunning = false;
    }
  }

  private processValidationResponse(response: Document): void {
    const validationErrors = Array.from(
      response.querySelectorAll('SclValidateResponse > ValidationErrors') ?? []
    );
    // Check if there are validation errors, if there are we will process them.
    if (validationErrors.length > 0) {
      validationErrors.forEach(validationError => {
        this.dispatchEvent(
          newIssueEvent({
            validatorId: this.pluginId,
            title: this.createTitle(validationError),
            message: this.createMessage(validationError),
          })
        );
      });
    }
  }

  private createTitle(validationError: Element): string {
    const message = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'Message')!
      .item(0)?.textContent;
    return message ? message : 'No validation message';
  }

  private createMessage(validationError: Element): string | undefined {
    const ruleName = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'RuleName')!
      .item(0)?.textContent;
    const linenumber = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'Linenumber')!
      .item(0)?.textContent;
    const columnNumber = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'ColumnNumber')!
      .item(0)?.textContent;

    const messageParts: string[] = [];
    if (ruleName) messageParts.push(`Rule: ${ruleName}`);
    if (linenumber) messageParts.push(`Line: ${linenumber}`);
    if (columnNumber) messageParts.push(`Column: ${columnNumber}`);

    if (messageParts.length == 0) {
      return undefined;
    }
    return messageParts.join(', ');
  }
}
