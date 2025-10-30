import {
  EditEventV2,
  OpenEvent,
  newEditEvent,
  newEditEventV2,
  XMLEditor
} from '@openscd/core';
import {
  property,
  LitElement,
  customElement,
  TemplateResult,
  html,
} from 'lit-element';
import { get } from 'lit-translate';

import {
  EditorAction,
  EditorActionEvent,
} from '@openscd/core/foundation/deprecated/editor.js';

import { newLogEvent } from '@openscd/core/foundation/deprecated/history.js';
import { newValidateEvent } from '@openscd/core/foundation/deprecated/validation.js';
import { OpenDocEvent } from '@openscd/core/foundation/deprecated/open-event.js';

import {
  Edit,
  EditEvent,
  isComplex,
  isInsert,
  isRemove,
  isUpdate,
} from '@openscd/core';

import { convertEditActiontoV1 } from './editor/edit-action-to-v1-converter.js';
import { convertEditV1toV2 } from './editor/edit-v1-to-v2-converter.js';

@customElement('oscd-editor')
export class OscdEditor extends LitElement {
  /** The `XMLDocument` to be edited */
  @property({ attribute: false })
  doc: XMLDocument | null = null;
  /** The name of the current [[`doc`]] */
  @property({ type: String }) docName = '';
  /** The UUID of the current [[`doc`]] */
  @property({ type: String }) docId = '';
  /** XML Editor to apply changes to the scd */
  @property({ type: Object }) editor!: XMLEditor;

  @property({
    type: Object,
  })
  host!: HTMLElement;

  private onAction(event: EditorActionEvent<EditorAction>) {
    const edit = convertEditActiontoV1(event.detail.action);
    const editV2 = convertEditV1toV2(edit);

    this.host.dispatchEvent(newEditEventV2(editV2));
  }

  handleEditEvent(event: EditEvent) {
    /**
     * This is a compatibility fix for plugins based on open energy tools edit events
     * because their edit event look slightly different
     * see https://github.com/OpenEnergyTools/open-scd-core/blob/main/foundation/edit-event-v1.ts for details
     */
    if (isOpenEnergyEditEvent(event)) {
      event = convertOpenEnergyEditEventToEditEvent(event);
    }

    const edit = event.detail.edit;
    const editV2 = convertEditV1toV2(edit);

    this.host.dispatchEvent(newEditEventV2(editV2));
  }

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

    // Deprecated editor action API, use 'oscd-edit' instead.
    this.host.addEventListener('editor-action', this.onAction.bind(this));
    // Deprecated edit event API, use 'oscd-edit-v2' instead.
    this.host.addEventListener('oscd-edit', event => this.handleEditEvent(event));

    this.host.addEventListener('oscd-edit-v2', event => this.handleEditEventV2(event));
    this.host.addEventListener('open-doc', this.onOpenDoc);
    this.host.addEventListener('oscd-open', this.handleOpenDoc);
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  async handleEditEventV2(event: EditEventV2) {
    const { edit, title, squash } = event.detail;

    this.editor.commit(edit, { title, squash });

    await this.updateComplete;
    this.dispatchEvent(newValidateEvent());
  }
}

function isOpenEnergyEditEvent(event: CustomEvent<unknown>): boolean {
  const eventDetail = event.detail as Edit;
  return isComplex(eventDetail) || isInsert(eventDetail) || isUpdate(eventDetail) || isRemove(eventDetail);
}

function convertOpenEnergyEditEventToEditEvent(event: CustomEvent<unknown>): EditEvent {
  const eventDetail = event.detail as Edit;
  return newEditEvent(eventDetail);
}
