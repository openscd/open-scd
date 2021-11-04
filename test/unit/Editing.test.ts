import { fixture, expect } from '@open-wc/testing';

import { EditingElement } from '../../src/Editing.js';
import { mockSCD } from './mock-document.js';
import { html, newActionEvent } from '../../src/foundation.js';
import './mock-editor.js';

describe('EditingElement', () => {
  let elm: EditingElement;
  let parent: Element;
  let element: Element;
  let reference: Node | null;

  beforeEach(async () => {
    const doc = mockSCD();
    elm = <EditingElement>(
      await fixture(html`<mock-editor .doc=${doc}></mock-editor>`)
    );

    parent = elm.doc!.querySelector('parent1')!;
    element = parent.querySelector('child1')!;
    reference = element.nextSibling;
  });

  it('creates an element on receiving a Create Action', () => {
    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: elm.doc!.createElement('child3'),
          reference: null,
        },
      })
    );
    expect(elm.doc!.querySelector('child3')).to.not.be.null;
  });

  it('deletes an element on receiving a Delete action', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
          reference,
        },
      })
    );
    expect(elm.doc!.querySelector('parent1 > child1')).to.be.null;
  });

  it('updates an element on receiving an Update action', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          element,
        },
        new: {
          element: elm.doc!.createElement('child3'),
        },
      })
    );
    expect(parent.querySelector('child1')).to.be.null;
    expect(parent.querySelector('child3')).to.not.be.null;
    expect(parent.querySelector('child3')?.nextElementSibling).to.equal(
      parent.querySelector('child2')
    );
  });

  it('moves an element on receiving a Move action', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
          reference,
        },
        new: {
          parent: elm.doc!.querySelector('parent2')!,
          reference: null,
        },
      })
    );
    expect(parent.querySelector('child1')).to.be.null;
    expect(elm.doc!.querySelector('parent2 > child1')).to.not.be.null;
  });

  it('carries out subactions sequentially on receiving a ComplexAction', () => {
    const child3 = elm.doc!.createElement('child3');
    elm.dispatchEvent(
      newActionEvent({
        title: 'Test complex action',
        actions: [
          {
            old: { element },
            new: { element: child3 },
          },
          {
            old: {
              parent,
              element: child3,
              reference,
            },
            new: {
              parent: elm.doc!.querySelector('parent2')!,
              reference: null,
            },
          },
        ],
      })
    );
    expect(parent.querySelector('child1')).to.be.null;
    expect(elm.doc!.querySelector('parent2 > child3')).to.not.be.null;
  });
});
