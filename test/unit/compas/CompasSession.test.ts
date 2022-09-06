import { expect, fixture, html } from '@open-wc/testing';

import {
  CompasSessionExpiredDialogElement,
  CompasSessionExpiringDialogElement,
} from '../../../src/compas/CompasSession.js';

import '../../../src/compas/CompasSession.js';

describe('compas-session', () => {
  describe('Dialog when almost expired', () => {
    let element: CompasSessionExpiringDialogElement;

    beforeEach(async () => {
      element = await fixture(
        html` <compas-session-expiring-dialog></compas-session-expiring-dialog>`
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('Dialog when expired without document', () => {
    let element: CompasSessionExpiredDialogElement;

    beforeEach(async () => {
      element = await fixture(
        html` <compas-session-expired-dialog></compas-session-expired-dialog>`
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('Dialog when expired with document', () => {
    const docName = 'station123.scd';
    const doc = new Document();
    let element: CompasSessionExpiredDialogElement;

    beforeEach(async () => {
      element = await fixture(
        html` <compas-session-expired-dialog
          .doc="${doc}"
          .docName="${docName}"
        ></compas-session-expired-dialog>`
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
