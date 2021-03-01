import { expect, fixture, html } from '@open-wc/testing';

import {
  ComplexAction,
  EditorAction,
  ifImplemented,
  invert,
  isCreate,
  isDelete,
  isMove,
  isSimple,
  isUpdate,
  newActionEvent,
  newPendingStateEvent,
  newWizardEvent,
} from '../../src/foundation.js';

import { MockAction } from './mock-actions.js';

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
});
