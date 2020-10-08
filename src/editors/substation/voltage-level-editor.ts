import {
  LitElement,
  TemplateResult,
  css,
  customElement,
  html,
  property,
  query,
} from 'lit-element';

import { mdcTheme } from '../../colors.js';
import {
  CloseableElement,
  EditorAction,
  newWizardEvent,
  Wizard,
  WizardAction,
  WizardInput,
} from '../../foundation.js';

function voltageLevelCreateAction(parent: Element): WizardAction {
  return (inputs: WizardInput[], dialog: CloseableElement): EditorAction[] => {
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
              : `<Voltage unit="V" multiplier="${multiplier}"
          >${Voltage}</Voltage>`
          }</VoltageLevel>`,
          'application/xml'
        ).documentElement,
        reference: null,
      },
    };

    dialog.close();
    return [action];
  };
}

function voltageLevelUpdateAction(element: Element): WizardAction {
  return (inputs: WizardInput[], dialog: CloseableElement): EditorAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value;
    const desc = inputs.find(i => i.label === 'desc')!.maybeValue;
    const nomFreq = inputs.find(i => i.label === 'nomFreq')!.maybeValue;
    const numPhases = inputs.find(i => i.label === 'numPhases')!.maybeValue;
    const Voltage = inputs.find(i => i.label === 'Voltage')!.maybeValue;
    const multiplier = inputs.find(i => i.label === 'Voltage')!.multiplier;

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      nomFreq === element.getAttribute('nomFreq') &&
      numPhases === element.getAttribute('numPhases') &&
      Voltage ===
        (element.querySelector('Voltage')?.textContent?.trim() ?? null) &&
      multiplier ===
        (element.querySelector('Voltage')?.getAttribute('multiplier') ?? '')
    )
      return [];

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    if (nomFreq === null) newElement.removeAttribute('nomFreq');
    else newElement.setAttribute('nomFreq', nomFreq);
    if (numPhases === null) newElement.removeAttribute('numPhases');
    else newElement.setAttribute('numPhases', numPhases);

    let newVoltage = <Element | null>(
      (element.querySelector('Voltage')?.cloneNode(true) ?? null)
    );
    if (newVoltage) newElement.appendChild(newVoltage);
    if (Voltage !== null) {
      if (!newVoltage)
        newVoltage = new DOMParser().parseFromString(
          '<Voltage></Voltage>',
          'application/xml'
        ).documentElement;
      newVoltage.textContent = Voltage;
      if (multiplier === null) newVoltage.removeAttribute('multiplier');
      else newVoltage.setAttribute('multiplier', multiplier);
    }

    dialog.close();
    return [{ old: { element }, new: { element: newElement } }];
  };
}

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

export function voltageLevelWizard(options: VoltageLevelWizardOptions): Wizard {
  const [heading, actionName, actionIcon, action] = isVoltageLevelCreateOptions(
    options
  )
    ? [
        'Add Voltage Level',
        'Add',
        'add',
        voltageLevelCreateAction(options.parent),
      ]
    : [
        'Edit Voltage Level',
        'Save',
        'edit',
        voltageLevelUpdateAction(options.element),
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
        options.element.querySelector('Voltage')?.getAttribute('multiplier') ??
          '',
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
          helper="Name"
          iconTrailing="title"
          required
          validationMessage="Required"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          .maybeValue=${desc}
          nullable="true"
          helper="Description"
          iconTrailing="description"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="nomFreq"
          .maybeValue=${nomFreq}
          nullable="true"
          helper="Nominal Frequency"
          suffix="Hz"
          required
          validationMessage="Must not be empty"
          pattern="[0-9]*[.]?[0-9]+"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="numPhases"
          .maybeValue=${numPhases}
          nullable="true"
          helper="Number of Phases"
          suffix="#"
          required
          validationMessage="Must not be empty"
          type="number"
          min="1"
          max="255"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="Voltage"
          .maybeValue=${Voltage}
          nullable
          unit="V"
          .multipliers=${['G', 'M', 'k', '', 'm']}
          .preSelectedMultiplier=${multiplier}
          helper="Voltage"
          required
          validationMessage="Must not be empty"
          pattern="[0-9]*[.]?[0-9]+"
        ></wizard-textfield>`,
      ],
    },
  ];
}

@customElement('voltage-level-editor')
export class VoltageLevelEditor extends LitElement {
  @property()
  parent!: Element;
  @property()
  element!: Element;
  @property({ type: String })
  get name(): string {
    return this.element?.getAttribute('name') ?? '';
  }
  @property({ type: String })
  get desc(): string | null {
    return this.element?.getAttribute('desc') ?? null;
  }

  @query('h1') header!: Element;

  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(voltageLevelWizard({ element: this.element }))
    );
  }

  renderHeader(): TemplateResult {
    return html`<h1>
      ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
      <mwc-icon-button
        icon="edit"
        @click=${() => this.openEditWizard()}
      ></mwc-icon-button>
    </h1>`;
  }

  render(): TemplateResult {
    return html`${this.renderHeader()}`;
  }

  static styles = css`
    ${mdcTheme}
  `;
}
