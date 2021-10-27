import { expect, fixture, html } from '@open-wc/testing';
import {
  Create,
  identity,
  isCreate,
  WizardAction,
  WizardActor,
} from '../../../src/foundation.js';

import { Directory } from '../../../src/finder-list.js';

import {
  createFCDAsAction,
  createFCDAWizard,
  getReader,
} from '../../../src/wizards/fcda.js';

import { MockWizard } from '../../mock-wizard.js';

describe('functional constrained data (attribute) - FCDA', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/base/test/testfiles/wizards/fcda.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('create wizard', () => {
    beforeEach(async () => {
      const wizard = createFCDAWizard(doc.querySelector('DataSet')!);
      element.workflow.push(wizard!);
      await element.requestUpdate();
    });

    it('looks like the last snapshot', () => {
      expect(element.wizardUI.dialog).to.equalSnapshot();
    });

    it('returns undefined wizard for parents without Server', () =>
      expect(createFCDAWizard(doc.querySelector('AccessPoint')!)).to.be
        .undefined);
  });

  describe('uses a specific finder-list .read', () => {
    let reader: (path: string[]) => Promise<Directory>;
    beforeEach(() => {
      reader = getReader(doc.querySelector('Server')!);
    });

    it('indicates error in case children cannot be determined', async () => {
      const path = ['some wrong path'];
      const dir = await reader(path);
      expect(dir.header?.strings[0]).to.equal('<p>');
      expect(dir.entries).to.be.empty;
    });

    it('sets header to undefined', async () => {
      const path = [
        `Server: ${<string>identity(doc.querySelector('Server')!)}`,
      ];
      const dir = await reader(path);
      expect(dir.header).to.be.undefined;
    });
    it('shows children for non leaf nodes', async () => {
      const path = [
        `Server: ${<string>identity(doc.querySelector('Server')!)}`,
      ];
      const dir = await reader(path);
      expect(dir.header).to.be.undefined;
      expect(dir.entries).to.not.be.empty;
    });
    it('shows children non for leaf SDO', async () => {
      const path = ['SDO: #OpenSCD_WYE_phases>phsA'];
      const dir = await reader(path);
      expect(dir.header).to.be.undefined;
      expect(dir.entries).to.not.be.empty;
    });
    it('shows children for non leaf BDA', async () => {
      const path = ['BDA: #OpenSCD_Vector_I_w_Ang>mag'];
      const dir = await reader(path);
      expect(dir.header).to.be.undefined;
      expect(dir.entries).to.not.be.empty;
    });
    it('does not show children for leaf BDA', async () => {
      const path = ['BDA: #OpenSCD_AnalogueValue_INT32>i'];
      const dir = await reader(path);
      expect(dir.header).to.be.undefined;
      expect(dir.entries).to.be.empty;
    });
    it('does not show children for leaf DA', async () => {
      const path = ['DA: #Dummy.XCBR1.Pos>stVal'];
      const dir = await reader(path);
      expect(dir.header).to.be.undefined;
      expect(dir.entries).to.be.empty;
    });
  });

  describe('create action for selected FCDAs', () => {
    let actor: WizardActor = (): WizardAction[] => {
      return [];
    };

    let actions: WizardAction[] = [];

    const pathA = [
      'Server: IED1>P1',
      'LDevice: IED1>>CircuitBreaker_CB1',
      'LN0: IED1>>CircuitBreaker_CB1',
      'DO: #Dummy.LLN0>Beh',
      'DA: #Dummy.LLN0.Beh>stVal',
    ];

    const pathB = [
      'Server: IED1>P1',
      'LDevice: IED1>>Meas',
      'LN: IED1>>Meas>My MMXU 1',
      'DO: #Dummy.MMXU>A',
      'SDO: #OpenSCD_WYE_phases>phsA',
      'DA: #OpenSCD_CMV_db_i_MagAndAng>cVal',
      'BDA: #OpenSCD_Vector_I_w_Ang>mag',
      'BDA: #OpenSCD_AnalogueValue_INT32>i',
    ];

    const pathC = [
      'Server: IED1>P1',
      'LDevice: IED1>>CircuitBreaker_CB1',
      'LN: IED1>>CircuitBreaker_CB1> XCBR 1',
      'DO: #Dummy.XCBR1>Pos',
      'DA: #Dummy.XCBR1.Pos>stVal',
    ];

    beforeEach(async () => {
      actor = createFCDAsAction(doc.querySelector('Server')!);
    });

    describe('with path A', () => {
      beforeEach(async () => {
        const finder = html`<finder-list
          multi
          .paths=${[pathA]}
        ></finder-list>`;
        const wizard = [{ title: '', content: [finder] }];
        element.workflow.push(wizard);
        await element.requestUpdate();
        actions = actor([], element.wizardUI);
      });

      it('returns a non empty create action', async () => {
        expect(actions).to.not.be.empty;
        expect(actions.length).to.equal(1);
        expect(actions[0]).to.satisfy(isCreate);
      });

      it('returns a create action that follows the definition of a FCDA', async () => {
        expect(actions[0]).to.satisfy(isCreate);
        const createAction = <Create>actions[0];
        expect(createAction.new.element).to.have.attribute('iedName', 'IED1');
        expect(createAction.new.element).to.have.attribute(
          'ldInst',
          'CircuitBreaker_CB1'
        );
        expect(createAction.new.element).to.have.attribute('prefix', '');
        expect(createAction.new.element).to.have.attribute('lnClass', 'LLN0');
        expect(createAction.new.element).to.have.attribute('lnInst', '');
        expect(createAction.new.element).to.have.attribute('doName', 'Beh');
        expect(createAction.new.element).to.have.attribute('daName', 'stVal');
        expect(createAction.new.element).to.have.attribute('fc', 'ST');
      });

      it('does not create FCDA for non leaf nodes', async () => {
        const slicePath = pathA.slice(0, 2);
        const finder = html`<finder-list
          multi
          .paths=${[slicePath]}
        ></finder-list>`;
        const wizard = [{ title: '', content: [finder] }];
        element.workflow.length = 0;
        element.workflow.push(wizard);
        await element.requestUpdate();
        const actions = actor([], element.wizardUI);
        expect(actions).to.be.empty;
      });

      it('does not create FCDA for invalid LN id', async () => {
        const invalidPath = [...pathA];
        invalidPath[2] = 'LN: some wrong identity';
        const finder = html`<finder-list
          multi
          .paths=${[invalidPath]}
        ></finder-list>`;
        const wizard = [{ title: '', content: [finder] }];
        element.workflow.length = 0;
        element.workflow.push(wizard);
        await element.requestUpdate();
        const actions = actor([], element.wizardUI);
        expect(actions).to.be.empty;
      });

      it('does not create FCDA for invalid LN tag', async () => {
        const invalidPath = [...pathA];
        invalidPath[2] = 'Ln: IED1>>CircuitBreaker_CB1';
        const finder = html`<finder-list
          multi
          .paths=${[invalidPath]}
        ></finder-list>`;
        const wizard = [{ title: '', content: [finder] }];
        element.workflow.length = 0;
        element.workflow.push(wizard);
        await element.requestUpdate();
        const actions = actor([], element.wizardUI);
        expect(actions).to.be.empty;
      });

      it('does not create FCDA for invalid DO or DA definition', async () => {
        const invalidPath = [...pathA];
        invalidPath[3] = 'DO: some wrong DO id';
        const finder = html`<finder-list
          multi
          .paths=${[invalidPath]}
        ></finder-list>`;
        const wizard = [{ title: '', content: [finder] }];
        element.workflow.length = 0;
        element.workflow.push(wizard);
        await element.requestUpdate();
        const actions = actor([], element.wizardUI);
        expect(actions).to.be.empty;
      });
    });

    describe('with path B', () => {
      beforeEach(async () => {
        const finder = html`<finder-list
          multi
          .paths=${[pathB]}
        ></finder-list>`;
        const wizard = [{ title: '', content: [finder] }];
        element.workflow.push(wizard);
        await element.requestUpdate();
        actions = actor([], element.wizardUI);
      });

      it('returns a non empty create action', async () => {
        expect(actions).to.not.be.empty;
        expect(actions.length).to.equal(1);
        expect(actions[0]).to.satisfy(isCreate);
      });

      it('returns a create action that follows the definition of a FCDA', async () => {
        expect(actions[0]).to.satisfy(isCreate);
        const createAction = <Create>actions[0];
        expect(createAction.new.element).to.have.attribute('iedName', 'IED1');
        expect(createAction.new.element).to.have.attribute('ldInst', 'Meas');
        expect(createAction.new.element).to.have.attribute('prefix', 'My');
        expect(createAction.new.element).to.have.attribute('lnClass', 'MMXU');
        expect(createAction.new.element).to.have.attribute('lnInst', '1');
        expect(createAction.new.element).to.have.attribute('doName', 'A.phsA');
        expect(createAction.new.element).to.have.attribute(
          'daName',
          'cVal.mag.i'
        );
        expect(createAction.new.element).to.have.attribute('fc', 'MX');
      });
    });

    describe('with path C', () => {
      it('does not create FCDA with missing fc', async () => {
        const finder = html`<finder-list
          multi
          .paths=${[pathC]}
        ></finder-list>`;
        const wizard = [{ title: '', content: [finder] }];
        element.workflow.length = 0;
        element.workflow.push(wizard);
        await element.requestUpdate();
        const actions = actor([], element.wizardUI);
        expect(actions).to.be.empty;
      });
    });
  });
});
