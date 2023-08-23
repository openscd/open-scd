import { expect } from '@open-wc/testing';

import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { MockWizardEditor } from '../../../mock-wizard-editor.js';

export async function openAndCancelMenu(
  parent: MockWizardEditor,
  element: Element
): Promise<void> {
  expect(parent.wizardUI.dialog).to.be.undefined;

  element?.shadowRoot
    ?.querySelector<MenuBase>("mwc-icon-button[icon='playlist_add']")!
    .click();
  const lnodeMenuItem =
    element?.shadowRoot?.querySelector<ListItemBase>(
      `mwc-list-item[value='LNode']`
    ) ?? null;
  lnodeMenuItem?.click();
  await new Promise(resolve => setTimeout(resolve, 100)); // await animation

  expect(parent.wizardUI.dialog).to.exist;

  const secondaryAction: HTMLElement = <HTMLElement>(
    parent.wizardUI.dialog?.querySelector('mwc-button[slot="secondaryAction"]')
  );

  secondaryAction.click();
  await new Promise(resolve => setTimeout(resolve, 100)); // await animation

  expect(parent.wizardUI.dialog).to.be.undefined;

  return;
}
