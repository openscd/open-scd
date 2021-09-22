import { expect, fixture, html } from '@open-wc/testing';

import { FilteredList } from '../../../src/filtered-list.js';
import { IedEditor } from '../../../src/zeroline/ied-editor.js';

import { MockWizardEditor } from '../../mock-wizard-editor.js';

describe('ied-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let iededitor: IedEditor;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    const ied = doc.querySelector('IED[name="IED1"]')!;
    parent = <MockWizardEditor>(
      await fixture(
        html`<mock-wizard-editor
          ><ied-editor .element=${ied}></ied-editor
        ></mock-wizard-editor>`
      )
    );
    iededitor = <IedEditor>parent.querySelector('ied-editor');
    await iededitor.requestUpdate();
  });

  it('opens selectGseControlWizard showing GSEControl published by IED', async () => {
    iededitor.gseControl.click();
    await parent.updateComplete;
    expect(parent.wizardUI.dialog).to.exist;
    const gseControlList = <FilteredList>(
      parent.wizardUI.dialog?.querySelector('filtered-list')
    );
    await gseControlList.updateComplete;
    expect(gseControlList.items.length).to.equal(
      doc.querySelectorAll('IED[name="IED1"] GSEControl').length
    );
  });

  it('opens selectReportControlWizard for the IED element', async () => {
    iededitor.reportControl.click();
    await parent.updateComplete;
    expect(parent.wizardUI.dialog).to.exist;
    const reportControlList = <FilteredList>(
      parent.wizardUI.dialog?.querySelector('filtered-list')
    );
    await reportControlList.updateComplete;
    expect(reportControlList.items.length).to.equal(
      doc.querySelectorAll('IED[name="IED1"] ReportControl').length
    );
  });
});
