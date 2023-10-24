import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
  css,
  query,
  state,
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { translate } from 'lit-translate';

import '@material/mwc-icon-button';
import { Menu } from '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';

import '../../action-pane.js';
import './bay-editor.js';
import './general-equipment-editor.js';
import './ied-editor.js';
import './powertransformer-editor.js';
import {
  selectors,
  startMove,
  cloneSubstationElement,
  styles,
  renderGeneralEquipment,
  redirectDialog,
} from './foundation.js';
import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
  SCLTag,
  tags,
} from '../../foundation.js';

import { SubstationEditor } from './substation-editor.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
import { Dialog } from '@material/mwc-dialog';

function childTags(element: Element | null | undefined): SCLTag[] {
  if (!element) return [];

  return tags[<SCLTag>element.tagName].children.filter(
    child => wizards[child].create !== emptyWizard
  );
}

/** [[`Substation`]] subeditor for a `VoltageLevel` element. */
@customElement('voltage-level-editor')
export class VoltageLevelEditor extends LitElement {
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

    return `${name} ${desc ? `- ${desc}` : ''}
    ${this.voltage === null ? '' : `(${this.voltage})`}`;
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
    const wizard = wizards['VoltageLevel'].edit(this.element);
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

  renderPowerTransformerContainer(): TemplateResult {
    const pwts = Array.from(
      this.element?.querySelectorAll(
        selectors.VoltageLevel + ' > PowerTransformer'
      ) ?? []
    );
    return pwts?.length
      ? html`<div
          class="${classMap({
            ptrContent: true,
            actionicon: !this.showfunctions,
          })}"
        >
          ${pwts.map(
            pwt =>
              html`<powertransformer-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${pwt}
                ?showfunctions=${this.showfunctions}
              ></powertransformer-editor>`
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
        <abbr slot="action" title="${translate('lnode.tooltip')}">
          <mwc-icon-button
            icon="account_tree"
            @click=${() => this.openLNodeWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('duplicate')}">
          <mwc-icon-button
            icon="content_copy"
            @click=${() => cloneSubstationElement(this)}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('edit')}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('move')}">
          <mwc-icon-button
            icon="forward"
            @click=${() =>
              startMove(this, VoltageLevelEditor, [SubstationEditor])}
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
          >
        </abbr>
        ${renderGeneralEquipment(this.doc, this.element, this.showfunctions)}
        ${this.renderIedContainer()}${this.renderLNodes()}${this.renderFunctions()}
        ${this.renderPowerTransformerContainer()}
        <div id="bayContainer">
          ${Array.from(this.element?.querySelectorAll(selectors.Bay) ?? []).map(
            bay => html`<bay-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${bay}
              .getAttachedIeds=${this.getAttachedIeds}
              ?readonly=${this.readonly}
              ?showfunctions=${this.showfunctions}
            ></bay-editor>`
          )}
        </div>
      </action-pane>`;
  }

  static styles = css`
    ${styles}

    #bayContainer {
      display: grid;
      grid-gap: 12px;
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
