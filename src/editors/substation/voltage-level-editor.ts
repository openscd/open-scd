import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
  query,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import {
  CloseableElement,
  EditorAction,
  newWizardEvent,
  Wizard,
  WizardAction,
  WizardInput,
} from '../../foundation.js';

interface VoltageLevelUpdateOptions {
  element: Element;
}
interface VoltageLevelCreateOptions {
  parent: Element;
}
type VoltageLevelWizardOptions =
  | VoltageLevelUpdateOptions
  | VoltageLevelCreateOptions;
function isVoltageLevelCreateOptions(
  options: VoltageLevelWizardOptions
): options is VoltageLevelCreateOptions {
  return (<VoltageLevelCreateOptions>options).parent !== undefined;
}

const initial = {
  nomFreq: '50',
  numPhases: '3',
  Voltage: '110',
  multiplier: 'k',
};

@customElement('voltage-level-editor')
export class VoltageLevelEditor extends LitElement {
  @property()
  parent!: Element;
  @property()
  element!: Element;
  @property()
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  @property()
  get desc(): string | null {
    return this.element.getAttribute('desc') ?? null;
  }
  @property()
  get voltage(): string | null {
    const V = this.element.querySelector('Voltage');
    if (V === null) return null;
    const v = V.textContent ?? '';
    const m = V.getAttribute('multiplier');
    const u = m === null ? 'V' : ' ' + m + 'V';
    return v ? v + u : null;
  }

  @query('h1') header!: Element;

  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(VoltageLevelEditor.wizard({ element: this.element }))
    );
  }

  renderHeader(): TemplateResult {
    return html`<h1>
      ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
      ${this.voltage === null ? '' : html`(${this.voltage})`}
      <mwc-icon-button
        icon="edit"
        @click=${() => this.openEditWizard()}
      ></mwc-icon-button>
    </h1>`;
  }

  render(): TemplateResult {
    return html`${this.renderHeader()}`;
  }

  static createAction(parent: Element): WizardAction {
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      const name = inputs.find(i => i.label === 'name')!.maybeValue;
      const desc = inputs.find(i => i.label === 'desc')!.maybeValue;
      const nomFreq = inputs.find(i => i.label === 'nomFreq')!.maybeValue;
      const numPhases = inputs.find(i => i.label === 'numPhases')!.maybeValue;
      const Voltage = inputs.find(i => i.label === 'Voltage')!.maybeValue;
      const multiplier = inputs.find(i => i.label === 'Voltage')!.multiplier;

      const action = {
        new: {
          parent,
          element: new DOMParser().parseFromString(
            `<VoltageLevel
              name="${name}"
              ${desc === null ? '' : `desc="${desc}"`}
              ${nomFreq === null ? '' : `nomFreq="${nomFreq}"`}
              ${numPhases === null ? '' : `numPhases="${numPhases}"`}
            >${
              Voltage === null
                ? ''
                : `<Voltage unit="V" ${
                    multiplier === null ? '' : `multiplier="${multiplier}"`
                  }
            >${Voltage}</Voltage>`
            }</VoltageLevel>`,
            'application/xml'
          ).documentElement,
          reference: null,
        },
      };

      wizard.close();
      return [action];
    };
  }

  static updateAction(element: Element): WizardAction {
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      const name = inputs.find(i => i.label === 'name')!.value;
      const desc = inputs.find(i => i.label === 'desc')!.maybeValue;
      const nomFreq = inputs.find(i => i.label === 'nomFreq')!.maybeValue;
      const numPhases = inputs.find(i => i.label === 'numPhases')!.maybeValue;
      const Voltage = inputs.find(i => i.label === 'Voltage')!.maybeValue;
      const multiplier = inputs.find(i => i.label === 'Voltage')!.multiplier;

      let voltageLevelAction: EditorAction | null;
      let voltageAction: EditorAction | null;
      console.warn(element.attributes);

      if (
        name === element.getAttribute('name') &&
        desc === element.getAttribute('desc') &&
        nomFreq === element.getAttribute('nomFreq') &&
        numPhases === element.getAttribute('numPhases')
      ) {
        voltageLevelAction = null;
      } else {
        const newElement = <Element>element.cloneNode(false);
        newElement.setAttribute('name', name);
        if (desc === null) newElement.removeAttribute('desc');
        else newElement.setAttribute('desc', desc);
        if (nomFreq === null) newElement.removeAttribute('nomFreq');
        else newElement.setAttribute('nomFreq', nomFreq);
        if (numPhases === null) newElement.removeAttribute('numPhases');
        else newElement.setAttribute('numPhases', numPhases);
        voltageLevelAction = { old: { element }, new: { element: newElement } };
      }

      if (
        Voltage ===
          (element.querySelector('Voltage')?.textContent?.trim() ?? null) &&
        multiplier ===
          (element.querySelector('Voltage')?.getAttribute('multiplier') ?? null)
      ) {
        voltageAction = null;
      } else {
        const oldVoltage = element.querySelector('Voltage');

        if (oldVoltage === null) {
          const newVoltage = new DOMParser().parseFromString(
            '<Voltage unit="V"></Voltage>',
            'application/xml'
          ).documentElement;
          newVoltage.textContent = Voltage;
          if (multiplier !== null)
            newVoltage.setAttribute('multiplier', multiplier);
          voltageAction = {
            new: {
              parent: voltageLevelAction?.new.element ?? element,
              element: newVoltage,
              reference: element.firstElementChild,
            },
          };
        } else {
          if (Voltage === null)
            voltageAction = {
              old: {
                parent: voltageLevelAction?.new.element ?? element,
                element: oldVoltage,
                reference: oldVoltage.nextElementSibling,
              },
            };
          else {
            const newVoltage = <Element>oldVoltage.cloneNode(false);
            newVoltage.textContent = Voltage;
            if (multiplier === null) newVoltage.removeAttribute('multiplier');
            else newVoltage.setAttribute('multiplier', multiplier);
            voltageAction = {
              old: { element: oldVoltage },
              new: { element: newVoltage },
            };
          }
        }
      }

      if (voltageLevelAction || voltageAction) wizard.close();
      const actions: EditorAction[] = [];
      if (voltageLevelAction) actions.push(voltageLevelAction);
      if (voltageAction) actions.push(voltageAction);
      return actions;
    };
  }

  static wizard(options: VoltageLevelWizardOptions): Wizard {
    const [
      heading,
      actionName,
      actionIcon,
      action,
    ] = isVoltageLevelCreateOptions(options)
      ? [
          get('voltagelevel.wizard.title.add'),
          get('add'),
          'add',
          VoltageLevelEditor.createAction(options.parent),
        ]
      : [
          get('voltagelevel.wizard.title.edit'),
          get('save'),
          'edit',
          VoltageLevelEditor.updateAction(options.element),
        ];
    const [
      name,
      desc,
      nomFreq,
      numPhases,
      Voltage,
      multiplier,
    ] = isVoltageLevelCreateOptions(options)
      ? [
          '',
          null,
          initial.nomFreq,
          initial.numPhases,
          initial.Voltage,
          initial.multiplier,
        ]
      : [
          options.element.getAttribute('name'),
          options.element.getAttribute('desc'),
          options.element.getAttribute('nomFreq'),
          options.element.getAttribute('numPhases'),
          options.element.querySelector('Voltage')?.textContent?.trim() ?? null,
          options.element
            .querySelector('Voltage')
            ?.getAttribute('multiplier') ?? null,
        ];
    return [
      {
        title: heading,
        primary: {
          icon: actionIcon,
          label: actionName,
          action: action,
        },
        content: [
          html`<wizard-textfield
            label="name"
            .maybeValue=${name}
            helper="${translate('voltagelevel.wizard.nameHelper')}"
            iconTrailing="title"
            required
            validationMessage="${translate('textfield.required')}"
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            .maybeValue=${desc}
            nullable="true"
            helper="${translate('voltagelevel.wizard.descHelper')}"
            iconTrailing="description"
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="nomFreq"
            .maybeValue=${nomFreq}
            nullable="true"
            helper="${translate('voltagelevel.wizard.nomFreqHelper')}"
            suffix="Hz"
            required
            validationMessage="${translate('textfield.nonempty')}"
            pattern="[0-9]*[.]?[0-9]+"
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="numPhases"
            .maybeValue=${numPhases}
            nullable="true"
            helper="${translate('voltagelevel.wizard.numPhaseHelper')}"
            suffix="#"
            required
            validationMessage="${translate('textfield.nonempty')}"
            type="number"
            min="1"
            max="255"
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="Voltage"
            .maybeValue=${Voltage}
            nullable
            unit="V"
            .multipliers=${[null, 'G', 'M', 'k', '', 'm']}
            .multiplier=${multiplier}
            helper="${translate('voltagelevel.wizard.voltageHelper')}"
            required
            validationMessage="${translate('textfield.nonempty')}"
            pattern="[0-9]*[.]?[0-9]+"
          ></wizard-textfield>`,
        ],
      },
    ];
  }
}
