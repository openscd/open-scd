import { expect, fixture, html } from '@open-wc/testing';
import sinon, { SinonSpy } from 'sinon';

import '../../src/editor-container.js';
import { EditorContainer } from '../../src/editor-container.js';
import { BayEditor } from '../../src/zeroline/bay-editor.js';

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

  it('renders the header as <h1> per default', () => {
    expect(element.shadowRoot?.querySelector('h1')).to.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h5')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h6')).to.not.exist;
  });

  it('renders the header as <h1> with level 1', async () => {
    element.level = 1;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h1')).to.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h5')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h6')).to.not.exist;
  });

  it('renders the header as <h2> with level 2', async () => {
    element.level = 2;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h2')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h5')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h6')).to.not.exist;
  });

  it('renders the header as <h3> with level 3', async () => {
    element.level = 3;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h3')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h5')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h6')).to.not.exist;
  });

  it('renders the header as <h4> with level 4', async () => {
    element.level = 4;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h4')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h5')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h6')).to.not.exist;
  });

  it('renders the header as <h5> with level 5', async () => {
    element.level = 5;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h5')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h6')).to.not.exist;
  });

  it('renders the header as <h6> with level 6', async () => {
    element.level = 6;
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h6')).to.exist;
    expect(element.shadowRoot?.querySelector('h1')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h2')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h3')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h4')).to.not.exist;
    expect(element.shadowRoot?.querySelector('h5')).to.not.exist;
  });

  it('does not render header text with missing element and header text', () => {
    expect(element.defaultHeader).to.equal('');
  });

  it('header property overwrites default header text', async () => {
    element.element = substation;
    element.requestUpdate();
    expect(
      element.headerContainer.querySelector('h1')?.innerText.trim()
    ).to.equal('test header');
  });

  it('renders default header text with missing header property', async () => {
    element.header = '';
    element.element = substation;
    await element.requestUpdate();
    expect(
      element.headerContainer.querySelector('h1')?.innerText.trim()
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
        3
      );
    });

    it('does trigger wizard action with valid existing wizard', async () => {
      element.addMenu.querySelector('mwc-list-item')?.click();
      expect(wizardEvent).to.have.been.called;
    });
  });

  describe('with existing parent editor-container', () => {
    let parent: EditorContainer;
    const bay = <Element>(
      new DOMParser().parseFromString(
        `<Bay name="name" desc="desc"></Bay>`,
        'application/xml'
      ).documentElement
    );
    beforeEach(async () => {
      parent = await fixture(
        `<editor-container header="parent header"><bay-editor .element=${bay} slot="container"></bay-editor></editor-container>`
      );

      element = parent
        .querySelector('bay-editor')!
        .shadowRoot!.querySelector<EditorContainer>('editor-container')!;
      await element.updateComplete;
    });

    it('negated the default contrasted property of the parent', () => {
      expect(element.contrasted).to.be.true;
    });

    it('only negates on first update', async () => {
      parent.contrasted = true;
      await parent.requestUpdate();

      expect(element.contrasted).to.be.true;
    });

    it('increments the default level property of the parent', () => {
      expect(element.level).to.equal(2);
    });

    it('only increments on first update', async () => {
      parent.level = 3;
      await parent.requestUpdate();

      expect(element.level).to.equal(2);
    });

    it('negated the set contrasted property of the parent', async () => {
      parent = await fixture(
        `<editor-container contrasted header="parent header"><bay-editor .element=${bay} slot="container"></bay-editor></editor-container>`
      );

      element = parent
        .querySelector('bay-editor')!
        .shadowRoot!.querySelector<EditorContainer>('editor-container')!;
      await element.updateComplete;

      expect(element.contrasted).to.be.false;
    });

    it('makes sure maximum level is 6', async () => {
      parent = await fixture(
        `<editor-container level="6" header="parent header"><bay-editor .element=${bay} slot="container"></bay-editor></editor-container>`
      );

      element = parent
        .querySelector('bay-editor')!
        .shadowRoot!.querySelector<EditorContainer>('editor-container')!;
      await element.updateComplete;

      expect(element.level).to.equal(6);
    });
  });
});
