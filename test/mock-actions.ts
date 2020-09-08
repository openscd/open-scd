import { Action } from '../src/foundation.js';

const element = document.createElement('test-element');
const parent = document.createElement('test-parent');
const reference = document.createElement('test-sibling');

export class MockAction {
  static get cre(): Action {
    return { new: { parent, element, reference } };
  }
  static get del(): Action {
    return { old: { parent, element, reference } };
  }
  static get mov(): Action {
    return { old: { parent, element }, new: { parent } };
  }
  static get upd(): Action {
    return { old: { element }, new: { element } };
  }
}
