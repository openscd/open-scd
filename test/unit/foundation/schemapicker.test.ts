import { expect } from '@open-wc/testing';

import { getAttributeDefinition } from '../../../src/foundation/schemapicker.js';
import { SchemaVersionNumber } from '../../../src/foundation/schemas.js';

const schema2007B4: SchemaVersionNumber = {
  version: '2007',
  revision: 'B',
  release: '4',
};

const schema2003: SchemaVersionNumber = {
  version: '',
  revision: '',
  release: '',
};

const schema2007B: SchemaVersionNumber = {
  version: '2007',
  revision: 'B',
  release: '',
};

describe('Schemapicker functions', () => {
  describe('define a function that retruns attribute definition from schema', () => {
    it('returns empty array for invalid tagName', () =>
      expect(getAttributeDefinition('nonsence', schema2007B4)).to.be.empty);

    describe('for element SampledValueControl', () => {
      describe('and version 2003', () => {
        const attributes = getAttributeDefinition(
          'SampledValueControl',
          schema2003
        );

        it('return the correct number of attributes ', () =>
          expect(attributes).to.have.length(8));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .base
          ).to.equal('xs:normalizedString'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .pattern
          ).to.be.undefined);

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .minLength
          ).to.equal('1'));

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .maxLength
          ).to.be.undefined);
      });

      describe('and version 2007B', () => {
        const attributes = getAttributeDefinition(
          'SampledValueControl',
          schema2007B
        );

        it('return the correct number of attributes ', () =>
          expect(attributes).to.have.length(10));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .base
          ).to.equal('xs:Name'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .pattern
          ).to.equal('[A-Za-z][0-9A-Za-z_]*'));

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .minLength
          ).to.be.undefined);

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .maxLength
          ).to.equal('32'));

        it('return enumerations values', () =>
          expect(
            attributes.find(attribute => attribute.name === 'securityEnable')
              ?.enumeration
          ).to.deep.equal(['None', 'Signature', 'SignatureAndEncryption']));
      });

      describe('and version 2007B4', () => {
        const attributes = getAttributeDefinition(
          'SampledValueControl',
          schema2007B4
        );

        it('return the correct number of attributes ', () =>
          expect(attributes).to.have.length(10));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .base
          ).to.equal('xs:Name'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .pattern
          ).to.equal('[A-Za-z][0-9A-Za-z_]*'));

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .minLength
          ).to.be.undefined);

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .maxLength
          ).to.equal('32'));
      });
    });

    describe('for element IED', () => {
      describe('and version 2003', () => {
        const attributes = getAttributeDefinition('IED', schema2003);

        it('return the correct number of attributes ', () =>
          expect(attributes).to.have.length(5));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .base
          ).to.equal('xs:normalizedString'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .pattern
          ).to.be.undefined);

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .minLength
          ).to.equal('1'));

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .maxLength
          ).to.be.undefined);
      });

      describe('and version 2007B', () => {
        const attributes = getAttributeDefinition('IED', schema2007B);

        it('return the correct number of attributes ', () =>
          expect(attributes).to.have.length(10));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .base
          ).to.equal('xs:Name'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .pattern
          ).to.equal('[A-Za-z][0-9A-Za-z_]*'));

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .minLength
          ).to.be.undefined);

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .maxLength
          ).to.equal('64'));
      });

      describe('and version 2007B$', () => {
        const attributes = getAttributeDefinition('IED', schema2007B4);

        it('return the correct number of attributes ', () =>
          expect(attributes).to.have.length(10));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .base
          ).to.equal('xs:Name'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .pattern
          ).to.equal(
            '[A-Za-z][0-9A-Za-z_]{0,2}' +
              '|[A-Za-z][0-9A-Za-z_]{4,63}' +
              '|[A-MO-Za-z][0-9A-Za-z_]{3}' +
              '|N[0-9A-Za-np-z_][0-9A-Za-z_]{2}' +
              '|No[0-9A-Za-mo-z_][0-9A-Za-z_]' +
              '|Non[0-9A-Za-df-z_]'
          ));

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .minLength
          ).to.be.undefined);

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'name')?.restriction
              .maxLength
          ).to.equal('64'));
      });
    });

    describe('for element LNode', () => {
      describe('and version 2003', () => {
        const attributes = getAttributeDefinition('LNode', schema2003);

        it('returns the correct number of attributes ', () =>
          expect(attributes).to.have.length(7));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'ldInst')
              ?.restriction.base
          ).to.equal('xs:normalizedString'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'ldInst')
              ?.restriction.pattern
          ).to.be.undefined);

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'ldInst')
              ?.restriction.minLength
          ).to.be.undefined);

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'ldInst')
              ?.restriction.maxLength
          ).to.be.undefined);
      });

      describe('and version 2007B', () => {
        const attributes = getAttributeDefinition('LNode', schema2007B);

        it('return the correct number of attributes ', () =>
          expect(attributes).to.have.length(7));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'ldInst')
              ?.restriction.base
          ).to.equal('xs:normalizedString'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'ldInst')
              ?.restriction.pattern
          ).to.equal('[A-Za-z0-9][0-9A-Za-z_]*'));

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'ldInst')
              ?.restriction.minLength
          ).to.be.undefined);

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'ldInst')
              ?.restriction.maxLength
          ).to.equal('64'));
      });

      describe('and version 2007B4', () => {
        const attributes = getAttributeDefinition('LNode', schema2007B4);

        it('return the correct number of attributes ', () =>
          expect(attributes).to.have.length(7));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'lnClass')
              ?.restriction.base
          ).to.equal('xs:Name'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'lnClass')
              ?.restriction.pattern
          ).to.equal(
            'L[A-Z]*|LLN0|LLN0|LPHD|LCCH|LGOS|LSVS|LTIM|LTMS|LTRK|A[A-Z]*' +
              '|ANCR|ARCO|ARIS|ATCC|AVCO|C[A-Z]*|CALH|CCGR|CILO|CPOW|CSWI|CSYN' +
              '|F[A-Z]*|FCNT|FCSD|FFIL|FLIM|FPID|FRMP|FSPT|FXOT|FXUT|G[A-Z]*' +
              '|GAPC|GGIO|GLOG|GSAL|I[A-Z]*|IARC|IHMI|ISAF|ITCI|ITMI|ITPC|K[A-Z]*' +
              '|KFAN|KFIL|KPMP|KTNK|KVLV|M[A-Z]*|MDIF|MENV|MFLK|MHAI|MHAN|MHYD|MMDC' +
              '|MMET|MMTN|MMTR|MMXN|MMXU|MSQI|MSTA|P[A-Z]*|PDIF|PDIR|PDIS|PDOP|PDUP' +
              '|PFRC|PHAR|PHIZ|PIOC|PMRI|PMSS|POPF|PPAM|PRTR|PSCH|PSDE|PTEF|PTHF' +
              '|PTOC|PTOF|PTOV|PTRC|PTTR|PTUC|PTUF|PTUV|PUPF|PVOC|PVPH|PZSU|Q[A-Z]*' +
              '|QFVR|QITR|QIUB|QVTR|QVUB|QVVR|R[A-Z]*|RADR|RBDR|RBRF|RDIR|RDRE|RDRS' +
              '|RFLO|RMXU|RPSB|RREC|RSYN|S[A-Z]*|SARC|SCBR|SIMG|SIML|SLTC|SOPM|SPDC' +
              '|SPTR|SSWI|STMP|SVBR|T[A-Z]*|TANG|TAXD|TCTR|TDST|TFLW|TFRQ|TGSN|THUM' +
              '|TLVL|TMGF|TMVM|TPOS|TPRS|TRTN|TSND|TTMP|TTNS|TVBR|TVTR|TWPH|X[A-Z]*' +
              '|XCBR|XSWI|Y[A-Z]*|YEFN|YLTC|YPSH|YPTR|Z[A-Z]*|ZAXN|ZBAT|ZBSH|ZCAB|ZCAP' +
              '|ZCON|ZGEN|ZGIL|ZLIN|ZMOT|ZREA|ZRES|ZRRC|ZSAR|ZSCR|ZSMC|ZTCF|ZTCR|[A-Z]+'
          ));

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'lnClass')
              ?.restriction.minLength
          ).to.equal('4'));

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'lnClass')
              ?.restriction.maxLength
          ).to.equal('4'));
      });
    });

    describe('for element PhysConn', () => {
      describe('and version 2007B4', () => {
        const attributes = getAttributeDefinition('PhysConn', schema2007B4);

        it('returns the correct number of attributes ', () =>
          expect(attributes).to.have.length(2));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'type')?.restriction
              .base
          ).to.equal('xs:normalizedString'));

        it('return an optional pattern', () =>
          expect(
            attributes.find(attribute => attribute.name === 'type')?.restriction
              .pattern
          ).to.equal('Connection|RedConn|[A-Z][0-9A-Za-z\\-]*'));

        it('return an optional minLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'type')?.restriction
              .minLength
          ).to.be.undefined);

        it('return an otional maxLength', () =>
          expect(
            attributes.find(attribute => attribute.name === 'type')?.restriction
              .maxLength
          ).to.be.undefined);

        it('return an enumeration', () =>
          expect(
            attributes.find(attribute => attribute.name === 'type')?.enumeration
          ).to.deep.equal(['Connection', 'RedConn']));
      });
    });
  });
});
