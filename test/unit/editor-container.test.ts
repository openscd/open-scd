import { expect, fixture, html } from '@open-wc/testing';
import sinon, { SinonSpy } from 'sinon';

import '../../src/editor-container.js';
import { EditorContainer } from '../../src/editor-container.js';

describe('editor-container', () => {
  let element: EditorContainer;
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

  it('does not render add icon and add menu with missing addOptions', () => {
    expect(element.addMenu).to.not.exist;
    expect(element.addIcon).to.not.exist;
  });

  describe('with existing addOptions', () => {
    beforeEach(async () => {
      element.childTags = ['Substation', 'Text'];
      await element.updateComplete;
    });
    it('render add icon and add menu with existing addOptions', async () => {
      expect(element.addMenu).to.exist;
      expect(element.addIcon).to.exist;
    });

    it('opens menu on add icon click', async () => {
      expect(element.addMenu.open).to.be.false;
      element.addIcon?.click();
      await element.requestUpdate();
      expect(element.addMenu.open).to.be.true;
    });
  });

  describe('with missing add action', () => {
    let wizardEvent: SinonSpy;
    beforeEach(async () => {
      element.childTags = ['Substation', 'Text'];
      await element.updateComplete;

      wizardEvent = sinon.spy();
      window.addEventListener('wizard', wizardEvent);
    });
    it('does not trigger wizard action', async () => {
      element.addMenu.querySelector('mwc-list-item')?.click();
      expect(wizardEvent).to.not.have.been.called;
    });
  });

  describe('with existing add action', () => {
    let wizardEvent: SinonSpy;
    beforeEach(async () => {
      element.childTags = ['Substation', 'Text'];
      element.getChildCreateWizard = () => {
        return [{ title: 'wizard' }];
      };
      await element.updateComplete;

      wizardEvent = sinon.spy();
      window.addEventListener('wizard', wizardEvent);
    });
    it('does trigger wizard action with valid existing wizard', async () => {
      element.addMenu.querySelector('mwc-list-item')?.click();
      expect(wizardEvent).to.have.been.called;
    });
    it('does not trigger wizard action with undefined wizard', async () => {
      element.getChildCreateWizard = () => {
        return undefined;
      };
      await element.updateComplete;
      element.addMenu.querySelector('mwc-list-item')?.click();
      expect(wizardEvent).to.not.have.been.called;
    });
  });
});
