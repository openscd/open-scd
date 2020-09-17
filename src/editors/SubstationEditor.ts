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
import { TextField } from '@material/mwc-textfield';
import { Menu } from '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';
import { Select } from '@material/mwc-select';

import '../mwc-textfield-nullable.js';
import { TextFieldNullable } from '../mwc-textfield-nullable.js';
import { newActionEvent, Action } from '../foundation.js';
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

  @query('mwc-dialog#edit-substation') editSubstationUI!: Dialog;
  @query('#edit-substation > mwc-textfield[label="name"]')
  substationNameUI!: TextField;
  @query('#edit-substation > mwc-textfield-nullable[label="desc"]')
  substationDescUI!: TextFieldNullable;
  @query('mwc-menu') menuUI!: Menu;
  @query('h1 > mwc-icon-button') menuIconUI!: IconButton;
  @query('mwc-dialog#create-voltage-level') createVoltageLevelUI!: Dialog;
  @query('#create-voltage-level > mwc-textfield[label="name"]')
  voltageLevelNameUI!: TextField;
  @query('#create-voltage-level > mwc-textfield-nullable[label="desc"]')
  voltageLevelDescUI!: TextFieldNullable;
  @query('#create-voltage-level > mwc-textfield-nullable[label="nomFreq"]')
  voltageLevelNomFreqUI!: TextFieldNullable;
  @query('#create-voltage-level > mwc-textfield-nullable[label="numPhases"]')
  voltageLevelNumPhasesUI!: TextFieldNullable;
  @query('#Voltage')
  voltageLevelVoltageUI!: TextFieldNullable;
  @query('#voltageUnitMultiplier')
  voltageLevelUnitMultiplier!: Select;

  checkSubstationValidity(): boolean {
    return (
      this.substationNameUI.checkValidity() &&
      this.substationDescUI.checkValidity()
    );
  }

  checkVoltageLevelValidity(): boolean {
    return (
      this.element !== null &&
      Array.from(
        this.createVoltageLevelUI.querySelectorAll('mwc-textfield')
      ).every(tf => tf.checkValidity()) &&
      Array.from(
        this.createVoltageLevelUI.querySelectorAll('mwc-textfield-nullable')
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
    name: string,
    desc: string | null,
    nomFreq: string | null,
    numPhases: string | null,
    Voltage: string | null,
    voltageLevelUnitMultiplier: string
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
              : `<Voltage unit="V" multiplier="${voltageLevelUnitMultiplier}">${Voltage}</Voltage>`
          }
          </VoltageLevel>`,
          'application/xml'
        ).documentElement,
        reference: null,
      },
    };
  }

  requestSubstationUpdate(): void {
    if (
      this.element &&
      this.checkSubstationValidity() &&
      (this.substationNameUI.value !== this.name ||
        this.substationDescUI.getValue() !== this.desc)
    ) {
      this.dispatchEvent(
        newActionEvent(
          this.newUpdateAction(
            this.substationNameUI.value,
            this.substationDescUI.getValue()
          )
        )
      );
      this.editSubstationUI.close();
    }
  }

  requestSubstationCreate(): void {
    if (
      !this.element &&
      this.checkSubstationValidity() &&
      this.substationNameUI.value
    ) {
      this.dispatchEvent(
        newActionEvent(
          this.newCreateAction(
            this.substationNameUI.value,
            this.substationDescUI.getValue()
          )
        )
      );
      this.editSubstationUI.close();
    }
  }

  requestVoltageLevelCreate(): void {
    if (this.element && this.checkVoltageLevelValidity()) {
      this.dispatchEvent(
        newActionEvent(
          this.newVoltageLevelCreateAction(
            this.voltageLevelNameUI.value,
            this.voltageLevelDescUI.getValue(),
            this.voltageLevelNomFreqUI.getValue(),
            this.voltageLevelNumPhasesUI.getValue(),
            this.voltageLevelVoltageUI.getValue(),
            this.voltageLevelUnitMultiplier.selected!.innerText.replace('V', '')
          )
        )
      );
      this.createVoltageLevelUI.close();
    }
  }

  updated(): void {
    if (this.menuUI) this.menuUI.anchor = this.menuIconUI;
  }

  renderEditSubstationUI(): TemplateResult {
    const [heading, action, actionName] = this.element
      ? ['Edit Substation', this.requestSubstationUpdate, 'Save']
      : ['Add Substation', this.requestSubstationCreate, 'Add'];
    return html`
      <mwc-dialog heading="${heading}" id="edit-substation">
        <mwc-textfield
          value="${this.name ?? ''}"
          label="name"
          helper="Substation Name"
          required
          dialogInitialFocus
        ></mwc-textfield>
        <mwc-textfield-nullable
          value="${this.desc ?? ''}"
          ?null=${this.element !== null && this.desc === null}
          label="desc"
          helper="Description"
        ></mwc-textfield-nullable>
        <mwc-button slot="secondaryAction" dialogAction="close">
          Cancel
        </mwc-button>
        <mwc-button @click=${action} slot="primaryAction">
          ${actionName}
        </mwc-button>
      </mwc-dialog>
    `;
  }

  renderCreateVoltageLevelUI(): TemplateResult {
    if (!this.element) return html``;
    return html`<mwc-dialog
      heading="Add Voltage Level"
      id="create-voltage-level"
    >
      <mwc-textfield
        label="name"
        helper="Voltage Level Name"
        required
        dialogInitialFocus
      ></mwc-textfield>
      <mwc-textfield-nullable
        label="desc"
        helper="Description"
      ></mwc-textfield-nullable>
      <mwc-textfield-nullable
        value="${this.defaultNomFreq}"
        label="nomFreq"
        helper="Nominal Frequency in Hz"
        required
        pattern="[0-9]*[.]?[0-9]{1,2}"
      ></mwc-textfield-nullable>
      <mwc-textfield-nullable
        value="${this.defaultNumPhases}"
        label="numPhases"
        helper="Number of Phases"
        required
        type="number"
        min="1"
        max="255"
      ></mwc-textfield-nullable>
      <div style="display: flex; flex-direction: row; ">
        <mwc-textfield-nullable
          id="Voltage"
          value="${this.defaultVoltage}"
          helper="Voltage in kV"
          required
          pattern="[0-9]*[.]?[0-9]{1,3}"
        ></mwc-textfield-nullable>
        <mwc-select
          id="voltageUnitMultiplier"
          style="--mdc-menu-max-width: 30px;"
        >
          <mwc-list-item>GV</mwc-list-item>
          <mwc-list-item>MV</mwc-list-item>
          <mwc-list-item selected>kV</mwc-list-item>
          <mwc-list-item>V</mwc-list-item>
          <mwc-list-item>mV</mwc-list-item>
        </mwc-select>
      </div>
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

  render(): TemplateResult {
    return html`
      ${this.renderHeader()} ${this.renderCreateVoltageLevelUI()}
      ${this.renderEditSubstationUI()}
      <mwc-fab
        @click=${() => (this.editSubstationUI.open = true)}
        icon="${this.element ? 'edit' : 'add'}"
      >
      </mwc-fab>
    `;
  }

  static styles = styles;
}
