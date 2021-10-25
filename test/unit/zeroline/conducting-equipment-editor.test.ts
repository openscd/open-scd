import { fixture, html, expect } from '@open-wc/testing';
import sinon, { SinonSpy } from 'sinon';
import { isDelete } from '../../../src/foundation.js';

import '../../../src/zeroline/conducting-equipment-editor.js';
import { ConductingEquipmentEditor } from '../../../src/zeroline/conducting-equipment-editor.js';

describe('conducting-equipment-editor', () => {
  let element: ConductingEquipmentEditor;
  let doc: XMLDocument;

  let wizardEvent: SinonSpy;
  let editorAction: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <ConductingEquipmentEditor>(
      await fixture(
        html`<conducting-equipment-editor
          .element=${doc.querySelector('ConductingEquipment')}
        ></conducting-equipment-editor>`
      )
    );

    wizardEvent = sinon.spy();
    window.addEventListener('wizard', wizardEvent);
    editorAction = sinon.spy();
    window.addEventListener('editor-action', editorAction);
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('removes the ConductingEquipment element on remove button click', async () => {
    element.removeButton.click();
    expect(editorAction).to.have.been.called;
    expect(editorAction.args[0][0].detail.action).to.satisfy(isDelete);
  });

  it('triggers a edit wizard action on edit button click', async () => {
    element.editButton.click();
    expect(wizardEvent).to.have.been.called;
  });

  it('triggers a lnode wizard action on edit button click', async () => {
    element.lnodeButton.click();
    expect(wizardEvent).to.have.been.called;
  });

  it('reduces opacity of the conducting-equipment-editor on move button click', async () => {
    element.moveButton.click();
    expect(element.classList.contains('moving')).to.be.true;
    element.moveButton.click(); // move waits for the second click
  });
});
