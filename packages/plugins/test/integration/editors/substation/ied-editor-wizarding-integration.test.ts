import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import '../../../../src/editors/substation/ied-editor.js';
import { IedEditor } from '../../../../src/editors/substation/ied-editor.js';

describe('IED editor component wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let iededitor: IedEditor;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const ied = doc.querySelector('IED[name="IED2"]');

    parent = <MockWizardEditor>(
      await fixture(
        html`<mock-wizard-editor
          ><ied-editor .element=${ied}></ied-editor
        ></mock-wizard-editor>`
      )
    );
    iededitor = <IedEditor>parent.querySelector('ied-editor');
    await parent.updateComplete;
  });

  it('opens wizard showing References of one IED', async () => {
    (<HTMLElement>(
      iededitor.shadowRoot?.querySelector('mwc-fab[class="delete"]')
    )).click();
    await parent.updateComplete;
    await parent.wizardUI.updateComplete;

    expect(parent.wizardUI.dialog).to.exist;
    const referencesList =
      parent.wizardUI.dialog?.querySelectorAll('mwc-list-item');

    expect(referencesList).to.be.not.undefined;
    expect(referencesList!.length).to.equal(7);
  });
});