import {
  css,
  html,
  LitElement,
  property,
  query,
  queryAll,
  state,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-dialog';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-radio-list-item';
import { Dialog } from '@material/mwc-dialog';
import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';
import { Select } from '@material/mwc-select';

import '../filtered-list.js';
import {
  getChildElementsByTagName,
  identity,
  newActionEvent,
  selector,
} from '../foundation.js';
import { WizardTextField } from '../wizard-textfield.js';
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
      const lnType = lLN0?.split(': ')[1];

      lDeviceDescriptions.push({
        validLdInst: functionDescription.uniqueName,
        anyLNs: [
          { prefix: null, lnClass: 'LLN0', inst: '', lnType },
          ...functionDescription.lNodes
            .filter(lNode => selectedLNodes.includes(lNode))
            .map(lNode => {
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

export default class VirtualTemplateIED extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
  @state()
  get isValidManufacturer(): boolean {
    const manufacturer = this.dialog?.querySelector<WizardTextField>(
      'wizard-textfield[label="manufacturer"]'
    )!.value;

    return (manufacturer && manufacturer !== '') || false;
  }
  @state()
  get isValidApName(): boolean {
    const apName = this.dialog?.querySelector<WizardTextField>(
      'wizard-textfield[label="AccessPoint name"]'
    )!.value;

    return (apName && apName !== '') || false;
  }
  @state()
  get someItemsSelected(): boolean {
    if (!this.selectedLNodeItems) return false;
    return !!this.selectedLNodeItems.length;
  }
  @state()
  get validPriparyAction(): boolean {
    return (
      this.someItemsSelected && this.isValidManufacturer && this.isValidApName
    );
  }

  get unreferencedLNodes(): Element[] {
    return Array.from(
      this.doc.querySelectorAll('LNode[iedName="None"]')
    ).filter(lNode => lNode.getAttribute('lnClass') !== 'LLN0');
  }

  get lLN0s(): Element[] {
    return Array.from(this.doc.querySelectorAll('LNodeType[lnClass="LLN0"]'));
  }

  @query('mwc-dialog') dialog!: Dialog;
  @queryAll('mwc-check-list-item[selected]')
  selectedLNodeItems?: CheckListItem[];

  async run(): Promise<void> {
    this.dialog.open = true;
  }

  private onPrimaryAction(
    functions: Record<string, FunctionElementDescription>
  ): void {
    const selectedLNode = Array.from(
      this.dialog.querySelectorAll<CheckListItem>(
        'mwc-check-list-item[selected]:not([disabled])'
      ) ?? []
    ).map(
      selectedItem =>
        this.doc.querySelector(selector('LNode', selectedItem.value))!
    );
    if (!selectedLNode.length) return;

    const selectedLLN0s = Array.from(
      this.dialog.querySelectorAll<Select>('mwc-select') ?? []
    ).map(selectedItem => selectedItem.value);

    const manufacturer = this.dialog.querySelector<WizardTextField>(
      'wizard-textfield[label="manufacturer"]'
    )!.value;
    const desc = this.dialog.querySelector<WizardTextField>(
      'wizard-textfield[label="desc"]'
    )!.maybeValue;
    const apName = this.dialog.querySelector<WizardTextField>(
      'wizard-textfield[label="AccessPoint name"]'
    )!.value;

    const ied = getSpecificationIED(this.doc, {
      manufacturer,
      desc,
      apName,
      lDevices: getLDeviceDescriptions(functions, selectedLNode, selectedLLN0s),
    });

    // checkValidity: () => true disables name check as is the same here: SPECIFICATION
    this.dispatchEvent(
      newActionEvent({
        new: { parent: this.doc.documentElement, element: ied },
        checkValidity: () => true,
      })
    );
    this.dialog.close();
  }

  private onClosed(ae: CustomEvent<{ action: string } | null>): void {
    if (!(ae.target instanceof Dialog && ae.detail?.action)) return;
  }

  private renderLLN0s(
    functionID: string,
    lLN0Types: Element[],
    lNode?: Element
  ): TemplateResult {
    if (!lNode && !lLN0Types.length) return html``;

    if (lNode)
      return html`<mwc-select
        disabled
        naturalMenuWidth
        value="${functionID + ': ' + lNode.getAttribute('lnType')}"
        style="width:100%"
        label="LLN0"
        >${html`<mwc-list-item
          value="${functionID + ': ' + lNode.getAttribute('lnType')}"
          >${lNode.getAttribute('lnType')}
        </mwc-list-item>`}</mwc-select
      >`;

    return html`<mwc-select
      naturalMenuWidth
      style="width:100%"
      label="LLN0"
      value="${functionID + ': ' + lLN0Types[0].getAttribute('id')}"
      >${lLN0Types.map(lLN0Type => {
        return html`<mwc-list-item
          value="${functionID + ': ' + lLN0Type.getAttribute('id')}"
          >${lLN0Type.getAttribute('id')}</mwc-list-item
        >`;
      })}</mwc-select
    >`;
  }

  private renderLNodes(lNodes: Element[], disabled: boolean): TemplateResult[] {
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

  render(): TemplateResult {
    if (!this.doc) return html``;

    const existValidLLN0 = this.lLN0s.length !== 0;

    const functionElementDescriptions = groupLNodesToFunctions(
      this.unreferencedLNodes
    );

    return html`<mwc-dialog
      heading="Create SPECIFICATION type IED"
      @closed=${this.onClosed}
      ><div>
        <wizard-textfield
          label="manufacturer"
          .maybeValue=${''}
          required
          @keypress=${() => this.requestUpdate()}
        ></wizard-textfield>
        <wizard-textfield
          label="desc"
          .maybeValue=${null}
          nullable
        ></wizard-textfield>
        <wizard-textfield
          label="AccessPoint name"
          .maybeValue=${''}
          required
          @keypress=${() => this.requestUpdate()}
        ></wizard-textfield>
        <filtered-list multi @selected=${() => this.requestUpdate()}
          >${Object.entries(functionElementDescriptions).flatMap(
            ([id, functionDescription]) => [
              html`<mwc-list-item
                twoline
                noninteractive
                value="${id}"
                style="font-weight:500"
                ><span>${functionDescription.uniqueName}</span
                ><span slot="secondary"
                  >${existValidLLN0 ? id : 'Invalid LD: Missing LLN0'}</span
                ></mwc-list-item
              >`,
              this.renderLLN0s(
                functionDescription.uniqueName,
                this.lLN0s,
                functionDescription.lln0
              ),
              ...this.renderLNodes(functionDescription.lNodes, !existValidLLN0),
              html`<li padded divider role="separator"></li>`,
            ]
          )}</filtered-list
        >
      </div>
      <mwc-button
        slot="secondaryAction"
        dialogAction="close"
        label="${translate('close')}"
        style="--mdc-theme-primary: var(--mdc-theme-error)"
      ></mwc-button>
      <mwc-button
        ?disabled=${!this.validPriparyAction}
        slot="primaryAction"
        icon="save"
        label="${translate('save')}"
        trailingIcon
        @click=${() => this.onPrimaryAction(functionElementDescriptions)}
      ></mwc-button
    ></mwc-dialog>`;
  }

  static styles = css`
    mwc-dialog {
      --mdc-dialog-max-width: 92vw;
    }

    div {
      display: flex;
      flex-direction: column;
    }

    div > * {
      display: block;
      margin-top: 16px;
    }
  `;
}
