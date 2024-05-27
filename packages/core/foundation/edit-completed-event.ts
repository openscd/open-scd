import { Edit, Initiator } from './edit-event.js';

import { EditorAction } from './deprecated/editor.js';

export type EditCompletedDetail = {
  edit: Edit | EditorAction;
  initiator: Initiator;
};

/** Represents the intent to open `doc` with filename `docName`. */
export type EditCompletedEvent = CustomEvent<EditCompletedDetail>;

export function newEditCompletedEvent(
  edit: Edit | EditorAction,
  initiator: Initiator = 'user'
): EditCompletedEvent {
  return new CustomEvent<EditCompletedDetail>('oscd-edit-completed', {
    bubbles: true,
    composed: true,
    detail: {
      edit: edit,
      initiator: initiator,
    },
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-edit-completed']: EditCompletedEvent;
  }
}
