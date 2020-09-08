import { Action } from '../src/foundation.js';

const element = document.createElement('test-element');
const parent = document.createElement('test-parent');
const reference = document.createElement('test-sibling');

parent.appendChild(element);
parent.appendChild(reference);

export class MockAction {
  static get cre(): Action {
    return { new: { parent, element, reference } };
  }
  static get del(): Action {
    return { old: { parent, element, reference } };
  }
  static get mov(): Action {
    return { old: { parent, element, reference }, new: { parent, reference } };
  }
  static get upd(): Action {
    return { old: { element }, new: { element } };
  }
}
