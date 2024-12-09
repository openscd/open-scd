import { Edit, Insert, Remove, Update } from '@openscd/core';


const element = document.createElement('test-element');
const parent = document.createElement('test-parent');
const reference = document.createElement('test-sibling');

parent.appendChild(element);
parent.appendChild(reference);

export const mockEdits = {
  insert: (): Insert => ({ parent, node: element, reference }),
  remove: (): Remove => ({ node: element }),
  update: (): Update => ({ element, attributes: { test: 'value' } }),
  complex: (): Edit[] => [ mockEdits.insert(), mockEdits.remove(), mockEdits.update() ],
}
