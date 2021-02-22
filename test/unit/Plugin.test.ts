import { expect, fixture, html } from '@open-wc/testing';

import { plugin } from '../../src/Plugging.js';

// data URL for: export default class extends HTMLElement {test = 1}
const testOne =
  'data:text/javascript;charset=utf-8;base64,' +
  'ZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7dGVzdCA9IDF9';
// data URL for: export default class extends HTMLElement {test = 2}
const testTwo =
  'data:text/javascript;charset=utf-8;base64,' +
  'ZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7dGVzdCA9IDJ9';

describe('plugin', () => {
  it('defines a new custom element the first time it is called with a tagName', async () => {
    await plugin(testOne, 'test-tag');
    expect(customElements.get('test-tag')).to.exist;
    const element = await fixture(html`<test-tag></test-tag>`);
    expect(element).to.have.property('test', 1);
  });

  it('does nothing the second time it is called with a tagName', async () => {
    await plugin(testTwo, 'test-tag');
    expect(customElements.get('test-tag')).to.exist;
    const element = await fixture(html`<test-tag></test-tag>`);
    expect(element).to.have.property('test', 1);
  });
});
