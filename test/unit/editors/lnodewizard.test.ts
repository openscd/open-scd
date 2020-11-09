import { expect, fixture, html } from '@open-wc/testing';
import { isCreate, WizardInput, isDelete } from '../../../src/foundation.js';
import {
  lNodeActions,
  hasLNode,
  editlNode,
} from '../../../src/editors/substation/lnodewizard.js';

import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-list';
import { List } from '@material/mwc-list';
import { BayEditor } from '../../../src/editors/substation/bay-editor.js';
import { getDocument } from '../../data.js';

describe('lnodewizard', () => {
  describe('creates wizard', () => {
    let element: BayEditor;
    const validSCL = getDocument();
    beforeEach(async () => {
      element = <BayEditor>(
        await fixture(
          html`<bay-editor
            .element=${validSCL.querySelector('Bay')}
            .parent=${validSCL.querySelector('VoltageLevel')}
          ></bay-editor>`
        )
      );
    });

    it('containing three wizard pages', () => {
      expect(editlNode(element).length).to.equal(3);
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
    let parent: Element;
    beforeEach(() => {
      parent = new DOMParser().parseFromString(
        `<Bay><LNode iedName="IED" ldInst="ldInst" lnClass="LLN0"></LNode>
        <LNode iedName="IED" ldInst="ldInst" prefix="prefix" lnClass="USER" lnInst="1"></LNode>
        <LNode iedName="IED" ldInst="ldInst" prefix="prefix" lnClass="USER" lnInst="2"></LNode>
            </Bay>`,
        'application/xml'
      ).documentElement;
    });

    it('returns a WizardAction which returns 3 EditorActions', () => {
      const wizardAction = lNodeActions(parent);
      expect(wizardAction(inputs, newWizard()).length).to.equal(3);
    });

    it('retruns a WizardAction with the first EditorAction being an isDelete', () => {
      const wizardAction = lNodeActions(parent);
      expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isDelete);
    });

    it('retruns a WizardAction with the second EditorAction being an isDelete', () => {
      const wizardAction = lNodeActions(parent);
      expect(wizardAction(inputs, newWizard())[1]).to.satisfy(isDelete);
    });

    it('retruns a WizardAction with the third EditorAction being an isCreate', () => {
      const wizardAction = lNodeActions(parent);
      expect(wizardAction(inputs, newWizard())[2]).to.satisfy(isCreate);
    });
    it('has two existing lnNodes', () => {
      expect(
        hasLNode(parent, {
          iedName: 'IED',
          ldInst: 'ldInst',
          prefix: 'prefix',
          lnClass: 'USER',
          inst: '1',
        })
      ).to.be.true;
      expect(
        hasLNode(parent, {
          iedName: 'IED',
          ldInst: 'ldInst',
          prefix: null,
          lnClass: 'LLN0',
          inst: '',
        })
      ).to.be.true;
    });
    it('has a missing lnNode', () => {
      expect(
        hasLNode(parent, {
          iedName: 'IED',
          ldInst: 'ldInst',
          prefix: 'prefix',
          lnClass: 'LLN0',
          inst: '10',
        })
      ).to.be.false;
    });
  });
});
