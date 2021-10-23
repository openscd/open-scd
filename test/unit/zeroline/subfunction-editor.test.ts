import { expect, fixture, html } from '@open-wc/testing';
import sinon, { SinonSpy } from 'sinon';
import { isDelete } from '../../../src/foundation.js';

import { SubFunctionEditor } from '../../../src/zeroline/subfunction-editor.js';

describe('subfunction-editor', () => {
  let doc: XMLDocument;
  let element: SubFunctionEditor;

  let wizardEvent: SinonSpy;
  let removeAction: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/wizards/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    element = <SubFunctionEditor>(
      await fixture(
        html`<subfunction-editor
          .element=${doc.querySelector('VoltageLevel > Function > SubFunction')}
        ></subfunction-editor>`
      )
    );

    wizardEvent = sinon.spy();
    window.addEventListener('wizard', wizardEvent);
    removeAction = sinon.spy();
    window.addEventListener('editor-action', removeAction);
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('renders desc and type in the header', async () => {
    const subfunc = doc.querySelector('Bay > Function > SubFunction')!;
    element.element = subfunc;
    await element.requestUpdate();
    expect(element.header).to.equal('myBaySubFunc - myDesc (myBaySubFuncType)');
  });

  it('removes the Function element on remove button click', async () => {
    element.removeButton.click();
    expect(removeAction).to.have.been.called;
    expect(removeAction.args[0][0].detail.action).to.satisfy(isDelete);
  });

  it('triggers a edit wizard action', async () => {
    element.editButton.click();
    expect(wizardEvent).to.have.been.called;
  });
});
