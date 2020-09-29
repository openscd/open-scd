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
import { NullableTextFieldWithUnit } from '../nullable-textfield-with-unit.js';
import '../nullable-textfield-with-unit.js';
import {
  newActionEvent,
  Action,
  Wizard,
  WizardInput,
  Create,
  ActionEvent,
} from '../foundation.js';
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

  @query('mwc-dialog#edit-substation') editSubstationUI!: Dialog;
  @query('#edit-substation > mwc-textfield[label="name"]')
  substationNameUI!: TextField;
  @query('#edit-substation > mwc-textfield-nullable[label="desc"]')
  substationDescUI!: TextFieldNullable;
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

  requestSubstationCreate(inputs: WizardInput[]): Action[] {
    if (
      !this.element &&
      inputs.every(wi => wi.checkValidity()) &&
      inputs.find(i => i.label === 'desc')?.value
    ) {
      const action = <Create>(
        this.newCreateAction(
          inputs.find(i => i.label === 'name')!.value,
          inputs.find(i => i.label === 'desc')!.value
        )
      );
      return [action];
    } else return [];
  }

  requestVoltageLevelCreate(): void {
    if (this.element && this.checkVoltageLevelValidity()) {
      this.dispatchEvent(
        newActionEvent(
          this.newVoltageLevelCreateAction(
            this.voltageLevelNameUI.maybeValue,
            this.voltageLevelDescUI.maybeValue,
            this.voltageLevelNomFreqUI.maybeValue,
            this.voltageLevelNumPhasesUI.maybeValue,
            this.voltageLevelVoltageUI.maybeValue,
            this.voltageLevelVoltageUI.multiplier
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
    return html`<mwc-dialog id="edit-substation"></mwc-dialog>`;
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
  /*
? html`<mwc-button
    slot="secondaryAction"
    dialogAction=${this.page.secondary.dialogAction}
    @click=${this.page.secondary.callback}
    label=${this.page.secondary.title}
    unelevated
  ></mwc-button>`
   */

  render(): TemplateResult {
    return html`
      ${this.renderHeader()} ${this.renderCreateVoltageLevelUI()}
      ${this.renderEditSubstationUI()}
      <mwc-fab
        @click=${() => {
          const [heading, action, actionName] = this.element
            ? ['Edit Substation', 'update', 'Save']
            : ['Add Substation', 'create', 'Add'];
          const event = new CustomEvent<{ wizard: Wizard }>('wizard', {
            bubbles: true,
            composed: true,
            detail: {
              wizard: {
                pages: [
                  {
                    title: heading,
                    primary: html`<mwc-button
                      slot="primaryAction"
                      dialogAction=${action}
                      label=${actionName}
                      icon="add"
                      trailingIcon
                      raised
                    ></mwc-button>`,
                    content: [
                      {
                        qualifiedName: 'name',
                        value: this.name ?? '',
                        helper: 'Substation Name',
                        dialogInitialFocus: true,
                        required: true,
                      },
                      {
                        qualifiedName: 'desc',
                        value: this.desc,
                        helper: 'Substation Name',
                        nullable: true,
                      },
                    ]?.map(ip =>
                      ip.nullable
                        ? html`<mwc-textfield-nullable
                            value=${ip.value}
                            helper=${ip.helper}
                            label=${ip.qualifiedName}
                            fullwidth
                          ></mwc-textfield-nullable>`
                        : html`<mwc-textfield
                            value=${ip.value}
                            helper=${ip.helper}
                            label=${ip.qualifiedName}
                            fullwidth
                          ></mwc-textfield>`
                    ),
                  },
                ],
                actions: { create: this.requestSubstationCreate },
              },
            },
          });

          this.dispatchEvent(event);
        }}
        icon="${this.element ? 'edit' : 'add'}"
      >
      </mwc-fab>
    `;
  }

  constructor() {
    super();

    this.requestSubstationCreate = this.requestSubstationCreate.bind(this);
    this.requestSubstationUpdate = this.requestSubstationUpdate.bind(this);
  }

  static styles = styles;
}
