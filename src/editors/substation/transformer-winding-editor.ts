import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  query,
} from 'lit-element';

import { translate } from 'lit-translate';

import '@material/mwc-fab';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Menu } from '@material/mwc-menu';

import '../../action-icon.js';
import '../../action-pane.js';
import './eq-function-editor.js';
import './l-node-editor.js';
import './tapchanger-editor.js';

import { styles } from './foundation.js';
import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
  SCLTag,
  tags,
} from '../../foundation.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';

function childTags(element: Element | null | undefined): SCLTag[] {
  if (!element) return [];

  return tags[<SCLTag>element.tagName].children.filter(
    child => wizards[child].create !== emptyWizard
  );
}

@customElement('transformer-winding-editor')
export class TransformerWindingEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({type: Number})
  editCount = -1;
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

  @query('mwc-menu') addMenu!: Menu;
  @query('mwc-icon-button[icon="playlist_add"]') addButton!: IconButton;

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

  private openCreateWizard(tagName: string): void {
    const wizard = wizards[<SCLTag>tagName].create(this.element!);

    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  updated(): void {
    if (this.addMenu && this.addButton)
      this.addMenu.anchor = <HTMLElement>this.addButton;
  }

  private renderLNodes(): TemplateResult {
    const lNodes = getChildElementsByTagName(this.element, 'LNode');

    return lNodes.length
      ? html`<div class="container lnode">
          ${lNodes.map(
            lNode =>
              html`<l-node-editor
                .editCount=${this.editCount} .doc=${this.doc}
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
              .editCount=${this.editCount} .doc=${this.doc}
              .element=${eqFunction}
              ?showfunctions=${this.showfunctions}
            ></eq-function-editor>`
        )}`
      : html``;
  }

  private renderTapChanger(): TemplateResult {
    if (!this.showfunctions) return html``;
    const tapChangers = getChildElementsByTagName(this.element, 'TapChanger');
    return tapChangers.length
      ? html` ${tapChangers.map(
          tapChanger =>
            html`<tapchanger-editor
              .editCount=${this.editCount} .doc=${this.doc}
              .element=${tapChanger}
              ?showfunctions=${this.showfunctions}
            ></tapchanger-editor>`
        )}`
      : html``;
  }

  private renderAddButtons(): TemplateResult[] {
    return childTags(this.element).map(
      child =>
        html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`
    );
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
      <abbr
        slot="action"
        style="position:relative;"
        title="${translate('add')}"
      >
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => (this.addMenu.open = true)}
        ></mwc-icon-button
        ><mwc-menu
          corner="BOTTOM_RIGHT"
          menuCorner="END"
          @action=${(e: Event) => {
            const tagName = (<ListItem>(<Menu>e.target).selected).value;
            this.openCreateWizard(tagName);
          }}
          >${this.renderAddButtons()}</mwc-menu
        ></abbr
      >
      ${this.renderLNodes()} ${this.renderEqFunctions()}
      ${this.renderTapChanger()}
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
