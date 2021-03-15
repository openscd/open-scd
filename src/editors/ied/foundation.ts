import { css } from 'lit-element';

import {
  EditorAction,
  getDataSink,
  getValue,
  WizardAction,
  WizardInput,
} from '../../foundation.js';

interface UpdateOptions {
  element: Element;
}
interface CreateOptions {
  parent: Element;
  templates: XMLDocument;
}
export type WizardOptions = UpdateOptions | CreateOptions;

interface DataReference extends LnReference {
  doName: string;
  daName: string | null;
  fc: string;
}

interface LnReference {
  iedName: string;
  apRef: string;
  ldInst: string | null; //for client ln's ldInst is null
  prefix: string | null;
  lnClass: string;
  inst: string | null;
}

interface Sink {
  element: Element | null;
  reference: LnReference | null;
}

interface Source {
  cbName: string;
  reference: LnReference;
  data?: DataReference; // fcda within a control block
}

export interface Connection {
  source: Source;
  sink: Sink;
  serviceType: 'RP' | 'G' | 'SV';
}

/**@returns array of Connection's describing `GOOSE` connection's */
export function getDataConnection(
  doc: Document,
  CbTagNAme: 'GSEControl' | 'SampledValueControl' | 'ReportControl'
): Connection[] {
  const gseControlList = Array.from(doc.querySelectorAll(CbTagNAme)).filter(
    item => !item.closest('Private')
  );

  const conn: Connection[] = [];

  gseControlList.forEach(gseControl => {
    const ln0: Element = gseControl.parentElement!;
    const dataList: Element[] = Array.from(
      ln0.querySelectorAll(
        ` DataSet[name="${gseControl.getAttribute('datSet')}"] > FCDA`
      )
    ).filter(item => !item.closest('Private'));

    dataList.forEach(data => {
      getDataSink(data)
        .filter(extRef => extRef)
        .forEach(extRef => {
          conn.push({
            source: {
              cbName: gseControl.getAttribute('name')!,
              reference: getLnReference(gseControl)!,
              data: {
                iedName: data.closest('IED')?.getAttribute('name') ?? '',
                apRef: data.closest('AccessPoint')?.getAttribute('name') ?? '',
                ldInst: data.getAttribute('ldInst') ?? '',
                prefix: data.getAttribute('prefix') ?? '',
                lnClass: data.getAttribute('lnClass') ?? '',
                inst: data.getAttribute('lnInst') ?? '',
                doName: data.getAttribute('doName')!,
                daName: data.getAttribute('daName'),
                fc: data.getAttribute('fc') ?? '',
              },
            },
            sink: {
              element: extRef,
              reference: getLnReference(extRef),
            },
            serviceType: CbTagNAme === 'GSEControl' ? 'G' : 'SV',
          });
        });
    });
  });

  return conn;
}

/**@returns array of Connection's  describing `Report` connection's */
export function getReportConnection(doc: Document): Connection[] {
  return Array.from(
    doc.querySelectorAll('ReportControl > RptEnabled > ClientLN')
  )
    .filter(item => !item.closest('Private'))
    .map(clientLN => {
      return {
        source: {
          cbName: clientLN.closest('ReportControl')!.getAttribute('name')!,
          reference: getLnReference(clientLN)!,
        },
        sink: {
          element: clientLN,
          reference: {
            iedName: clientLN.getAttribute('iedName')!,
            apRef: clientLN.getAttribute('apRef')!,
            ldInst: clientLN.getAttribute('ldInst')!,
            prefix: clientLN.getAttribute('prefix') ?? '',
            lnClass: clientLN.getAttribute('lnClass')!,
            inst: clientLN.getAttribute('lnInst') ?? '',
          },
        },
        serviceType: 'RP',
      };
    });
}

/**Returns the reference for logical nodes or it's child elements as LnReference*/
export function getLnReference(element: Element): LnReference | null {
  if (element.closest('Private')) return null;

  if (
    !element.closest('IED') ||
    !element.closest('AccessPoint') ||
    !element.closest('Server') ||
    !element.closest('LDevice') ||
    !(element.closest('LN') || element.closest('LN0'))
  )
    return null; // not a valid logical node reference

  const ln: Element | null =
    element.tagName === 'LN' || element.tagName === 'LN0'
      ? element
      : element.closest('LN0')
      ? element.closest('LN0')
      : element.closest('LN');
  const ld: Element | null = element.closest('LDevice');

  return {
    iedName: element.closest('IED')?.getAttribute('name') ?? '',
    apRef: element.closest('AccessPoint')?.getAttribute('name') ?? '',
    ldInst: ld?.getAttribute('inst') ?? '',
    prefix: ln?.getAttribute('prefix') ?? '',
    lnClass: ln?.getAttribute('lnClass') ?? '',
    inst: ln?.getAttribute('inst') ?? '',
  };
}

export function isCreateOptions(
  options: WizardOptions
): options is CreateOptions {
  return (<CreateOptions>options).parent !== undefined;
}

export function updateIDNamingAction(element: Element): WizardAction {
  return (inputs: WizardInput[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    if (
      id === element.getAttribute('id') &&
      desc === element.getAttribute('desc')
    )
      return [];

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('id', id);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);

    return [{ old: { element }, new: { element: newElement } }];
  };
}

/** Common `CSS` styles used by IED subeditors */
export const styles = css`
  :host(.moving) section {
    opacity: 0.3;
  }
  section {
    background-color: var(--mdc-theme-surface);
    transition: all 200ms linear;
    outline-color: var(--mdc-theme-primary);
    outline-style: solid;
    outline-width: 0px;
    margin: 8px 12px 16px;
    opacity: 1;
  }
  section:focus {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }
  section:focus-within {
    outline-width: 2px;
    transition: all 250ms linear;
  }
  h1,
  h2,
  h3 {
    color: var(--mdc-theme-on-surface);
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px;
    line-height: 48px;
    padding-left: 0.3em;
    transition: background-color 150ms linear;
  }
  section:focus-within > h1,
  section:focus-within > h2,
  section:focus-within > h3 {
    color: var(--mdc-theme-surface);
    background-color: var(--mdc-theme-primary);
    transition: background-color 200ms linear;
  }
  h1 > nav,
  h2 > nav,
  h3 > nav,
  h1 > abbr > mwc-icon-button,
  h2 > abbr > mwc-icon-button,
  h3 > abbr > mwc-icon-button {
    float: right;
  }
  abbr[title] {
    border-bottom: none !important;
    cursor: inherit !important;
    text-decoration: none !important;
  }
`;
