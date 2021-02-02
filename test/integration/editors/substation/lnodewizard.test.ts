import { expect, fixture, html } from '@open-wc/testing';
import { isCreate, WizardInput, isDelete } from '../../../../src/foundation.js';
import {
  lNodeWizardAction,
  editlNode,
} from '../../../../src/editors/substation/lnodewizard.js';

import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-list';
import '../../../mock-wizard.js';
import { List } from '@material/mwc-list';
import { getDocument } from '../../../data.js';
import { MockWizard } from '../../../mock-wizard.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

describe('lnodewizard', () => {
  let element: MockWizard;
  const validSCL = getDocument();
  beforeEach(async () => {
    element = <MockWizard>await fixture(html`<mock-wizard></mock-wizard>`);
    element.workflow.push(editlNode(validSCL.querySelector('Bay')!));
    await element.requestUpdate();
  });

  it('renders three wizard pages each in a mwc-dialog', async () => {
    expect(
      element.wizardUI.shadowRoot?.querySelectorAll('mwc-dialog').length
    ).to.equal(3);
  });

  describe('on the first wizard page', () => {
    it('render a list of available IEDs in a mwc-list with checked items', () => {
      expect(
        element.wizardUI.shadowRoot
          ?.querySelector('mwc-dialog')
          ?.querySelectorAll('mwc-check-list-item').length
      ).to.equal(validSCL.querySelectorAll('IED').length);
    });

    it('render one search field in a mwc-textfield', () => {
      expect(
        element.wizardUI.shadowRoot
          ?.querySelector('mwc-dialog')
          ?.querySelectorAll('mwc-textfield').length
      ).to.equal(1);
    });

    it('select the IEDs that are connected', () => {
      expect(
        (<ListItemBase[]>(
          (<List>(
            element.wizardUI
              .shadowRoot!.querySelector('mwc-dialog')!
              .querySelector('mwc-list')
          )).selected
        )).length
      ).to.equal(1);
    });

    describe('on the second page', () => {
      it('add logical devices on selecting IEDs on the first page', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelectorAll('mwc-check-list-item').length
        ).to.equal(
          validSCL.querySelectorAll(
            'IED[name="IED2"] > AccessPoint > Server > LDevice'
          ).length
        );
        (<ListItemBase>(
          element.wizardUI
            .shadowRoot!.querySelector('mwc-dialog')!
            .querySelector('mwc-check-list-item[value="IED1"]')
        )).click();
        await element.requestUpdate();
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelectorAll('mwc-check-list-item').length
        ).to.equal(
          validSCL.querySelectorAll(
            'IED[name="IED1"] > AccessPoint > Server > LDevice,IED[name="IED2"] > AccessPoint > Server > LDevice'
          ).length
        );
      });

      it('delete logical devices on de-selecting IEDs on the first page', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelectorAll('mwc-check-list-item')
        ).to.not.be.empty;
        (<ListItemBase>(
          element.wizardUI
            .shadowRoot!.querySelector('mwc-dialog')!
            .querySelector('mwc-check-list-item[value="IED2"]')
        )).click();
        await element.requestUpdate();
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelectorAll('mwc-check-list-item')
        ).to.be.empty;
      });

      it('select logical devices when used in this Element already', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(2)')
            ?.querySelector(
              'mwc-check-list-item[value="{\\"iedName\\":\\"IED2\\",\\"ldInst\\":\\"CBSW\\"}"]'
            )
        ).to.have.property('selected', true);
      });
    });

    describe('on the third page', () => {
      it('add logical nodes on selecting logical devices on the second page', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(3)')
            ?.querySelectorAll('mwc-check-list-item').length
        ).to.equal(
          validSCL.querySelectorAll(
            'IED[name="IED2"] LDevice[inst="CBSW"] > LN0, IED[name="IED2"] LDevice[inst="CBSW"] > LN'
          ).length
        );
      });

      it('select logical nodes when used in this Element already', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(3)')
            ?.querySelector('mwc-check-list-item[value*="inst\\":\\"1"]')
        ).to.have.property('selected', true);
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(3)')
            ?.querySelector('mwc-check-list-item[value*="inst\\":\\"3"]')
        ).to.have.property('selected', true);
      });

      it('disable logical nodes when used in the Substation already', async () => {
        expect(
          element.wizardUI.shadowRoot
            ?.querySelector('mwc-dialog:nth-child(3)')
            ?.querySelector('mwc-check-list-item[value*="inst\\":\\"2"]')
        ).to.have.property('disabled', true);
      });
    });

    const noOp = () => {
      return;
    };

    let list: List;

    beforeEach(async () => {
      const value1 = {
        iedName: 'IED',
        ldInst: 'ldInst',
        prefix: '',
        lnClass: 'LLN0',
        inst: '',
      };

      const value2 = {
        iedName: 'IED',
        ldInst: 'ldInst',
        prefix: 'prefix',
        lnClass: 'USER',
        inst: '10',
      };

      const value3 = {
        iedName: 'IED',
        ldInst: 'ldInst',
        prefix: 'prefix',
        lnClass: 'USER',
        inst: '1',
      };

      list = await fixture(html`<mwc-list multi id="lnList">
        <mwc-check-list-item selected value=${JSON.stringify(value1)}
          >${value1.prefix}${value1.lnClass}${value1.inst}</mwc-check-list-item
        ><mwc-check-list-item selected value=${JSON.stringify(value2)}
          >${value2.prefix}${value2.lnClass}${value2.inst}</mwc-check-list-item
        ><mwc-check-list-item value=${JSON.stringify(value3)}
          >${value3.prefix}${value3.lnClass}${value3.inst}</mwc-check-list-item
        >
      </mwc-list>`);
    });

    const newWizard = (done = noOp) => {
      const element = document.createElement('mwc-dialog');
      element.attachShadow;

      element.shadowRoot?.appendChild(list);

      element.close = done;
      return element;
    };

    let inputs: WizardInput[];

    describe('has a lNodeActions that', () => {
      let root: Element;
      beforeEach(() => {
        root = new DOMParser().parseFromString(
          `<SCL><Substation><VoltageLevel><Bay>
            <LNode iedName="IED" ldInst="ldInst" lnClass="LLN0"></LNode>
            <LNode iedName="IED" ldInst="ldInst" prefix="prefix" lnClass="USER" lnInst="1"></LNode>
            <LNode iedName="IED" ldInst="ldInst" prefix="prefix" lnClass="USER" lnInst="2"></LNode>
          </Bay></VoltageLevel></Substation></SCL>`,
          'application/xml'
        ).documentElement;
      });

      it('returns a WizardAction which returns 3 EditorActions', () => {
        const wizardAction = lNodeWizardAction(root.querySelector('Bay')!);
        expect(wizardAction(inputs, newWizard()).length).to.equal(3);
      });

      it('retruns a WizardAction with the first EditorAction being an isDelete', () => {
        const wizardAction = lNodeWizardAction(root.querySelector('Bay')!);
        expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isDelete);
      });

      it('retruns a WizardAction with the second EditorAction being an isDelete', () => {
        const wizardAction = lNodeWizardAction(root.querySelector('Bay')!);
        expect(wizardAction(inputs, newWizard())[1]).to.satisfy(isDelete);
      });

      it('retruns a WizardAction with the third EditorAction being an isCreate', () => {
        const wizardAction = lNodeWizardAction(root.querySelector('Bay')!);
        expect(wizardAction(inputs, newWizard())[2]).to.satisfy(isCreate);
      });
    });
  });
});
