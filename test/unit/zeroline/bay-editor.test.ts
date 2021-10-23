import { fixture, html, expect } from '@open-wc/testing';
import sinon, { SinonSpy } from 'sinon';

import { isCreate, isDelete } from '../../../src/foundation.js';
import { getAttachedIeds } from '../../../src/zeroline/foundation.js';

import '../../../src/zeroline/bay-editor.js';
import { BayEditor } from '../../../src/zeroline/bay-editor.js';

describe('bay-editor', () => {
  let element: BayEditor;
  let doc: XMLDocument;

  let wizardEvent: SinonSpy;
  let editorAction: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/zeroline/bay.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <BayEditor>(
      await fixture(
        html`<bay-editor .element=${doc.querySelector('Bay')}></bay-editor>`
      )
    );

    localStorage.setItem('showfunctions', 'off');
    await element.requestUpdate();

    wizardEvent = sinon.spy();
    window.addEventListener('wizard', wizardEvent);
    editorAction = sinon.spy();
    window.addEventListener('editor-action', editorAction);
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('removes the Bay element on remove button click', async () => {
    element.removeButton.click();
    expect(editorAction).to.have.been.called;
    expect(editorAction.args[0][0].detail.action).to.satisfy(isDelete);
  });

  it('clones the Bay element on copy button click', async () => {
    element.copyButton.click();
    expect(editorAction).to.have.been.called;
    expect(editorAction.args[0][0].detail.action).to.satisfy(isCreate);
  });

  it('triggers a edit wizard action on edit button click', async () => {
    element.editButton.click();
    expect(wizardEvent).to.have.been.called;
  });

  it('triggers a lnode wizard action on edit button click', async () => {
    element.lnodeButton.click();
    expect(wizardEvent).to.have.been.called;
  });

  it('reduces opacity of the bay-editor on move button click', async () => {
    element.moveButton.click();
    expect(element.classList.contains('moving')).to.be.true;
  });

  describe('with ied connected to the bay', () => {
    beforeEach(async () => {
      element.getAttachedIeds = getAttachedIeds(doc);
      localStorage.setItem('showfunctions', 'off');
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with function filter deactivated shows connected Function`s in the Bay', () => {
    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/wizards/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.element = doc.querySelector('Bay')!;
      localStorage.setItem('showfunctions', 'on');
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
