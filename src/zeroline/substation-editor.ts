import {
  css,
  customElement,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import {
  html,
  IconButton,
  newActionEvent,
  newWizardEvent,
} from '../foundation.js';
import {
  cloneSubstationElement,
  selectors,
  startMove,
  styles,
} from './foundation.js';

import { wizards } from '../wizards/wizard-library.js';

import './voltage-level-editor.js';
import { EditorContainer } from '../editor-container.js';
import { IedEditor } from './ied-editor.js';

/** [[`Substation`]] plugin subeditor for editing `Substation` sections. */
@customElement('substation-editor')
export class SubstationEditor extends LitElement {
  /** The edited `Element`, a common property of all Substation subeditors. */
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Element[] = () => {
    return [];
  };

  /** Opens a [[`WizardDialog`]] for editing [[`element`]]. */
  openEditWizard(): void {
    const wizard = wizards['Substation'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  /** Opens a [[`WizardDialog`]] for editing `LNode` connections. */
  openLNodeWizard(): void {
    const wizard = wizards['LNode'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  /** Deletes [[`element`]]. */
  remove(): void {
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
    return html`<${EditorContainer} .element=${this.element}>
      <abbr slot="header" title="${translate('lnode.tooltip')}">
        <${IconButton}
          icon="account_tree"
          @click=${() => this.openLNodeWizard()}
        ></${IconButton}>
      </abbr>
      <abbr slot="header" title="${translate('duplicate')}">
        <${IconButton}
          icon="content_copy"
          @click=${() => cloneSubstationElement(this)}
        ></${IconButton}>
      </abbr>
      <abbr slot="header" title="${translate('edit')}">
        <${IconButton}
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></${IconButton}>
      </abbr>
      <abbr slot="header" title="${translate('move')}">
        <${IconButton}
          icon="forward"
          @click=${() => startMove(this, SubstationEditor, SubstationEditor)}
        ></${IconButton}>
      </abbr>
      <abbr slot="header" title="${translate('remove')}">
        <${IconButton}
          icon="delete"
          @click=${() => this.remove()}
        ></${IconButton}
      ></abbr>
      ${this.renderIedContainer()}
      ${Array.from(this.element.querySelectorAll(selectors.VoltageLevel)).map(
        voltageLevel =>
          html`<voltage-level-editor
            .element=${voltageLevel}
            .getAttachedIeds=${this.getAttachedIeds}
            ?readonly=${this.readonly}
          ></voltage-level-editor>`
      )}</${EditorContainer}
    >`;
  }

  static styles = css`
    ${styles}
  `;
}
