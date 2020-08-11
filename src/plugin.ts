import { directive, NodePart } from 'lit-html';

const resolved = new WeakSet();

export const plugin = directive(
  (src: string, value: unknown) => (part: NodePart) => {
    if (!resolved.has(part)) {
      const event = new CustomEvent('pending-state', {
        composed: true,
        bubbles: true,
        detail: import(src).then(() => resolved.add(part)),
      });
      part.startNode.parentNode!.dispatchEvent(event);
    }

    part.setValue(value);
  }
);
