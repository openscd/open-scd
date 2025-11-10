import { expect, fixture, html } from '@open-wc/testing';
import { OscdTooltip } from '../../../src/components/tooltip';
import '../../../src/components/tooltip.js';

describe('oscd-tooltip', () => {
  let element: OscdTooltip;

  beforeEach(async () => {
    element = await fixture(
      html`<oscd-tooltip-4c6027dd></oscd-tooltip-4c6027dd>`
    );
  });

  it('should have default properties', () => {
    expect(element.text).to.equal('');
    expect(element.visible).to.be.false;
    expect(element.x).to.equal(0);
    expect(element.y).to.equal(0);
    expect(element.offset).to.equal(12);
  });

  it('should render with slotted content', async () => {
    element.text = 'Test tooltip';
    await element.updateComplete;
    expect(element.shadowRoot?.textContent).to.include('Test tooltip');
  });

  describe('show()', () => {
    it('should display tooltip with text and position', async () => {
      element.show('Show this text', 100, 200);
      await element.updateComplete;

      expect(element.text).to.equal('Show this text');
      expect(element.visible).to.be.true;
      expect(element.x).to.equal(112);
      expect(element.y).to.equal(212);
    });
  });

  describe('hide()', () => {
    it('should hide tooltip and clear text', async () => {
      element.show('Test text', 100, 100);
      await element.updateComplete;
      expect(element.visible).to.be.true;
      expect(element.text).to.equal('Test text');

      element.hide();
      await element.updateComplete;
      expect(element.visible).to.be.false;
      expect(element.text).to.equal('');
    });
  });

  describe('updatePosition()', () => {
    beforeEach(async () => {
      element.show('Test', 100, 100);
      await element.updateComplete;
    });

    it('should update x and y coordinates', () => {
      element.updatePosition(200, 300);
      expect(element.x).to.equal(212);
      expect(element.y).to.equal(312);
    });

    it('should schedule position update via requestAnimationFrame', done => {
      element.updatePosition(150, 250);

      setTimeout(() => {
        expect(element.style.transform).to.include('translate3d');
        done();
      }, 20);
    });

    it('should not schedule multiple frames if already pending', () => {
      element.updatePosition(100, 100);
      element.updatePosition(200, 200);
      expect(element['pendingFrame']).to.be.greaterThan(0);
    });
  });

  describe('viewport boundary handling', () => {
    it('should adjust position if tooltip would overflow right edge', done => {
      const nearRightEdge = window.innerWidth - 10;
      element.show('Long tooltip text that needs space', nearRightEdge, 100);

      setTimeout(() => {
        expect(element.style.transform).to.include('translate3d');
        done();
      }, 20);
    });

    it('should adjust position if tooltip would overflow bottom edge', done => {
      const nearBottom = window.innerHeight - 10;
      element.show('Tooltip near bottom', 100, nearBottom);

      setTimeout(() => {
        expect(element.style.transform).to.include('translate3d');
        done();
      }, 20);
    });
  });

  describe('custom offset', () => {
    it('should respect custom offset value', async () => {
      element.offset = 20;
      element.show('Test', 100, 100);
      await element.updateComplete;

      expect(element.x).to.equal(120);
      expect(element.y).to.equal(120);
    });
  });

  describe('visibility states', () => {
    it('should reflect visible attribute', async () => {
      element.visible = true;
      await element.updateComplete;
      expect(element.hasAttribute('visible')).to.be.true;

      element.visible = false;
      await element.updateComplete;
      expect(element.hasAttribute('visible')).to.be.false;
    });
  });
});
