import {
  customElement,
  LitElement,
  html,
  TemplateResult,
  property,
  query,
  css,
} from 'lit-element';
import { translate, get } from 'lit-translate';
import {
  Wizard,
  WizardAction,
  WizardInput,
  CloseableElement,
  EditorAction,
  newWizardEvent,
  newActionEvent,
  getValue,
} from '../../foundation.js';
import { typeIcons, typeNames } from './conducting-equipment-types.js';
import { generalConductingEquipmentIcon } from '../../icons.js';

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

  @query('h4') header!: Element;

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
          old: {
            parent: this.parent,
            element: this.element,
            reference: this.element.nextElementSibling,
          },
        })
      );
  }

  render(): TemplateResult {
    return html` <div id="container" tabindex="0">
      <input
        type="checkbox"
        href="#"
        class="menu-open"
        name="menu-open"
        id="menu-open"
      />
      <label class="type-icon-button" for="menu-open">
        ${typeIcons[this.type] ?? generalConductingEquipmentIcon}
        <h4 id="header">${this.name}</h4>
      </label>
      <mwc-icon-button
        class="menu-item delete"
        id="delete"
        icon="delete"
        @click="${() => this.removeAction()}}"
      ></mwc-icon-button>
      <mwc-icon-button
        class="menu-item edit"
        icon="edit"
        @click="${() => this.openEditWizard()}}"
      ></mwc-icon-button>
    </div>`;
  }

  static createAction(parent: Element): WizardAction {
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      const name = getValue(inputs.find(i => i.label === 'name')!);
      const desc = getValue(inputs.find(i => i.label === 'desc')!);
      const type = getValue(inputs.find(i => i.label === 'type')!);

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
      const desc = getValue(inputs.find(i => i.label === 'desc')!);

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
          get('conductingequipment.wizard.title.add'),
          get('add'),
          'add',
          ConductingEquipmentEditor.createAction(options.parent),
        ]
      : [
          get('conductingequipment.wizard.title.edit'),
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

    const [reservedValues] = isConductingEquipmentCreateOptions(options)
      ? [
          Array.from(
            options.parent.querySelectorAll('ConductingEquipment')
          ).map(condEq => condEq.getAttribute('name')),
        ]
      : [
          Array.from(
            options.element.parentNode!.querySelectorAll('ConductingEquipment')
          ).map(condEq => condEq.getAttribute('name')),
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
            helper="${translate('conductingequipment.wizard.nameHelper')}"
            iconTrailing="title"
            required
            validationMessage="${translate('textfield.required')}"
            dialogInitialFocus
            .reservedValues="${reservedValues}"
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            .maybeValue=${desc}
            nullable="true"
            helper="${translate('conductingequipment.wizard.descHelper')}"
            iconTrailing="description"
          ></wizard-textfield>`,
          ConductingEquipmentEditor.renderTypeSelector(options),
        ],
      },
    ];
  }

  static renderTypeSelector(
    options: ConductingEquipmentWizardOptions
  ): TemplateResult {
    return isConductingEquipmentCreateOptions(options)
      ? html`<mwc-select
          required
          label="type"
          helper="${translate('conductingequipment.wizard.typeHelper')}"
          validationMessage="${translate('textfield.required')}"
          helperPersistant="true"
        >
          ${Object.keys(typeNames).map(
            v =>
              html`<mwc-list-item value="${v}">${typeNames[v]}</mwc-list-item>`
          )}
        </mwc-select>`
      : html`<mwc-select
          label="type"
          helper="${translate('conductingequipment.wizard.typeHelper')}"
          validationMessage="${translate('textfield.required')}"
          helperPersistant="true"
          disabled
        >
          <mwc-list-item selected value="0"
            >${options.element.getAttribute('type') === 'DIS' &&
            options.element
              .querySelector('Terminal')
              ?.getAttribute('cNodeName') === 'grounded'
              ? 'Earth Switch'
              : typeNames[
                  options.element.getAttribute('type') ?? ''
                ]}</mwc-list-item
          >
        </mwc-select>`;
  }

  static styles = css`
    #container {
      width: 80px;
      height: 100px;
      margin: 10px;
      display: inline-block;
    }

    .type-icon-button {
      display: inline-block;
      background: var(--mdc-theme-surface);
      color: var(--mdc-theme-on-surface);
      margin: 0px;
      width: 80px;
      height: 100px;
      position: relative;
      z-index: 2;
    }

    .container:hover {
      -webkit-transform: scale(1.2, 1.2) translate3d(0, 0, 0);
      transform: scale(1.2, 1.2) translate3d(0, 0, 0);
    }

    #container:focus-within {
      outline: none;
    }

    #container:focus-within > .type-icon-button {
      background: var(--mdc-theme-on-primary);
      outline: none;
      -webkit-transition-timing-function: linear;
      transition-timing-function: linear;
      -webkit-transition-duration: 200ms;
      transition-duration: 200ms;
      -webkit-transform: scale(0.8, 0.8) translate3d(0, 0, 0);
      transform: scale(0.8, 0.8) translate3d(0, 0, 0);
    }

    .menu-open {
      display: none;
    }

    .menu-item:nth-child(3) {
      position: relative;
      top: -80px;
      left: 15px;
      color: var(--mdc-theme-on-surface);
    }

    .menu-item:nth-child(4) {
      position: relative;
      top: -128px;
      left: 15px;
      color: var(--mdc-theme-on-surface);
    }

    #container:focus-within > .menu-item {
      -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
      transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
    }

    #container:focus-within > .menu-item:nth-child(3) {
      transition-duration: 200ms;
      -webkit-transition-duration: 200ms;
      -webkit-transform: translate3d(0px, -65px, 0);
      transform: translate3d(0px, -65px, 0);
    }

    #container:focus-within > .menu-item:nth-child(4) {
      transition-duration: 400ms;
      -webkit-transition-duration: 400ms;
      -webkit-transform: translate3d(0px, 65px, 0);
      transform: translate3d(0px, 65px, 0);
    }

    #header {
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      color: var(--mdc-theme-on-surface);
      margin: 0px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    svg {
      color: var(--mdc-theme-on-surface);
      width: 80px;
      height: 80px;
      position: relative;
    }
  `;
}
