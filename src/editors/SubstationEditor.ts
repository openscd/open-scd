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

import './substation/voltage-level-editor.js';
import {
  EditorAction,
  CloseableElement,
  newWizardEvent,
  WizardInput,
} from '../foundation.js';

export default class SubstationEditor extends LitElement {
  defaultNomFreq = 50;
  defaultNumPhases = 3;
  defaultVoltage = 110;

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

  newVoltageLevelCreateAction(
    name: string | null,
    desc: string | null,
    nomFreq: string | null,
    numPhases: string | null,
    Voltage: string | null,
    multiplier: string
  ): EditorAction {
    if (!this.element)
      throw new Error('Cannot create VoltageLevel without Substation');
    return {
      new: {
        parent: this.element,
        element: new DOMParser().parseFromString(
          `<VoltageLevel
            name="${name}"
            ${desc === null ? '' : `desc="${desc}"`}
            ${nomFreq === null ? '' : `nomFreq="${nomFreq}"`}
            ${numPhases === null ? '' : `numPhases="${numPhases}"`}
          >
          ${
            Voltage === null
              ? ''
              : `<Voltage unit="V" multiplier="${multiplier}">
              ${Voltage}</Voltage>`
          }
          </VoltageLevel>`,
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
    if (inputs.length < 2) return [];
    const name = inputs.find(i => i.label === 'name')?.maybeValue ?? '';
    const desc = inputs.find(i => i.label === 'desc')?.maybeValue ?? null;
    if (!name || (name === this.name && desc === this.desc)) return [];
    const action = this.element
      ? this.newUpdateAction(name, desc)
      : this.newCreateAction(name, desc);
    dialog.close();
    return [action];
  }

  voltageLevelCreateAction(
    inputs: WizardInput[],
    dialog: CloseableElement
  ): EditorAction[] {
    if (inputs.length < 5 || !this.element) return [];
    const name = inputs.find(i => i.label === 'name')!;
    const desc = inputs.find(i => i.label === 'desc')!;
    const nomFreq = inputs.find(i => i.label === 'nomFreq')!;
    const numPhases = inputs.find(i => i.label === 'numPhases')!;
    const Voltage = inputs.find(i => i.label === 'Voltage')!;
    const action = this.newVoltageLevelCreateAction(
      name.maybeValue,
      desc.maybeValue,
      nomFreq.maybeValue,
      numPhases.maybeValue,
      Voltage.maybeValue,
      Voltage.multiplier
    );
    dialog.close();
    return [action];
  }

  updated(): void {
    if (this.menuUI) this.menuUI.anchor = this.menuIconUI;
  }

  openVoltageLevelWizard(): void {
    const event = newWizardEvent([
      {
        title: 'Add Voltage Level',
        primary: {
          icon: 'add',
          label: 'Add',
          action: this.voltageLevelCreateAction,
        },
        content: [
          html`<wizard-textfield
            label="name"
            helper="Name"
            iconTrailing="title"
            required
            validationMessage="Required"
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            nullable="true"
            helper="Description"
            iconTrailing="description"
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="nomFreq"
            nullable="true"
            style="flex:auto"
            .maybeValue=${this.defaultNomFreq}
            defaultValue=${this.defaultNomFreq}
            helper="Nominal Frequency"
            suffix="Hz"
            required
            validationMessage="Must not be empty"
            pattern="[0-9]*[.]?[0-9]{1,2}"
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="numPhases"
            nullable="true"
            .maybeValue=${this.defaultNumPhases}
            defaultValue=${this.defaultNumPhases}
            helper="Number of Phases"
            suffix="#"
            required
            validationMessage="Must not be empty"
            type="number"
            min="1"
            max="255"
          ></wizard-textfield>`,
          html`<wizard-textfield
            nullable
            unit="V"
            .multipliers=${['G', 'M', 'k', '', 'm']}
            preSelectedMultiplier="k"
            label="Voltage"
            .maybeValue=${this.defaultVoltage}
            defaultValue=${this.defaultVoltage}
            helper="Voltage"
            required
            validationMessage="Must not be empty"
            pattern="[0-9]*[.]?[0-9]{1,3}"
          ></wizard-textfield>`,
        ],
      },
    ]);
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

  renderHeader(): TemplateResult {
    if (!this.element) return html`<h1>No Substation</h1>`;
    return html`
      <h1>
        ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
        <mwc-icon-button
          icon="more_vert"
          @click=${() => this.menuUI.show()}
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

  constructor() {
    super();

    this.substationEditAction = this.substationEditAction.bind(this);
    this.voltageLevelCreateAction = this.voltageLevelCreateAction.bind(this);
  }

  static styles = css`
    :host {
      height: calc(100vh - 122px);
      width: calc(100vw - 2 * 5px);
      overflow: auto;
      position: absolute;
      bottom: 0px;
      left: 0px;
      margin: 5px;
      background: var(--light-4);

      --mdc-theme-primary: #005496;
      --mdc-theme-secondary: #d20a11;
      --mdc-theme-background: #ffdd00;
      --mdc-theme-on-secondary: #ffdd00;
      --mdc-theme-on-background: #005496;
      --dark-4: #3b434f;
      --dark-3: #4f5a69;
      --dark-2: #637183;
      --dark-1: #7b889b;
      --light-1: #95a0af;
      --light-2: #afb7c3;
      --light-3: #cacfd7;
      --light-4: #e4e7eb;
    }

    @media screen and (max-width: 600px) {
      :host {
        height: calc(100vh - 114px);
      }
    }

    * {
      --mdc-theme-primary: #005496;
      --mdc-theme-secondary: #d20a11;
      --mdc-theme-background: #ffdd00;
      --mdc-theme-on-secondary: #ffdd00;
      --mdc-theme-on-background: #005496;
      --dark-4: #3b434f;
      --dark-3: #4f5a69;
      --dark-2: #637183;
      --dark-1: #7b889b;
      --light-1: #95a0af;
      --light-2: #afb7c3;
      --light-3: #cacfd7;
      --light-4: #e4e7eb;
    }

    h1 {
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      background: var(--dark-1);
      color: var(--light-4);
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
