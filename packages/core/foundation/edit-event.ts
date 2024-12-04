import { Edit } from './edit.js';

export type EditDetail<E extends Edit = Edit> = {
  edit: E;
  title?: string;
  squash?: boolean;
};

export type EditEvent<E extends Edit = Edit> = CustomEvent<
  EditDetail<E>
>;

export type EditEventOptions = {
  title?: string;
  squash?: boolean;
};

export function newEditEvent<E extends Edit>(
  edit: E,
  options?: EditEventOptions
): EditEvent<E> {
  return new CustomEvent<EditDetail<E>>('oscd-edit-v2', {
    composed: true,
    bubbles: true,
    detail: { ...options, edit },
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-edit-v2']: EditEvent;
  }
}
