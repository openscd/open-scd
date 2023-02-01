import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import { translate } from 'lit-translate';

import '@material/mwc-fab';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-menu';

import '../../action-icon.js';
import '../../action-pane.js';

import { styles } from './foundation.js';
import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
} from '../../foundation.js';
import { wizards } from '../../wizards/wizard-library.js';

@customElement('transformer-winding-editor')
export class TransformerWindingEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  /** SCL element TransformerWinding */
  @property({ attribute: false })
  element!: Element;
  /** Whether `EqFunction` elements are rendered */
  @property({ type: Boolean })
  showfunctions = false;

  /** TransformerWinding name attribute */
  @property({ type: String })
  get label(): string {
    const name = `${
      this.element.hasAttribute('name')
        ? `${this.element.getAttribute('name')}`
        : ''
    }`;

    const description = `${
      this.element.hasAttribute('desc')
        ? ` - ${this.element.getAttribute('desc')}`
        : ''
    }`;

    return `${name}${description}`;
  }

  openEditWizard(): void {
    const wizard = wizards['TransformerWinding'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  remove(): void {
    if (this.element.parentElement)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.element.parentElement,
            element: this.element,
          },
        })
      );
  }

  private renderLNodes(): TemplateResult {
    const lNodes = getChildElementsByTagName(this.element, 'LNode');

    return lNodes.length
      ? html`<div class="container lnode">
          ${lNodes.map(
            lNode =>
              html`<l-node-editor
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`
          )}
        </div>`
      : html``;
  }

  private renderEqFunctions(): TemplateResult {
    if (!this.showfunctions) return html``;
    const eqFunctions = getChildElementsByTagName(this.element, 'EqFunction');
    return eqFunctions.length
      ? html` ${eqFunctions.map(
          eqFunction =>
            html`<eq-function-editor
              .doc=${this.doc}
              .element=${eqFunction}
              ?showfunctions=${this.showfunctions}
            ></eq-function-editor>`
        )}`
      : html``;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.label}">
      <abbr slot="action" title="${translate('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('remove')}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.remove()}
        ></mwc-icon-button>
      </abbr>
      ${this.renderLNodes()} ${this.renderEqFunctions()}
    </action-pane> `;
  }

  static styles = css`
    ${styles}

    :host(.moving) {
      opacity: 0.3;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
}
