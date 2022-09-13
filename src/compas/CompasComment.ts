import {
  css,
  customElement,
  html,
  LitElement,
  TemplateResult,
} from 'lit-element';
import { WizardTextField } from '../wizard-textfield.js';
import { translate } from 'lit-translate';

import '../wizard-textfield.js';

@customElement('compas-comment')
export class CompasCommentElement extends LitElement {
  private getCommentField(): WizardTextField {
    return <WizardTextField>(
      this.shadowRoot!.querySelector('wizard-textfield[id="comment"]')
    );
  }

  set value(value: string | null) {
    const commentField = this.getCommentField();
    commentField.maybeValue = value;
  }

  get value(): string | null {
    const commentField = this.getCommentField();
    return commentField.maybeValue;
  }

  valid(): boolean {
    return this.getCommentField().checkValidity();
  }

  render(): TemplateResult {
    return html`
      <wizard-textfield
        id="comment"
        label="${translate('compas.comment')}"
        .maybeValue=${null}
        nullable
      >
      </wizard-textfield>
    `;
  }

  static styles = css`
    wizard-textfield {
      width: 100%;
    }
  `;
}
