import { expect, fixture, html } from '@open-wc/testing';
import sinon, { SinonSpy } from 'sinon';

import '../../src/editor-container.js';
import { EditorContainer } from '../../src/editor-container.js';

describe('editor-container', () => {
  let element: EditorContainer;
  const substation = <Element>(
    new DOMParser().parseFromString(
      `<Substation name="name" desc="desc"></Substation>`,
      'application/xml'
    ).documentElement
  );
  beforeEach(async () => {
    element = await fixture(
      html`<editor-container header="test header"></editor-container>`
    );
    await element.updateComplete;
  });

  it('does not render more vert option with missing mwc-fab children', () => {
    expect(element.moreVert).to.not.exist;
  });

  it('renders more vert option with existing mwc-fab children', async () => {
    const fabChild = element.ownerDocument.createElement('mwc-fab');
    fabChild.setAttribute('slot', 'morevert');
    element.appendChild(fabChild);
    await element.requestUpdate();
    expect(element.moreVert).to.exist;
  });

  it('renders the header as <h2> per default', () => {
    expect(element.shadowRoot?.querySelector('h2')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
  });

  it('renders the header as <h1> with level high', async () => {
    element.level = 'high';
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h1')).to.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
  });

  it('renders the header as <h2> with level mid', async () => {
    element.level = 'mid';
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h2')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
  });

  it('renders the header as <h3> with level low', async () => {
    element.level = 'low';
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h3')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
  });

  it('does not render header text with missing element and header text', () => {
    expect(element.defaultHeader).to.equal('');
  });

  it('header property overwrites default header text', async () => {
    element.element = substation;
    element.requestUpdate();
    expect(
      element.headerContainer.querySelector('h2')?.innerText.trim()
    ).to.equal('test header');
  });

  it('renders default header text with missing header property', async () => {
    element.header = '';
    element.element = substation;
    await element.requestUpdate();
    expect(
      element.headerContainer.querySelector('h2')?.innerText.trim()
    ).to.equal('name - desc');
  });

  it('does not render add icon and add menu with missing element', () => {
    expect(element.addMenu).to.not.exist;
    expect(element.addIcon).to.not.exist;
  });

  describe('with existing element definition', () => {
    const substation = <Element>(
      new DOMParser().parseFromString(
        `<Substation name="subst"></Substation>`,
        'application/xml'
      ).documentElement
    );

    let wizardEvent: SinonSpy;
    beforeEach(async () => {
      element.element = substation;
      await element.updateComplete;

      wizardEvent = sinon.spy();
      window.addEventListener('wizard', wizardEvent);
    });

    it('render add icon and add menu', async () => {
      expect(element.addMenu).to.exist;
      expect(element.addIcon).to.exist;
    });

    it('opens menu on add icon click', async () => {
      expect(element.addMenu.open).to.be.false;
      element.addIcon?.click();
      await element.requestUpdate();
      expect(element.addMenu.open).to.be.true;
    });

    it('renders only children with existing create wizard', () => {
      expect(element.addMenu.querySelectorAll('mwc-list-item').length).to.equal(
        2
      );
    });

    it('does trigger wizard action with valid existing wizard', async () => {
      element.addMenu.querySelector('mwc-list-item')?.click();
      expect(wizardEvent).to.have.been.called;
    });
  });
});
