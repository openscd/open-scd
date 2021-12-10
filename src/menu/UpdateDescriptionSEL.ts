import { css, html, LitElement, query, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-list/mwc-check-list-item';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../filtered-list.js';
import {
  cloneElement,
  identity,
  isPublic,
  newWizardEvent,
  SCLTag,
  selector,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';

interface SignalDescription {
  desc: string;
  tag: SCLTag;
  identity: string | number;
}

interface SignalListRow {
  desc: string;
  iedName: string;
  id: string;
}

function addDescriptionToSEL(
  ied: Element,
  signalList: SignalListRow[]
): SignalDescription[] {
  const iedName = ied.getAttribute('name');
  const manufacturer = ied.getAttribute('manufacturer');
  if (!iedName || manufacturer !== 'SEL') return [];

  return <SignalDescription[]>Array.from(ied.getElementsByTagName('DAI'))
    .filter(element => isPublic(element))
    .filter(dai => {
      const datasrc = dai.getAttributeNS(
        'http://www.selinc.com/2006/61850',
        'datasrc'
      );
      return datasrc?.startsWith('db:');
    })
    .map(dai => {
      //the next lines are vendor dependant!!
      const datasrc = dai.getAttributeNS(
        'http://www.selinc.com/2006/61850',
        'datasrc'
      );

      const tag = datasrc ? datasrc.replace('db:', '') : null;
      const desc =
        signalList.find(
          signal => signal.id === tag && signal.iedName === iedName
        )?.desc ?? null;

      return desc ? { desc, tag: 'DAI', identity: identity(dai) } : null;
    })
    .filter(signalDescription => signalDescription);
}

function addDescriptionAction(doc: XMLDocument): WizardActor {
  return (
    _: WizardInput[],
    wizard: Element,
    list: List | null | undefined
  ): WizardAction[] => {
    const selectedItems = <ListItemBase[]>list!.selected;

    const actions = selectedItems.map(item => {
      const desc = (<Element>item.querySelector('span')).textContent;
      const [tag, identity] = item.value.split(' | ');

      const oldElement = doc.querySelector(selector(tag, identity))!;
      const newElement = cloneElement(oldElement, { desc });
      return { old: { element: oldElement }, new: { element: newElement } };
    });

    return [
      {
        title: get('updatedesc.sel'),
        actions,
      },
    ];
  };
}

function createLogWizard(doc: XMLDocument, items: SignalDescription[]): Wizard {
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

function loadSignalList(csvString: string): SignalListRow[] {
  const rows = csvString.split(/\r\n|\r|\n/);
  return rows.map(line => {
    const cols = line.split(';');
    return {
      desc: cols[0] ?? '',
      iedName: cols[1] ?? '',
      id: cols[2] ?? '',
    };
  });
}

/**
 * Plug-in that enrich the desc attribute in SEL type IED elements based on signal list
 * The signal list must be a semicolon (;) separated CSV file with 3 columns.
 * 1st column: signal name
 * 2nd column: IED name
 * 3rd column: tag of from the SEL namespace
 */
export default class UpdateDescriptionSel extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  doc!: XMLDocument;

  @query('#plugin-input') pluginFileUI!: HTMLInputElement;

  processSignalList(csvString: string): void {
    const signalList = loadSignalList(csvString);

    const items = Array.from(this.doc.querySelectorAll('IED'))
      .filter(ied => isPublic(ied))
      .flatMap(ied => addDescriptionToSEL(ied, signalList));

    document
      .querySelector('open-scd')
      ?.dispatchEvent(newWizardEvent(createLogWizard(this.doc, items)));
  }

  private async onFileInput(e: Event): Promise<void> {
    const file = (<HTMLInputElement | null>e.target)?.files?.item(0) ?? false;
    if (!file) return;

    this.processSignalList(await file.text());
  }

  /** Entry point for this plug-in */
  async run(): Promise<void> {
    this.pluginFileUI.click();
  }

  render(): TemplateResult {
    return html`<input @click=${(event: MouseEvent) =>
      ((<HTMLInputElement>event.target).value = '')} @change=${(e: Event) =>
      this.onFileInput(
        e
      )} id="plugin-input" accept=".csv" type="file"></input>`;
  }

  static styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
}
