import {
  customElement,
  html,
  TemplateResult,
  query,
  property,
} from 'lit-element';

import '@material/mwc-switch';
import { Switch } from '@material/mwc-switch';
import { TextField } from '@material/mwc-textfield';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-textfield-nullable': TextFieldNullable;
  }
}

@customElement('mwc-textfield-nullable')
export class TextFieldNullable extends TextField {
  @property({ type: String })
  defaultValue?: string;

  @property({ type: Boolean }) null = false;

  @property({ type: String })
  get helper(): string {
    if (this.null)
      return this.defaultValue
        ? 'Default: ' + this.defaultValue
        : 'No default value';
    else return super.helper;
  }
  set helper(value: string) {
    super.helper = value;
  }

  @property({ type: Boolean })
  get helperPersistent(): boolean {
    return this.null || super.helperPersistent;
  }
  set helperPersistent(value: boolean) {
    super.helperPersistent = value;
  }

  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this.null || super.disabled;
  }
  set disabled(value: boolean) {
    super.disabled = value;
  }

  @query('mwc-switch') switch?: Switch;

  lastValue = '';
  toggleValue(): void {
    if (this.null) {
      this.lastValue = this.value;
      this.value = '';
    } else {
      this.value = this.lastValue;
    }
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div>
          ${super.render()}
        </div>
        <mwc-switch
          style="align-items: center "
          .checked=${!null}
          @change=${() => {
            this.null = !this.null;
            this.toggleValue();
            this.requestUpdate();
          }}
        ></mwc-switch>
      </div>
    `;
  }
}
