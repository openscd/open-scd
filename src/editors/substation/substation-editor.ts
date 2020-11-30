import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item';

import {
  CloseableElement,
  EditorAction,
  newActionEvent,
  newWizardEvent,
  WizardInput,
  getValue,
} from '../../foundation.js';

import { selectors, styles } from './foundation.js';

import './voltage-level-editor.js';
import { VoltageLevelEditor } from './voltage-level-editor.js';
import { editlNode } from './lnodewizard.js';

/** An editor for editing the `Substation` section. */
@customElement('substation-editor')
export class SubstationEditor extends LitElement {
  /** The edited `Element`, a common property of all Substation subeditors. */
  @property()
  element!: Element;

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

  /** Subeditor container HTMLElement, a common property of Substation subeditors. */
  @query('section') container!: Element;

  /** Opens a [[`WizardDialog`]] for editing [[`element`]]. */
  openEditWizard(): void {
    const event = newWizardEvent([
      {
        title: get('substation.wizard.title.add'),
        primary: {
          icon: 'add',
          action: this.substationWizardAction,
          label: get('add'),
        },
        content: [
          html`<wizard-textfield
            .maybeValue=${this.name}
            helper="${translate('substation.wizard.nameHelper')}"
            label="name"
            required
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            .maybeValue=${this.desc}
            helper="${translate('substation.wizard.descHelper')}"
            label="desc"
            nullable
          ></wizard-textfield>`,
        ],
      },
    ]);
    this.dispatchEvent(event);
  }

  /** Opens a [[`WizardDialog`]] for adding a new `VoltageLevel`. */
  openVoltageLevelWizard(): void {
    this.dispatchEvent(
      newWizardEvent(VoltageLevelEditor.wizard({ parent: this.element }))
    );
  }

  /** Opens a [[`WizardDialog`]] for editing `LNode` connections. */
  openLNodeWizard(): void {
    this.dispatchEvent(newWizardEvent(editlNode(this.element)));
  }

  /** Deletes [[`element`]]. */
  remove(): void {
    this.dispatchEvent(
      newActionEvent({
        old: {
          parent: this.element.parentElement!,
          element: this.element,
          reference: this.element.nextElementSibling,
        },
      })
    );
  }

  newUpdateAction(name: string, desc: string | null): EditorAction {
    const newElement = <Element>this.element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    return {
      old: { element: this.element },
      new: { element: newElement },
    };
  }

  substationWizardAction(
    inputs: WizardInput[],
    dialog: CloseableElement
  ): EditorAction[] {
    const name = inputs.find(i => i.label === 'name')!.value;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    if (name === this.name && desc === this.desc) return [];
    const action = this.newUpdateAction(name, desc);
    dialog.close();
    return [action];
  }

  constructor() {
    super();

    this.substationWizardAction = this.substationWizardAction.bind(this);
  }

  renderHeader(): TemplateResult {
    return html`
      <h1>
        ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => this.openVoltageLevelWizard()}
        ></mwc-icon-button>
        <nav>
          <mwc-icon-button
            icon="account_tree"
            @click=${() => this.openLNodeWizard()}
          ></mwc-icon-button>
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button>
        </nav>
      </h1>
    `;
  }

  render(): TemplateResult {
    return html`
      <section tabindex="0">
        ${this.renderHeader()}
        ${Array.from(this.element.querySelectorAll(selectors.VoltageLevel)).map(
          voltageLevel =>
            html`<voltage-level-editor
              .element=${voltageLevel}
            ></voltage-level-editor>`
        )}
      </section>
    `;
  }

  static styles = css`
    ${styles}

    section {
      overflow: auto;
    }

    :host {
      width: 100vw;
    }
  `;
}
