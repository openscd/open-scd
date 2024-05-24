import { html, LitElement } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-list/mwc-check-list-item';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '@openscd/open-scd/src/filtered-list.js';
import {
  find,
  identity,
  isPublic,
  newWizardEvent,
  SCLTag,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

import { cloneElement } from '@openscd/xml';

interface addDescItem {
  desc: string;
  tag: SCLTag;
  identity: string | number;
}

function addDescriptionAction(doc: XMLDocument): WizardActor {
  return (
    _: WizardInputElement[],
    wizard: Element,
    list: List | null | undefined
  ): WizardAction[] => {
    const selectedItems = <ListItemBase[]>list!.selected;

    const actions = selectedItems.map(item => {
      const desc = (<Element>item.querySelector('span')).textContent;
      const [tag, identity] = item.value.split(' | ');

      const oldElement = find(doc, tag, identity)!;
      const newElement = cloneElement(oldElement, { desc });
      return { old: { element: oldElement }, new: { element: newElement } };
    });

    return [
      {
        title: get('updatedesc.abb'),
        actions,
      },
    ];
  };
}

function createLogWizard(doc: XMLDocument, items: addDescItem[]): Wizard {
  return [
    {
      title: get('wizard.title.add', { tagName: 'desc' }),
      primary: {
        label: get('save'),
        icon: 'save',
        action: addDescriptionAction(doc),
      },
      content: [
        html`<filtered-list multi
          >${Array.from(
            items.map(
              item =>
                html`<mwc-check-list-item
                  twoline
                  selected
                  value="${item.tag + ' | ' + item.identity}"
                  ><span>${item.desc}</span
                  ><span slot="secondary"
                    >${item.tag + ' | ' + item.identity}</span
                  ></mwc-check-list-item
                >`
            )
          )}</filtered-list
        >`,
      ],
    },
  ];
}

function addDescriptionToABB(ied: Element): addDescItem[] {
  return Array.from(ied.getElementsByTagName('ExtRef'))
    .filter(element => isPublic(element))
    .filter(extRef => extRef.getAttribute('intAddr'))
    .map(extRef => {
      const intAddr = extRef.getAttribute('intAddr')!;
      const internalMapping = intAddr.split(',')[3]; //this might change as is vendor dependant!!
      const oldDesc = extRef.getAttribute('desc');
      const newDesc = oldDesc
        ? oldDesc + '-' + internalMapping
        : internalMapping;

      return {
        desc: newDesc,
        tag: <SCLTag>'ExtRef',
        identity: identity(extRef),
      };
    });
}

/** Plug-in that enriched ExtRefs desc attribute based on intAddr attribute (ABB)*/
export default class UpdateDescriptionAbb extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  doc!: XMLDocument;

  /** Entry point for this plug-in */
  async run(): Promise<void> {
    const items = Array.from(this.doc.querySelectorAll(':root > IED')).flatMap(
      ied => addDescriptionToABB(ied)
    );

    this.dispatchEvent(newWizardEvent(createLogWizard(this.doc, items)));
  }
}
