import { expect } from '@open-wc/testing';

import {
  EditorAction,
  invert,
  isCreate,
  isDelete,
  isMove,
  isUpdate,
  newActionEvent,
  newPendingStateEvent,
} from '../src/foundation.js';

import { MockAction } from './mock-actions.js';

describe('foundation', () => {
  describe('Action', () => {
    it('consists of four disjunct types', () => {
      expect(MockAction.cre).to.satisfy(isCreate);
      expect(MockAction.del).to.satisfy(isDelete);
      expect(MockAction.mov).to.satisfy(isMove);
      expect(MockAction.upd).to.satisfy(isUpdate);

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

      it('throws on unknown Action type', () => {
        const invalid = <EditorAction>(<unknown>'Not an action!');
        expect(() => invert(invalid)).to.throw();
      });
    });

    describe('ActionEvent', () => {
      it('bears an Action in its detail', async () => {
        expect(newActionEvent(MockAction.mov))
          .property('detail')
          .property('action')
          .to.satisfy(isMove);
      });
    });
  });

  describe('PendingStateEvent', () => {
    it('bears a string Promise in its detail', async () => {
      expect(newPendingStateEvent(Promise.resolve('test promise')))
        .property('detail')
        .property('promise')
        .to.be.a('promise');
    });
  });
});
