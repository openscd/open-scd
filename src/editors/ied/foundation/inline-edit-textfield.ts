import {
  customElement,
  html,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import '@material/mwc-icon-button-toggle';
import { TextField } from '@material/mwc-textfield';
import { IconButton } from '@material/mwc-icon-button';
import { newActionEvent, Replace } from '../../../foundation.js';

@customElement('inline-edit-textfield')
export class InlineEditTextField extends TextField {
  
  @property({ attribute: false })
  element!: Element;

  @query('#doneButton') doneButton!: IconButton;

  constructor() {
    super();
    this.autoValidate = true;
    this.disabled = true;
  }

  private done() {
    const oldVal = this.element.querySelector('Val');
    const newVal = <Element>oldVal?.cloneNode(false);
    newVal.textContent = this.value;

    const inputAction: Replace = {
      old: {
        element: oldVal!
      },
      new: {
        element: newVal
      },
    };
    this.dispatchEvent(newActionEvent({ title: 'Update', actions: [inputAction] }));
  }

  private edit() {
    this.value = this.getValue();
    this.disabled = !this.disabled;
    
    this.doneButton.getAttribute('style')?.includes('display: none;')
      ? this.doneButton.setAttribute('style', 'color: var(--mdc-theme-on-surface);')
      : this.doneButton.setAttribute('style', 'color: var(--mdc-theme-on-surface); display: none;')
  }

  async firstUpdated(): Promise<void> {
    super.firstUpdated();
    this.value = this.getValue();
  }

  updated(): void {
    this.doneButton.disabled = !this.validity.valid;
  }

  private getValue(): string {
    return this.element.querySelector('Val')?.textContent ?? '';
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div style="flex: auto;">${super.render()}</div>
        <div style="display: flex; align-items: center; height: 56px;">
          <mwc-icon-button
            id="doneButton"
            style="color: var(--mdc-theme-on-surface); display: none;"
            icon="done"
            @click=${() => this.done()}
          ></mwc-icon-button>
          <mwc-icon-button-toggle
            style="margin-left: 5px; color: var(--mdc-theme-on-surface);"
            onIcon="clear"
            offIcon="edit"
            @click=${() => this.edit()}
          ></mwc-icon-button-toggle>
        </div>
      </div>
    `;
  }
}
