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
import { generalConductingEquipmentIcon, iedIcon } from '../../icons.js';
import { editlNode } from './lnodewizard.js';

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

  @query('#header') header!: Element;

  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(
        ConductingEquipmentEditor.wizard({ element: this.element })
      )
    );
  }

  openLNodeAddWizard(): void {
    this.dispatchEvent(newWizardEvent(editlNode(this.element)));
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
    return html`
      <div id="container" tabindex="0">
        ${typeIcons[this.type] ?? generalConductingEquipmentIcon}
        <h4 id="header">${this.name}</h4>
        <mwc-icon-button
          class="menu-item edit"
          icon="edit"
          @click="${() => this.openEditWizard()}}"
        ></mwc-icon-button
        ><mwc-icon-button
          class="menu-item delete"
          id="delete"
          icon="delete"
          @click="${() => this.removeAction()}}"
        ></mwc-icon-button>
        <mwc-icon-button
          class="menu-item connect"
          id="lNodeButton"
          @click="${() => this.openLNodeAddWizard()}"
          >${iedIcon}</mwc-icon-button
        >
      </div>
    `;
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
          )
            .map(condEq => condEq.getAttribute('name'))
            .filter(name => name !== options.element.getAttribute('name')),
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
    :host {
      display: inline-block;
      margin: 20px;
      position: relative;
    }

    #container {
      color: var(--mdc-theme-on-surface);
      width: 80px;
      height: 100px;
    }

    #container:focus-within {
      outline: none;
    }

    #container > svg {
      color: var(--mdc-theme-on-surface);
      width: 80px;
      height: 80px;
      position: relative;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    #container:hover > svg {
      transform: scale(1.1);
    }

    #container:focus-within > svg {
      background: var(--mdc-theme-on-primary);
      transform: scale(0.8);
    }

    .menu-item {
      color: var(--mdc-theme-on-surface);
      transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
      position: absolute;
      top: 15px;
      left: 15px;
      pointer-events: none;
      opacity: 0;
    }

    #container:focus-within > .menu-item {
      pointer-events: auto;
      opacity: 1;
    }

    #container:focus-within > .menu-item.edit {
      transform: translate(0px, -55px);
    }

    #container:focus-within > .menu-item.delete {
      transform: translate(0px, 57px);
    }

    #container:focus-within > .menu-item.connect {
      transform: translate(57px, 0px);
    }

    #header {
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      color: var(--mdc-theme-on-surface);
      margin: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
}
