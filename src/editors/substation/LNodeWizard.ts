import {
  Wizard,
  WizardAction,
  WizardInput,
  CloseableElement,
  EditorAction,
} from '../../foundation.js';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';
import { TextField } from '@material/mwc-textfield';
import {
  SingleSelectedEvent,
  isEventMulti,
} from '@material/mwc-list/mwc-list-foundation';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { html } from 'lit-html';

function createAction(parent: Element): WizardAction {
  return (inputs: WizardInput[], wizard: CloseableElement): EditorAction[] => {
    const actions: EditorAction[] = [];
    (<ListItemBase[]>(
      (<List>wizard.shadowRoot?.querySelector('#lnList')).selected
    )).map(item => {
      const value = JSON.parse(item.value);
      const action = {
        new: {
          parent,
          element: new DOMParser().parseFromString(
            `<LNode iedName="${value.iedName}" ldInst="${value.ldInst}" ${
              value.prefix ? `prefix="${value.prefix}"` : ``
            } lnClass="${value.lnClass}" lnInst="${value.inst}"></LNode>`,
            'application/xml'
          ).documentElement,
          reference: null,
        },
      };
      console.log(action.new.element);
      actions.push(action);
    });
    wizard.close();
    return actions;
  };
}

function clearChildren(element: Element | null | undefined): void {
  if (element)
    while (element.lastElementChild)
      element.removeChild(element?.lastElementChild);
}

function onIedSelect(evt: SingleSelectedEvent, doc: Document): void {
  const element: Element | null | undefined = (<Element>(
    evt.target
  )).parentElement?.parentElement?.nextElementSibling?.querySelector('#ldList');

  clearChildren(element);

  if (isEventMulti(evt)) {
    (<ListItemBase[]>(<List>evt.target).selected).map(item => {
      Array.from(doc.querySelectorAll('IED')).map(ied => {
        if (ied.getAttribute('name') === item.value) {
          Array.from(ied.querySelectorAll('LDevice')).map(lDevice => {
            const value = {
              iedName: ied.getAttribute('name'),
              ldInst: lDevice.getAttribute('inst'),
            };
            const listItem = document.createElement('mwc-list-item');
            listItem.setAttribute('value', JSON.stringify(value));
            listItem.setAttribute('twoline', 'true');
            const span1 = document.createElement('span');
            span1.append(lDevice.getAttribute('inst') ?? '');
            listItem.append(span1);
            const span2 = document.createElement('span');
            span2.setAttribute('slot', 'secondary');
            span2.append(ied.getAttribute('name') ?? '');
            listItem.append(span2);
            element?.appendChild(listItem);
          });
          const divider = document.createElement('li');
          divider.setAttribute('divider', '');
          divider.setAttribute('role', 'separator');
          element?.appendChild(divider);
        }
      });
    });
  }
}

function onLdSelect(evt: SingleSelectedEvent, doc: Document): void {
  const element: Element | null | undefined = (<Element>(
    evt.target
  )).parentElement?.parentElement?.nextElementSibling?.querySelector('#lnList');

  clearChildren(element);

  if (isEventMulti(evt)) {
    (<ListItemBase[]>(<List>evt.target).selected).map(item => {
      Array.from(doc.querySelectorAll('IED')).map(ied => {
        const parentValue = JSON.parse(item.value);
        if (ied.getAttribute('name') === parentValue.iedName) {
          Array.from(ied.querySelectorAll('LDevice')).map(lDevice => {
            if (lDevice.getAttribute('inst') === parentValue.ldInst) {
              Array.from(lDevice.querySelectorAll('LN,LN0')).map(ln => {
                const value = {
                  iedName: ied.getAttribute('name'),
                  ldInst: lDevice.getAttribute('inst'),
                  prefix: ln.getAttribute('prefix'),
                  lnClass: ln.getAttribute('lnClass'),
                  inst: ln.getAttribute('inst'),
                };
                const listItem = document.createElement('mwc-list-item');
                listItem.setAttribute('value', JSON.stringify(value));
                listItem.setAttribute('twoline', 'true');
                const span1 = document.createElement('span');
                span1.append(
                  (ln.getAttribute('prefix') ?? '') +
                    (ln.getAttribute('lnClass') ?? '') +
                    (ln.getAttribute('inst') ?? '')
                );
                listItem.append(span1);
                const span2 = document.createElement('span');
                span2.setAttribute('slot', 'secondary');
                span2.append(parentValue.iedName + '|' + parentValue.ldInst);
                listItem.append(span2);
                element?.appendChild(listItem);
              });
            }
          });
        }
      });
    });
  }
}

function onIedFilter(evt: InputEvent): void {
  (<List>(
    (<TextField>evt.target).parentElement?.querySelector('#iedList')
  )).items.map(item => {
    if (
      item.value
        .toUpperCase()
        .includes((<TextField>evt.target).value.toUpperCase())
    ) {
      item.removeAttribute('disabled');
      item.removeAttribute('style');
    } else {
      item.setAttribute('disabled', 'true');
      item.setAttribute('style', 'display:none;');
    }
  });
}

function onLdFilter(evt: InputEvent): void {
  (<List>(
    (<TextField>evt.target).parentElement?.querySelector('#ldList')
  )).items.map(item => {
    if (
      item
        .querySelector('span')
        ?.innerText.toUpperCase()
        .includes((<TextField>evt.target).value.toUpperCase())
    ) {
      item.removeAttribute('disabled');
      item.removeAttribute('style');
    } else {
      item.setAttribute('disabled', 'true');
      item.setAttribute('style', 'display:none;');
    }
  });
}

function onLnFilter(evt: InputEvent): void {
  (<List>(
    (<TextField>evt.target).parentElement?.querySelector('#lnList')
  )).items.map(item => {
    if (
      item
        .querySelector('span')
        ?.innerText.toUpperCase()
        .includes((<TextField>evt.target).value.toUpperCase())
    ) {
      item.removeAttribute('disabled');
      item.removeAttribute('style');
    } else {
      item.setAttribute('disabled', 'true');
      item.setAttribute('style', 'display:none;');
    }
  });
}

export function add(element: Element): Wizard {
  const doc = element.ownerDocument;
  return [
    {
      title: 'Select IEDs',
      content: [
        html`<wizard-textfield
            label="filter"
            iconTrailing="search"
            @input="${onIedFilter}"
          ></wizard-textfield>
          <mwc-list
            activatable
            multi
            id="iedList"
            @selected="${(evt: SingleSelectedEvent) => onIedSelect(evt, doc)}"
            >${Array.from(doc.querySelectorAll('IED')).map(
              ied =>
                html`<mwc-list-item value="${ied.getAttribute('name')}"
                  >${ied.getAttribute('name')}</mwc-list-item
                >`
            )}</mwc-list
          >`,
      ],
    },
    {
      title: 'Select Logical Devices',
      content: [
        html`<wizard-textfield
            label="filter"
            iconTrailing="search"
            @input="${onLdFilter}"
          ></wizard-textfield>
          <mwc-list
            activatable
            multi
            id="ldList"
            @selected="${(evt: SingleSelectedEvent) => onLdSelect(evt, doc)}"
          ></mwc-list>`,
      ],
    },
    {
      title: 'Select Logical Nodes',
      primary: {
        icon: 'add',
        label: 'Add Logical Nodes',
        action: createAction(element),
      },
      content: [
        html`<wizard-textfield
            label="filter"
            iconTrailing="search"
            @input="${onLnFilter}"
          ></wizard-textfield>
          <mwc-list activatable multi id="lnList"></mwc-list>`,
      ],
    },
  ];
}
