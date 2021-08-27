import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import {
  startMove,
  styles,
  cloneSubstationElement,
  dragOver,
  dragStart,
  drop,
  dragLeave,
  dragEnd,
} from './foundation.js';
import { newActionEvent, newWizardEvent } from '../foundation.js';

import { wizards } from '../wizards/wizard-library.js';

import { VoltageLevelEditor } from './voltage-level-editor.js';
import './conducting-equipment-editor.js';
import { IedEditor } from './ied-editor.js';
import { ConductingEquipmentEditor } from './conducting-equipment-editor.js';

/** [[`SubstationEditor`]] subeditor for a `Bay` element. */
@customElement('bay-editor')
export class BayEditor extends LitElement {
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;

  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  @property({ type: String })
  get desc(): string | null {
    return this.element.getAttribute('desc') ?? null;
  }

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Element[] = () => {
    return [];
  };

  openEditWizard(): void {
    const wizard = wizards['Bay'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  openConductingEquipmentWizard(): void {
    const wizard = wizards['ConductingEquipment'].create(this.element);
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
      ? html`<div id="iedcontainer">
          ${ieds.map(ied => html`<ied-editor .element=${ied}></ied-editor>`)}
        </div>`
      : html``;
  }

  renderHeader(): TemplateResult {
    return html`<h3
      draggable="true"
      @dragstart="${(e: DragEvent) => dragStart(this, e)}"
    >
      ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
      ${this.readonly
        ? html``
        : html`<abbr title="${translate('add')}">
              <mwc-icon-button
                icon="playlist_add"
                @click=${() => this.openConductingEquipmentWizard()}
              ></mwc-icon-button>
            </abbr>
            <nav>
              <abbr title="${translate('lnode.tooltip')}">
                <mwc-icon-button
                  icon="account_tree"
                  @click="${() => this.openLNodeWizard()}"
                ></mwc-icon-button>
              </abbr>
              <abbr title="${translate('duplicate')}">
                <mwc-icon-button
                  icon="content_copy"
                  @click=${() => cloneSubstationElement(this)}
                ></mwc-icon-button>
              </abbr>
              <abbr title="${translate('edit')}">
                <mwc-icon-button
                  icon="edit"
                  @click=${() => this.openEditWizard()}
                ></mwc-icon-button>
              </abbr>
              <abbr title="${translate('move')}">
                <mwc-icon-button
                  icon="forward"
                  @click=${() => startMove(this, BayEditor, VoltageLevelEditor)}
                ></mwc-icon-button>
              </abbr>
              <abbr title="${translate('remove')}">
                <mwc-icon-button
                  icon="delete"
                  @click=${() => this.remove()}
                ></mwc-icon-button>
              </abbr>
            </nav>`}
    </h3>`;
  }

  render(): TemplateResult {
    return html`<section
      tabindex="0"
      @dragover="${(e: DragEvent) =>
        dragOver(this, e, ConductingEquipmentEditor, BayEditor)}"
      @drop="${(e: DragEvent) =>
        drop(this, e, ConductingEquipmentEditor, BayEditor)}"
      @dragleave="${() => dragLeave(this)}"
      @dragend="${() => dragEnd(this)}"
    >
      ${this.renderHeader()}
      <div>
        ${this.renderIedContainer()}
        <div id="ceContainer">
          ${Array.from(
            this.element?.querySelectorAll(
              ':root > Substation > VoltageLevel > Bay > ConductingEquipment'
            ) ?? []
          ).map(
            conductingEquipment =>
              html`<conducting-equipment-editor
                .element=${conductingEquipment}
                ?readonly=${this.readonly}
              ></conducting-equipment-editor>`
          )}
        </div>
      </div>
    </section> `;
  }

  static styles = css`
    ${styles}

    section {
      margin: 0px;
    }

    #ceContainer {
      display: grid;
      grid-gap: 12px;
      padding: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }
  `;
}
