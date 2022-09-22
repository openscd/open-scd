import { LitElement } from 'lit';

/** Constructor type for defining `LitElement` mixins. */
export type LitElementConstructor = new (...args: any[]) => LitElement;

export { newOpenDocEvent } from './foundation/open-doc.js';
export type { OpenDocEvent, OpenDocDetail } from './foundation/open-doc.js';

export {
  newActionEvent,
  isComplex,
  isInsert,
  isRemove,
} from './foundation/editor-action.js';
export type {
  EditorActionEvent,
  EditorAction,
  Insert,
  Remove,
} from './foundation/editor-action.js';
