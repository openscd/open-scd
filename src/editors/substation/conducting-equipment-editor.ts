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
import { generalConductingEquipmentIcon } from '../../icons.js';

import { startMove } from './foundation.js';
import { typeIcons, typeNames } from './conducting-equipment-types.js';
import { editlNode } from './lnodewizard.js';
import { BayEditor } from './bay-editor.js';

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
  @query('#container') container!: Element;

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

  remove(): void {
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
        <h4>${this.name}</h4>
        <mwc-icon-button
          class="menu-item left"
          @click="${() => this.openLNodeAddWizard()}"
          icon="device_hub"
        ></mwc-icon-button>
        <mwc-icon-button
          class="menu-item up"
          icon="edit"
          @click="${() => this.openEditWizard()}}"
        ></mwc-icon-button>
        <mwc-icon-button
          class="menu-item right"
          @click="${() =>
            startMove(this, ConductingEquipmentEditor, BayEditor)}"
          icon="forward"
        ></mwc-icon-button>
        <mwc-icon-button
          class="menu-item down"
          icon="delete"
          @click="${() => this.remove()}}"
        ></mwc-icon-button>
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
            options.parent.querySelectorAll('Bay > ConductingEquipment')
          ).map(condEq => condEq.getAttribute('name')),
        ]
      : [
          Array.from(
            options.element.parentNode!.querySelectorAll(
              'Bay > ConductingEquipment'
            )
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
    #container {
      color: var(--mdc-theme-on-surface);
      width: 64px;
      height: 84px;
      margin: auto;
      position: relative;
      opacity: 1;
      transition: all 200ms linear;
    }

    #container.moving {
      opacity: 0.3;
    }

    #container:focus {
      outline: none;
    }

    #container > svg {
      color: var(--mdc-theme-on-surface);
      width: 64px;
      height: 64px;
      transition: transform 150ms linear, box-shadow 200ms linear;
      outline-color: var(--mdc-theme-primary);
      outline-style: solid;
      outline-width: 0px;
    }

    #container:focus > svg {
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    }

    #container:hover > svg {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    #container:focus-within > svg {
      outline: 2px solid var(--mdc-theme-primary);
      background: var(--mdc-theme-on-primary);
      transform: scale(0.8);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .menu-item {
      color: var(--mdc-theme-on-surface);
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 200ms linear;
      position: absolute;
      top: 8px;
      left: 8px;
      pointer-events: none;
      opacity: 0;
    }

    #container:focus-within > .menu-item {
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 250ms linear;
      pointer-events: auto;
      opacity: 1;
    }

    #container:focus-within > .menu-item.up {
      transform: translate(0px, -52px);
    }

    #container:focus-within > .menu-item.down {
      transform: translate(0px, 52px);
    }

    #container:focus-within > .menu-item.right {
      transform: translate(52px, 0px);
    }

    #container:focus-within > .menu-item.left {
      transform: translate(-52px, 0px);
    }

    h4 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
    }
  `;
}
