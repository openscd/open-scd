import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
  css,
  query,
} from 'lit-element';
import { translate } from 'lit-translate';

import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
} from '../foundation.js';
import {
  selectors,
  startMove,
  cloneSubstationElement,
  styles,
  renderFunctions,
} from './foundation.js';
import { wizards } from '../wizards/wizard-library.js';

import { SubstationEditor } from './substation-editor.js';

import { IconButton } from '@material/mwc-icon-button';

import './bay-editor.js';

/** [[`Substation`]] subeditor for a `VoltageLevel` element. */
@customElement('voltage-level-editor')
export class VoltageLevelEditor extends LitElement {
  @property()
  element!: Element;
  @property({ type: Boolean })
  readonly = false;

  @property()
  get voltage(): string | null {
    const V = this.element.querySelector(selectors.VoltageLevel + ' > Voltage');
    if (V === null) return null;
    const v = V.textContent ?? '';
    const m = V.getAttribute('multiplier');
    const u = m === null ? 'V' : ' ' + m + 'V';
    return v ? v + u : null;
  }
  @property({ type: String })
  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc');

    return `${name} ${desc === null ? '' : '-'} ${desc}
    ${this.voltage === null ? '' : `(${this.voltage})`}`;
  }

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Element[] = () => {
    return [];
  };

  @query('mwc-icon-button[icon="account_tree"]') lnodeButton!: IconButton;
  @query('mwc-icon-button[icon="content_copy"]') copyButton!: IconButton;
  @query('mwc-icon-button[icon="edit"]') editButton!: IconButton;
  @query('mwc-icon-button[icon="delete"]') removeButton!: IconButton;
  @query('mwc-icon-button[icon="forward"]') moveButton!: IconButton;

  openEditWizard(): void {
    const wizard = wizards['VoltageLevel'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  /** Opens a [[`WizardDialog`]] for editing `LNode` connections. */
  openLNodeWizard(): void {
    const wizard = wizards['LNode'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  remove(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.element.parentElement!,
            element: this.element,
            reference: this.element.nextSibling,
          },
        })
      );
  }

  renderIedContainer(): TemplateResult {
    const ieds = this.getAttachedIeds?.(this.element) ?? [];
    return ieds?.length
      ? html`<div id="iedcontainer" slot="container">
          ${ieds.map(ied => html`<ied-editor .element=${ied}></ied-editor>`)}
        </div>`
      : html``;
  }

  renderActionsButtons(): TemplateResult {
    return html`<abbr slot="header" title="${translate('lnode.tooltip')}">
        <mwc-icon-button
          icon="account_tree"
          @click=${() => this.openLNodeWizard()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="header" title="${translate('duplicate')}">
        <mwc-icon-button
          icon="content_copy"
          @click=${() => cloneSubstationElement(this)}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="header" title="${translate('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="header" title="${translate('move')}">
        <mwc-icon-button
          icon="forward"
          @click=${() => startMove(this, VoltageLevelEditor, SubstationEditor)}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="header" title="${translate('remove')}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.remove()}
        ></mwc-icon-button>
      </abbr>`;
  }

  render(): TemplateResult {
    return html`<editor-container
      .element=${this.element}
      header="${this.header}"
    >
      ${this.renderActionsButtons()}
      ${this.renderIedContainer()}${renderFunctions(this.element)}
      <div id="bayContainer" slot="container">
        ${getChildElementsByTagName(this.element, 'Bay').map(
          bay => html`<bay-editor
            .element=${bay}
            .getAttachedIeds=${this.getAttachedIeds}
            ?readonly=${this.readonly}
          ></bay-editor>`
        )}
      </div>
    </editor-container>`;
  }

  static styles = css`
    ${styles}

    #bayContainer {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      #bayContainer {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
