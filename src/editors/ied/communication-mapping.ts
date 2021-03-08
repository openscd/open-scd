import { html } from 'lit-html';

import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '../../filtered-list.js';
import { clientlnwizard } from './clientlnwizard.js';
import { newWizardEvent, Wizard } from '../../foundation.js';

function getSinkIedElement(evt: SingleSelectedEvent, doc: Document): Element {
  const sinkList: List = <List>evt.target;
  const selectedIED: ListItemBase = <ListItemBase>sinkList.selected!;

  const sinkIedElement = <Element>(
    doc.querySelector(`:root > IED[name="${selectedIED.value}"]`)!
  );

  return sinkIedElement;
}

function getSelectedSourceIedElements(
  evt: SingleSelectedEvent,
  doc: Document
): Element[] {
  const sinkList: List = <List>evt.target;

  if (!sinkList.parentElement) return [];

  const sourceList: List = <List>(
    sinkList.parentElement!.querySelector('#sourceList')!
  );

  const selectedIEDs: ListItemBase[] = <ListItemBase[]>sourceList.selected!;

  const selectedIedElements = <Element[]>(
    selectedIEDs
      .map(ied => doc.querySelector(`:root > IED[name="${ied.value}"]`))
      .filter(item => item !== null)
  );

  return selectedIedElements;
}

export function communicationMappingWizard(doc: Document): Wizard {
  return [
    {
      title: 'trans: Communication mapping',
      content:
        doc.querySelectorAll(':root > IED').length > 1
          ? [
              html` <div
                class="wrapper"
                style="display: grid; grid-template-columns: 1fr 1fr;"
              >
                <filtered-list
                  id="sourceList"
                  multi
                  activatable
                  searchFieldLabel="Source"
                >
                  ${Array.from(doc.querySelectorAll(':root > IED') ?? []).map(
                    IED =>
                      html`<mwc-list-item value="${IED.getAttribute('name')!}"
                        >${IED.getAttribute('name')}</mwc-list-item
                      >`
                  )}
                </filtered-list>
                <filtered-list
                  id="sinkList"
                  activatable
                  searchFieldLabel="Sink"
                  @selected="${(evt: SingleSelectedEvent) =>
                    evt.target!.dispatchEvent(
                      newWizardEvent(
                        clientlnwizard(
                          getSelectedSourceIedElements(evt, doc),
                          getSinkIedElement(evt, doc)
                        ),
                        {
                          detail: { subwizard: true },
                        }
                      )
                    )}"
                >
                  ${Array.from(doc.querySelectorAll(':root > IED') ?? []).map(
                    IED =>
                      html`<mwc-list-item value="${IED.getAttribute('name')!}"
                        >${IED.getAttribute('name')}</mwc-list-item
                      >`
                  )}
                </filtered-list>
              </div>`,
            ]
          : [
              html`
                <div style="display:flex">
                  <mwc-icon slot="graphic">info</mwc-icon
                  ><span style="margin-left:20px">trans: missing ied's</span>
                </div>
              `,
            ],
    },
  ];
}
