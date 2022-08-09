import { expect, fixture, html } from '@open-wc/testing';

import '../../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../../mock-wizard-editor.js';

import { WizardTextField } from '../../../../../src/wizard-textfield.js';

import '../../../../../src/editors/subscription/smv-laterbinding/svc-laterbinding-list.js';
import { SVCLaterBindingList } from '../../../../../src/editors/subscription/smv-laterbinding/svc-laterbinding-list.js';

describe('smv-list', () => {
  let parent: MockWizardEditor;
  let element: SVCLaterBindingList;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingSMV.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('looks like the latest snapshot with a document loaded', async () => {
    element = await fixture(
      html`<svc-later-binding-list .doc=${doc}></svc-later-binding-list>`
    );

    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot without a doc loaded', async () => {
    element = await fixture(
      html`<svc-later-binding-list></svc-later-binding-list>`
    );

    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the correct editor is opened', async () => {
    parent = await fixture(html`
      <mock-wizard-editor
        ><svc-later-binding-list .doc=${doc}></svc-later-binding-list
      ></mock-wizard-editor>
    `);

    element = <SVCLaterBindingList>(
      parent.querySelector('svc-later-binding-list')!
    );
    await element.requestUpdate();

    // Select the first list item that has an edit button, this should be an SVC Element.
    await (<HTMLElement>(
      element?.shadowRoot?.querySelector(
        'mwc-list-item > mwc-icon-button[icon="edit"]'
      )
    )).click();
    await parent.updateComplete;

    const nameField = <WizardTextField>(
      parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
    );
    expect(nameField.value).to.be.equal('currentOnly');
  });
});
