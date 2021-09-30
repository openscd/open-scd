import { html, fixture, expect } from '@open-wc/testing';

import { EditingElement } from '../../src/Editing.js';
import { newActionEvent } from '../../src/foundation.js';

import './mock-editor.js';

describe('EditingElement', () => {
  let elm: EditingElement;
  let parent: Element;
  let element: Element;
  let reference: Node | null;

  beforeEach(async () => {
    const doc = await fetch('/base/test/testfiles/Editing.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    elm = <EditingElement>(
      await fixture(html`<mock-editor .doc=${doc}></mock-editor>`)
    );

    parent = elm.doc!.querySelector('VoltageLevel[name="E1"]')!;
    element = parent.querySelector('Bay[name="Q01"]')!;
    reference = element.nextSibling;
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

  it('updates an element on receiving an Update action', () => {
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

  it('does not update an element with name conflict', () => {
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
    expect(parent.querySelector('Bay[name="Q01"]')).to.not.null;
    expect(
      parent.querySelector('Bay[name="Q01"]')?.nextElementSibling
    ).to.equal(parent.querySelector('Bay[name="Q02"]'));
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

  it('does not move an element with name conflict', () => {
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
});
