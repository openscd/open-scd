import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/editors/substation/l-node-editor.js';
import { LNodeEditor } from '../../../../src/editors/substation/l-node-editor.js';

describe('web component rendering LNode element', () => {
  let element: LNodeEditor;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/zeroline/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('is an action-icon type component', () => {
    let lNode: Element;
    beforeEach(async () => {
      lNode = new DOMParser().parseFromString(
        '<LNode lnClass="USER" lnInst></LNode>',
        'application/xml'
      ).documentElement;

      element = <LNodeEditor>(
        await fixture(html`<l-node-editor .element=${lNode}></l-node-editor>`)
      );
    });

    it('having a default icon for invalid lnClass groups', () => {
      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H11V15H15V17H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Lxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Lxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H11V15H15V17H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Axxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Axxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M11,7H13A2,2 0 0,1 15,9V17H13V13H11V17H9V9A2,2 0 0,1 11,7M11,9V11H13V9H11M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z'
      );
    });

    it('with specific icon for Cxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Cxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M11,7H13A2,2 0 0,1 15,9V10H13V9H11V15H13V14H15V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Fxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Fxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H15V9H11V11H14V13H11V17H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Gxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Gxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M11,7H15V9H11V15H13V11H15V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Ixxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Ixxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M14,7V9H13V15H14V17H10V15H11V9H10V7H14M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Kxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Kxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H11V10.33L13,7H15L12,12L15,17H13L11,13.67V17H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Mxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Mxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H15A2,2 0 0,1 17,9V17H15V9H13V16H11V9H9V17H7V9A2,2 0 0,1 9,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Pxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Pxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H11V17H9V7M11,9V11H13V9H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Qxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Qxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,7H13A2,2 0 0,1 15,9V15A2,2 0 0,1 13,17V19H11V17A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M11,9V15H13V9H11Z'
      );
    });

    it('with specific icon for Rxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Rxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H13A2,2 0 0,1 15,9V11C15,11.84 14.5,12.55 13.76,12.85L15,17H13L11.8,13H11V17H9V7M11,9V11H13V9H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,16.41 7.58,20 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Sxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Sxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M11,7H15V9H11V11H13A2,2 0 0,1 15,13V15A2,2 0 0,1 13,17H9V15H13V13H11A2,2 0 0,1 9,11V9A2,2 0 0,1 11,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Txxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Txxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H15V9H13V17H11V9H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Xxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Xxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H11L12,9.5L13,7H15L13,12L15,17H13L12,14.5L11,17H9L11,12L9,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Yxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Yxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H11L12,10L13,7H15L13,13V17H11V13L9,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });

    it('with specific icon for Zxxx lnClass attribute', async () => {
      lNode.setAttribute('lnClass', 'Zxxx');
      element.element = lNode;
      await element.requestUpdate();

      expect(element.shadowRoot?.querySelector('path')).to.have.attribute(
        'd',
        'M9,7H15V9L11,15H15V17H9V15L13,9H9V7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z'
      );
    });
  });

  describe('as reference to a LN/LN0 within IED ', () => {
    beforeEach(async () => {
      element = <LNodeEditor>(
        await fixture(
          html`<l-node-editor
            .element=${doc.querySelector('LNode[ldInst="CircuitBreaker_CB1"]')}
          ></l-node-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('as instance of a LNodeType only', () => {
    beforeEach(async () => {
      element = <LNodeEditor>(
        await fixture(
          html`<l-node-editor
            .element=${doc.querySelector('LNode[iedName="None"]')}
          ></l-node-editor>`
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
