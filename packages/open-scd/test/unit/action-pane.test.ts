import { expect, fixture, html } from '@open-wc/testing';

import '../../src/action-pane.js';
import '../../src/editors/substation/bay-editor.js';
import { ActionPane } from '../../src/action-pane.js';

describe('action-pane', () => {
  let element: ActionPane;
  const label = 'test label';

  beforeEach(async () => {
    element = await fixture(
      html`<action-pane header="test header" label="${label}"></action-pane>`
    );
    await element.updateComplete;
  });

  it('looks like the latest snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('renders the header as <h1> per default', () => {
    expect(element.shadowRoot?.querySelector('h1')).to.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
  });

  it('renders the header as <h1> with level 1', async () => {
    element.level = 1;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h1')).to.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
  });

  it('renders the header as <h2> with level 2', async () => {
    element.level = 2;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h2')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
  });

  it('renders the header as <h3> with level 3', async () => {
    element.level = 3;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h3')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
  });

  it('renders the header as <h4> with level 4', async () => {
    element.level = 4;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h4')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
  });

  it('renders the header as <h4> for levels > 4', async () => {
    element.level = 7;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h4')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
  });

  it('renders the header as <h1> for levels < 1', async () => {
    element.level = -1;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h1')).to.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
  });

  it('renders the title on the <h1>', async () => {
    element.level = 1;
    await element.updateComplete;
    expect(
      element.shadowRoot?.querySelector('h1')!.getAttribute('title')
    ).to.be.equals(label);
  });

  it('renders the title on the <h2>', async () => {
    element.level = 2;
    await element.updateComplete;
    expect(
      element.shadowRoot?.querySelector('h2')!.getAttribute('title')
    ).to.be.equals(label);
  });

  it('renders the title on the <h3>', async () => {
    element.level = 3;
    await element.updateComplete;
    expect(
      element.shadowRoot?.querySelector('h3')!.getAttribute('title')
    ).to.be.equals(label);
  });

  it('renders the title on the <h4>', async () => {
    element.level = 4;
    await element.updateComplete;
    expect(
      element.shadowRoot?.querySelector('h4')!.getAttribute('title')
    ).to.be.equals(label);
  });

  it('does not set contrasted class property with odd level', async () => {
    element.level = 3;
    await element.updateComplete;

    expect(
      element.shadowRoot
        ?.querySelector('section')
        ?.classList.contains('contrasted')
    ).to.be.false;
  });

  it('sets contrasted class property with even levels', async () => {
    element.level = 4;
    await element.updateComplete;

    expect(
      element.shadowRoot
        ?.querySelector('section')
        ?.classList.contains('contrasted')
    ).to.be.true;
  });

  describe('with icon property set', () => {
    beforeEach(async () => {
      element.icon = 'edit';
      await element.updateComplete;
    });

    it('looks like the latest snapshot', () => {
      expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with existing parent action-pane', () => {
    let parent: ActionPane;
    const bay = <Element>(
      new DOMParser().parseFromString(
        `<Bay name="name" desc="desc"></Bay>`,
        'application/xml'
      ).documentElement
    );
    beforeEach(async () => {
      parent = await fixture(
        html`<action-pane header="parent header"
          ><bay-editor .element=${bay}></bay-editor
        ></action-pane>`
      );

      element = parent
        .querySelector('bay-editor')!
        .shadowRoot!.querySelector<ActionPane>('action-pane')!;
      await element.updateComplete;
    });

    it('increments the default level property of the parent', () => {
      expect(element.level).to.equal(2);
    });

    it('only increments on first update', async () => {
      parent.level = 3;
      await parent.requestUpdate();

      expect(element.level).to.equal(2);
    });
  });
});
