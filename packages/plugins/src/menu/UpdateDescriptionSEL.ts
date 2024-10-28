import { css, html, LitElement, query, TemplateResult } from 'lit-element';
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

interface SignalDescription {
  desc: string;
  tag: SCLTag;
  identity: string | number;
}

function addDescriptionToSEL(
  ied: Element,
  signalList: string[][]
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
        signalList.find(row => row[2] === tag && row[1] === iedName)?.[0] ??
        null;

      return desc ? { desc, tag: 'DAI', identity: identity(dai) } : null;
    })
    .filter(signalDescription => signalDescription);
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

function parseCsv(str: string, delimiter: ',' | ';'): string[][] {
  // predefined for later use
  const quoteChar = '"',
    escapeChar = '\\';

  const entries: string[][] = [];
  let isInsideQuote = false;

  // Iterate over each character, keep track of current row and column (of the returned array)
  for (let row = 0, col = 0, char = 0; char < str.length; char++) {
    const currentChar = str[char];
    const nextChar = str[char + 1];

    entries[row] = entries[row] || [];
    entries[row][col] = entries[row][col] || '';

    //Ignore escape character
    if (currentChar === escapeChar) {
      entries[row][col] += nextChar;
      ++char;
      continue;
    }

    // Check for quoted characters. Do not miss-interpret delimiter within field
    if (currentChar === quoteChar) {
      isInsideQuote = !isInsideQuote;
      continue;
    }

    if (!isInsideQuote) {
      if (currentChar === delimiter) {
        ++col;
        entries[row][col] = '';
        continue;
      }

      if (currentChar === '\n' || currentChar === '\r') {
        ++row;
        col = 0;

        // Skip the next character for CRLF
        if (currentChar === '\r' && nextChar === '\n') ++char;

        continue;
      }
    }

    entries[row][col] += currentChar;
  }

  return entries;
}

function getGuessDelimiter(csvString: string): ';' | ',' {
  let numberComma = 0,
    numberSemicolon = 0;

  const quoteChar = '"';

  let isInsideQuote = false;
  for (const currentChar of csvString) {
    // Check for quoted characters. Do not miss-interpret delimiter within field
    if (currentChar === quoteChar) {
      isInsideQuote = !isInsideQuote;
      continue;
    }

    if (!isInsideQuote) {
      if (currentChar === ';') {
        numberSemicolon++;
        continue;
      }

      if (currentChar === ',') {
        numberComma++;
        continue;
      }
    }
  }

  return numberComma > numberSemicolon ? ',' : ';';
}

/**
 * Plug-in that enriches the desc attribute in SEL type IED elements based on a signal list
 * The signal list must be a  ; or , separated CSV file with 3 columns.
 * 1st column: signal name
 * 2nd column: IED name
 * 3rd column: identifier from the SEL namespace excluding the prefix of "db:",
 *             similar to relay word bit name (RWB), e.g. SV24T, 51P1T, IN203
 */
export default class UpdateDescriptionSel extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  doc!: XMLDocument;

  @query('#plugin-input') pluginFileUI!: HTMLInputElement;

  processSignalList(csvString: string): void {
    const signalList = parseCsv(csvString, getGuessDelimiter(csvString));

    const items = Array.from(this.doc.querySelectorAll('IED'))
      .filter(ied => isPublic(ied))
      .flatMap(ied => addDescriptionToSEL(ied, signalList));

    this.dispatchEvent(newWizardEvent(createLogWizard(this.doc, items)));
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
