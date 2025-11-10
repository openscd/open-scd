import { expect } from '@open-wc/testing';

import {
  canCreateValidExtRef,
  createExtRefElement,
  getExistingSupervision,
  getExtRef,
  getFirstSubscribedExtRef,
  instantiatedSupervisionsCount,
  updateExtRefElement,
} from '../../../../src/editors/subscription/foundation.js';

import { identity } from '@openscd/open-scd/src/foundation.js';

describe('foundation', () => {
  let doc: XMLDocument;

  describe('when using SCL Edition 2003 (1)', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV2003.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('when creating a ExtRef Element for a Sampled Value Control then correct attributes are filled', () => {
      const controlElement = doc.querySelector(
        'IED[name="SMV_Publisher"] SampledValueControl[name="voltageOnly"]'
      );
      const fcdaElement = doc.querySelector(
        'IED[name="SMV_Publisher"] DataSet[name="voltageOnlysDataSet"] ' +
          '> FCDA[ldInst="VoltageTransformer"][prefix="L3"][lnClass="TVTR"][lnInst="1"][doName="VolSv"][daName="q"][fc="MX"]'
      );

      const newExtRefElement = createExtRefElement(
        controlElement!,
        fcdaElement!
      );

      expect(newExtRefElement).to.be.not.null;
      expect(newExtRefElement).to.have.attribute('iedName', 'SMV_Publisher');
      expect(newExtRefElement).to.not.have.attribute('serviceType');
      expect(newExtRefElement).to.have.attribute(
        'ldInst',
        'VoltageTransformer'
      );
      expect(newExtRefElement).to.have.attribute('lnClass', 'TVTR');
      expect(newExtRefElement).to.have.attribute('lnInst', '1');
      expect(newExtRefElement).to.have.attribute('prefix', 'L3');
      expect(newExtRefElement).to.have.attribute('doName', 'VolSv');
      expect(newExtRefElement).to.have.attribute('daName', 'q');
      expect(newExtRefElement).to.not.have.attribute('srcLDInst');
      expect(newExtRefElement).to.not.have.attribute('srcPrefix');
      expect(newExtRefElement).to.not.have.attribute('srcLNClass');
      expect(newExtRefElement).to.not.have.attribute('srcLNInst');
      expect(newExtRefElement).to.not.have.attribute('srcCBName');
    });

    it('when update a ExtRef Element for a Sampled Value Control then correct attributes are copied', () => {
      const extRefElement = doc.querySelector(
        'IED[name="SMV_Subscriber"] ExtRef[intAddr="VolSv;TVTR3/VolSv/q"]'
      );
      const controlElement = doc.querySelector(
        'IED[name="SMV_Publisher"] SampledValueControl[name="voltageOnly"]'
      );
      const fcdaElement = doc.querySelector(
        'IED[name="SMV_Publisher"] DataSet[name="voltageOnlysDataSet"] ' +
          '> FCDA[ldInst="VoltageTransformer"][prefix="L3"][lnClass="TVTR"][lnInst="1"][doName="VolSv"][daName="q"][fc="MX"]'
      );

      const clonedExtRefElement = updateExtRefElement(
        extRefElement!,
        controlElement!,
        fcdaElement!
      );

      expect(clonedExtRefElement).to.be.not.equal(extRefElement);
      expect(clonedExtRefElement).to.have.attribute('iedName', 'SMV_Publisher');
      expect(clonedExtRefElement).to.not.have.attribute('serviceType');
      expect(clonedExtRefElement).to.have.attribute(
        'ldInst',
        'VoltageTransformer'
      );
      expect(clonedExtRefElement).to.have.attribute('lnClass', 'TVTR');
      expect(clonedExtRefElement).to.have.attribute('lnInst', '1');
      expect(clonedExtRefElement).to.have.attribute('prefix', 'L3');
      expect(clonedExtRefElement).to.have.attribute('doName', 'VolSv');
      expect(clonedExtRefElement).to.have.attribute('daName', 'q');
      expect(clonedExtRefElement).to.not.have.attribute('srcLDInst');
      expect(clonedExtRefElement).to.not.have.attribute('srcPrefix');
      expect(clonedExtRefElement).to.not.have.attribute('srcLNClass');
      expect(clonedExtRefElement).to.not.have.attribute('srcLNInst');
      expect(clonedExtRefElement).to.not.have.attribute('srcCBName');
    });
  });

  describe('when using SCL Edition 2007B4 (2.1)', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('when creating a ExtRef Element for a Sampled Value Control then correct attributes are filled', () => {
      const controlElement = doc.querySelector(
        'IED[name="SMV_Publisher"] SampledValueControl[name="voltageOnly"]'
      );
      const fcdaElement = doc.querySelector(
        'IED[name="SMV_Publisher"] DataSet[name="voltageOnlysDataSet"] ' +
          '> FCDA[ldInst="VoltageTransformer"][prefix="L3"][lnClass="TVTR"][lnInst="1"][doName="VolSv"][daName="q"][fc="MX"]'
      );

      const newExtRefElement = createExtRefElement(
        controlElement!,
        fcdaElement!
      );

      expect(newExtRefElement).to.be.not.null;
      expect(newExtRefElement).to.have.attribute('iedName', 'SMV_Publisher');
      expect(newExtRefElement).to.have.attribute('serviceType', 'SMV');
      expect(newExtRefElement).to.have.attribute(
        'ldInst',
        'VoltageTransformer'
      );
      expect(newExtRefElement).to.have.attribute('lnClass', 'TVTR');
      expect(newExtRefElement).to.have.attribute('lnInst', '1');
      expect(newExtRefElement).to.have.attribute('prefix', 'L3');
      expect(newExtRefElement).to.have.attribute('doName', 'VolSv');
      expect(newExtRefElement).to.have.attribute('daName', 'q');
      expect(newExtRefElement).to.have.attribute(
        'srcLDInst',
        'CurrentTransformer'
      );
      expect(newExtRefElement).to.have.attribute('srcPrefix', '');
      expect(newExtRefElement).to.have.attribute('srcLNClass', 'LLN0');
      expect(newExtRefElement).to.not.have.attribute('srcLNInst');
      expect(newExtRefElement).to.have.attribute('srcCBName', 'voltageOnly');
    });

    it('when update a ExtRef Element for a Sampled Value Control then correct attributes are copied', () => {
      const extRefElement = doc.querySelector(
        'IED[name="SMV_Subscriber"] ExtRef[intAddr="VolSv;TVTR3/VolSv/q"]'
      );
      const controlElement = doc.querySelector(
        'IED[name="SMV_Publisher"] SampledValueControl[name="voltageOnly"]'
      );
      const fcdaElement = doc.querySelector(
        'IED[name="SMV_Publisher"] DataSet[name="voltageOnlysDataSet"] ' +
          '> FCDA[ldInst="VoltageTransformer"][prefix="L3"][lnClass="TVTR"][lnInst="1"][doName="VolSv"][daName="q"][fc="MX"]'
      );

      const clonedExtRefElement = updateExtRefElement(
        extRefElement!,
        controlElement!,
        fcdaElement!
      );

      expect(clonedExtRefElement).to.be.not.equal(extRefElement);
      expect(clonedExtRefElement).to.have.attribute('iedName', 'SMV_Publisher');
      expect(clonedExtRefElement).to.have.attribute('serviceType', 'SMV');
      expect(clonedExtRefElement).to.have.attribute(
        'ldInst',
        'VoltageTransformer'
      );
      expect(clonedExtRefElement).to.have.attribute('lnClass', 'TVTR');
      expect(clonedExtRefElement).to.have.attribute('lnInst', '1');
      expect(clonedExtRefElement).to.have.attribute('prefix', 'L3');
      expect(clonedExtRefElement).to.have.attribute('doName', 'VolSv');
      expect(clonedExtRefElement).to.have.attribute('daName', 'q');
      expect(clonedExtRefElement).to.have.attribute(
        'srcLDInst',
        'CurrentTransformer'
      );
      expect(clonedExtRefElement).to.have.attribute('srcPrefix', '');
      expect(clonedExtRefElement).to.have.attribute('srcLNClass', 'LLN0');
      expect(clonedExtRefElement).to.not.have.attribute('srcLNInst');
      expect(clonedExtRefElement).to.have.attribute('srcCBName', 'voltageOnly');
    });
  });

  describe('when using SCL Edition 2007B4 with message binding and Sampled Values', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/MessageBindingSMV2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('correctly locates the first ExtRef associated with a message', () => {
      const publishedControlBlock = doc.querySelector(
        'IED[name="IED3"] SampledValueControl[name="MSVCB01"]'
      );
      const subscribingIed = doc.querySelector('IED[name="IED1"]');

      const firstExtRef = getFirstSubscribedExtRef(
        publishedControlBlock!,
        subscribingIed!
      );

      expect(identity(firstExtRef)).to.be.equal(
        'IED1>>CircuitBreaker_CB1>SMV:MSVCB01 MU01/ LLN0  IED3 MU01/I01A TCTR 1 Amp instMag.i'
      );
    });

    it('correctly identifies an LSVS supervision element', () => {
      const publishedControlBlock = doc.querySelector(
        'IED[name="IED3"] SampledValueControl[name="MSVCB01"]'
      );
      const subscribingIed = doc.querySelector('IED[name="IED1"]');
      const firstExtRef = getFirstSubscribedExtRef(
        publishedControlBlock!,
        subscribingIed!
      );
      const supLN = getExistingSupervision(firstExtRef);
      expect(identity(supLN)).to.be.equal('IED1>>Disconnectors> LSVS 1');
    });
  });

  describe('when using SCL Edition 2007B4 with later binding, SV and LSVS', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingSMV-LSVS.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('correctly identifies the existing number of supervision instances', () => {
      const controlBlock = doc.querySelector(
        'IED[name="SMV_Publisher4"] SampledValueControl[name="voltageOnly"]'
      )!;
      const subscriberIED = doc.querySelector('IED[name="SMV_Subscriber2"]')!;
      const count = instantiatedSupervisionsCount(subscriberIED, controlBlock);
      expect(count).to.equal(1);
    });
  });

  describe('when using SCL Edition 2007B4 with message binding and GOOSE', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/MessageBindingGOOSE2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('correctly locates the first ExtRef associated with a message', () => {
      const publishedControlBlock = doc.querySelector(
        'IED[name="IED2"] GSEControl[name="GCB"]'
      );
      const subscribingIed = doc.querySelector('IED[name="IED1"]');

      const firstExtRef = getFirstSubscribedExtRef(
        publishedControlBlock!,
        subscribingIed!
      );

      expect(identity(firstExtRef)).to.be.equal(
        'IED1>>Disconnectors>DC CSWI 1>GOOSE:GCB CBSW/ LLN0  IED2 CBSW/ XSWI 2 Pos stVal'
      );
    });

    it('correctly identifies an LGOS supervision element', () => {
      const publishedControlBlock = doc.querySelector(
        'IED[name="IED2"] GSEControl[name="GCB"]'
      );
      const subscribingIed = doc.querySelector('IED[name="IED1"]');

      const firstExtRef = getFirstSubscribedExtRef(
        publishedControlBlock!,
        subscribingIed!
      );

      const supLN = getExistingSupervision(firstExtRef);
      expect(identity(supLN)).to.be.equal('IED1>>CircuitBreaker_CB1> LGOS 1');
    });
  });

  describe('when using SCL Edition 2007B4 with later binding, GOOSE and LGOS', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('correctly identifies the existing number of supervision instances', () => {
      const controlBlock = doc.querySelector(
        'IED[name="GOOSE_Publisher2"] GSEControl[name="GOOSE1"]'
      )!;

      const subscriberIED = doc.querySelector('IED[name="GOOSE_Subscriber3"]')!;
      const count = instantiatedSupervisionsCount(subscriberIED, controlBlock);
      expect(count).to.equal(0);
    });
  });

  describe('use default value for ExtRef without srcLNClass attribute', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/ExtRefWithoutSrcLNClass.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('should correctly fetch ExtRef with srcLNClass attribute', () => {
      const inputs = doc.querySelector(
        'LDevice[inst="Earth_Switch"] LN0 Inputs'
      )!;
      const fcda = doc.querySelector(
        'FCDA[ldInst="QB2_Disconnector"][doName="Pos"][daName="stVal"]'
      )!;
      const controlBlock = doc.querySelector(
        'IED[name="Publisher"] GSEControl[name="GOOSE2"]'
      )!;

      const expectedExtRef = doc.querySelector(
        'ExtRef[iedName="Publisher"][ldInst="QB2_Disconnector"][doName="Pos"][daName="stVal"][srcLNClass="LLN0"]'
      )!;

      const extRef = getExtRef(inputs, fcda, controlBlock);

      expect(extRef).to.equal(expectedExtRef)
    });

    it('should correctly fetch ExtRef without srcLNClass attribute', () => {
      const inputs = doc.querySelector(
        'LDevice[inst="Earth_Switch"] LN0 Inputs'
      )!;
      const fcda = doc.querySelector(
        'FCDA[ldInst="QB2_Disconnector"][doName="Pos"][daName="q"]'
      )!;
      const controlBlock = doc.querySelector(
        'IED[name="Publisher"] GSEControl[name="GOOSE2"]'
      )!;

      const expectedExtRef = doc.querySelector(
        'ExtRef[iedName="Publisher"][ldInst="QB2_Disconnector"][doName="Pos"][daName="q"]'
      )!;

      const extRef = getExtRef(inputs, fcda, controlBlock);

      expect(extRef).to.equal(expectedExtRef)
    });
  });

  describe('regression test for bugfix 1711', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/bugfix1711-can-create-extref.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('should return true for canCreateValidExtRef on FCDA without lnInst for LN0', () => {
      const fcda = doc.querySelector('FCDA')!;
      const controlBlock = doc.querySelector('IED[name="IED1"] GSEControl[name="gseControl"]')!;

      const canCreateExtRef = canCreateValidExtRef(fcda, controlBlock);

      expect(canCreateExtRef).to.be.true;
    });
  });
});
