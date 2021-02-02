import { fixture, html, expect } from '@open-wc/testing';
import fc from 'fast-check';

import '../../../mock-wizard.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';
import { regexString, regExp, inverseRegExp } from '../../../foundation.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { TextField } from '@material/mwc-textfield';

describe('subnetwork-editor wizarding integration', () => {
  describe('edit/add Subnetwork wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement;

    beforeEach(async () => {
      parent = <WizardingElement>(
        await fixture(
          html`<mock-wizard
            ><subnetwork-editor
              .element=${doc.querySelector('SubNetwork')}
            ></subnetwork-editor
          ></mock-wizard>`
        )
      );

      (<HTMLElement>(
        parent
          ?.querySelector('subnetwork-editor')
          ?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;
    });
    it('has one wizard-dialog', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(1);
    });
    describe('include two buttons', () => {
      it('and only two buttons', () => {
        expect(
          parent.wizardUI.dialog?.querySelectorAll('mwc-button').length
        ).to.equal(2);
      });
      it('a cancel button as secondary action', () => {
        expect(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="secondaryAction"]'
          )
        ).to.exist;
      });
      it('a edit button as primary action', () => {
        expect(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        ).to.exist;
      });
    });
    it('include 4 wizard inputs', async () => {
      expect(parent.wizardUI.inputs.length).to.equal(4);
    });
    describe('the first input element', () => {
      it('edits the attribute name', async () => {
        expect(parent.wizardUI.inputs[0].label).to.equal('name');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.tName, 1), async name => {
            parent.wizardUI.inputs[0].value = name;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[0].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the second input element', () => {
      it('edits the attribute desc', async () => {
        expect(parent.wizardUI.inputs[1].label).to.equal('desc');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.desc), async desc => {
            parent.wizardUI.inputs[1].value = desc;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[1].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the third input element', () => {
      it('edits the attribute type', async () => {
        expect(parent.wizardUI.inputs[2].label).to.equal('type');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.desc, 1), async type => {
            parent.wizardUI.inputs[2].value = type;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[2].checkValidity()).to.be.true;
          })
        );
      });
    });
    describe('the fourth input element', () => {
      it('edits the attribute ', async () => {
        expect(parent.wizardUI.inputs[3].label).to.equal('BitRate');
      });
      it('edits only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.decimal), async BitRate => {
            parent.wizardUI.inputs[3].value = BitRate;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[3].checkValidity()).to.be.true;
          })
        );
      });
      it('rejects edition for invalid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(
            regexString(inverseRegExp.decimal, 1),
            async BitRate => {
              parent.wizardUI.inputs[3].value = BitRate;
              await parent.updateComplete;
              expect(parent.wizardUI.inputs[3].checkValidity()).to.be.false;
            }
          )
        );
      });
    });
  });
  describe('add ConnectedAP wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement;

    beforeEach(async () => {
      parent = <WizardingElement>(
        await fixture(
          html`<mock-wizard
            ><subnetwork-editor
              .element=${doc.querySelector('SubNetwork')}
            ></subnetwork-editor
          ></mock-wizard>`
        )
      );

      (<HTMLElement>(
        parent
          ?.querySelector('subnetwork-editor')
          ?.shadowRoot?.querySelector('mwc-icon-button[icon="playlist_add"]')
      )).click();
      await parent.updateComplete;
    });
    it('display all access point in the project', async () => {
      expect(parent.wizardUI.dialog).to.exist;
      expect(parent.wizardUI.dialogs.length).to.equal(1);
      expect(
        parent.wizardUI.dialog?.querySelectorAll('mwc-check-list-item').length
      ).to.equal(doc.querySelectorAll(':root > IED > AccessPoint').length);
    });
    it('only allows to select non-connected access points', async () => {
      expect(
        Array.from(
          parent.wizardUI.dialog!.querySelectorAll('mwc-check-list-item')
        ).filter(item => item.disabled).length
      ).to.equal(2);
    });
    it('sorts non-conneted access points to the top', async () => {
      expect(
        (<ListItemBase>(
          parent.wizardUI.dialog!.querySelector(
            'mwc-check-list-item:nth-child(1)'
          )
        )).value
      ).to.equal('{"iedName":"IED3","apName":"P1"}');
    });
    //FIXME: Event not triggered in input change of the search field
    /* it('filters access point with the search text field', async () => {
       expect(
        Array.from(
          parent.wizardUI.dialog!.querySelectorAll('mwc-check-list-item')
        ).filter(item => item.style.display !== 'none').length
      ).to.equal(3);
      (<TextField>(
        parent.wizardUI.dialog!.querySelector('mwc-textfield')
      )).value = 'IED3';
      await parent.updateComplete;
      expect(
        Array.from(
          parent.wizardUI.dialog!.querySelectorAll('mwc-check-list-item')
        ).filter(item => item.style.display !== 'none').length
      ).to.equal(1); 
    }); */
  });
});
