import { expect, fixture } from '@open-wc/testing';

import { MockWizardEditor } from '../mock-wizard-editor.js';

import { FilteredList } from '../../src/filtered-list.js';
import { ZerolinePane } from '../../src/zeroline-pane.js';

import { TextField } from '@material/mwc-textfield';
import { WizardTextField } from '../../src/wizard-textfield.js';
import { Button, html } from '../../src/foundation.js';

describe('zeroline-pane wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let zeroline: ZerolinePane;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/comm-map.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = <MockWizardEditor>await fixture(
      html`<mock-wizard-editor
          ><${ZerolinePane} .doc=${doc}></${ZerolinePane}
        ></mock-wizard-editor>`
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

  it('add Substation element with createSubstationWizard', async () => {
    expect(doc.querySelector('Substation[name="newSubstation"]')).to.not.exist;
    zeroline.createsubstation.click();
    await parent.updateComplete;
    const primaryAction = <Button>(
      parent.wizardUI.dialog?.querySelector('c-button[slot="primaryAction"]')
    );
    await primaryAction.updateComplete;
    const nameField = <WizardTextField>(
      parent.wizardUI.dialog?.querySelector('wizard-text-field[label="name"]')
    );
    nameField.value = 'newSubstation';
    await nameField.updateComplete;
    primaryAction.click();

    expect(doc.querySelector('Substation[name="newSubstation"]')).to.exist;
  });
});
