import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-icon-button-toggle';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { IconButtonToggle } from '@material/mwc-icon-button-toggle';

/** CSS constainer adding expand/collapse capability to list item */
@customElement('expandable-list-item')
export class ExpandableListItem extends LitElement {
  /** Wether parent list item are expanded per default */
  @property({ type: Boolean })
  defaultExtended = false;

  /** Toggle button expanding/collapsing the parent item */
  @query('mwc-icon-button-toggle') expandButton!: IconButtonToggle;
  /** Child list items slot */
  @query('slot[name="child"]') childrenSlot?: HTMLSlotElement;

  protected firstUpdated(): void {
    const existSlottedChildren =
      this.childrenSlot?.assignedElements().length !== 0;

    if (!existSlottedChildren) this.expandButton?.classList.add('hidden');

    if (this.defaultExtended && existSlottedChildren) {
      this.expandButton.on = true;
      this.shadowRoot?.querySelector('.parent')?.setAttribute('on', '');
    }

    this.requestUpdate();
  }

  private onExpandToggle(e: Event): void {
    const isOn = (e.target as Element).getAttribute('on');
    if (isOn !== null)
      this.shadowRoot?.querySelector('.parent')?.setAttribute('on', '');
    else this.shadowRoot?.querySelector('.parent')?.removeAttribute('on');
    this.requestUpdate();
  }

  renderList(): TemplateResult {
    return html`<mwc-list><slot name="child"></slot></mwc-list>`;
  }

  renderExtendToggle(): TemplateResult {
    return html`<div class="expandIconContainer">
      <mwc-icon-button-toggle
        onIcon="keyboard_arrow_up"
        offIcon="keyboard_arrow_down"
        @click=${this.onExpandToggle}
        }}
      ></mwc-icon-button-toggle>
    </div>`;
  }

  render(): TemplateResult {
    return html`<div class="container">
      <div class="parent">
        ${this.renderExtendToggle()} <slot name="parent"></slot>
      </div>
      <div class="content">${this.renderList()}</div>
    </div>`;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
    }

    .parent {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .expandIconContainer {
      flex-basis: 28px;
    }

    .content {
      padding-left: 28px;
    }

    mwc-icon-button-toggle {
      padding: 2px;
      --mdc-icon-size: 24px;
      --mdc-icon-button-size: 24px;
    }

    mwc-icon-button-toggle.hidden {
      display: none;
    }

    .parent:not([on]) ~ .content mwc-list {
      display: none;
    }
  `;
}
