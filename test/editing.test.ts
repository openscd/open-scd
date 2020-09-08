import { html, fixture, expect } from '@open-wc/testing';

import { EditingElement } from '../src/editing.js';
import { describeLogEntryHistory } from './logging.test.js';
import { mockSCD } from './mock-document.js';
import { newActionEvent } from '../src/foundation.js';

const xmlSerializer = new XMLSerializer();

function serialize(doc: XMLDocument): string {
  return xmlSerializer.serializeToString(doc);
}

describe('EditingElement', () => {
  let element: EditingElement;
  beforeEach(async () => {
    const doc = mockSCD();
    element = <EditingElement>(
      await fixture(html`<mock-editor .doc=${doc}></mock-editor>`)
    );
  });

  it('Creates an element on receiving a Create Action', () => {
    element.dispatchEvent(
      newActionEvent({
        new: {
          parent: element.doc.querySelector('parent1')!,
          element: element.doc.createElement('child3'),
          reference: null,
        },
      })
    );
    expect(element.doc.querySelector('child3')).to.not.be.null;
  });

  it('Restores the initial document after undoing a single Create', () => {
    const initialDoc = serialize(element.doc);
    element.dispatchEvent(
      newActionEvent({
        new: {
          parent: element.doc.querySelector('parent1')!,
          element: element.doc.createElement('child3'),
          reference: null,
        },
      })
    );
    expect(element.doc.querySelector('child3')).to.not.be.null;
    expect(serialize(element.doc)).to.not.equal(initialDoc);
    element.undo();
    expect(element.doc.querySelector('child3')).to.be.null;
    expect(serialize(element.doc)).to.equal(initialDoc);
  });

  describeLogEntryHistory();
});
