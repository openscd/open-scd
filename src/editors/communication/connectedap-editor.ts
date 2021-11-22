import {
  LitElement,
  TemplateResult,
  customElement,
  property,
  css,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { translate, get } from 'lit-translate';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import {
  EditorAction,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInput,
  newActionEvent,
  compareNames,
  getValue,
  createElement,
  ComplexAction,
  getReference,
  html,
  Checkbox,
  Fab,
  Formfield,
  ListItem,
  CheckListItem,
  List,
  Icon,
} from '../../foundation.js';

import {
  getTypes,
  typePattern,
  typeNullable,
  typeMaxLength,
} from './p-types.js';

import { selectors } from './foundation.js';
import { WizardTextField } from '../../wizard-textfield.js';
import { FilteredList } from '../../filtered-list.js';

/** Data needed to uniquely identify an `AccessPoint` */
interface apAttributes {
  iedName: string;
  apName: string;
}

/** Description of a `ListItem` representing an `IED` and `AccessPoint` */
interface ItemDescription {
  value: apAttributes;
  connected?: boolean;
}

/** Sorts disabled `ListItem`s to the bottom. */
function compareListItemConnection(
  a: ItemDescription,
  b: ItemDescription
): number {
  if (a.connected !== b.connected) return b.connected ? -1 : 1;
  return 0;
}

function isEqualAddress(oldAddr: Element, newAdddr: Element): boolean {
  return (
    Array.from(oldAddr.querySelectorAll(selectors.Address + ' > P')).filter(
      pType =>
        !newAdddr
          .querySelector(`Address > P[type="${pType.getAttribute('type')}"]`)
          ?.isEqualNode(pType)
    ).length === 0
  );
}

function createAddressElement(
  inputs: WizardInput[],
  parent: Element,
  instType: boolean
): Element {
  const element = createElement(parent.ownerDocument, 'Address', {});

  inputs
    .filter(input => getValue(input) !== null)
    .forEach(validInput => {
      const type = validInput.label;
      const child = createElement(parent.ownerDocument, 'P', { type });
      if (instType)
        child.setAttributeNS(
          'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:type',
          'tP_' + type
        );
      child.textContent = getValue(validInput);
      element.appendChild(child);
    });

  return element;
}

function createConnectedApAction(parent: Element): WizardActor {
  return (
    inputs: WizardInput[],
    wizard: Element,
    list?: List | null
  ): EditorAction[] => {
    if (!list) return [];

    const apValue = (<ListItemBase[]>list.selected).map(
      item => <apAttributes>JSON.parse(item.value)
    );

    const actions = apValue.map(
      value =>
        <EditorAction>{
          new: {
            parent,
            element: createElement(parent.ownerDocument, 'ConnectedAP', {
              iedName: value.iedName,
              apName: value.apName,
            }),
            reference: getReference(parent, 'ConnectedAP'),
          },
        }
    );

    return actions;
  };
}

function renderWizardPage(element: Element): TemplateResult {
  const doc = element.ownerDocument;

  const accPoints = Array.from(doc.querySelectorAll(':root > IED'))
    .sort(compareNames)
    .flatMap(ied =>
      Array.from(ied.querySelectorAll(':root > IED > AccessPoint'))
    )
    .map(accP => {
      return {
        iedName: accP.parentElement!.getAttribute('name')!,
        apName: accP.getAttribute('name')!,
      };
    });

  const accPointDescription = accPoints
    .map(value => {
      return {
        value,
        connected:
          doc?.querySelector(
            `:root > Communication > SubNetwork > ConnectedAP[iedName="${value.iedName}"][apName="${value.apName}"]`
          ) !== null,
      };
    })
    .sort(compareListItemConnection);

  if (accPointDescription.length)
    return html` <${FilteredList} id="apList" multi
      >${accPointDescription.map(
        item => html`<${CheckListItem}
          value="${JSON.stringify(item.value)}"
          twoline
          ?disabled=${item.connected}
          ><span>${item.value.apName}</span
          ><span slot="secondary"
            >${item.value.iedName}</span
          ></${CheckListItem}
        >`
      )}
    </${FilteredList}>`;

  return html`<${ListItem} disabled graphic="icon">
    <span>${translate('lnode.wizard.placeholder')}</span>
    <${Icon} slot="graphic">info</${Icon}>
  </${ListItem}>`;
}

/** @returns a Wizard for creating `element` `ConnectedAP`. */
export function createConnectedApWizard(element: Element): Wizard {
  return [
    {
      title: get('connectedap.wizard.title.connect'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createConnectedApAction(element),
      },
      content: [renderWizardPage(element)],
    },
  ];
}

export function editConnectedApAction(parent: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const instType: boolean =
      (<Checkbox>wizard.shadowRoot?.querySelector('#instType'))?.checked ??
      false;

    const newAddress = createAddressElement(inputs, parent, instType);

    const complexAction: ComplexAction = {
      actions: [],
      title: get('connectedap.action.addaddress', {
        iedName: parent.getAttribute('iedName') ?? '',
        apName: parent.getAttribute('apName') ?? '',
      }),
    };

    const oldAddress = parent.querySelector(selectors.Address);

    if (oldAddress !== null && !isEqualAddress(oldAddress, newAddress)) {
      // We cannot use updateAction on address as both address child elements P are changed
      complexAction.actions.push({
        old: {
          parent,
          element: oldAddress,
          reference: oldAddress.nextSibling,
        },
      });
      complexAction.actions.push({
        new: {
          parent,
          element: newAddress,
          reference: oldAddress.nextSibling,
        },
      });
    } else if (oldAddress === null)
      complexAction.actions.push({
        new: {
          parent: parent,
          element: newAddress,
          reference: getReference(parent, 'Address'),
        },
      });

    return [complexAction];
  };
}

function editConnectedApWizard(element: Element): Wizard {
  return [
    {
      title: get('connectedap.wizard.title.edit'),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: editConnectedApAction(element),
      },
      content: [
        html`<${Formfield}
            label="${translate('connectedap.wizard.addschemainsttype')}"
          >
            <${Checkbox}
              id="instType"
              ?checked="${
                Array.from(
                  element.querySelectorAll(selectors.Address + ' > P')
                ).filter(pType => pType.getAttribute('xsi:type')).length > 0
              }"
            ></${Checkbox}> </${Formfield}
          >${getTypes(element).map(
            ptype =>
              html`<${WizardTextField}
                label="${ptype}"
                pattern="${ifDefined(typePattern[ptype])}"
                ?nullable=${typeNullable[ptype]}
                .maybeValue=${
                  element.querySelector(
                    `:root > Communication > SubNetwork > ConnectedAP > Address > P[type="${ptype}"]`
                  )?.innerHTML ?? null
                }
                maxLength="${ifDefined(typeMaxLength[ptype])}"
              ></${WizardTextField}>`
          )}`,
      ],
    },
  ];
}

/** [[`Communication`]] subeditor for a `ConnectedAP` element. */
@customElement('connectedap-editor')
export class ConnectedAPEditor extends LitElement {
  @property()
  element!: Element;

  @property()
  get apName(): string | null {
    return this.element.getAttribute('apName') ?? null;
  }

  openEditWizard(): void {
    this.dispatchEvent(newWizardEvent(editConnectedApWizard(this.element)));
  }

  remove(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.element.parentElement!,
            element: this.element,
            reference: this.element.nextSibling,
          },
        })
      );
  }

  render(): TemplateResult {
    return html`
      <div id="container" tabindex="0">
        <${Icon} class="fancy">settings_input_hdmi</${Icon}>
        <${Fab}
          mini
          class="menu-item left"
          icon="edit"
          @click="${() => this.openEditWizard()}"
        ></${Fab}>
        <${Fab}
          mini
          class="menu-item right"
          icon="delete"
          @click="${() => this.remove()}}"
        ></${Fab}>
      </div>
      <h4>${this.apName}</h4>
    `;
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

    .fancy {
      color: var(--mdc-theme-on-surface);
      --mdc-icon-size: 64px;
      transition: transform 150ms linear, box-shadow 200ms linear;
      outline-color: var(--mdc-theme-primary);
      outline-style: solid;
      outline-width: 0px;
    }

    #container:focus > .fancy {
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    }

    #container:hover > .fancy {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    #container:focus-within > .fancy {
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
