import { EditV2 } from './edit.js';

export type EditDetailV2<E extends EditV2 = EditV2> = EditEventOptionsV2 & {
  edit: E;
};

export type EditEventV2<E extends EditV2 = EditV2> = CustomEvent<
  EditDetailV2<E>
>;

type BaseEditEventOptionsV2 = {
  title?: string;
  squash?: boolean;
}

export type EditEventOptionsV2 = BaseEditEventOptionsV2 & {
  createHistoryEntry?: boolean;
};

export function newEditEventV2<E extends EditV2>(
  edit: E,
  options?: EditEventOptionsV2
): EditEventV2<E> {
  return new CustomEvent<EditDetailV2<E>>('oscd-edit-v2', {
    composed: true,
    bubbles: true,
    detail: { ...options, edit },
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-edit-v2']: EditEventV2;
  }
}
