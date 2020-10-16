import {
  customElement,
  LitElement,
  html,
  TemplateResult,
  property,
  query,
  css,
} from 'lit-element';
import {
  disconnectorIcon,
  circuitBreakerIcon,
  currentTransformerIcon,
  voltageTransformerIcon,
} from '../../icons.js';
import { translate, get } from 'lit-translate';
import {
  Wizard,
  WizardAction,
  WizardInput,
  CloseableElement,
  EditorAction,
  newWizardEvent,
  newActionEvent,
} from '../../foundation.js';
import { Select } from '@material/mwc-select';

const typeIcons: Partial<Record<string, TemplateResult>> = {
  CBR: circuitBreakerIcon,
  DIS: disconnectorIcon,
  CTR: currentTransformerIcon,
  VTR: voltageTransformerIcon,
  missing: disconnectorIcon,
};

const typeAttribute: Partial<Record<string, string>> = {
  'Circuit Breaker': 'CBR',
  Disconnector: 'DIS',
  'Earth Switch': 'ERS',
  'Current Transformer': 'CTR',
  'Voltage Transformer': 'VTR',
};

const typeNames: Partial<Record<string, string>> = {
  CBR: 'Circuit Breaker',
  DIS: 'Disconnector',
  CTR: 'Current Transformer',
  VTR: 'Voltage Transformer',
  '': 'Attribute Missing',
};

const condEqTypes: string[] = [
  'Circuit Breaker',
  'Disconnector',
  'Earth Switch',
  'Current Transformer',
  'Voltage Transformer',
];

interface ConductingEquipmentUpdateOptions {
  element: Element;
}
interface ConductingEquipmentCreateOptions {
  parent: Element;
}
type ConductingEquipmentWizardOptions =
  | ConductingEquipmentUpdateOptions
  | ConductingEquipmentCreateOptions;
function isConductingEquipmentCreateOptions(
  options: ConductingEquipmentWizardOptions
): options is ConductingEquipmentCreateOptions {
  return (<ConductingEquipmentCreateOptions>options).parent !== undefined;
}

@customElement('conducting-equipment-editor')
export class ConductingEquipmentEditor extends LitElement {
  @property({ type: Element })
  element!: Element;
  @property({ type: Element })
  parent!: Element;
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  @property({ type: String })
  get desc(): string {
    return this.element.getAttribute('desc') ?? '';
  }
  @property({ type: String })
  get type(): string {
    return this.element.getAttribute('type') ?? 'missing';
  }

  @query('h1') header!: Element;
  @query('mwc-select') select!: Select;

  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(
        ConductingEquipmentEditor.wizard({ element: this.element })
      )
    );
  }

  removeAction(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: { parent: this.parent, element: this.element, reference: null },
        })
      );
  }

  renderHeader(): TemplateResult {
    return html`<h1 id="header">
      <mwc-icon-button
        icon="delete"
        @click="${() => this.removeAction()}}"
      ></mwc-icon-button>
      <mwc-icon-button
        icon="edit"
        @click="${() => this.openEditWizard()}}"
      ></mwc-icon-button
      >${this.name}
    </h1>`;
  }

  render(): TemplateResult {
    return html`<div id="condEqContainer">
      ${this.renderHeader()} ${typeIcons[this.type] ?? disconnectorIcon}
    </div>`;
  }

  static createAction(parent: Element): WizardAction {
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      const name = inputs.find(i => i.label === 'name')!.maybeValue;
      const desc = inputs.find(i => i.label === 'desc')!.maybeValue;
      const type =
        typeAttribute[
          wizard.shadowRoot
            ?.querySelector('mwc-dialog')
            ?.querySelector('mwc-select')?.selected!.innerText ?? ''
        ] ?? null;

      // Earth Switch does not have a specific type in IEC61850-6.
      // It is handled as 'DIS'
      // The difference between a disconnector and a earth switch
      // is a terminal that has an attribute cNodeName="grounded"

      const action = {
        new: {
          parent,
          element: new DOMParser().parseFromString(
            `<ConductingEquipment
              name="${name}"
              ${type === null ? '' : `type="${type === 'ERS' ? 'DIS' : type}"`}
              ${desc === null ? '' : `desc="${desc}"`}
            > ${
              type === 'ERS'
                ? `<Terminal name="T1" cNodeName="grounded"></Terminal>`
                : ''
            }
            </ConductingEquipment>`,
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

      let condunctingEquipmentAction: EditorAction | null;

      if (
        name === element.getAttribute('name') &&
        desc === element.getAttribute('desc')
      ) {
        condunctingEquipmentAction = null;
      } else {
        const newElement = <Element>element.cloneNode(false);
        newElement.setAttribute('name', name);
        if (desc === null) newElement.removeAttribute('desc');
        else newElement.setAttribute('desc', desc);
        condunctingEquipmentAction = {
          old: { element },
          new: { element: newElement },
        };
      }

      if (condunctingEquipmentAction) wizard.close();
      const actions: EditorAction[] = [];
      if (condunctingEquipmentAction) actions.push(condunctingEquipmentAction);
      return actions;
    };
  }

  static wizard(options: ConductingEquipmentWizardOptions): Wizard {
    const [
      heading,
      actionName,
      actionIcon,
      action,
    ] = isConductingEquipmentCreateOptions(options)
      ? [
          get('voltagelevel.wizard.title.add'),
          get('add'),
          'add',
          ConductingEquipmentEditor.createAction(options.parent),
        ]
      : [
          get('voltagelevel.wizard.title.edit'),
          get('save'),
          'edit',
          ConductingEquipmentEditor.updateAction(options.element),
        ];

    const [name, desc] = isConductingEquipmentCreateOptions(options)
      ? ['', null]
      : [
          options.element.getAttribute('name'),
          options.element.getAttribute('desc'),
          options.element.getAttribute('type'),
        ];
    const [select] = isConductingEquipmentCreateOptions(options)
      ? [
          html`<mwc-select helper="Equipment Type" helperPersistant="true">
            ${condEqTypes.map(v => html`<mwc-list-item>${v}</mwc-list-item>`)}
          </mwc-select>`,
        ]
      : [
          html`<mwc-select
            helper="Equipment Type"
            helperPersistant="true"
            disabled
          >
            <mwc-list-item
              >${options.element.getAttribute('type') === 'DIS' &&
              options.element
                .querySelector('Terminal')
                ?.getAttribute('cNodeName') === 'grounded'
                ? 'Earth Switch'
                : typeNames[
                    options.element.getAttribute('type') ?? ''
                  ]}</mwc-list-item
            >
          </mwc-select>`,
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
          select,
        ],
      },
    ];
  }

  static styles = css`
    #condEqContainer {
      position: relative;
      top: 5px;
      left: 20px;
      border: 2px solid var(--mdc-theme-primary);
      max-width: 200px;
      margin: 10px;
    }

    #header {
      background-color: var(--mdc-theme-primary);
      color: var(--mdc-theme-surface);
      margin: 0px;
    }

    svg {
      width: 100px;
      height: 100px;
      position: relative;
      top: 3px;
      left: 3px;
    }
  `;
}
