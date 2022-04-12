import {
  customElement,
  html,
  query,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import '@material/mwc-icon-button-toggle';
import { TextField } from '@material/mwc-textfield';
import { get } from 'lit-translate';
import { IconButton } from '@material/mwc-icon-button';

@customElement('inline-edit-textfield')
export class InlineEditTextField extends TextField {

  @query('#doneButton') doneButton!: IconButton;

  private handleEdit() {
    this.disabled = !this.disabled;
    this.doneButton.getAttribute('style')?.includes('display: none;')
      ? this.doneButton.setAttribute('style', 'color: var(--mdc-theme-on-surface);')
      : this.doneButton.setAttribute('style', 'color: var(--mdc-theme-on-surface); display: none;')
  }

  async firstUpdated(): Promise<void> {
    super.firstUpdated();

    this.disabled = true;
    this.setCustomValidity(get('ied.dai.defaultvalidationmessage'));
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
            @click=${() => console.log('check')}
          ></mwc-icon-button>
          <mwc-icon-button-toggle
            style="margin-left: 5px; color: var(--mdc-theme-on-surface);"
            onIcon="clear"
            offIcon="edit"
            @click=${() => this.handleEdit()}
          ></mwc-icon-button-toggle>
        </div>
      </div>
    `;
  }
}
