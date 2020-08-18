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
      if (part.startNode.parentNode)
        part.startNode.parentNode.dispatchEvent(event);
      else part.startNode.dispatchEvent(event);
    }

    part.setValue(value);
  }
);
