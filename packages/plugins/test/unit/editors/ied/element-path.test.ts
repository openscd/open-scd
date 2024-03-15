import { expect, fixture, html } from '@open-wc/testing';

import '../../../../src/editors/ied/element-path.js';
import { ElementPath } from '../../../../src/editors/ied/element-path.js';

describe('element-path', () => {
  let element: ElementPath;

  beforeEach(async () => {
    element = await fixture(html`<element-path
      .elementNames=${['IED1', 'AccessPoint1', 'My Little Server']}
    ></element-path>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
