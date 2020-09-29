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
import { Select } from '@material/mwc-select';

import '../mwc-textfield-nullable.js';
import { NullableTextFieldWithUnit } from '../nullable-textfield-with-unit.js';
import '../nullable-textfield-with-unit.js';
import { Action, Wizard, WizardInput } from '../foundation.js';
import { styles } from './substation/substation-css.js';
export default class SubstationEditor extends LitElement {
  defaultNomFreq = 50;
  defaultNumPhases = null;
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
  @query('mwc-dialog#create-voltage-level') createVoltageLevelUI!: Dialog;
  @query('#voltageLevelName')
  voltageLevelNameUI!: NullableTextFieldWithUnit;
  @query('#voltageLevelDesc')
  voltageLevelDescUI!: NullableTextFieldWithUnit;
  @query('#voltageLevelNomFreq')
  voltageLevelNomFreqUI!: NullableTextFieldWithUnit;
  @query('#voltageLevelNumPhases')
  voltageLevelNumPhasesUI!: NullableTextFieldWithUnit;
  @query('#Voltage')
  voltageLevelVoltageUI!: NullableTextFieldWithUnit;

  checkVoltageLevelValidity(): boolean {
    return (
      this.element !== null &&
      Array.from(
        this.createVoltageLevelUI.querySelectorAll(
          'nullable-textfield-with-unit'
        )
      ).every(tf => tf.checkValidity())
    );
  }

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
              : `<Voltage unit="V" multiplier="${multiplier}">${Voltage}</Voltage>`
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
    const name = inputs.find(i => i.label === 'name')?.value ?? '';
    const desc = inputs.find(i => i.label === 'desc')?.value ?? null;
    const nomFreq = inputs.find(i => i.label === 'nomFreq')?.value ?? null;
    const numPhases = inputs.find(i => i.label === 'numPhases')?.value ?? null;
    const Voltage = inputs.find(i => i.label === 'Voltage')?.value ?? null;
    this.newVoltageLevelCreateAction(
      this.voltageLevelNameUI.value,
      this.voltageLevelDescUI.maybeValue,
      this.voltageLevelNomFreqUI.maybeValue,
      this.voltageLevelNumPhasesUI.maybeValue,
      this.voltageLevelVoltageUI.maybeValue,
      this.voltageLevelVoltageUI.multiplier
    );
    return [];
  }

  updated(): void {
    if (this.menuUI) this.menuUI.anchor = this.menuIconUI;
  }

  renderCreateVoltageLevelUI(): TemplateResult {
    if (!this.element) return html``;
    return html`<mwc-dialog
      heading="Add Voltage Level"
      id="create-voltage-level"
    >
      <nullable-textfield-with-unit
        id="voltageLevelName"
        label="name"
        helper="Voltage Level Name"
        required
        dialogInitialFocus
      ></nullable-textfield-with-unit>
      <nullable-textfield-with-unit
        id="voltageLevelDesc"
        label="desc"
        nullable="true"
        helper="Description"
      ></nullable-textfield-with-unit>
      <nullable-textfield-with-unit
        id="voltageLevelNomFreq"
        label="nomFreq"
        nullable="true"
        style="flex:auto"
        .Value="${this.defaultNomFreq}"
        helper="Nominal Frequency in Hz"
        required
        pattern="[0-9]*[.]?[0-9]{1,2}"
      ></nullable-textfield-with-unit>
      <nullable-textfield-with-unit
        id="voltageLevelNumPhases"
        label="numPhases"
        nullable="true"
        .Value="${this.defaultNumPhases}"
        helper="Number of Phases"
        defaultValue="Jakob"
        required
        type="number"
        min="1"
        max="255"
      ></nullable-textfield-with-unit>
      <nullable-textfield-with-unit
        id="Voltage"
        nullable
        unit="V"
        .multipliers=${['G', 'M', 'k', '', 'm']}
        preSelectedMultiplier="k"
        label="Voltage"
        .Value="${this.defaultVoltage}"
        helper="Voltage in kV"
        required
        pattern="[0-9]*[.]?[0-9]{1,3}"
      ></nullable-textfield-with-unit>
      <mwc-button slot="secondaryAction" dialogAction="close">
        Cancel
      </mwc-button>
      <mwc-button @click=${this.requestVoltageLevelCreate} slot="primaryAction">
        Add
      </mwc-button>
    </mwc-dialog>`;
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
            if (ae.detail.index == 0) this.createVoltageLevelUI.show();
          }}
        >
          <mwc-list-item>Add Voltage Level</mwc-list-item>
        </mwc-menu>
      </h1>
    `;
  }

  openSubstationWizard(): void {
    const [heading, actionName, actionIcon] = this.element
      ? ['Edit Substation', 'Save', 'edit']
      : ['Add Substation', 'Add', 'add'];
    const event = new CustomEvent<{ wizard: Wizard }>('wizard', {
      bubbles: true,
      composed: true,
      detail: {
        wizard: [
          {
            title: 'Enter Substation name',
            content: [
              html`<mwc-textfield
                value=${this.name ?? ''}
                helper="Substation Name"
                label="name"
                required
                dialogInitialFocus
              ></mwc-textfield>`,
              html`<p>Testing</p>`,
            ],
          },
          {
            title: heading,
            primary: {
              icon: actionIcon,
              action: this.requestSubstationEdit,
              label: actionName,
            },
            content: [
              html`<p>Test</p>`,
              html`<mwc-textfield-nullable
                value=${this.desc ?? ''}
                helper="Substation Description"
                label="desc"
              ></mwc-textfield-nullable>`,
            ],
          },
        ],
      },
    });
    this.dispatchEvent(event);
  }

  render(): TemplateResult {
    return html`
      ${this.renderHeader()} ${this.renderCreateVoltageLevelUI()}
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
    this.requestSubstationEdit = this.requestSubstationEdit.bind(this);
  }

  static styles = styles;
}
