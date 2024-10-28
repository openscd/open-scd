import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { get } from 'lit-translate';

import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import { Dialog } from '@material/mwc-dialog';
import { Menu } from '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';

import '@openscd/open-scd/src/action-pane.js';
import './ied-editor.js';
import './conducting-equipment-editor.js';
import './general-equipment-editor.js';
import './powertransformer-editor.js';
import { VoltageLevelEditor } from './voltage-level-editor.js';
import {
  newWizardEvent,
  SCLTag,
  tags,
} from '@openscd/open-scd/src/foundation.js';

import {
  getChildElementsByTagName,
} from '@openscd/xml';

import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import {
  bayIcon,
  voltageLevelIcon,
} from '@openscd/open-scd/src/icons/icons.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
import {
  cloneSubstationElement,
  renderGeneralEquipment,
  redirectDialog,
  startMove,
  styles,
} from './foundation.js';

function childTags(element: Element | null | undefined): SCLTag[] {
  if (!element) return [];

  return tags[<SCLTag>element.tagName].children.filter(
    child => wizards[child].create !== emptyWizard
  );
}

/** [[`SubstationEditor`]] subeditor for a `Bay` element. */
@customElement('bay-editor')
export class BayEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;
  /** Whether `Function` and `SubFunction` are rendered */
  @property({ type: Boolean })
  showfunctions = false;

  @property({ type: String })
  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc');

    return `${name} ${desc ? `- ${desc}` : ''}`;
  }

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Element[] = () => {
    return [];
  };

  @state()
  cloneUI = false;

  @query('mwc-dialog') dialog!: Dialog;
  @query('mwc-menu') addMenu!: Menu;
  @query('mwc-icon-button[icon="playlist_add"]') addButton!: IconButton;

  openEditWizard(): void {
    const wizard = wizards['Bay'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  /** Opens a [[`WizardDialog`]] for editing `LNode` connections. */
  openLNodeWizard(): void {
    const wizard = wizards['LNode'].create(this.element);
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

  private openCreateWizard(tagName: string): void {
    const wizard = wizards[<SCLTag>tagName].create(this.element!);

    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  updated(): void {
    this.addMenu.anchor = <HTMLElement>this.addButton;
  }

  private renderRedirectUI(): TemplateResult {
    if (!this.cloneUI) return html``;

    return redirectDialog(this.element);
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

  renderFunctions(): TemplateResult {
    if (!this.showfunctions) return html``;

    const functions = getChildElementsByTagName(this.element, 'Function');
    return html` ${functions.map(
      fUnction =>
        html`<function-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${fUnction}
          ?showfunctions=${this.showfunctions}
        ></function-editor>`
    )}`;
  }

  renderIedContainer(): TemplateResult {
    const ieds = this.getAttachedIeds?.(this.element) ?? [];
    return ieds?.length
      ? html`<div id="iedcontainer">
          ${ieds.map(
            ied =>
              html`<ied-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${ied}
              ></ied-editor>`
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

  render(): TemplateResult {
    return html`${this.renderRedirectUI()}<action-pane label="${this.header}">
        <mwc-icon class="substation-editor-icon" slot="icon"
          >${bayIcon}</mwc-icon
        >
        <abbr slot="action" title="${get('lnode.tooltip')}">
          <mwc-icon-button
            icon="account_tree"
            @click="${() => this.openLNodeWizard()}"
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get('duplicate')}">
          <mwc-icon-button
            icon="content_copy"
            @click=${() => cloneSubstationElement(this)}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get('edit')}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get('move')}">
          <mwc-icon-button
            icon="forward"
            @click=${() => startMove(this, BayEditor, [VoltageLevelEditor])}
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
          >
        </abbr>
        ${renderGeneralEquipment(this.doc, this.element, this.showfunctions)}
        ${this.renderIedContainer()}${this.renderLNodes()}${this.renderFunctions()}
        <div
          class="${classMap({
            content: true,
            actionicon: !this.showfunctions,
          })}"
        >
          ${Array.from(
            getChildElementsByTagName(this.element, 'PowerTransformer')
          ).map(
            pwt =>
              html`<powertransformer-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${pwt}
                ?showfunctions=${this.showfunctions}
              ></powertransformer-editor>`
          )}
          ${Array.from(
            getChildElementsByTagName(this.element, 'ConductingEquipment')
          ).map(
            voltageLevel =>
              html`<conducting-equipment-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${voltageLevel}
                ?readonly=${this.readonly}
                ?showfunctions=${this.showfunctions}
              ></conducting-equipment-editor>`
          )}
        </div>
      </action-pane> `;
  }

  static styles = css`
    ${styles}

    .content.actionicon {
      display: grid;
      grid-gap: 12px;
      padding: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }

    conducting-equipment-editor[showfunctions] {
      margin: 4px 8px 16px;
    }
  `;
}
