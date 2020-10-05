import { html, fixture, expect } from '@open-wc/testing';

import { EditingElement } from '../src/editing.js';
import { describeLogEntryHistory } from './logging.test.js';
import { mockSCD } from './mock-document.js';
import { newActionEvent } from '../src/foundation.js';
import { serialize } from './data.js';
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

    parent = elm.doc.querySelector('parent1')!;
    element = parent.querySelector('child1')!;
    reference = element?.nextSibling;
  });

  it('creates an element on receiving a Create Action', () => {
    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: elm.doc.createElement('child3'),
          reference: null,
        },
      })
    );
    expect(elm.doc.querySelector('child3')).to.not.be.null;
  });

  /*
  //FIXME: Move to Logging integration test
  it('restores the initial document after undoing a single Create', () => {
    const initialDoc = serialize(elm.doc);
    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: elm.doc.createElement('child3'),
          reference: null,
        },
      })
    );
    expect(serialize(elm.doc)).to.not.equal(initialDoc);
    elm.undo();
    expect(elm.doc.querySelector('child3')).to.be.null;
    expect(serialize(elm.doc)).to.equal(initialDoc);
  });
   */

  it('deletes an element on receiving a delete action', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
          reference,
        },
      })
    );
    expect(elm.doc.querySelector('parent1 > child1')).to.be.null;
  });

  /*
  //FIXME: Move to Logging integration test
  it('restores the initial document after undoing a single Delete', () => {
    const initialDoc = serialize(elm.doc);
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
          reference,
        },
      })
    );
    expect(serialize(elm.doc)).to.not.equal(initialDoc);
    elm.undo();
    expect(elm.doc.querySelector('parent1 > child1')).to.not.be.null;
    expect(serialize(elm.doc)).to.equal(initialDoc);
  });
   */

  it('updates an element on receiving an Update action', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          element,
        },
        new: {
          element: elm.doc.createElement('child3'),
        },
      })
    );
    expect(parent.querySelector('child1')).to.be.null;
    expect(parent.querySelector('child3')).to.not.be.null;
    expect(parent.querySelector('child3')?.nextElementSibling).to.equal(
      parent.querySelector('child2')
    );
  });

  /*
  //FIXME: Move to Logging integration test
  it('restores the initial document after undoing a single Update', () => {
    const initialDoc = serialize(elm.doc);
    elm.dispatchEvent(
      newActionEvent({
        old: {
          element,
        },
        new: {
          element: elm.doc.createElement('child3'),
        },
      })
    );
    expect(serialize(elm.doc)).to.not.equal(initialDoc);
    elm.undo();
    expect(parent.querySelector('child1')).to.not.be.null;
    expect(parent.querySelector('child3')).to.be.null;
    expect(serialize(elm.doc)).to.equal(initialDoc);
  });
   */

  it('moves element on receiving a Move action', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
          reference,
        },
        new: {
          parent: elm.doc.querySelector('parent2')!,
          reference: null,
        },
      })
    );
    expect(parent.querySelector('child1')).to.be.null;
    expect(elm.doc.querySelector('parent2 > child1')).to.not.be.null;
  });

  /*
  //FIXME: Move to Logging integration test
  it('restores the initial document after undoing a single Move', () => {
    const initialDoc = serialize(elm.doc);
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
          reference,
        },
        new: {
          parent: elm.doc.querySelector('parent2')!,
          reference: null,
        },
      })
    );
    expect(serialize(elm.doc)).to.not.equal(initialDoc);
    elm.undo();
    expect(parent.querySelector('child1')).to.not.be.null;
    expect(elm.doc.querySelector('parent2 > child1')).to.be.null;
    expect(serialize(elm.doc)).to.equal(initialDoc);
  });
   */

  describeLogEntryHistory();
});
