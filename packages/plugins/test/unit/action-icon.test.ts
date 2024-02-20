import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/src/action-icon.js';
import { ActionIcon } from '@openscd/open-scd/src/action-icon.js';

describe('Basic component action-icon', () => {
  let element: ActionIcon;

  beforeEach(async () => {
    element = await fixture(
      html`<action-icon header="test header"></action-icon>`
    );
    await element.updateComplete;
  });
  describe('with icon property set', () => {
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with unset icon property ', () => {
    beforeEach(async () => {
      element.icon = 'edit';
      await element.requestUpdate();
    });
    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
