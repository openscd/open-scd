import { expect, fixture, html } from '@open-wc/testing';

import { CompasSessionExpiringDialogElement } from '../../../src/compas/CompasSessionExpiringDialog.js';
import '../../../src/compas/CompasSessionExpiringDialog.js';
import { Dialog } from '@material/mwc-dialog';

describe('compas-session-expiring-dialog', () => {
  let element: CompasSessionExpiringDialogElement;

  beforeEach(async () => {
    element = await fixture(
      html`<compas-session-expiring-dialog
        .expiringSessionWarning="${10 * 60 * 1000}"
        .expiredSessionMessage="${15 * 60 * 1000}"
      >
      </compas-session-expiring-dialog>`
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
