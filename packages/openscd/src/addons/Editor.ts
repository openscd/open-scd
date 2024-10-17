import { OpenEvent, newEditCompletedEvent, newEditEvent } from '@openscd/core';
import {
  property,
  LitElement,
  customElement,
  TemplateResult,
  html,
} from 'lit-element';
import { get } from 'lit-translate';

import {
  Move,
  Create,
  Delete,
  EditorAction,
  EditorActionEvent,
  SimpleAction,
  Replace,
  Update,
} from '@openscd/core/foundation/deprecated/editor.js';

import { newLogEvent } from '@openscd/core/foundation/deprecated/history.js';
import { newValidateEvent } from '@openscd/core/foundation/deprecated/validation.js';
import { OpenDocEvent } from '@openscd/core/foundation/deprecated/open-event.js';
import { getReference, SCLTag } from '../foundation.js';
import {
  isCreate,
  isDelete,
  isMove,
  isSimple,
  isReplace,
  isUpdate,
} from '@openscd/core/foundation/deprecated/editor.js';

import {
  AttributeValue as AttributeValueV2,
  Edit as EditV2,
  EditEvent as EditEventV2,
  Insert as InsertV2,
  isComplex as isComplexV2,
  isInsert as isInsertV2,
  isNamespaced as isNamespacedV2,
  isRemove as isRemoveV2,
  isUpdate as isUpdateV2,
  LitElementConstructor,
  OpenEvent as OpenEventV2,
  Remove as RemoveV2,
  Update as UpdateV2,
} from '@openscd/core';

import { convertEditV1toV2 } from '@openscd/core';

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

  @property({
    type: Number,
  })
  editCount = -1;

  private getLogText(edit: EditV2): { title: string, message?: string } {
    if (isInsertV2(edit)) {
      const name = edit.node instanceof Element ?
        edit.node.tagName :
        get('editing.node');
      return { title: get('editing.created', { name }) };
    } else if (isUpdateV2(edit)) {
      const name = edit.element.tagName;
      return { title: get('editing.updated', { name }) };
    } else if (isRemoveV2(edit)) {
      const name = edit.node instanceof Element ?
        edit.node.tagName :
        get('editing.node');
      return { title: get('editing.deleted', { name }) };
    } else if (isComplexV2(edit)) {
      const message = edit.map(this.getLogText).map(({ title }) => title).join(', ');
      return { title: get('editing.complex'), message };
    }

    return { title: '' };
  }

  private onAction(event: EditorActionEvent<EditorAction>) {
    console.log('old event', event);

    const editV2 = convertEditV1toV2(event.detail.action);
    const initiator = event.detail.initiator;

    console.log('dispatching new event', editV2);

    this.host.dispatchEvent(newEditEvent(editV2, initiator));
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

    this.host.addEventListener('editor-action', this.onAction.bind(this));
    this.host.addEventListener('open-doc', this.onOpenDoc);
    this.host.addEventListener('oscd-open', this.handleOpenDoc);

    // TODO: Test v2 API
    this.host.addEventListener('oscd-edit', event => this.handleEditEventV2(event));
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  // Test API v2 start
  handleEditEventV2(event: EditEventV2) {
    console.log('Edit V2', event);
    const edit = event.detail.edit;
    const undoEdit = handleEditV2(edit);
    this.editCount += 1;

    this.dispatchEvent(
      newEditCompletedEvent(event.detail.edit, event.detail.initiator)
    );

    const isUserEvent = event.detail.initiator === 'user';

    if (isUserEvent) {
      const { title, message } = this.getLogText(edit);

      this.dispatchEvent(newLogEvent({
        kind: 'action',
        title,
        message,
        redo: edit,
        undo: undoEdit,
      }));
    }
  }

  // Test API v2 end
}

function handleEditV2(edit: EditV2): EditV2 {
  console.log('Edit V2 event', edit);

  if (isInsertV2(edit)) return handleInsertV2(edit);
  if (isUpdateV2(edit)) return handleUpdateV2(edit);
  if (isRemoveV2(edit)) return handleRemoveV2(edit);
  if (isComplexV2(edit)) return edit.map(handleEditV2).reverse();
  return [];
}

function localAttributeName(attribute: string): string {
  return attribute.includes(':') ? attribute.split(':', 2)[1] : attribute;
}

function handleInsertV2({
  parent,
  node,
  reference,
}: InsertV2): InsertV2 | RemoveV2 | [] {
  try {
    const { parentNode, nextSibling } = node;
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

function handleUpdateV2({ element, attributes }: UpdateV2): UpdateV2 {
  const oldAttributes = { ...attributes };
  Object.entries(attributes)
    .reverse()
    .forEach(([name, value]) => {
      let oldAttribute: AttributeValueV2;
      if (isNamespacedV2(value!))
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
      const [attribute, value] = entry as [string, AttributeValueV2];
      if (isNamespacedV2(value)) {
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

function handleRemoveV2({ node }: RemoveV2): InsertV2 | [] {
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