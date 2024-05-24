import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  query,
} from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-fab';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Menu } from '@material/mwc-menu';

import '@openscd/open-scd/src/action-icon.js';
import '@openscd/open-scd/src/action-pane.js';
import './l-node-editor.js';
import './eq-function-editor.js';
import {
  newWizardEvent,
  SCLTag,
  tags,
} from '@openscd/open-scd/src/foundation.js';

import { getChildElementsByTagName } from '@openscd/xml';

import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';

function childTags(element: Element | null | undefined): SCLTag[] {
  if (!element) return [];

  return tags[<SCLTag>element.tagName].children.filter(
    child => wizards[child].create !== emptyWizard
  );
}

/** [[`SubstationEditor`]] subeditor for a child-less `SubEquipment` element. */
@customElement('sub-equipment-editor')
export class SubEquipmentEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
  /** SCL element SubEquipment */
  @property({ attribute: false })
  element!: Element;

  /** SubEquipment name attribute */
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

    const phase = `${
      this.element.hasAttribute('phase')
        ? ` (${this.element.getAttribute('phase')})`
        : ''
    }`;

    return `${name}${description}${phase}`;
  }

  @query('mwc-menu') addMenu!: Menu;
  @query('mwc-icon-button[icon="playlist_add"]') addButton!: IconButton;

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

  private renderAddButtons(): TemplateResult[] {
    return childTags(this.element).map(
      child =>
        html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`
    );
  }

  private renderLNodes(): TemplateResult {
    const lNodes = getChildElementsByTagName(this.element, 'LNode');

    return lNodes.length
      ? html`<div class="container lnode">
          ${lNodes.map(
            lNode =>
              html`<l-node-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`
          )}
        </div>`
      : html``;
  }

  private renderEqFunctions(): TemplateResult {
    const eqFunctions = getChildElementsByTagName(this.element, 'EqFunction');
    return eqFunctions.length
      ? html` ${eqFunctions.map(
          eqFunction =>
            html`<eq-function-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${eqFunction}
            ></eq-function-editor>`
        )}`
      : html``;
  }

  private openEditWizard(): void {
    const wizard = wizards['SubEquipment'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.label}">
      <abbr slot="action" title="${get('edit')}">
        <mwc-icon-button icon="edit" @click=${() => this.openEditWizard()}>
        </mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${get('remove')}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.remove()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" style="position:relative;" title="${get('add')}">
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
        >
      </abbr>

      ${this.renderLNodes()} ${this.renderEqFunctions()}
    </action-pane> `;
  }

  static styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    .container.lnode {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }
  `;
}
