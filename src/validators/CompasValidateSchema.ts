import { LitElement, property } from "lit-element";

import { newIssueEvent } from "../foundation.js";

import { CompasSclValidatorService, SVS_NAMESPACE } from "../compas-services/CompasValidatorService.js";
import { createLogEvent } from "../compas-services/foundation.js";
import { dispatchEventOnOpenScd, getTypeFromDocName } from "../compas/foundation.js";

export default class ValidateTemplates extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: String })
  docName!: string;

  @property()
  pluginId!: string;

  async validate(manual: boolean): Promise<void> {
    // We don't want to externally validate every time a save is done. So only start the validation when manually triggered.
    if (!manual) {
      return;
    }

    const docType = getTypeFromDocName(this.docName);
    const service = CompasSclValidatorService();
    if (service.useWebsocket()) {
      service.validateSCLUsingWebsockets(docType, this.doc, (doc) => {
        this.processValidationResponse(doc);
      });
    } else {
      const response = await service.validateSCLUsingRest(docType, this.doc)
        .catch(createLogEvent);
      if (response instanceof Document) {
        this.processValidationResponse(response);
      }
    }
  }

  private processValidationResponse(response: Document): void {
    const validationErrors = Array.from(response.querySelectorAll('SclValidateResponse > ValidationErrors') ?? []);
    // Check if there are validation errors, if there are we will process them.
    if (validationErrors.length > 0) {
      validationErrors.forEach(validationError => {
        const message = validationError.getElementsByTagNameNS(SVS_NAMESPACE, "Message")!.item(0)!.textContent;
        dispatchEventOnOpenScd(
          newIssueEvent({
            validatorId: this.pluginId,
            title: message ?? 'No message'
          })
        );
      })
    }
  }
}
