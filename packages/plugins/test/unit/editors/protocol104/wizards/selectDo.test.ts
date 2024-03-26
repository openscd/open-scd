import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import {
  getDataChildren,
  selectDoWizard,
} from '../../../../../src/editors/protocol104/wizards/selectDo.js';

describe('data model nodes child getter', () => {
  let doc: XMLDocument;
  let element: OscdWizards;

  describe('getDataChildren', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/104/valid-empty-addresses.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('returns empty array for invalid tag', () => {
      const parent = doc.querySelector('Substation')!;
      expect(getDataChildren(parent)).to.be.empty;
    });

    it('returns direct children for a SCL', () => {
      const parent = doc.querySelector('SCL')!;
      expect(getDataChildren(parent)).to.not.be.empty;
      expect(getDataChildren(parent).length).to.be.equal(3);
      expect(getDataChildren(parent)[0].tagName).to.be.equal('IED');
      expect(getDataChildren(parent)[1].tagName).to.be.equal('IED');
      expect(getDataChildren(parent)[2].tagName).to.be.equal('IED');
      expect(getDataChildren(parent)[0]).to.have.attribute('name', 'B1');
      expect(getDataChildren(parent)[1]).to.have.attribute('name', 'B2');
      expect(getDataChildren(parent)[2]).to.have.attribute('name', 'B3');
    });

    it('returns direct children for a IED', () => {
      const parent = doc.querySelector('IED[name="B1"]')!;
      expect(getDataChildren(parent)).to.not.be.empty;
      expect(getDataChildren(parent).length).to.be.equal(1);
      expect(getDataChildren(parent)[0].tagName).to.be.equal('AccessPoint');
      expect(getDataChildren(parent)[0]).to.have.attribute('name', 'AP1');
    });

    it('returns direct children for a AccessPoint', () => {
      const parent = doc.querySelector(
        'IED[name="B1"] > AccessPoint[name="AP1"]'
      )!;
      expect(getDataChildren(parent)).to.not.be.empty;
      expect(getDataChildren(parent).length).to.be.equal(1);
      expect(getDataChildren(parent)[0].tagName).to.be.equal('LDevice');
      expect(getDataChildren(parent)[0]).to.have.attribute('inst', 'LD0');
    });

    it('returns direct children for a LDevice', () => {
      const parent = doc.querySelector('IED[name="B1"] LDevice[inst="LD0"]')!;
      expect(getDataChildren(parent)).to.not.be.empty;
      expect(getDataChildren(parent).length).to.be.equal(10);
      expect(getDataChildren(parent)[0].tagName).to.be.equal('LN0');
      expect(getDataChildren(parent)[0]).to.have.attribute('lnClass', 'LLN0');
      expect(getDataChildren(parent)[1].tagName).to.be.equal('LN');
      expect(getDataChildren(parent)[1]).to.have.attribute('lnClass', 'GAPC');
    });

    it('returns referenced children for LN', () => {
      const parent = doc.querySelector(
        'IED[name="B1"] LDevice[inst="LD0"] > LN0[lnClass="LLN0"]'
      )!;
      expect(getDataChildren(parent)).to.not.be.empty;
      expect(getDataChildren(parent).length).to.equal(4);
      expect(getDataChildren(parent)[0].tagName).to.be.equal('DO');
      expect(getDataChildren(parent)[0]).to.have.attribute('name', 'Beh');
      expect(getDataChildren(parent)[1].tagName).to.be.equal('DO');
      expect(getDataChildren(parent)[1]).to.have.attribute('name', 'Health');
      expect(getDataChildren(parent)[2].tagName).to.be.equal('DO');
      expect(getDataChildren(parent)[2]).to.have.attribute('name', 'MltLev');
      expect(getDataChildren(parent)[3].tagName).to.be.equal('DO');
      expect(getDataChildren(parent)[3]).to.have.attribute('name', 'Mod');
    });
  });

  describe('show DO Picker', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oscd-wizards .host=${document}></oscd-wizards>`
      );

      const wizard = selectDoWizard(doc);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
