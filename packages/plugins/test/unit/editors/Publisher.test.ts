import { expect, fixture, html } from '@open-wc/testing';

import Publisher from '../../../src/editors/Publisher.js';

describe('Publisher plugin', () => {
  customElements.define('publisher-plugin', Publisher);

  let element: Publisher;

  beforeEach(async () => {
    element = await fixture(html`<publisher-plugin></publisher-plugin>`);
  });

  it('per default looks like the latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());

  it('displays report-control-editor with selected Report publisherType', async () => {
    element
      .shadowRoot!.querySelector<HTMLElement>('mwc-radio[value="Report"]')!
      .click();

    await element.requestUpdate();

    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('displays sampled-value-control-editor with selected SampledValue publisherType', async () => {
    element
      .shadowRoot!.querySelector<HTMLElement>(
        'mwc-radio[value="SampledValue"]'
      )!
      .click();

    await element.requestUpdate();

    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('displays data-set-editor with selected DataSet publisherType', async () => {
    element
      .shadowRoot!.querySelector<HTMLElement>('mwc-radio[value="DataSet"]')!
      .click();

    await element.requestUpdate();

    await expect(element).shadowDom.to.equalSnapshot();
  });
});
