import {
  html,
  LitElement,
  TemplateResult,
  property,
  customElement,
  state,
} from 'lit-element';

import '@openscd/open-scd/src/action-icon.js';
import {
  identity,
  newLnInstGenerator,
  newWizardEvent,
} from '@openscd/open-scd/src/foundation.js';

import {
  cloneElement,
} from '@openscd/xml';

import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
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
} from '@openscd/open-scd/src/icons/lnode.js';
import { wizards } from '../../wizards/wizard-library.js';

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
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
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
  @state()
  private get isIEDReference(): boolean {
    return this.element.getAttribute('iedName') !== 'None';
  }

  private cloneLNodeElement(): void {
    const lnClass = this.element.getAttribute('lnClass');
    if (!lnClass) return;

    const uniqueLnInst = newLnInstGenerator(this.element.parentElement!)(
      lnClass
    );
    if (!uniqueLnInst) return;

    const newElement = cloneElement(this.element, { lnInst: uniqueLnInst });
    this.dispatchEvent(
      newActionEvent({
        new: { parent: this.element.parentElement!, element: newElement },
      })
    );
  }

  private openEditWizard(): void {
    const wizard = wizards['LNode'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  remove(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.element.parentElement!,
            element: this.element,
          },
        })
      );
  }

  render(): TemplateResult {
    return html`<action-icon
      label="${this.header}"
      ?secondary=${this.missingIedReference}
      ?highlighted=${this.missingIedReference}
      ><mwc-icon slot="icon">${getLNodeIcon(this.element)}</mwc-icon
      ><mwc-fab
        slot="action"
        mini
        icon="edit"
        @click="${() => this.openEditWizard()}}"
      ></mwc-fab
      ><mwc-fab
        slot="action"
        mini
        icon="delete"
        @click="${() => this.remove()}}"
      ></mwc-fab
      >${this.isIEDReference
        ? html``
        : html`<mwc-fab
            slot="action"
            mini
            icon="content_copy"
            @click=${() => this.cloneLNodeElement()}
          ></mwc-fab>`}
    </action-icon>`;
  }
}
