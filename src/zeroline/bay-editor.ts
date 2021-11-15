import {
  css,
  customElement,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import { startMove, styles, cloneSubstationElement } from './foundation.js';
import {
  getChildElementsByTagName,
  html,
  newActionEvent,
  newWizardEvent,
} from '../foundation.js';

import { wizards } from '../wizards/wizard-library.js';

import { VoltageLevelEditor } from './voltage-level-editor.js';
import './conducting-equipment-editor.js';
import { EditorContainer } from '../editor-container.js';
import { IedEditor } from './ied-editor.js';

/** [[`SubstationEditor`]] subeditor for a `Bay` element. */
@customElement('bay-editor')
export class BayEditor extends LitElement {
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Element[] = () => {
    return [];
  };

  openEditWizard(): void {
    const wizard = wizards['Bay'].edit(this.element);
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
          ${ieds.map(
            ied => html`<${IedEditor} .element=${ied}></${IedEditor}>`
          )}
        </div>`
      : html``;
  }

  render(): TemplateResult {
    return html`<${EditorContainer} .element=${this.element} nomargin>
      <abbr slot="header" title="${translate('lnode.tooltip')}">
        <mwc-icon-button
          icon="account_tree"
          @click="${() => this.openLNodeWizard()}"
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
          @click=${() => startMove(this, BayEditor, VoltageLevelEditor)}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="header" title="${translate('remove')}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.remove()}
        ></mwc-icon-button>
      </abbr>
      ${this.renderIedContainer()}
      <div id="ceContainer">
        ${Array.from(
          getChildElementsByTagName(this.element, 'ConductingEquipment')
        ).map(
          voltageLevel =>
            html`<conducting-equipment-editor
              .element=${voltageLevel}
              ?readonly=${this.readonly}
            ></conducting-equipment-editor>`
        )}
      </div>
    </${EditorContainer}> `;
  }

  static styles = css`
    ${styles}

    #ceContainer {
      display: grid;
      grid-gap: 12px;
      padding: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }
  `;
}
