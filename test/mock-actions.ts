import { EditorAction } from '../src/foundation.js';

const element = document.createElement('test-element');
const parent = document.createElement('test-parent');
const reference = document.createElement('test-sibling');

parent.appendChild(element);
parent.appendChild(reference);

export class MockAction {
  static get cre(): EditorAction {
    return { new: { parent, element, reference } };
  }
  static get del(): EditorAction {
    return { old: { parent, element, reference } };
  }
  static get mov(): EditorAction {
    return { old: { parent, element, reference }, new: { parent, reference } };
  }
  static get upd(): EditorAction {
    return { old: { element }, new: { element } };
  }
}
