import { expect, fixture, html } from '@open-wc/testing';

import {
  ComplexAction,
  EditorAction,
  identity,
  ifImplemented,
  invert,
  isCreate,
  isDelete,
  isMove,
  isSame,
  isSimple,
  isUpdate,
  newActionEvent,
  newPendingStateEvent,
  newWizardEvent,
  singletonTags,
  specialTags,
} from '../../src/foundation.js';
import { getDocument } from '../data.js';
import { MockAction } from './mock-actions.js';

const scl1 = getDocument().documentElement;
const scl2 = getDocument(true, '2003').documentElement;

const substation = scl1.querySelector('Substation')!;
const ied = scl1.querySelector('IED')!;
const communication = scl1.querySelector('Communication')!;
const bay = scl1.querySelector('Bay')!;
const privateSection = bay.querySelector('Private')!;
const privateElement = privateSection.firstElementChild!;
const publicElement = bay.children.item(1)!;

describe('foundation', () => {
  describe('EditorAction', () => {
    it('consists of four disjunct simple types', () => {
      expect(MockAction.cre).to.satisfy(isCreate);
      expect(MockAction.del).to.satisfy(isDelete);
      expect(MockAction.mov).to.satisfy(isMove);
      expect(MockAction.upd).to.satisfy(isUpdate);

      expect(MockAction.cre).to.satisfy(isSimple);
      expect(MockAction.del).to.satisfy(isSimple);
      expect(MockAction.mov).to.satisfy(isSimple);
      expect(MockAction.upd).to.satisfy(isSimple);

      expect(MockAction.cre).to.not.satisfy(isDelete);
      expect(MockAction.cre).to.not.satisfy(isMove);
      expect(MockAction.cre).to.not.satisfy(isUpdate);

      expect(MockAction.del).to.not.satisfy(isCreate);
      expect(MockAction.del).to.not.satisfy(isMove);
      expect(MockAction.del).to.not.satisfy(isUpdate);

      expect(MockAction.mov).to.not.satisfy(isCreate);
      expect(MockAction.mov).to.not.satisfy(isDelete);
      expect(MockAction.mov).to.not.satisfy(isUpdate);

      expect(MockAction.upd).to.not.satisfy(isCreate);
      expect(MockAction.upd).to.not.satisfy(isDelete);
      expect(MockAction.upd).to.not.satisfy(isMove);
    });

    it('consists of one complex type', () => {
      expect(MockAction.complex).to.not.satisfy(isSimple);

      expect(MockAction.complex).to.not.satisfy(isCreate);
      expect(MockAction.complex).to.not.satisfy(isDelete);
      expect(MockAction.complex).to.not.satisfy(isMove);
      expect(MockAction.complex).to.not.satisfy(isUpdate);
    });

    describe('invert', () => {
      it('turns Create into Delete and vice versa', () => {
        expect(invert(MockAction.cre)).to.satisfy(isDelete);
        expect(invert(MockAction.del)).to.satisfy(isCreate);
      });

      it('turns Move into Move', () => {
        expect(invert(MockAction.mov)).to.satisfy(isMove);
      });

      it('turns Update into Update', () => {
        expect(invert(MockAction.upd)).to.satisfy(isUpdate);
      });

      it('inverts components of complex actions in reverse order', () => {
        const action = MockAction.complex;
        const inverse = <ComplexAction>invert(action);

        action.actions.forEach((element, index) =>
          expect(
            inverse.actions[inverse.actions.length - index - 1]
          ).to.deep.equal(invert(action.actions[index]))
        );
      });

      it('throws on unknown Action type', () => {
        const invalid = <EditorAction>(<unknown>'Not an action!');
        expect(() => invert(invalid)).to.throw();
      });
    });

    describe('ActionEvent', () => {
      it('bears an EditorAction in its detail', () => {
        expect(newActionEvent(MockAction.mov))
          .property('detail')
          .property('action')
          .to.satisfy(isMove);
      });
    });
  });

  describe('PendingStateEvent', () => {
    it('bears a void Promise in its detail', () => {
      expect(newPendingStateEvent(Promise.resolve()))
        .property('detail')
        .property('promise')
        .to.be.a('promise');
    });
  });

  describe('WizardEvent', () => {
    it('optionally bears a wizard in its detail', () => {
      expect(newWizardEvent()).property('detail').property('wizard').to.be.null;
      expect(newWizardEvent([]))
        .property('detail')
        .property('wizard')
        .to.be.an('array').and.to.be.empty;
    });
  });

  describe('ifImplemented', () => {
    let nonEmpty: HTMLElement;
    let empty: HTMLElement;

    beforeEach(async () => {
      nonEmpty = await fixture(html`<p>${ifImplemented('test')}</p>`);
      empty = await fixture(html`<p>${ifImplemented({})}</p>`);
    });

    it('renders non-empty objects into its template', () =>
      expect(nonEmpty).dom.to.have.text('test'));

    it('does not render empty objects into its template', () =>
      expect(empty).dom.to.be.empty);
  });

  describe('isSame', () => {
    it('is true of any two SCL Elements', () => {
      expect(isSame(scl1, scl2)).to.be.true;
    });

    it('is true of any two Header Elements', () => {
      expect(
        isSame(scl1.querySelector('Header')!, scl2.querySelector('Header')!)
      ).to.be.true;
    });

    it('is true of any two Communication Elements', () => {
      expect(
        isSame(
          scl1.querySelector('Communication')!,
          scl2.querySelector('Communication')!
        )
      ).to.be.true;
    });

    it('is true of any two DataTypeTemplates Elements', () => {
      expect(
        isSame(
          scl1.querySelector('DataTypeTemplates')!,
          scl2.querySelector('DataTypeTemplates')!
        )
      ).to.be.true;
    });

    it('is true of identical private sections', () => {
      expect(isSame(privateSection, privateSection)).to.be.true;
    });

    it('is false of any private elements', () => {
      expect(isSame(privateElement, privateElement)).to.be.false;
      expect(isSame(privateElement, publicElement)).to.be.false;
    });

    it('is true of any one Element and itself', () => {
      expect(isSame(substation, substation)).to.be.true;
      expect(isSame(ied, ied)).to.be.true;
      expect(isSame(bay, bay)).to.be.true;
      expect(isSame(communication, communication)).to.be.true;
    });

    it('is false of elements with different tagNames', () => {
      expect(isSame(substation, ied)).to.be.false;
      expect(isSame(substation, bay)).to.be.false;
      expect(isSame(bay, communication)).to.be.false;
      expect(isSame(communication, ied)).to.be.false;
    });

    it('is true of elements with equal nonempty id attributes', () => {
      expect(
        isSame(
          scl1.querySelector('LNodeType[id="Dummy.LLN0"]')!,
          scl2.querySelector('LNodeType[id="Dummy.LLN0"]')!
        )
      ).to.be.true;
    });

    it('is false of elements with unequal id attributes', () => {
      expect(
        isSame(
          scl1.querySelector('LNodeType[id="Dummy.LLN0"]')!,
          scl1.querySelector('LNodeType[id="Dummy.LLN0.two"]')!
        )
      ).to.be.false;
    });
  });

  describe('identity', () => {
    it('returns NaN for any private element', () => {
      expect(identity(privateElement)).to.be.NaN;
    });
    it('returns parent identity for singleton identities', () => {
      Object.keys(singletonTags).forEach(tag => {
        const element = scl1.querySelector(tag);
        if (element) {
          expect(identity(element)).to.equal(identity(element.parentElement!));
        }
      });
    });
    it('returns valid identity for special identities', () => {
      const expectations: Partial<Record<string, string>> = {
        Hitem: '1\t143',
        Terminal: '>AA1>E1>COUPLING_BAY>QC11>AA1/E1/COUPLING_BAY/L2',
        'Bay>LNode': 'IED2 CBSW/LPHD 1',
        KDC: '>IED1>IED1 P1',
        LDevice: '>IED1>>CircuitBreaker_CB1',
        IEDName:
          '>IED1>>CircuitBreaker_CB1>GCB>IED2 P1 CircuitBreaker_CB1/CSWI',
        FCDA:
          '>IED1>>CircuitBreaker_CB1>GooseDataSet1>CircuitBreaker_CB1/XCBR1.Pos.stVal (ST)',
        ExtRef: '>IED1>>Disconnectors>DCCSWI1>IED2 CBSW/XSWI2.Pos.stVal',
        LN: '>IED1>>CircuitBreaker_CB1>XCBR1',
        ClientLN: '>IED2>>CBSW>XSWI1>ReportCb>IED1 P1 CircuitBreaker_CB1/XCBR1',
        DAI: '>IED1>>CircuitBreaker_CB1>XCBR1>Pos>ctlModel',
        SDI: '>IED1>>CircuitBreaker_CB1>CBCSWI2>Pos>pulseConfig',
        Val: '>IED1>>CircuitBreaker_CB1>XCBR1>Pos>ctlModel>0',
        ConnectedAP: 'IED1 P1',
        GSE: 'CircuitBreaker_CB1 GCB',
        SMV: 'MU01 MSVCB01',
        PhysConn: 'IED1 P1>RedConn',
        P: 'IED1 P1>IP[0]',
        EnumVal: '#Dummy_ctlModel>0',
        ProtNs: '#Dummy.LLN0.Mod.SBOw>8-MMS IEC 61850-8-1:2003',
      };

      Object.keys(expectations).forEach(key => {
        const element = scl1.querySelector(key);
        expect(identity(element!)).to.equal(expectations[key]);
      });
    });
  });
});
