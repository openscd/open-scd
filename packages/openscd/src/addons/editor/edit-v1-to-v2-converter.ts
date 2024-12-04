import {
  Create,
  Delete,
  EditorAction,
  isCreate,
  isDelete,
  isMove,
  isReplace,
  isSimple,
  isUpdate,
  Move,
  Replace,
  SimpleAction,
  Update
} from '@openscd/core/foundation/deprecated/editor.js';
import { EditV1, InsertV1, RemoveV1, UpdateV1 as UpdateV2 } from '@openscd/core';
import { getReference, SCLTag } from '../../foundation.js';


export function convertEditV1toV2(action: EditorAction): EditV1 {
  if (isSimple(action)) {
    return convertSimpleAction(action);
  } else {
    return action.actions.map(convertSimpleAction);
  }
}

function convertSimpleAction(action: SimpleAction): EditV1 {
  if (isCreate(action)) {
    return convertCreate(action);
  } else if (isDelete(action)) {
    return convertDelete(action);
  } else if (isUpdate(action)) {
    return convertUpdate(action);
  } else if (isMove(action)) {
    return convertMove(action);
  } else if (isReplace(action)) {
    return convertReplace(action);
  }

  throw new Error('Unknown action type');
}

function convertCreate(action: Create): InsertV1 {
  let reference: Node | null = null;
  if (
    action.new.reference === undefined &&
    action.new.element instanceof Element &&
    action.new.parent instanceof Element
  ) {
    reference = getReference(
      action.new.parent,
      <SCLTag>action.new.element.tagName
    );
  } else {
    reference = action.new.reference ?? null; 
  }

  return {
    parent: action.new.parent,
    node: action.new.element,
    reference
  };
}

function convertDelete(action: Delete): RemoveV1 {
  return {
    node: action.old.element
  };
}

function convertUpdate(action: Update): UpdateV2 {
  const oldAttributesToRemove: Record<string, string | null> = {};
  Array.from(action.element.attributes).forEach(attr => {
    oldAttributesToRemove[attr.name] = null;
  });

  const attributes = {
    ...oldAttributesToRemove,
    ...action.newAttributes
  };

  return {
    element: action.element,
    attributes
  };
}

function convertMove(action: Move): InsertV1 {
  if (action.new.reference === undefined) {
    action.new.reference = getReference(
      action.new.parent,
      <SCLTag>action.old.element.tagName
    );
  }

  return {
    parent: action.new.parent,
    node: action.old.element,
    reference: action.new.reference ?? null
  }
}

function convertReplace(action: Replace): EditV1 {
  const oldChildren = action.old.element.children;
  // We have to clone the children, because otherwise undoing the action would remove the children from the old element, because append removes the old parent
  const copiedChildren = Array.from(oldChildren).map(e => e.cloneNode(true));

  const newNode = action.new.element.cloneNode(true) as Element;
  newNode.append(...Array.from(copiedChildren));
  const parent = action.old.element.parentElement;

  if (!parent) {
    throw new Error('Replace action called without parent in old element');
  }

  const reference = action.old.element.nextSibling;

  const remove: RemoveV1 = { node: action.old.element };
  const insert: InsertV1 = {
    parent,
    node: newNode,
    reference
  };

  return [
    remove,
    insert
  ];
}
