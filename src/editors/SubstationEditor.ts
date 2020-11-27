import {
  LitElement,
  html,
  TemplateResult,
  property,
  css,
  query,
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
} from '../foundation.js';

import { selectors, styles } from './substation/foundation.js';

import './substation/voltage-level-editor.js';
import { VoltageLevelEditor } from './substation/voltage-level-editor.js';
import { editlNode } from './substation/lnodewizard.js';

/** An editor [[`plugin`]] for editing the `Substation` section. */
export default class SubstationEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** The edited `Element`, a common property of all Substation subeditors. */
  @property()
  get element(): Element | null {
    return this.doc?.querySelector(selectors.Substation) ?? null;
  }

  /** [[element | `element.name`]] */
  @property({ type: String })
  get name(): string {
    return this.element?.getAttribute('name') ?? '';
  }
  /** [[element | `element.desc`]] */
  @property({ type: String })
  get desc(): string | null {
    return this.element?.getAttribute('desc') ?? null;
  }

  /** Subeditor container HTMLElement, a common property of Substation subeditors. */
  @query('main') container!: Element;

  /** Opens a [[`WizardDialog`]] for editing [[`element`]] if it exists, or for
   * creating a new `Substation` otherwise. */
  openSubstationWizard(): void {
    const [heading, actionName, actionIcon] = this.element
      ? [get('substation.wizard.title.edit'), get('edit'), 'edit']
      : [get('substation.wizard.title.add'), get('add'), 'add'];
    const event = newWizardEvent([
      {
        title: heading,
        primary: {
          icon: actionIcon,
          action: this.substationWizardAction,
          label: actionName,
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
    if (!this.element) return;
    const event = newWizardEvent(
      VoltageLevelEditor.wizard({ parent: this.element })
    );
    this.dispatchEvent(event);
  }

  /** Opens a [[`WizardDialog`]] for editing `LNode` connections. */
  openLNodeWizard(): void {
    if (this.element)
      this.dispatchEvent(newWizardEvent(editlNode(this.element)));
  }

  /** Deletes [[`element`]]. */
  remove(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.doc.documentElement,
            element: this.element,
            reference: this.element.nextElementSibling,
          },
        })
      );
  }

  newUpdateAction(name: string, desc: string | null): EditorAction {
    if (!this.element) throw new Error('Cannot edit a missing Substation');
    const newElement = <Element>this.element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    return {
      old: { element: this.element },
      new: { element: newElement },
    };
  }

  newCreateAction(name: string, desc: string | null): EditorAction {
    if (this.element) throw new Error('Will not create a second Substation');
    return {
      new: {
        parent: this.doc.documentElement,
        element: new DOMParser().parseFromString(
          `<Substation name="${name}"${
            desc === null ? '' : ` desc="${desc}"`
          }></Substation>`,
          'application/xml'
        ).documentElement,
        reference: null,
      },
    };
  }

  substationWizardAction(
    inputs: WizardInput[],
    dialog: CloseableElement
  ): EditorAction[] {
    const name = inputs.find(i => i.label === 'name')!.value;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    if (name === this.name && desc === this.desc) return [];
    const action = this.element
      ? this.newUpdateAction(name, desc)
      : this.newCreateAction(name, desc);
    dialog.close();
    return [action];
  }

  constructor() {
    super();

    this.substationWizardAction = this.substationWizardAction.bind(this);
  }

  renderHeader(): TemplateResult {
    if (!this.element)
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('substation.missing')}</span
        >
        <mwc-icon-button
          icon="add"
          @click=${() => this.openSubstationWizard()}
        ></mwc-icon-button>
      </h1>`;
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
            @click=${() => this.openSubstationWizard()}
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
      <main tabindex="0">
        ${this.renderHeader()}
        ${Array.from(
          this.element?.querySelectorAll(selectors.VoltageLevel) ?? []
        ).map(
          voltageLevel =>
            html`<voltage-level-editor
              .element=${voltageLevel}
            ></voltage-level-editor>`
        )}
      </main>
    `;
  }

  static styles = css`
    ${styles}

    main {
      overflow: auto;
    }

    :host {
      width: 100vw;
    }
  `;
}
