import { expect } from '@open-wc/testing';

import {
  Action,
  invert,
  isCreate,
  isDelete,
  isMove,
  isUpdate,
  newActionEvent,
  newPendingStateEvent,
} from '../src/foundation.js';

import { cre, del, mov, upd } from './mock-actions.js';

describe('foundation', () => {
  describe('Action', () => {
    it('consists of four disjunct types', () => {
      expect(cre).to.satisfy(isCreate);
      expect(del).to.satisfy(isDelete);
      expect(mov).to.satisfy(isMove);
      expect(upd).to.satisfy(isUpdate);

      expect(cre).to.not.satisfy(isDelete);
      expect(cre).to.not.satisfy(isMove);
      expect(cre).to.not.satisfy(isUpdate);

      expect(del).to.not.satisfy(isCreate);
      expect(del).to.not.satisfy(isMove);
      expect(del).to.not.satisfy(isUpdate);

      expect(mov).to.not.satisfy(isCreate);
      expect(mov).to.not.satisfy(isDelete);
      expect(mov).to.not.satisfy(isUpdate);

      expect(upd).to.not.satisfy(isCreate);
      expect(upd).to.not.satisfy(isDelete);
      expect(upd).to.not.satisfy(isMove);
    });

    describe('invert', () => {
      it('turns Create into Delete and vice versa', () => {
        expect(invert(cre)).to.satisfy(isDelete);
        expect(invert(del)).to.satisfy(isCreate);
      });

      it('turns Move into Move', () => {
        expect(invert(mov)).to.satisfy(isMove);
      });

      it('turns Update into Update', () => {
        expect(invert(upd)).to.satisfy(isUpdate);
      });

      it('throws on unknown Action type', () => {
        const invalid = <Action>(<unknown>'Not an action!');
        expect(() => invert(invalid)).to.throw();
      });
    });

    describe('ActionEvent', () => {
      it('bears an Action in its detail', async () => {
        expect(newActionEvent(mov))
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
