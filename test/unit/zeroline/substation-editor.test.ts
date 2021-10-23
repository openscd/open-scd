import { html, fixture, expect } from '@open-wc/testing';
import sinon, { SinonSpy } from 'sinon';
import { isCreate, isDelete } from '../../../src/foundation.js';

import { getAttachedIeds } from '../../../src/zeroline/foundation.js';

import '../../../src/zeroline/substation-editor.js';
import { SubstationEditor } from '../../../src/zeroline/substation-editor.js';

describe('substation-editor', () => {
  let element: SubstationEditor;
  let doc: XMLDocument;

  let wizardEvent: SinonSpy;
  let editorAction: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/zeroline/substation.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = await fixture(html`<substation-editor
      .element=${doc.querySelector('Substation')}
    ></substation-editor>`);

    wizardEvent = sinon.spy();
    window.addEventListener('wizard', wizardEvent);
    editorAction = sinon.spy();
    window.addEventListener('editor-action', editorAction);

    localStorage.setItem('showfunctions', 'off');
    await element.requestUpdate();
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('removes the Substation element on remove button click', async () => {
    element.removeButton.click();
    expect(editorAction).to.have.been.called;
    expect(editorAction.args[0][0].detail.action).to.satisfy(isDelete);
  });

  it('clones the Substation element on copy button click', async () => {
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

  it('reduces opacity of the substation-editor on move button click', async () => {
    element.moveButton.click();
    expect(element.classList.contains('moving')).to.be.true;
  });

  describe('with ied connected to the substation', () => {
    beforeEach(async () => {
      element.getAttachedIeds = getAttachedIeds(doc);
      localStorage.setItem('showfunctions', 'off');
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with function filter deactivated shows connected Function`s in the Substation', () => {
    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/wizards/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.element = doc.querySelector('Substation')!;
      localStorage.setItem('showfunctions', 'on');
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
