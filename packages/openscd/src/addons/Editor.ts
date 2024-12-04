import {
  Edit,
  EditEvent,
  OpenEvent,
  newEditCompletedEvent,
  newEditEventV1,
  handleEdit
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
  AttributeValue,
  EditV1,
  EditEventV1,
  InsertV1,
  isComplexV1,
  isInsertV1,
  isNamespacedV1,
  isRemoveV1,
  isUpdateV1,
  RemoveV1,
  UpdateV1,
} from '@openscd/core';

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

  @property({
    type: Object,
  })
  host!: HTMLElement;

  private getLogText(edit: EditV1): { title: string, message?: string } {
    if (isInsertV1(edit)) {
      const name = edit.node instanceof Element ?
        edit.node.tagName :
        get('editing.node');
      return { title: get('editing.created', { name }) };
    } else if (isUpdateV1(edit)) {
      const name = edit.element.tagName;
      return { title: get('editing.updated', { name }) };
    } else if (isRemoveV1(edit)) {
      const name = edit.node instanceof Element ?
        edit.node.tagName :
        get('editing.node');
      return { title: get('editing.deleted', { name }) };
    } else if (isComplexV1(edit)) {
      const message = edit.map(e => this.getLogText(e)).map(({ title }) => title).join(', ');
      return { title: get('editing.complex'), message };
    }

    return { title: '' };
  }

  private onAction(event: EditorActionEvent<EditorAction>) {
    const edit = convertEditV1toV2(event.detail.action);
    const initiator = event.detail.initiator;

    this.host.dispatchEvent(newEditEventV1(edit, initiator));
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

    this.host.addEventListener('oscd-edit', event => this.handleEditEvent(event));
    this.host.addEventListener('oscd-edit-v2', event => this.handleEditEventV2(event));
    this.host.addEventListener('open-doc', this.onOpenDoc);
    this.host.addEventListener('oscd-open', this.handleOpenDoc);
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  handleEditEventV2(event: EditEvent) {
    console.log('Edit event v2', event);
    const edit = event.detail.edit;

    const undoEdit = handleEdit(edit);
  }

  async handleEditEvent(event: EditEventV1) {
    /**
     * This is a compatibility fix for plugins based on open energy tools edit events
     * because their edit event look slightly different
     * see https://github.com/OpenEnergyTools/open-scd-core/blob/main/foundation/edit-event-v1.ts for details
     */
    if (isOpenEnergyEditEvent(event)) {
      event = convertOpenEnergyEditEventToEditEvent(event);
    }

    const edit = event.detail.edit;
    const undoEdit = handleEditV1(edit);

    this.dispatchEvent(
      newEditCompletedEvent(event.detail.edit, event.detail.initiator)
    );

    const shouldCreateHistoryEntry = event.detail.initiator !== 'redo' && event.detail.initiator !== 'undo';

    if (shouldCreateHistoryEntry) {
      const { title, message } = this.getLogText(edit);

      this.dispatchEvent(newLogEvent({
        kind: 'action',
        title,
        message,
        redo: edit,
        undo: undoEdit,
      }));
    }

    await this.updateComplete;
    this.dispatchEvent(newValidateEvent());
  }
}

function handleEditV1(edit: EditV1): EditV1 {
  if (isInsertV1(edit)) return handleInsert(edit);
  if (isUpdateV1(edit)) return handleUpdate(edit);
  if (isRemoveV1(edit)) return handleRemove(edit);
  if (isComplexV1(edit)) return edit.map(handleEditV1).reverse();
  return [];
}

function localAttributeName(attribute: string): string {
  return attribute.includes(':') ? attribute.split(':', 2)[1] : attribute;
}

function handleInsert({
  parent,
  node,
  reference,
}: InsertV1): InsertV1 | RemoveV1 | [] {
  try {
    const { parentNode, nextSibling } = node;

    /**
     * This is a workaround for converted edit api v1 events,
     * because if multiple edits are converted, they are converted before the changes from the previous edits are applied to the document
     * so if you first remove an element and then add a clone with changed attributes, the reference will be the element to remove since it hasnt been removed yet
     */
    if (!parent.contains(reference)) {
      reference = null;
    }

    parent.insertBefore(node, reference);
    if (parentNode)
      return {
        node,
        parent: parentNode,
        reference: nextSibling,
      };
    return { node };
  } catch (e) {
    // do nothing if insert doesn't work on these nodes
    return [];
  }
}

function handleUpdate({ element, attributes }: UpdateV1): UpdateV1 {
  const oldAttributes = { ...attributes };
  Object.entries(attributes)
    .reverse()
    .forEach(([name, value]) => {
      let oldAttribute: AttributeValue;
      if (isNamespacedV1(value!))
        oldAttribute = {
          value: element.getAttributeNS(
            value.namespaceURI,
            localAttributeName(name)
          ),
          namespaceURI: value.namespaceURI,
        };
      else
        oldAttribute = element.getAttributeNode(name)?.namespaceURI
          ? {
              value: element.getAttribute(name),
              namespaceURI: element.getAttributeNode(name)!.namespaceURI!,
            }
          : element.getAttribute(name);
      oldAttributes[name] = oldAttribute;
    });
  for (const entry of Object.entries(attributes)) {
    try {
      const [attribute, value] = entry as [string, AttributeValue];
      if (isNamespacedV1(value)) {
        if (value.value === null)
          element.removeAttributeNS(
            value.namespaceURI,
            localAttributeName(attribute)
          );
        else element.setAttributeNS(value.namespaceURI, attribute, value.value);
      } else if (value === null) element.removeAttribute(attribute);
      else element.setAttribute(attribute, value);
    } catch (e) {
      // do nothing if update doesn't work on this attribute
      delete oldAttributes[entry[0]];
    }
  }
  return {
    element,
    attributes: oldAttributes,
  };
}

function handleRemove({ node }: RemoveV1): InsertV1 | [] {
  const { parentNode: parent, nextSibling: reference } = node;
  node.parentNode?.removeChild(node);
  if (parent)
    return {
      node,
      parent,
      reference,
    };
  return [];
}

function isOpenEnergyEditEvent(event: CustomEvent<unknown>): boolean {
  const eventDetail = event.detail as EditV1;
  return isComplexV1(eventDetail) || isInsertV1(eventDetail) || isUpdateV1(eventDetail) || isRemoveV1(eventDetail);
}

function convertOpenEnergyEditEventToEditEvent(event: CustomEvent<unknown>): EditEventV1 {
  const eventDetail = event.detail as EditV1;
  return newEditEventV1(eventDetail);
}
