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
import { Edit, Insert, Remove, Update as UpdateV2 } from '@openscd/core';
import { getReference, SCLTag } from '../../foundation.js';


export function convertEditV1toV2(action: EditorAction): Edit {
  if (isSimple(action)) {
    return convertSimpleAction(action);
  } else {
    return action.actions.map(convertSimpleAction);
  }
}

function convertSimpleAction(action: SimpleAction): Edit {
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

function convertCreate(action: Create): Insert {
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

function convertDelete(action: Delete): Remove {
  return {
    node: action.old.element
  };
}

function convertUpdate(action: Update): UpdateV2 {
  return {
    element: action.element,
    attributes: action.newAttributes
  };
}

function convertMove(action: Move): Insert {
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

function convertReplace(action: Replace): Edit {
  const oldChildren = action.old.element.children;
  const newNode = action.new.element.cloneNode() as Element;
  newNode.append(...Array.from(oldChildren));
  const parent = action.old.element.parentElement;

  if (!parent) {
    throw new Error('Replace action called without parent in old element');
  }

  const reference = action.old.element.nextSibling;

  const remove: Remove = { node: action.old.element };
  const insert: Insert = {
    parent,
    node: newNode,
    reference
  };

  return [
    remove,
    insert
  ];
}
