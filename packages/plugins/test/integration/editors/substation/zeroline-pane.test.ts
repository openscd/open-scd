import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import '../../../../src/editors/substation/zeroline-pane.js';
import { ZerolinePane } from '../../../../src/editors/substation/zeroline-pane.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';

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

  it('add Substation element with add button', async () => {
    expect(doc.querySelector('Substation[name="newSubstation"]')).to.not.exist;
    zeroline.addButton.click();
    (<ListItem>zeroline.addMenu.querySelector('[value=Substation]')).click();
    await parent.updateComplete;
    await parent.wizardUI.updateComplete;

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