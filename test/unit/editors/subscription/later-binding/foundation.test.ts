import { expect } from '@open-wc/testing';

import {
  isSubscribedTo,
  sameAttributeValue,
  sameAttributeValueDiffName,
} from '../../../../../src/editors/subscription/later-binding/foundation.js';

describe('smv-list', () => {
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('sameAttributeValue', () => {
    let fcda: Element;
    let extRef: Element;

    beforeEach(async () => {
      fcda = doc.querySelector(
        'IED[name="SMV_Publisher"] DataSet[name="currentOnlysDataSet"] FCDA[doName="AmpSv"][daName="instMag.i"]'
      )!;
      extRef = doc.querySelector(
        'IED[name="SMV_Subscriber"] LDevice[inst="Overvoltage"] ExtRef[doName="AmpSv"][daName="instMag.i"][srcCBName="currentOnly"]'
      )!;
    });

    it('when both element do not have the attribute then they will be the same', () => {
      const attributeName = 'doName';
      fcda.removeAttribute(attributeName);
      extRef.removeAttribute(attributeName);

      expect(sameAttributeValue(fcda, extRef, attributeName)).to.be.true;
    });

    it('when both element have empty values then they will be the same', () => {
      const attributeName = 'doName';
      fcda.setAttribute(attributeName, '');
      extRef.setAttribute(attributeName, '');

      expect(sameAttributeValue(fcda, extRef, attributeName)).to.be.true;
    });

    it('when both element have same value then they will be the same', () => {
      const attributeName = 'doName';

      expect(sameAttributeValue(fcda, extRef, attributeName)).to.be.true;
    });

    it('when element have different values then they will be not the same', () => {
      const attributeName = 'doName';
      extRef.setAttribute(attributeName, 'OtherValue');

      expect(sameAttributeValue(fcda, extRef, attributeName)).to.be.false;
    });
  });

  describe('sameAttributeValueDiffName', () => {
    let control: Element;
    let extRef: Element;

    beforeEach(async () => {
      control = doc.querySelector(
        'IED[name="SMV_Publisher"] SampledValueControl[name="currentOnly"]'
      )!;
      extRef = doc.querySelector(
        'IED[name="SMV_Subscriber"] LDevice[inst="Overvoltage"] ExtRef[doName="AmpSv"][daName="instMag.i"][srcCBName="currentOnly"]'
      )!;
    });

    it('when both element do not have the attribute then they will be the same', () => {
      const leftAttributeName = 'srcCBName';
      const rightAttributeName = 'name';
      control.removeAttribute(leftAttributeName);
      extRef.removeAttribute(rightAttributeName);

      expect(
        sameAttributeValueDiffName(
          extRef,
          leftAttributeName,
          control,
          rightAttributeName
        )
      ).to.be.true;
    });

    it('when both element have empty values then they will be the same', () => {
      const leftAttributeName = 'srcCBName';
      const rightAttributeName = 'name';
      extRef.setAttribute(leftAttributeName, '');
      control.setAttribute(rightAttributeName, '');

      expect(
        sameAttributeValueDiffName(
          extRef,
          leftAttributeName,
          control,
          rightAttributeName
        )
      ).to.be.true;
    });

    it('when both element have same value then they will be the same', () => {
      const leftAttributeName = 'srcCBName';
      const rightAttributeName = 'name';

      expect(
        sameAttributeValueDiffName(
          extRef,
          leftAttributeName,
          control,
          rightAttributeName
        )
      ).to.be.true;
    });

    it('when element have different values then they will be not the same', () => {
      const leftAttributeName = 'srcCBName';
      const rightAttributeName = 'name';
      extRef.setAttribute(leftAttributeName, 'OtherValue');

      expect(
        sameAttributeValueDiffName(
          extRef,
          leftAttributeName,
          control,
          rightAttributeName
        )
      ).to.be.false;
    });
  });

  describe('isSubscribedTo', () => {
    const type = 'SMV';
    let ied: Element;
    let control: Element;
    let fcda: Element;
    let extRef: Element;

    describe('(newer then 2003 schema)', () => {
      beforeEach(async () => {
        fcda = doc.querySelector(
          'IED[name="SMV_Publisher"] DataSet[name="currentOnlysDataSet"] FCDA[doName="AmpSv"][daName="instMag.i"]'
        )!;
        control = doc.querySelector(
          'IED[name="SMV_Publisher"] SampledValueControl[name="currentOnly"]'
        )!;
        ied = fcda.closest('IED')!;
        extRef = doc.querySelector(
          'IED[name="SMV_Subscriber"] LDevice[inst="Overvoltage"] ExtRef[doName="AmpSv"][daName="instMag.i"][srcCBName="currentOnly"]'
        )!;
      });

      it('when ExtRef and FDCA have same values then ExtRef is subscribed', () => {
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.true;
      });

      it('when ExtRef and FDCA have different IED then ExtRef is not subscribed', () => {
        ied.setAttribute('name', 'OtherName');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different ldInst Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('ldInst', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different prefix Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('prefix', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different lnClass Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('lnClass', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different lnInst Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('lnInst', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different doName Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('doName', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different daName Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('daName', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef has a different ServiceType Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('serviceType', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different srcLDInst Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('srcLDInst', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different scrPrefix Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('scrPrefix', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different srcLNClass Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('srcLNClass', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different srcLNInst Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('srcLNInst', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });

      it('when ExtRef and FDCA have different srcCBName Value then ExtRef is not subscribed', () => {
        extRef.setAttribute('srcCBName', 'OtherValue');
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.false;
      });
    });

    describe('(2003 schema)', () => {
      beforeEach(async () => {
        doc = await fetch('/test/testfiles/editors/LaterBindingSMV2003.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        fcda = doc.querySelector(
          'IED[name="SMV_Publisher"] DataSet[name="currentOnlysDataSet"] FCDA[doName="AmpSv"][daName="instMag.i"]'
        )!;
        control = doc.querySelector(
          'IED[name="SMV_Publisher"] SampledValueControl[name="currentOnly"]'
        )!;
        ied = fcda.closest('IED')!;
        extRef = doc.querySelector(
          'IED[name="SMV_Subscriber"] LDevice[inst="Overvoltage"] ExtRef[ldInst="CurrentTransformer"][doName="AmpSv"][daName="instMag.i"]'
        )!;
      });

      it('when ExtRef and FDCA have same values then ExtRef is subscribed', () => {
        expect(isSubscribedTo(type, ied, control, fcda, extRef)).to.be.true;
      });
    });
  });
});
