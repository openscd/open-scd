import {
  LitElement,
  html,
  TemplateResult,
  property,
  query,
  css,
} from 'lit-element';

import '@material/mwc-button';
import '@material/mwc-fab';
import '@material/mwc-icon-button';
import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import { Menu } from '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';

import { mdcTheme } from '../colors.js';
import {
  CloseableElement,
  EditorAction,
  WizardInput,
  newWizardEvent,
} from '../foundation.js';

import './substation/voltage-level-editor.js';
import { voltageLevelWizard } from './substation/voltage-level-editor.js';

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

  @query('mwc-menu') menuUI!: Menu;
  @query('h1 > mwc-icon-button') menuIconUI!: IconButton;

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

  updated(): void {
    if (this.menuUI) this.menuUI.anchor = this.menuIconUI;
  }

  openVoltageLevelWizard(): void {
    if (!this.element) return;
    const event = newWizardEvent(voltageLevelWizard({ parent: this.element }));
    this.dispatchEvent(event);
  }

  openSubstationWizard(): void {
    const [heading, actionName, actionIcon] = this.element
      ? ['Edit Substation', 'Save', 'edit']
      : ['Add Substation', 'Add', 'add'];
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
            helper="Substation Name"
            label="name"
            required
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            .maybeValue=${this.desc}
            helper="Substation Description"
            label="desc"
            nullable
          ></wizard-textfield>`,
        ],
      },
    ]);
    this.dispatchEvent(event);
  }

  constructor() {
    super();

    this.substationEditAction = this.substationEditAction.bind(this);
  }

  renderHeader(): TemplateResult {
    if (!this.element) return html`<h1>No Substation</h1>`;
    return html`
      <h1>
        ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
        <mwc-icon-button
          icon="more_vert"
          @click=${() => this.menuUI.show()}
        ></mwc-icon-button>
        <mwc-icon-button
          icon="add"
          @click=${() => this.openVoltageLevelWizard()}
        ></mwc-icon-button>
        <mwc-menu
          .anchor=${this.menuIconUI}
          corner="BOTTOM_RIGHT"
          @action=${(ae: CustomEvent<ActionDetail>) => {
            if (ae.detail.index == 0) this.openVoltageLevelWizard();
          }}
        >
          <mwc-list-item>Add Voltage Level</mwc-list-item>
        </mwc-menu>
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
    ${mdcTheme}

    :host {
      height: calc(100vh - 122px);
      width: calc(100vw - 2 * 5px);
      overflow: auto;
      position: absolute;
      bottom: 0px;
      left: 0px;
      margin: 5px;
      background: var(--mdc-theme-surface);
    }

    @media screen and (max-width: 600px) {
      :host {
        height: calc(100vh - 114px);
      }
    }

    h1 {
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      background: var(--mdc-theme-on-surface);
      color: var(--mdc-theme-surface);
      margin: 0px;
      padding-left: 0.5em;
      padding-top: 0.25em;
      padding-bottom: 0.25em;
    }

    h1 > mwc-icon-button {
      float: right;
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
