import { expect, fixture, html } from '@open-wc/testing';

import { newActionEvent } from '../../src/foundation.js';
import { MockEditorLogger } from '../mock-editor-logger.js';

import '../mock-editor-logger.js';

describe('Editing-Logging integration', () => {
  let elm: MockEditorLogger;
  let parent: Element;
  let element: Element;

  beforeEach(async () => {
    const doc = await fetch('/base/test/testfiles/Editing.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    elm = <MockEditorLogger>(
      await fixture(html`<mock-editor-logger .doc=${doc}></mock-editor-logger>`)
    );

    parent = elm.doc!.querySelector('VoltageLevel[name="E1"]')!;
    element = parent.querySelector('Bay[name="Q01"]')!;
  });

  it('add valid reference onCreate when reference is missing', () => {
    const newElement = elm.doc!.createElement('Bay');
    newElement?.setAttribute('name', 'Q03');

    elm.dispatchEvent(
      newActionEvent({
        new: {
          parent,
          element: newElement,
        },
      })
    );
    expect(parent.querySelector('Bay[name="Q03"]')).to.not.be.null;
    elm.undo();
    expect(parent.querySelector('Bay[name="Q03"]')).to.be.null;
    elm.redo();
    expect(parent.querySelector('Bay[name="Q03"]')).to.not.be.null;
    expect(
      parent.querySelector('Bay[name="Q03"]')?.nextElementSibling
    ).to.equal(parent.querySelector('Bay[name="Q01"]'));
  });

  it('add valid reference onDelete when reference is missing', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
        },
      })
    );
    expect(parent.querySelector('Bay[name="Q01"]')).to.be.null;
    elm.undo();
    expect(parent.querySelector('Bay[name="Q01"]')).to.not.be.null;
    expect(
      parent.querySelector('Bay[name="Q01"]')?.nextElementSibling
    ).to.equal(parent.querySelector('Bay[name="Q02"]'));
  });

  it('add valid reference onMove when reference is missing', () => {
    elm.dispatchEvent(
      newActionEvent({
        old: {
          parent,
          element,
        },
        new: {
          parent: elm.doc!.querySelector('VoltageLevel[name="J1"]')!,
        },
      })
    );
    expect(parent.querySelector('Bay[name="Q01"]')).to.be.null;
    expect(elm.doc!.querySelector('VoltageLevel[name="J1"] > Bay[name="Q01"]'))
      .to.not.be.null;
    elm.undo();
    expect(
      parent.querySelector('Bay[name="Q01"]')?.nextElementSibling
    ).to.equal(parent.querySelector('Bay[name="Q02"]'));
    elm.redo();
    expect(
      elm.doc!.querySelector('VoltageLevel[name="J1"] > Bay[name="Q01"]')
        ?.nextElementSibling
    ).to.equal(elm.doc!.querySelector('VoltageLevel[name="J1"] > Function'));
  });
});
