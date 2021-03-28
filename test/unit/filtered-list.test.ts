import { List } from '@material/mwc-list';
import { expect, fixture, html } from '@open-wc/testing';

describe('filtered-list', () => {
  let element: List;
  beforeEach(async () => {
    element = await fixture(html`<filtered-list></filtered-list>`);
  });

  it('looks like its latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
