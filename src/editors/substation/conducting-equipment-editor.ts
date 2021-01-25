import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import {
  CloseableElement,
  createElement,
  EditorAction,
  getValue,
  newActionEvent,
  newWizardEvent,
  Wizard,
  WizardAction,
  WizardInput,
} from '../../foundation.js';

import {
  isCreateOptions,
  selectors,
  startMove,
  updateNamingAction,
  WizardOptions,
} from './foundation.js';
import { typeIcon, typeName, types } from './conducting-equipment-types.js';
import { editlNode } from './lnodewizard.js';
import { BayEditor } from './bay-editor.js';

/** [[`SubstationEditor`]] subeditor for a `ConductingEquipment` element. */
@customElement('conducting-equipment-editor')
export class ConductingEquipmentEditor extends LitElement {
  @property({ type: Element })
  element!: Element;

  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  @property({ type: String })
  get desc(): string {
    return this.element.getAttribute('desc') ?? '';
  }

  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(
        ConductingEquipmentEditor.wizard({ element: this.element })
      )
    );
  }

  openLNodeWizard(): void {
    this.dispatchEvent(newWizardEvent(editlNode(this.element)));
  }

  remove(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.element.parentElement!,
            element: this.element,
            reference: this.element.nextElementSibling,
          },
        })
      );
  }

  render(): TemplateResult {
    return html`
      <div id="container" tabindex="0">
        ${typeIcon(this.element)}
        <mwc-icon-button
          class="menu-item left"
          @click="${() => this.openLNodeWizard()}"
          icon="account_tree"
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
      <h4>${this.name}</h4>
    `;
  }

  static createAction(parent: Element): WizardAction {
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      const name = getValue(inputs.find(i => i.label === 'name')!);
      const desc = getValue(inputs.find(i => i.label === 'desc')!);
      const proxyType = getValue(inputs.find(i => i.label === 'type')!);
      const type = proxyType === 'ERS' ? 'DIS' : proxyType;

      const element = createElement(
        parent.ownerDocument,
        'ConductingEquipment',
        { name, type, desc }
      );

      if (proxyType === 'ERS')
        element.appendChild(
          createElement(parent.ownerDocument, 'Terminal', {
            name: 'T1',
            cNodeName: 'grounded',
          })
        );

      const action = {
        new: {
          parent,
          element,
          reference: null,
        },
      };

      wizard.close();
      return [action];
    };
  }

  static wizard(options: WizardOptions): Wizard {
    const [
      heading,
      actionName,
      actionIcon,
      action,
      name,
      desc,
      reservedNames,
    ] = isCreateOptions(options)
      ? [
          get('conductingequipment.wizard.title.add'),
          get('add'),
          'add',
          ConductingEquipmentEditor.createAction(options.parent),
          '',
          '',
          Array.from(
            options.parent.querySelectorAll(selectors.ConductingEquipment)
          ).map(condEq => condEq.getAttribute('name')),
        ]
      : [
          get('conductingequipment.wizard.title.edit'),
          get('save'),
          'edit',
          updateNamingAction(options.element),
          options.element.getAttribute('name'),
          options.element.getAttribute('desc'),
          Array.from(
            options.element.parentNode!.querySelectorAll(
              selectors.ConductingEquipment
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
          ConductingEquipmentEditor.renderTypeSelector(options),
          html`<wizard-textfield
            label="name"
            .maybeValue=${name}
            helper="${translate('conductingequipment.wizard.nameHelper')}"
            required
            validationMessage="${translate('textfield.required')}"
            dialogInitialFocus
            .reservedValues="${reservedNames}"
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            .maybeValue=${desc}
            nullable="true"
            helper="${translate('conductingequipment.wizard.descHelper')}"
          ></wizard-textfield>`,
        ],
      },
    ];
  }

  static renderTypeSelector(options: WizardOptions): TemplateResult {
    return isCreateOptions(options)
      ? html`<mwc-select
          style="--mdc-menu-max-height: 196px;"
          required
          label="type"
          helper="${translate('conductingequipment.wizard.typeHelper')}"
          validationMessage="${translate('textfield.required')}"
        >
          ${Object.keys(types).map(
            v => html`<mwc-list-item value="${v}">${types[v]}</mwc-list-item>`
          )}
        </mwc-select>`
      : html`<mwc-select
          label="type"
          helper="${translate('conductingequipment.wizard.typeHelper')}"
          validationMessage="${translate('textfield.required')}"
          disabled
        >
          <mwc-list-item selected value="0"
            >${typeName(options.element)}</mwc-list-item
          >
        </mwc-select>`;
  }

  static styles = css`
    #container {
      color: var(--mdc-theme-on-surface);
      width: 64px;
      height: 64px;
      margin: auto;
      position: relative;
      transition: all 200ms linear;
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
      z-index: 1;
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
      opacity: 1;
      transition: opacity 200ms linear;
      text-align: center;
    }

    :host(.moving) #container,
    :host(.moving) h4 {
      opacity: 0.3;
    }
  `;
}
