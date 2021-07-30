import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';
import { newActionEvent, newWizardEvent } from '../foundation.js';
import { wizards } from '../wizards/wizard-library.js';
import { ZerolinePane } from '../zeroline-pane.js';

import { cloneElement, selectors, startMove, styles } from './foundation.js';

import './voltage-level-editor.js';

/** [[`Substation`]] plugin subeditor for editing `Substation` sections. */
@customElement('substation-editor')
export class SubstationEditor extends LitElement {
  /** The edited `Element`, a common property of all Substation subeditors. */
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;

  /** [[element | `element.name`]] */
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  /** [[element | `element.desc`]] */
  @property({ type: String })
  get desc(): string | null {
    return this.element.getAttribute('desc');
  }

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Element[] = () => {
    return [];
  };

  /** Opens a [[`WizardDialog`]] for editing [[`element`]]. */
  openEditWizard(): void {
    const wizard = wizards['Substation'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  /** Opens a [[`WizardDialog`]] for adding a new `VoltageLevel`. */
  openVoltageLevelWizard(): void {
    const wizard = wizards['VoltageLevel'].create(this.element);
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
          ${ieds.map(ied => html`<ied-editor .element=${ied}></ied-editor>`)}
        </div>`
      : html``;
  }

  renderHeader(): TemplateResult {
    return html`
        <h1>
          ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
          ${
            this.readonly
              ? html``
              : html`<abbr title="${translate('add')}">
                    <mwc-icon-button
                      icon="playlist_add"
                      @click=${() => this.openVoltageLevelWizard()}
                    ></mwc-icon-button>
                  </abbr>
                  <nav>
                    <abbr title="${translate('lnode.tooltip')}">
                      <mwc-icon-button
                        icon="account_tree"
                        @click=${() => this.openLNodeWizard()}
                      ></mwc-icon-button>
                    </abbr>
                    <abbr title="${translate('duplicate')}">
                      <mwc-icon-button
                        icon="content_copy"
                        @click=${() => cloneElement(this)}
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
                        @click=${() =>
                          startMove(this, SubstationEditor, SubstationEditor)}
                      ></mwc-icon-button>
                    </abbr>
                    <abbr title="${translate('remove')}">
                      <mwc-icon-button
                        icon="delete"
                        @click=${() => this.remove()}
                      ></mwc-icon-button>
                    </abbr>
                  </nav>`
          }
          </nav>
        </h1>
      `;
  }

  render(): TemplateResult {
    return html`
      <section tabindex="0">
        ${this.renderHeader()} ${this.renderIedContainer()}
        ${Array.from(this.element.querySelectorAll(selectors.VoltageLevel)).map(
          voltageLevel =>
            html`<voltage-level-editor
              .element=${voltageLevel}
              .getAttachedIeds=${this.getAttachedIeds}
              ?readonly=${this.readonly}
            ></voltage-level-editor>`
        )}
      </section>
    `;
  }

  static styles = css`
    ${styles}

    section {
      overflow: hidden;
    }

    :host {
      width: 100vw;
    }
  `;
}
