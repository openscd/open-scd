import { ComplexAction, SimpleAction } from '../../src/foundation.js';

const element = document.createElement('test-element');
const parent = document.createElement('test-parent');
const reference = document.createElement('test-sibling');

parent.appendChild(element);
parent.appendChild(reference);

export class MockAction {
  static get cre(): SimpleAction {
    return { new: { parent, element, reference } };
  }
  static get del(): SimpleAction {
    return { old: { parent, element, reference } };
  }
  static get mov(): SimpleAction {
    return { old: { parent, element, reference }, new: { parent, reference } };
  }
  static get upd(): SimpleAction {
    return { old: { element }, new: { element } };
  }
  static get complex(): ComplexAction {
    return {
      actions: [MockAction.cre, MockAction.del, MockAction.mov, MockAction.upd],
      title: 'Test complex EditorAction',
    };
  }
}
