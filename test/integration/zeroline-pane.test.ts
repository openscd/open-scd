import { expect, fixture, html } from '@open-wc/testing';

import '../mock-wizard-editor.js';
import { MockWizardEditor } from '../mock-wizard-editor.js';

import { IconButton } from '@material/mwc-icon-button';

import '../../src/zeroline-pane.js';
import { FilteredList } from '../../src/filtered-list.js';
import { ZerolinePane } from '../../src/zeroline-pane.js';
import { WizardTextField } from '../../src/wizard-textfield.js';

describe('zeroline-pane wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let zeroline: ZerolinePane;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = <MockWizardEditor>(
      await fixture(
        html`<mock-wizard-editor
          ><zeroline-pane .doc=${doc}></zeroline-pane
        ></mock-wizard-editor>`
      )
    );
    zeroline = <ZerolinePane>parent.querySelector('zeroline-pane');
    await parent.updateComplete;
  });

  it('opens selectGseControlWizard for the complete SCL file', async () => {
    zeroline.gsecontrol.click();
    await parent.updateComplete;
    expect(parent.wizardUI.dialog).to.exist;
    const gseControlList = <FilteredList>(
      parent.wizardUI.dialog?.querySelector('filtered-list')
    );
    await gseControlList.updateComplete;
    expect(gseControlList.items.length).to.equal(
      doc.querySelectorAll('GSEControl').length
    );
  });

  it('opens selectSampledValueControlWizard for the complete SCL file', async () => {
    zeroline.smvcontrol.click();
    await parent.updateComplete;

    expect(parent.wizardUI.dialog).to.exist;
    const smvControlList = <FilteredList>(
      parent.wizardUI.dialog?.querySelector('filtered-list')
    );
    await smvControlList.updateComplete;
    expect(smvControlList.items.length).to.equal(
      doc.querySelectorAll('SampledValueControl').length
    );
  });

  it('opens select wizard for SCL element ReportControl for the complete project', async () => {
    zeroline.reportcontrol.click();
    await parent.updateComplete;
    expect(parent.wizardUI.dialog).to.exist;
    const reportControlList = <FilteredList>(
      parent.wizardUI.dialog?.querySelector('filtered-list')
    );
    await reportControlList.updateComplete;
    expect(reportControlList.items.length).to.equal(
      doc.querySelectorAll('ReportControl').length
    );
  });

  it('add Substation element with createSubstationWizard', async () => {
    expect(doc.querySelector('Substation[name="newSubstation"]')).to.not.exist;
    zeroline.createsubstation.click();
    await parent.updateComplete;
    const primaryAction = <IconButton>(
      parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
    );
    await primaryAction.updateComplete;
    const nameField = <WizardTextField>(
      parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
    );
    nameField.value = 'newSubstation';
    await nameField.updateComplete;
    primaryAction.click();

    expect(doc.querySelector('Substation[name="newSubstation"]')).to.exist;
  });
});
