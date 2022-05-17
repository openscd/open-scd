import {
  html,
  LitElement,
  TemplateResult,
  property,
  customElement,
  state,
} from 'lit-element';

import '../../action-icon.js';
import { identity } from '../../foundation.js';
import {
  automationLogicalNode,
  controlLogicalNode,
  functionalLogicalNode,
  furtherPowerSystemEquipmentLogicalNode,
  generalLogicalNode,
  interfacingLogicalNode,
  measurementLogicalNode,
  nonElectricalLogicalNode,
  powerTransformerLogicalNode,
  protectionLogicalNode,
  protectionRelatedLogicalNode,
  qualityLogicalNode,
  supervisionLogicalNode,
  switchgearLogicalNode,
  systemLogicalNode,
  transformerLogicalNode,
} from '../../icons/lnode.js';

export function getLNodeIcon(lNode: Element): TemplateResult {
  const lnClassGroup = lNode.getAttribute('lnClass')?.charAt(0) ?? '';
  return lnClassIcons[lnClassGroup] ?? systemLogicalNode;
}

const lnClassIcons: Partial<Record<string, TemplateResult>> = {
  L: systemLogicalNode,
  A: automationLogicalNode,
  C: controlLogicalNode,
  F: functionalLogicalNode,
  G: generalLogicalNode,
  I: interfacingLogicalNode,
  K: nonElectricalLogicalNode,
  M: measurementLogicalNode,
  P: protectionLogicalNode,
  Q: qualityLogicalNode,
  R: protectionRelatedLogicalNode,
  S: supervisionLogicalNode,
  T: transformerLogicalNode,
  X: switchgearLogicalNode,
  Y: powerTransformerLogicalNode,
  Z: furtherPowerSystemEquipmentLogicalNode,
};

/** Pane rendering `LNode` element with its children */
@customElement('l-node-editor')
export class LNodeEditor extends LitElement {
  /** The edited `LNode` element */
  @property({ attribute: false })
  element!: Element;
  @state()
  private get header(): string {
    const prefix = this.element.getAttribute('prefix') ?? '';
    const lnClass = this.element.getAttribute('lnClass');
    const lnInst = this.element.getAttribute('lnInst');

    const header = this.missingIedReference
      ? `${prefix} ${lnClass} ${lnInst}`
      : identity(this.element);

    return typeof header === 'string' ? header : '';
  }
  @state()
  private get missingIedReference(): boolean {
    return this.element.getAttribute('iedName') === 'None' ?? false;
  }

  render(): TemplateResult {
    return html`<action-icon
      label="${this.header}"
      ?secondary=${this.missingIedReference}
      ?highlighted=${this.missingIedReference}
      hideActions
      ><mwc-icon slot="icon"
        >${getLNodeIcon(this.element)}</mwc-icon
      ></action-icon
    >`;
  }
}
