import { LitElement, html, TemplateResult, property, query } from 'lit-element';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-fab';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import { Dialog } from '@material/mwc-dialog';
import { Menu } from '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';

import { WizardTextField } from '../wizard-textfield.js';
import '../wizard-textfield.js';
import { Action, newWizardEvent, WizardInput } from '../foundation.js';
import { styles } from './substation/substation-css.js';
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
  @query('#voltageLevelName')
  voltageLevelNameUI!: WizardTextField;
  @query('#voltageLevelDesc')
  voltageLevelDescUI!: WizardTextField;
  @query('#voltageLevelNomFreq')
  voltageLevelNomFreqUI!: WizardTextField;
  @query('#voltageLevelNumPhases')
  voltageLevelNumPhasesUI!: WizardTextField;
  @query('#Voltage')
  voltageLevelVoltageUI!: WizardTextField;

  newUpdateAction(name: string, desc: string | null): Action {
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

  newCreateAction(name: string, desc: string | null): Action {
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
  ): Action {
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

  requestSubstationEdit(inputs: WizardInput[]): Action[] {
    if (!inputs.every(wi => wi.checkValidity())) return [];
    const name = inputs.find(i => i.label === 'name')?.value ?? '';
    const desc = inputs.find(i => i.label === 'desc')?.value ?? null;
    const action = this.element
      ? this.newUpdateAction(name, desc)
      : this.newCreateAction(name, desc);
    return [action];
  }

  requestVoltageLevelCreate(inputs: WizardInput[]): Action[] {
    if (!(this.element && inputs.every(wi => wi.checkValidity()))) return [];
    const name = inputs.find(i => i.label === 'name')!;
    const desc = inputs.find(i => i.label === 'desc')!;
    const nomFreq = inputs.find(i => i.label === 'nomFreq')!;
    const numPhases = inputs.find(i => i.label === 'numPhases')!;
    const Voltage = inputs.find(i => i.label === 'Voltage')!;
    this.newVoltageLevelCreateAction(
      name.value,
      desc.maybeValue,
      nomFreq.maybeValue,
      numPhases.maybeValue,
      Voltage.maybeValue,
      Voltage.multiplier
    );
    return [];
  }

  updated(): void {
    if (this.menuUI) this.menuUI.anchor = this.menuIconUI;
  }

  openVoltageLevelWizard(): void {
    const event = newWizardEvent([
      {
        title: 'Add Voltage Level PAGE ONE',
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
          action: this.requestSubstationEdit,
          label: actionName,
        },
        content: [
          html`<wizard-textfield
            value=${this.name ?? ''}
            helper="Substation Name"
            label="name"
            required
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<p>Testing</p>`,
          html`<wizard-textfield
            value=${this.desc ?? ''}
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
        ${this.name} &mdash; ${this.desc}
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
      <mwc-fab
        @click=${this.openSubstationWizard}
        icon="${this.element ? 'edit' : 'add'}"
      >
      </mwc-fab>
    `;
  }

  constructor() {
    super();

    this.requestSubstationEdit = this.requestSubstationEdit.bind(this);
    this.requestVoltageLevelCreate = this.requestVoltageLevelCreate.bind(this);
  }

  static styles = styles;
}
