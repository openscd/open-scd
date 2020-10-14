import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate, get } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-fab';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item';

import {
  CloseableElement,
  EditorAction,
  newActionEvent,
  newWizardEvent,
  WizardInput,
} from '../foundation.js';

import './substation/voltage-level-editor.js';
import { VoltageLevelEditor } from './substation/voltage-level-editor.js';

export default class SubstationEditor extends LitElement {
  @property()
  doc!: XMLDocument;
  @property()
  get element(): Element | null {
    return this.doc?.querySelector('Substation') ?? null;
  }
  @property()
  get parent(): Element {
    return this.doc.documentElement; // <SCL>
  }

  @property({ type: String })
  get name(): string {
    return this.element?.getAttribute('name') ?? '';
  }
  @property({ type: String })
  get desc(): string | null {
    return this.element?.getAttribute('desc') ?? null;
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
        parent: this.parent,
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

  substationEditAction(
    inputs: WizardInput[],
    dialog: CloseableElement
  ): EditorAction[] {
    const name = inputs.find(i => i.label === 'name')!.value;
    const desc = inputs.find(i => i.label === 'desc')!.maybeValue;
    if (name === this.name && desc === this.desc) return [];
    const action = this.element
      ? this.newUpdateAction(name, desc)
      : this.newCreateAction(name, desc);
    dialog.close();
    return [action];
  }

  openVoltageLevelWizard(): void {
    if (!this.element) return;
    const event = newWizardEvent(
      VoltageLevelEditor.wizard({ parent: this.element })
    );
    this.dispatchEvent(event);
  }

  openSubstationWizard(): void {
    const [heading, actionName, actionIcon] = this.element
      ? [get('substation.wizard.title.edit'), get('edit'), 'edit']
      : [get('substation.wizard.title.add'), get('add'), 'add'];
    const event = newWizardEvent([
      {
        title: heading,
        primary: {
          icon: actionIcon,
          action: this.substationEditAction,
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

  removeSubstation(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: { parent: this.parent, element: this.element, reference: null },
        })
      );
  }

  constructor() {
    super();

    this.substationEditAction = this.substationEditAction.bind(this);
  }

  renderHeader(): TemplateResult {
    if (!this.element)
      return html`<h1>
        <mwc-icon-button
          icon="add"
          @click=${() => this.openSubstationWizard()}
        ></mwc-icon-button>
        <span style="color: var(--base1)"
          >${translate('substation.missing')}</span
        >
      </h1>`;
    return html`
      <h1>
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => this.openVoltageLevelWizard()}
        ></mwc-icon-button>
        &vert;
        <mwc-icon-button
          icon="delete"
          @click=${() => this.removeSubstation()}
        ></mwc-icon-button>
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openSubstationWizard()}
        ></mwc-icon-button>
        ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
      </h1>
    `;
  }

  render(): TemplateResult {
    return html`
      ${this.renderHeader()}
      ${Array.from(this.element?.querySelectorAll('VoltageLevel') ?? []).map(
        voltageLevel =>
          html`<voltage-level-editor
            .element=${voltageLevel}
            .parent=${this.element}
          ></voltage-level-editor>`
      )}
      <mwc-fab
        @click=${this.openSubstationWizard}
        icon="${this.element ? 'edit' : 'add'}"
      >
      </mwc-fab>
    `;
  }

  static styles = css`
    :host {
      width: calc(100vw);
      overflow-x: hidden;
      margin: 0px;
      background: var(--mdc-theme-surface);
    }

    h1 {
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      background: var(--mdc-theme-primary);
      color: var(--mdc-theme-surface);
      margin: 0px;
      padding-left: 0.15em;
      padding-top: 0.3em;
    }

    h1 > mwc-icon-button {
      position: relative;
      top: -5px;
    }

    mwc-dialog {
      display: flex;
      flex-direction: column;
    }

    mwc-dialog > * {
      display: block;
      margin-top: 16px;
    }

    pre {
      font-family: 'Roboto Mono', monospace;
      font-weight: 300;
    }

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }
  `;
}
