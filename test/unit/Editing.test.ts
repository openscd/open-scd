import { html, fixture, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import './mock-editor.js';
import { MockEditor } from './mock-editor.js';

import { createUpdateAction, newActionEvent } from '../../src/foundation.js';

describe('EditingElement', () => {
  let elm: MockEditor;
  let doc: XMLDocument;
  let parent: Element;
  let element: Element;
  let reference: Node | null;

  let validateEvent: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/Editing.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    elm = <MockEditor>(
      await fixture(html`<mock-editor .doc=${doc}></mock-editor>`)
    );

    parent = elm.doc!.querySelector('VoltageLevel[name="E1"]')!;
    element = parent.querySelector('Bay[name="Q01"]')!;
    reference = element.nextSibling;

    validateEvent = spy();
    window.addEventListener('validate', validateEvent);
  });

  it('creates an element on receiving a Create Action', () => {
    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: elm.doc!.createElement('newBay'),
          reference: null,
        },
      })
    );
    expect(elm.doc!.querySelector('newBay')).to.not.be.null;
  });

  it('creates an Node on receiving a Create Action', () => {
    const testNode = document.createTextNode('myTestNode');

    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: testNode,
        },
      })
    );
    expect(parent.lastChild).to.equal(testNode);
  });

  it('creates the Node based on the reference definition', () => {
    const testNode = document.createTextNode('myTestNode');

    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: testNode,
          reference: parent.firstChild,
        },
      })
    );
    expect(parent.firstChild).to.equal(testNode);
  });

  it('triggers getReference with missing reference on Create Action', () => {
    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: elm.doc!.createElement('Bay'),
        },
      })
    );
    expect(parent.querySelector('Bay')?.nextElementSibling).to.equal(
      parent.querySelector('Bay[name="Q01"]')
    );
  });

  it('ignores getReference with existing reference on Create Action', () => {
    const newElement = elm.doc!.createElement('Bay');
    newElement?.setAttribute('name', 'Q03');

    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: newElement,
          reference: parent.querySelector('Bay[name="Q02"]'),
        },
      })
    );
    expect(
      parent.querySelector('Bay[name="Q03"]')?.nextElementSibling
    ).to.equal(parent.querySelector('Bay[name="Q02"]'));
  });

  it('does not creates an element on name attribute conflict', () => {
    const newElement = elm.doc!.createElement('Bay');
    newElement?.setAttribute('name', 'Q01');

    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: newElement,
          reference: null,
        },
      })
    );
    expect(parent.querySelectorAll('Bay[name="Q01"]').length).to.be.equal(1);
  });

  it('does not creates an element on id attribute conflict', () => {
    const newElement = elm.doc!.createElement('DOType');
    newElement?.setAttribute('id', 'testId');

    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent: doc.querySelector('DataTypeTemplates')!,
          element: newElement,
          reference: null,
        },
      })
    );
    expect(doc.querySelector('DOType')).to.be.null;
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
    expect(elm.doc!.querySelector('VoltageLevel[name="E1"] > Bay[name="Q01"]'))
      .to.be.null;
  });

  it('deletes a Node on receiving a Delete action', () => {
    const testNode = document.createTextNode('myTestNode');
    parent.appendChild(testNode);
    expect(testNode.parentNode).to.be.equal(parent);

    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element: testNode,
        },
      })
    );

    expect(parent.lastChild).to.not.equal(testNode);
    expect(testNode.parentNode).to.be.null;
  });

  it('correctly handles incorrect delete action definition', () => {
    const testNode = document.createTextNode('myTestNode');
    expect(testNode.parentNode).to.null;

    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element: testNode,
        },
      })
    );

    expect(parent.lastChild).to.not.equal(testNode);
    expect(testNode.parentNode).to.null;
  });

  it('replaces an element on receiving an Replace action', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          element,
        },
        new: {
          element: elm.doc!.createElement('newBay'),
        },
      })
    );
    expect(parent.querySelector('Bay[name="Q01"]')).to.be.null;
    expect(parent.querySelector('newBay')).to.not.be.null;
    expect(parent.querySelector('newBay')?.nextElementSibling).to.equal(
      parent.querySelector('Bay[name="Q02"]')
    );
  });

  it('does not replace an element in case of name conflict', () => {
    const newElement = elm.doc!.createElement('Bay');
    newElement?.setAttribute('name', 'Q02');

    elm.dispatchEvent(
      newActionEvent({
        old: {
          element,
        },
        new: {
          element: newElement,
        },
      })
    );
    expect(parent.querySelector('Bay[name="Q01"]')).to.not.be.null;
    expect(
      parent.querySelector('Bay[name="Q01"]')?.nextElementSibling
    ).to.equal(parent.querySelector('Bay[name="Q02"]'));
  });

  it('replaces id defined element on receiving Replace action', () => {
    expect(doc.querySelector('LNodeType[id="testId"]')).to.not.be.null;

    const newElement = doc.createElement('LNodeType');
    newElement?.setAttribute('id', 'testId3');

    elm.dispatchEvent(
      newActionEvent({
        old: {
          element: doc.querySelector('LNodeType[id="testId"]')!,
        },
        new: {
          element: newElement,
        },
      })
    );
    expect(elm.doc!.querySelector('LNodeType[id="testId"]')).to.be.null;
    expect(elm.doc!.querySelector('LNodeType[id="testId3"]')).to.not.be.null;
  });

  it('does not replace an element in case of id conflict', () => {
    expect(doc.querySelector('LNodeType[id="testId"]')).to.not.be.null;

    const newElement = elm.doc!.createElement('LNodeType');
    newElement?.setAttribute('id', 'testId1');

    elm.dispatchEvent(
      newActionEvent({
        old: {
          element: doc.querySelector('LNodeType[id="testId"]')!,
        },
        new: {
          element: newElement,
        },
      })
    );
    expect(elm.doc!.querySelector('LNodeType[id="testId"]')).to.not.be.null;
    expect(elm.doc!.querySelector('LNodeType[id="testId1"]')).to.be.null;
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
          parent: elm.doc!.querySelector('VoltageLevel[name="J1"]')!,
          reference: null,
        },
      })
    );
    expect(parent.querySelector('Bay[name="Q01"]')).to.be.null;
    expect(elm.doc!.querySelector('VoltageLevel[name="J1"] > Bay[name="Q01"]'))
      .to.not.be.null;
  });

  it('triggers getReference with missing reference on Move action', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
          reference,
        },
        new: {
          parent: elm.doc!.querySelector('VoltageLevel[name="J1"]')!,
        },
      })
    );
    expect(parent.querySelector('Bay[name="Q01"]')).to.be.null;
    expect(elm.doc!.querySelector('VoltageLevel[name="J1"] > Bay[name="Q01"]'))
      .to.not.be.null;
    expect(
      elm.doc!.querySelector('VoltageLevel[name="J1"] > Bay[name="Q01"]')
        ?.nextElementSibling
    ).to.equal(elm.doc!.querySelector('VoltageLevel[name="J1"] > Function'));
  });

  it('does not move an element in case of name conflict', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
          reference,
        },
        new: {
          parent: elm.doc!.querySelector('VoltageLevel[name="J1"]')!,
          reference: null,
        },
      })
    );
    expect(parent.querySelector('Bay[name="Q01"]')).to.be.null;
    expect(elm.doc!.querySelector('VoltageLevel[name="J1"] > Bay[name="Q01"]'))
      .to.not.be.null;
    expect(
      elm.doc!.querySelector('VoltageLevel[name="J1"] > Bay[name="Q01"]')
        ?.nextElementSibling
    ).to.be.null;
  });

  it('updates an element on receiving an Update action', () => {
    const newAttributes: Record<string, string | null> = {};
    newAttributes['name'] = 'Q03';

    elm.dispatchEvent(
      newActionEvent(createUpdateAction(element, newAttributes))
    );

    expect(element.parentElement).to.equal(parent);
    expect(element).to.have.attribute('name', 'Q03');
    expect(element).to.not.have.attribute('desc');
  });

  it('allows empty string as attribute value', () => {
    const newAttributes: Record<string, string | null> = {};
    newAttributes['name'] = '';

    elm.dispatchEvent(
      newActionEvent(createUpdateAction(element, newAttributes))
    );

    expect(element.parentElement).to.equal(parent);
    expect(element).to.have.attribute('name', '');
    expect(element).to.not.have.attribute('desc');
  });

  it('does not update an element in case of name conflict', () => {
    const newAttributes: Record<string, string | null> = {};
    newAttributes['name'] = 'Q02';

    elm.dispatchEvent(
      newActionEvent(createUpdateAction(element, newAttributes))
    );

    expect(element.parentElement).to.equal(parent);
    expect(element).to.have.attribute('name', 'Q01');
    expect(element).to.have.attribute('desc', 'Bay');
  });

  it('does not update an element in case of id conflict', () => {
    const newAttributes: Record<string, string | null> = {};
    newAttributes['id'] = 'testId1';

    elm.dispatchEvent(
      newActionEvent(
        createUpdateAction(doc.querySelector('LNodeType')!, newAttributes)
      )
    );

    expect(elm.doc!.querySelector('LNodeType[id="testId"]')).to.exist;
    expect(elm.doc!.querySelector('LNodeType[id="testId1"]')).to.not.exist;
  });

  it('carries out subactions sequentially on receiving a ComplexAction', () => {
    const child3 = elm.doc!.createElement('newBay');
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
              parent: elm.doc!.querySelector('VoltageLevel[name="J1"]')!,
              reference: null,
            },
          },
        ],
      })
    );
    expect(parent.querySelector('Bay[name="Q01"]')).to.be.null;
    expect(elm.doc!.querySelector('VoltageLevel[name="J1"] > newBay')).to.not.be
      .null;
  });

  it('triggers a validation event on receiving a ComplexAction', async () => {
    const child3 = elm.doc!.createElement('newBay');
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
              parent: elm.doc!.querySelector('VoltageLevel[name="J1"]')!,
              reference: null,
            },
          },
        ],
      })
    );
    await elm.updateComplete;

    expect(validateEvent).to.be.calledOnce;
  });

  it('does not exchange doc with empty complex action', async () => {
    elm.dispatchEvent(
      newActionEvent({
        title: 'Test complex action',
        actions: [],
      })
    );
    await elm.updateComplete;

    expect(doc).to.equal(elm.doc);
  });

  it('does not trigger validation with empty complex action', async () => {
    elm.dispatchEvent(
      newActionEvent({
        title: 'Test complex action',
        actions: [],
      })
    );
    await elm.updateComplete;

    expect(validateEvent).to.not.been.called;
  });
});
