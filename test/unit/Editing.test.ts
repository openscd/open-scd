import { html, fixture, expect } from '@open-wc/testing';

import './mock-editor.js';
import { MockEditor } from './mock-editor.js';

import { newActionEvent } from '../../src/foundation.js';

describe('EditingElement', () => {
  let elm: MockEditor;
  let parent: Element;
  let element: Element;
  let reference: Node | null;

  beforeEach(async () => {
    const doc = await fetch('/test/testfiles/Editing.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    elm = <MockEditor>(
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

  describe('defines an Update action that', () => {
    let complexElement: Element;

    beforeEach(() => {
      const ceDoc = new DOMParser().parseFromString(
        `<Parent>
          <ComplexElement xmlns="http://myNS" xmlns:other="http://otherNS" attr1="value1" attr2="value2" 
            other:attr3="value3">testNode<ChildElement/><other:ChildElement/><!-- commentNode --></ComplexElement>
         </Parent>`,
        'application/xml'
      );
      complexElement = ceDoc.querySelector('ComplexElement')!;
    });

    it('updates an Element`s attributes on receiving an Update action', () => {
      const newElement = <Element>complexElement.cloneNode(false);
      newElement.setAttribute('attr1', 'newValue1');

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: { element: newElement },
        })
      );

      expect(complexElement).to.have.attribute('attr1', 'newValue1');
    });

    it('updates attributes other namespaces with proper new.element definition', () => {
      const newElement = <Element>complexElement.cloneNode(false);
      newElement.setAttributeNS('http://otherNS', 'attr3', 'newValue3');

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: { element: newElement },
        })
      );

      elm;

      expect(complexElement).to.have.attribute('other:attr3', 'newValue3');
    });

    it('updates attributes of new and old element not the elements itself', () => {
      const newElement = <Element>complexElement.cloneNode(false);
      newElement.setAttribute('attr1', 'newValue1');

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: { element: newElement },
        })
      );

      expect(complexElement.parentElement).to.not.be.null;
      expect(newElement.parentElement).to.be.null;
    });

    it('swaps optional childNodes of old and new elements', () => {
      const newElement = <Element>complexElement.cloneNode(false);
      const newTextNode = document.createTextNode('newTextContent');

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: { element: newElement, childNodes: [newTextNode] },
        })
      );

      expect(complexElement.childNodes).to.have.length(1);
      expect(complexElement.childNodes[0].textContent).to.equal(
        'newTextContent'
      );
      expect(newElement.childNodes).to.have.lengthOf(4);
      expect(newElement.childNodes[0].textContent).to.equal('testNode');
    });

    it('properly inverts/undo the update action event', () => {
      const newElement = <Element>complexElement.cloneNode(false);
      const newTextNode = document.createTextNode('newTextContent');

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: { element: newElement, childNodes: [newTextNode] },
        })
      );
      elm.undo();

      expect(complexElement.childNodes).to.have.lengthOf(4);
      expect(complexElement.childNodes[0].textContent).to.equal('testNode');
      expect(newElement.childNodes).to.have.lengthOf(1);
      expect(newElement.childNodes[0].textContent).to.equal('newTextContent');
    });

    it('properly redo the update action event', () => {
      const newElement = <Element>complexElement.cloneNode(false);
      const newTextNode = document.createTextNode('newTextContent');

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: { element: newElement, childNodes: [newTextNode] },
        })
      );
      elm.undo();
      elm.redo();

      expect(complexElement.childNodes).to.have.length(1);
      expect(complexElement.childNodes[0].textContent).to.equal(
        'newTextContent'
      );
      expect(newElement.childNodes).to.have.lengthOf(4);
      expect(newElement.childNodes[0].textContent).to.equal('testNode');
    });

    it('ignores duplicate childNode definition', () => {
      const newElement = <Element>complexElement.cloneNode(false);
      const oldChildNodes = Array.from(complexElement.childNodes);
      const newTextNode = document.createTextNode('newTextContent');

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: {
            element: newElement,
            childNodes: [...oldChildNodes, newTextNode],
          },
        })
      );

      expect(complexElement.childNodes).to.have.length(1);
      expect(complexElement.childNodes[0].textContent).to.equal(
        'newTextContent'
      );
      expect(newElement.childNodes).to.have.length(4);
      expect(newElement.childNodes[0].textContent).to.equal('testNode');
    });

    it('properly inverts/undo complex update action definition', () => {
      const newElement = <Element>complexElement.cloneNode(false);
      const oldChildNodes = Array.from(complexElement.childNodes);
      const newTextNode = document.createTextNode('newTextContent');

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: {
            element: newElement,
            childNodes: [...oldChildNodes, newTextNode],
          },
        })
      );
      elm.undo();

      expect(complexElement.childNodes).to.have.lengthOf(4);
      expect(complexElement.childNodes[0].textContent).to.equal('testNode');
      expect(newElement.childNodes).to.have.lengthOf(1);
      expect(newElement.childNodes[0].textContent).to.equal('newTextContent');
    });

    it('properly redo complex update action definition', () => {
      const newElement = <Element>complexElement.cloneNode(false);
      const oldChildNodes = Array.from(complexElement.childNodes);
      const newTextNode = document.createTextNode('newTextContent');

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: {
            element: newElement,
            childNodes: [...oldChildNodes, newTextNode],
          },
        })
      );
      elm.undo();
      elm.redo();

      expect(complexElement.childNodes).to.have.length(1);
      expect(complexElement.childNodes[0].textContent).to.equal(
        'newTextContent'
      );
      expect(newElement.childNodes).to.have.length(4);
      expect(newElement.childNodes[0].textContent).to.equal('testNode');
    });

    it('does not swap childNodes with undefined childNode definition', () => {
      const newElement = <Element>complexElement.cloneNode(false);

      elm.dispatchEvent(
        newActionEvent({
          old: { element: complexElement },
          new: { element: newElement },
        })
      );

      expect(complexElement.childNodes.length).to.equal(4);
    });

    it('does not update an element with name conflict', () => {
      const newElement = elm.doc!.createElement('Bay');
      newElement?.setAttribute('name', 'Q02');

      elm.dispatchEvent(
        newActionEvent({ old: { element }, new: { element: newElement } })
      );

      expect(parent.querySelector('Bay[name="Q01"]')).to.not.null;
      expect(
        parent.querySelector('Bay[name="Q01"]')?.nextElementSibling
      ).to.equal(parent.querySelector('Bay[name="Q02"]'));
    });
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
