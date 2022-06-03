import { html, LitElement, property, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-dialog';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-radio-list-item';

import '../filtered-list.js';
import {
  EditorAction,
  getChildElementsByTagName,
  getValue,
  identity,
  newWizardEvent,
  selector,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';
import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';
import {
  getFunctionNamingPrefix,
  getNonLeafParent,
  getSpecificationIED,
  getUniqueFunctionName,
  LDeviceDescription,
} from './virtualtemplateied/foundation.js';

export type FunctionElementDescription = {
  uniqueName: string;
  lNodes: Element[];
  lln0?: Element;
};

/** converts FunctionElementDescription's to LDeviceDescription's */
function getLDeviceDescriptions(
  functions: Record<string, FunctionElementDescription>,
  selectedLNodes: Element[],
  selectedLLN0s: string[]
): LDeviceDescription[] {
  const lDeviceDescriptions: LDeviceDescription[] = [];

  Object.values(functions).forEach(functionDescription => {
    if (
      functionDescription.lNodes.some(lNode => selectedLNodes.includes(lNode))
    ) {
      const lLN0 = selectedLLN0s.find(selectedLLN0 =>
        selectedLLN0.includes(functionDescription.uniqueName)
      )!;
      const lnType = lLN0?.split(' ')[0];

      lDeviceDescriptions.push({
        validLdInst: functionDescription.uniqueName,
        anyLNs: [
          { prefix: null, lnClass: 'LLN0', inst: '', lnType },
          ...functionDescription.lNodes.map(lNode => {
            return {
              prefix: getFunctionNamingPrefix(lNode),
              lnClass: lNode.getAttribute('lnClass')!,
              inst: lNode.getAttribute('lnInst')!,
              lnType: lNode.getAttribute('lnType')!,
            };
          }),
        ],
      });
    }
  });

  return lDeviceDescriptions;
}

/** Groups all incomming LNode's with non-leaf parent function type elements */
function groupLNodesToFunctions(
  lNodes: Element[]
): Record<string, FunctionElementDescription> {
  const functionElements: Record<string, FunctionElementDescription> = {};

  lNodes.forEach(lNode => {
    const parentFunction = getNonLeafParent(lNode);
    if (!parentFunction) return;

    if (functionElements[identity(parentFunction)])
      functionElements[identity(parentFunction)].lNodes.push(lNode);
    else {
      functionElements[identity(parentFunction)] = {
        uniqueName: getUniqueFunctionName(parentFunction),
        lNodes: [lNode],
        lln0: getChildElementsByTagName(parentFunction, 'LNode').find(
          lNode => lNode.getAttribute('lnClass') === 'LLN0'
        ),
      };
    }
  });

  return functionElements;
}

function createSpecificationIEDAction(
  parent: Element,
  functions: Record<string, FunctionElementDescription>
): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    const selectedLNode = Array.from(
      wizard.shadowRoot?.querySelectorAll<CheckListItem>(
        'mwc-check-list-item[selected]:not([disabled])'
      ) ?? []
    ).map(
      selectedItem =>
        parent.querySelector(selector('LNode', selectedItem.value))!
    );
    if (!selectedLNode.length) return [];

    const selectedLLN0s = Array.from(
      wizard.shadowRoot?.querySelectorAll<CheckListItem>(
        'mwc-radio-list-item[selected]'
      ) ?? []
    ).map(selectedItem => selectedItem.value);

    const manufacturer = getValue(
      inputs.find(i => i.label === 'manufacturer')!
    )!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const apName = getValue(inputs.find(i => i.label === 'AccessPoint name')!)!;

    const ied = getSpecificationIED(parent.ownerDocument, {
      manufacturer,
      desc,
      apName,
      lDevices: getLDeviceDescriptions(functions, selectedLNode, selectedLLN0s),
    });

    // checkValidity: () => true disables name check as is the same here: SPECIFICATION
    return [{ new: { parent, element: ied }, checkValidity: () => true }];
  };
}

/** renders LNode of class `LLN0` OR all available LNodeType[lnClass="LLN0"] */
function renderLLN0s(
  functionID: string,
  lLN0Types: Element[],
  lNode?: Element
): TemplateResult[] {
  if (!lNode && !lLN0Types.length) return [html``];

  if (lNode)
    return [
      html`<mwc-radio-list-item
        group="${functionID}"
        value="${functionID} ${lNode.getAttribute('lnType')}"
        twoline
        selected
        ><span>LLN0</span
        ><span slot="secondary">${lNode.getAttribute('lnType')}</span>
      </mwc-radio-list-item>`,
    ];

  return lLN0Types.map(lLN0Type => {
    return html`<mwc-radio-list-item
      group="${functionID}"
      value="${functionID} ${lLN0Type.getAttribute('id')}"
      twoline
      ?selected=${lLN0Types[0] === lLN0Type}
      ><span>${'LLN0'}</span
      ><span slot="secondary"
        >${lLN0Type.getAttribute('id')}</span
      ></mwc-radio-list-item
    >`;
  });
}

/** renders `LNode` elements */
function renderLNodes(lNodes: Element[], disabled: boolean): TemplateResult[] {
  return lNodes.map(lNode => {
    const prefix = getFunctionNamingPrefix(lNode);
    const lnClass = lNode.getAttribute('lnClass')!;
    const lnInst = lNode.getAttribute('lnInst')!;

    const label = prefix + ' ' + lnClass + ' ' + lnInst;
    return html`<mwc-check-list-item
      ?disabled=${disabled}
      value="${identity(lNode)}"
      >${label}</mwc-check-list-item
    >`;
  });
}

function createSpecificationIEDFromFunctionWizard(doc: XMLDocument): Wizard {
  const lNodes = Array.from(
    doc.querySelectorAll('LNode[iedName="None"]')
  ).filter(lNode => lNode.getAttribute('lnClass') !== 'LLN0');

  const lln0s = Array.from(doc.querySelectorAll('LNodeType[lnClass="LLN0"]'));
  const existValidLLN0 = lln0s.length !== 0;

  const functionElementDescriptions = groupLNodesToFunctions(lNodes);

  return [
    {
      title: 'Create SPECIFICATION type IED',
      primary: {
        icon: 'save',
        label: get('save'),
        action: createSpecificationIEDAction(
          doc.querySelector('SCL')!,
          functionElementDescriptions
        ),
      },
      content: [
        html`<wizard-textfield
          label="manufacturer"
          .maybeValue=${''}
          required
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          .maybeValue=${null}
          nullable
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="AccessPoint name"
          .maybeValue=${''}
          required
        ></wizard-textfield>`,
        html`<filtered-list multi
          >${Object.entries(functionElementDescriptions).flatMap(
            ([id, functionDescription]) => [
              html`<mwc-list-item twoline noninteractive value="${id}"
                ><span>${functionDescription.uniqueName}</span
                ><span slot="secondary"
                  >${existValidLLN0 ? id : 'Invalid LD: Missing LLN0'}</span
                ></mwc-list-item
              >`,
              html`<li padded divider role="separator"></li>`,
              ...renderLLN0s(
                functionDescription.uniqueName,
                lln0s,
                functionDescription.lln0
              ),
              ...renderLNodes(functionDescription.lNodes, !existValidLLN0),
            ]
          )}</filtered-list
        >`,
      ],
    },
  ];
}

export default class VirtualTemplateIED extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  async run(): Promise<void> {
    this.dispatchEvent(
      newWizardEvent(createSpecificationIEDFromFunctionWizard(this.doc))
    );
  }
}
