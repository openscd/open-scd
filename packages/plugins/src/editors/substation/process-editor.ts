import {
  css,
  customElement,
  html,
  LitElement,
  TemplateResult,
  property,
  state,
  query,
} from 'lit-element';

import { get } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Menu } from '@material/mwc-menu';

import './conducting-equipment-editor.js';
import './function-editor.js';
import './general-equipment-editor.js';
import './l-node-editor.js';
import './line-editor.js';
import './process-editor.js';
import './substation-editor.js';
import './process-editor.js';

import { processIcon } from '@openscd/open-scd/src/icons/icons.js';
import { styles } from './foundation.js';
import {
  newWizardEvent,
  SCLTag,
  tags,
} from '@openscd/open-scd/src/foundation.js';

import {
  getChildElementsByTagName,
} from '@openscd/xml';

import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';

function childTags(element: Element | null | undefined): SCLTag[] {
  if (!element) return [];

  return tags[<SCLTag>element.tagName].children.filter(
    child => wizards[child].create !== emptyWizard
  );
}

@customElement('process-editor')
export class ProcessEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
  /** SCL element Process */
  @property({ attribute: false })
  element!: Element;
  /** Whether `Function` and `LNode` are rendered */
  @property({ type: Boolean })
  showfunctions = false;

  @state()
  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc');

    return `${name} ${desc ? `—${desc}` : ''}`;
  }

  @query('mwc-menu') addMenu!: Menu;
  @query('mwc-icon-button[icon="playlist_add"]') addButton!: IconButton;

  private openEditWizard(): void {
    const wizard = wizards['Process'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openCreateWizard(tagName: string): void {
    const wizard = wizards[<SCLTag>tagName].create(this.element!);

    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private renderConductingEquipments(): TemplateResult {
    const ConductingEquipments = getChildElementsByTagName(
      this.element,
      'ConductingEquipment'
    );
    return html` ${ConductingEquipments.map(
      ConductingEquipment =>
        html`<conducting-equipment-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${ConductingEquipment}
          ?showfunctions=${this.showfunctions}
        ></conducting-equipment-editor>`
    )}`;
  }

  private renderGeneralEquipments(): TemplateResult {
    const GeneralEquipments = getChildElementsByTagName(
      this.element,
      'GeneralEquipment'
    );
    return html` ${GeneralEquipments.map(
      GeneralEquipment =>
        html`<general-equipment-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${GeneralEquipment}
          ?showfunctions=${this.showfunctions}
        ></general-equipment-editor>`
    )}`;
  }

  private renderLines(): TemplateResult {
    const Lines = getChildElementsByTagName(this.element, 'Line');
    return html` ${Lines.map(
      Line =>
        html`<line-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${Line}
          ?showfunctions=${this.showfunctions}
        ></line-editor>`
    )}`;
  }

  private renderSubstations(): TemplateResult {
    const Substations = getChildElementsByTagName(this.element, 'Substation');
    return html` ${Substations.map(
      Substation =>
        html`<substation-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${Substation}
          ?showfunctions=${this.showfunctions}
        ></substation-editor>`
    )}`;
  }

  private renderProcesses(): TemplateResult {
    const Processes = getChildElementsByTagName(this.element, 'Process');
    return html` ${Processes.map(
      Process =>
        html`<process-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${Process}
          ?showfunctions=${this.showfunctions}
        ></process-editor>`
    )}`;
  }

  private renderFunctions(): TemplateResult {
    if (!this.showfunctions) return html``;

    const Functions = getChildElementsByTagName(this.element, 'Function');
    return html` ${Functions.map(
      Function =>
        html`<function-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${Function}
          ?showfunctions=${this.showfunctions}
        ></function-editor>`
    )}`;
  }

  private renderLNodes(): TemplateResult {
    if (!this.showfunctions) return html``;

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

  private renderAddButtons(): TemplateResult[] {
    return childTags(this.element).map(
      child =>
        html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`
    );
  }

  updated(): void {
    if (this.addMenu && this.addButton)
      this.addMenu.anchor = <HTMLElement>this.addButton;
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

  render(): TemplateResult {
    return html`<action-pane label=${this.header}>
      <mwc-icon class="substation-editor-icon" slot="icon"
        >${processIcon}</mwc-icon
      >
      <abbr slot="action" title="${get('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
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
        ></abbr
      >
      ${this.renderConductingEquipments()}${this.renderGeneralEquipments()}${this.renderFunctions()}${this.renderLNodes()}
      ${this.renderLines()} ${this.renderSubstations()}${this.renderProcesses()}
    </action-pane>`;
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
