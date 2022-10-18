import { expect, fixture, html } from '@open-wc/testing';

import { Dialog } from '@material/mwc-dialog';

import { CompasSessionExpiredDialogElement } from '../../../src/compas/CompasSessionExpiredDialog.js';
import '../../../src/compas/CompasSessionExpiredDialog.js';

describe('compas-session-expired-dialog', () => {
  let element: CompasSessionExpiredDialogElement;

  describe('when no document is loaded', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<compas-session-expired-dialog
          .expiredSessionMessage="${15 * 60 * 1000}"
        >
        </compas-session-expired-dialog>`
      );
    });

    it('when calling show and close the dialog is in the correct state', () => {
      const dialog = <Dialog>element.shadowRoot!.querySelector('mwc-dialog')!;
      expect(dialog.open).to.be.false;

      element.show();
      expect(dialog.open).to.be.true;

      element.close();
      expect(dialog.open).to.be.false;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('when a document is loaded', () => {
    beforeEach(async () => {
      const docName = 'valid2007B4.scd';
      const doc = await fetch('/test/testfiles/' + docName)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element = await fixture(
        html`<compas-session-expired-dialog
          .expiredSessionMessage="${15 * 60 * 1000}"
          .doc="${doc}"
          .docName="${docName}"
        >
        </compas-session-expired-dialog>`
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
