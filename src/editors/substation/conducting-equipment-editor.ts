import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-fab';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-menu';
import { Menu } from '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';

import '../../action-icon.js';
import '../../action-pane.js';
import './eq-function-editor.js';
import './l-node-editor.js';
import './sub-equipment-editor.js';
import { startMove, getIcon, styles } from './foundation.js';
import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
  SCLTag,
  tags,
} from '../../foundation.js';
import { BayEditor } from './bay-editor.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';

function childTags(element: Element | null | undefined): SCLTag[] {
  if (!element) return [];

  return tags[<SCLTag>element.tagName].children.filter(
    child => wizards[child].create !== emptyWizard
  );
}

/** [[`SubstationEditor`]] subeditor for a `ConductingEquipment` element. */
@customElement('conducting-equipment-editor')
export class ConductingEquipmentEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
  /** SCL element ConductingEquipment */
  @property({ attribute: false })
  element!: Element;
  /** ConductingEquipment name attribute */
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  /** Whether `EqFunction`, `SubEqFunction` and `SubEquipment` are rendered */
  @property({ type: Boolean })
  showfunctions = false;

  @query('mwc-menu') addMenu!: Menu;
  @query('mwc-icon-button[icon="playlist_add"]') addButton!: IconButton;

  private openEditWizard(): void {
    const wizard = wizards['ConductingEquipment'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openLNodeWizard(): void {
    const wizard = wizards['LNode'].create(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openCreateWizard(tagName: string): void {
    const wizard = wizards[<SCLTag>tagName].create(this.element!);

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
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`
          )}
        </div>`
      : html``;
  }

  renderEqFunctions(): TemplateResult {
    if (!this.showfunctions) return html``;

    const eqFunctions = getChildElementsByTagName(this.element, 'EqFunction');
    return html` ${eqFunctions.map(
      eqFunction =>
        html`<eq-function-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${eqFunction}
          ?showfunctions=${this.showfunctions}
        ></eq-function-editor>`
    )}`;
  }

  private renderSubEquipments(): TemplateResult {
    if (!this.showfunctions) return html``;

    const subEquipments = getChildElementsByTagName(
      this.element,
      'SubEquipment'
    );

    return html` ${subEquipments.map(
      subEquipment =>
        html`<sub-equipment-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${subEquipment}
        ></sub-equipment-editor>`
    )}`;
  }

  private renderAddButtons(): TemplateResult[] {
    return childTags(this.element).map(
      child =>
        html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`
    );
  }

  renderContentPane(): TemplateResult {
    return html`<mwc-icon slot="icon" style="width:24px;height:24px"
        >${getIcon(this.element)}</mwc-icon
      >
      <abbr slot="action" title="${translate('lnode.tooltip')}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() => this.openLNodeWizard()}"
          icon="account_tree"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('edit')}">
        <mwc-icon-button
          slot="action"
          mini
          icon="edit"
          @click="${() => this.openEditWizard()}}"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('move')}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() =>
            startMove(this, ConductingEquipmentEditor, [BayEditor])}"
          icon="forward"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('remove')}">
        <mwc-icon-button
          slot="action"
          mini
          icon="delete"
          @click="${() => this.remove()}}"
        ></mwc-icon-button> </abbr
      ><abbr
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
        >
      </abbr>`;
  }

  renderContentIcon(): TemplateResult {
    return html`<mwc-icon slot="icon">${getIcon(this.element)}</mwc-icon>
      <mwc-fab
        slot="action"
        mini
        @click="${() => this.openLNodeWizard()}"
        icon="account_tree"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="edit"
        @click="${() => this.openEditWizard()}}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        @click="${() =>
          startMove(this, ConductingEquipmentEditor, [BayEditor])}"
        icon="forward"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="delete"
        @click="${() => this.remove()}}"
      ></mwc-fab>`;
  }

  render(): TemplateResult {
    if (this.showfunctions)
      return html`<action-pane label="${this.name}"
        >${this.renderContentPane()}${this.renderLNodes()}${this.renderEqFunctions()}${this.renderSubEquipments()}</action-pane
        ></action-pane
      >`;

    return html`<action-icon label="${this.name}"
      >${this.renderContentIcon()}</action-icon
    >`;
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
