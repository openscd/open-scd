import { expect, fixture, html } from '@open-wc/testing';

import '../mock-editor-logger.js';
import { MockEditorLogger } from '../mock-editor-logger.js';

import {
  createUpdateAction,
  newActionEvent,
  Update,
} from '../../src/foundation.js';

describe('Editing-Logging integration', () => {
  let elm: MockEditorLogger;
  let parent: Element;
  let element: Element;

  beforeEach(async () => {
    const doc = await fetch('/test/testfiles/Editing.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    elm = <MockEditorLogger>(
      await fixture(html`<mock-editor-logger .doc=${doc}></mock-editor-logger>`)
    );

    parent = elm.doc!.querySelector('VoltageLevel[name="E1"]')!;
    element = parent.querySelector('Bay[name="Q01"]')!;
  });

  describe('has a Create EditorAction type that', () => {
    let newElement: Element;
    beforeEach(() => {
      newElement = elm.doc!.createElement('Bay');
      newElement?.setAttribute('name', 'Q03');
    });

    it('can be undone', () => {
      elm.dispatchEvent(
        newActionEvent({ new: { parent, element: newElement } })
      );
      expect(newElement.parentElement).to.equal(parent);

      elm.undo();
      expect(newElement.parentElement).to.be.null;
    });

    it('can be redone', () => {
      elm.dispatchEvent(
        newActionEvent({ new: { parent, element: newElement } })
      );

      elm.undo();

      elm.redo();
      expect(newElement.parentElement).to.equal(parent);
    });

    it('automatically assignes a missing reference on redo', () => {
      elm.dispatchEvent(
        newActionEvent({ new: { parent, element: newElement } })
      );
      elm.undo();

      elm.redo();
      expect(
        parent.querySelector('Bay[name="Q03"]')?.nextElementSibling
      ).to.equal(parent.querySelector('Bay[name="Q01"]'));
    });

    it('properly uses the reference on redo', () => {
      const newElement = elm.doc!.createElement('Bay');
      newElement?.setAttribute('name', 'Q03');

      elm.dispatchEvent(
        newActionEvent({
          new: {
            parent,
            element: newElement,
            reference: parent.lastChild,
          },
        })
      );

      elm.undo();

      elm.redo();

      expect(parent.querySelector('Bay[name="Q03"]')?.nextSibling).to.equal(
        parent.lastChild
      );
    });
  });

  describe('has a Delete EditorAction type that', () => {
    it('can be ondone', () => {
      expect(element.parentElement).to.equal(parent);

      elm.dispatchEvent(
        newActionEvent({
          old: {
            parent,
            element,
          },
        })
      );
      expect(element.parentElement).to.be.null;

      elm.undo();
      expect(element.parentElement).to.equal(parent);
    });

    it('can be rodone', () => {
      elm.dispatchEvent(
        newActionEvent({
          old: {
            parent,
            element,
          },
        })
      );

      elm.undo();

      elm.redo();
      expect(element.parentElement).to.be.null;
    });

    it('puts the deleted Node back to its original position on undo', () => {
      const originalNextSibling = element.nextSibling;

      elm.dispatchEvent(
        newActionEvent({
          old: {
            parent,
            element,
          },
        })
      );
      elm.undo();

      expect(element.nextSibling).to.equal(originalNextSibling);
    });
  });

  describe('has a Move EditorAction type that', () => {
    let newParent: Element;
    beforeEach(() => {
      newParent = elm.doc!.querySelector('VoltageLevel[name="J1"]')!;
    });

    it('can be undone', () => {
      expect(element.parentElement).to.equal(parent);

      elm.dispatchEvent(
        newActionEvent({ old: { parent, element }, new: { parent: newParent } })
      );
      expect(element.parentElement).to.equal(newParent);

      elm.undo();
      expect(element.parentElement).to.equal(parent);
    });

    it('can be redone', () => {
      elm.dispatchEvent(
        newActionEvent({ old: { parent, element }, new: { parent: newParent } })
      );

      elm.undo();

      elm.redo();
      expect(element.parentElement).to.equal(newParent);
    });

    it('adds the element in a valid location in the new parent', () => {
      elm.dispatchEvent(
        newActionEvent({ old: { parent, element }, new: { parent: newParent } })
      );
      expect(
        elm.doc!.querySelector('VoltageLevel[name="J1"] > Bay[name="Q01"]')
          ?.nextElementSibling
      ).to.equal(elm.doc!.querySelector('VoltageLevel[name="J1"] > Function'));
    });

    it('puts the element back to its original postition with parent', () => {
      elm.dispatchEvent(
        newActionEvent({ old: { parent, element }, new: { parent: newParent } })
      );

      elm.undo();
      expect(
        parent.querySelector('Bay[name="Q01"]')?.nextElementSibling
      ).to.equal(parent.querySelector('Bay[name="Q02"]'));
    });
  });

  describe('has a Replace EditorAction type that', () => {
    let newElement: Element;
    beforeEach(() => {
      newElement = elm.doc!.createElement('Bay');
      newElement?.setAttribute('name', 'Q03');
    });

    it('can be undone', () => {
      elm.dispatchEvent(
        newActionEvent({ old: { element }, new: { element: newElement } })
      );

      elm.undo();
      expect(newElement.parentElement).to.be.null;
      expect(element.parentElement).to.equal(parent);
    });

    it('can be redone', () => {
      elm.dispatchEvent(
        newActionEvent({ old: { element }, new: { element: newElement } })
      );

      elm.undo();

      elm.redo();

      expect(newElement.parentElement).to.equal(parent);
      expect(element.parentElement).to.be.null;
    });

    it('correctly copying child elements between element and newElement for multiple undo/redo', () => {
      const originOldChildCount = element.children.length;
      const originNewChildCount = newElement.children.length;

      elm.dispatchEvent(
        newActionEvent({ old: { element }, new: { element: newElement } })
      );
      expect(element.children).to.have.lengthOf(originNewChildCount);
      expect(newElement.children).to.have.lengthOf(originOldChildCount);

      elm.undo();
      elm.redo();

      elm.undo();
      expect(element.children).to.have.lengthOf(originOldChildCount);
      expect(newElement.children).to.have.lengthOf(originNewChildCount);

      elm.redo();
      expect(element.children).to.have.lengthOf(originNewChildCount);
      expect(newElement.children).to.have.lengthOf(originOldChildCount);
    });
  });

  describe('has an Update EditorAction type that', () => {
    let updateAction: Update;
    beforeEach(() => {
      const newAttributes: Record<string, string | null> = {};
      newAttributes['name'] = 'Q03';

      updateAction = createUpdateAction(element, newAttributes);
    });

    it('can undo', () => {
      elm.dispatchEvent(newActionEvent(updateAction));
      expect(element).to.have.attribute('name', 'Q03');
      expect(element).to.not.have.attribute('desc');

      elm.undo();
      expect(element).to.have.attribute('name', 'Q01');
      expect(element).to.have.attribute('desc', 'Bay');
    });

    it('can redo', () => {
      elm.dispatchEvent(newActionEvent(updateAction));

      elm.undo();
      elm.redo();

      expect(element).to.have.attribute('name', 'Q03');
      expect(element).to.not.have.attribute('desc');
    });
  });
});
