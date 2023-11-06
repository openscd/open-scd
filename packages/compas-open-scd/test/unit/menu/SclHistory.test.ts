import { expect, fixture, html } from '@open-wc/testing';
import SclHistoryPlugin from '../../../src/menu/SclHistory.js';
describe('testing sclHistory dialog', () => {
  if (customElements.get('scl-history') === undefined)
    customElements.define('scl-history', SclHistoryPlugin);
  let plugin: SclHistoryPlugin;
  let doc: XMLDocument;

  describe('with a document loaded containing SCL history items', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/history.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      plugin = await fixture(html` <scl-history .doc=${doc}></scl-history> `);
      plugin.run();
      await plugin.requestUpdate();
    });

    it('looks like its latest snapshot', async () => {
      await expect(plugin.historyLog).to.equalSnapshot();
    });

    it('has 7 items in the history list', () => {
      expect(plugin.sclHistory.length).to.be.equal(7);
    });

    describe('testing createMessage function', () => {
      it('creates a message with two valid strings', () => {
        expect(plugin['createMessage']('string who', 'string why')).to.be.equal(
          'string who : string why'
        );
      });

      it('creates a message with one valid string or returns undefined', () => {
        expect(plugin['createMessage']('string who', null)).to.be.equal(
          'string who'
        );
        expect(plugin['createMessage'](null, 'string why')).to.be.equal(
          'string why'
        );
        expect(plugin['createMessage'](null, null)).to.be.undefined;
      });
    });
  });

  describe('with no document', () => {
    beforeEach(async () => {
      plugin = await fixture(html` <scl-history></scl-history> `);
      plugin.run();
      await plugin.requestUpdate();
    });
    it('looks like its latest snapshot', async () => {
      await expect(plugin.historyLog).to.equalSnapshot();
    });
    it('has no items in the history list', () => {
      expect(plugin.sclHistory).to.be.empty;
    });
  });

  describe('with a document without SCL history items', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/no-history.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      plugin = await fixture(html` <scl-history .doc=${doc}></scl-history> `);
      plugin.run();
      await plugin.requestUpdate();
    });
    it('looks like its latest snapshot', async () => {
      await expect(plugin.historyLog).to.equalSnapshot();
    });
    it('has no items in the history list', () => {
      expect(plugin.sclHistory).to.be.empty;
    });
  });
});
