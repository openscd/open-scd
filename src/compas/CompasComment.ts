import {customElement, html, LitElement, TemplateResult} from "lit-element";
import {WizardTextField} from "../wizard-textfield.js";
import {translate} from "lit-translate";

@customElement('compas-comment')
export class CompasCommentElement extends LitElement {
  private getCommentField() : WizardTextField {
    return <WizardTextField>this.shadowRoot!.querySelector('wizard-textfield[id="comment"]');
  }

  getValue() : string {
    const commentField = this.getCommentField();
    return commentField.value;
  }

  valid(): boolean {
    return this.getCommentField().checkValidity();
  }

  render(): TemplateResult {
    return html`
      <wizard-textfield id="comment"
                        label="${translate('compas.comment')}"
                        .maybeValue=${null}
                        nullable>
      </wizard-textfield>
    `
  }
}
