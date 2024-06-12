import { OpenEvent } from '@openscd/core';
import {
  property,
  LitElement,
  customElement,
  TemplateResult,
  html,
} from 'lit-element';
import { get } from 'lit-translate';

import { newLogEvent } from '@openscd/core/foundation/deprecated/history.js';
import { newValidateEvent } from '@openscd/core/foundation/deprecated/validation.js';
import { OpenDocEvent } from '@openscd/core/foundation/deprecated/open-event.js';

@customElement('oscd-doc')
export class OscdDoc extends LitElement {
  /** The `XMLDocument` to be edited */
  @property({ attribute: false })
  doc: XMLDocument | null = null;
  /** The name of the current [[`doc`]] */
  @property({ type: String }) docName = '';
  /** The UUID of the current [[`doc`]] */
  @property({ type: String }) docId = '';

  @property({
    type: Object,
  })
  host!: HTMLElement;

  @property({
    type: Number,
  })
  editCount = -1;

  /**
   *
   * @deprecated [Move to handleOpenDoc instead]
   */
  private async onOpenDoc(event: OpenDocEvent) {
    this.doc = event.detail.doc;
    this.docName = event.detail.docName;
    this.docId = event.detail.docId ?? '';

    await this.updateComplete;

    this.dispatchEvent(newValidateEvent());

    this.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get('openSCD.loaded', { name: this.docName }),
      })
    );
  }

  handleOpenDoc({ detail: { docName, doc } }: OpenEvent) {
    this.doc = doc;
    this.docName = docName;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.host.addEventListener('open-doc', this.onOpenDoc);
    this.host.addEventListener('oscd-open', this.handleOpenDoc);
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
