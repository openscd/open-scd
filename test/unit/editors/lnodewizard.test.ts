import fc from 'fast-check';
import { hasLNode } from '../../../src/editors/substation/lnodewizard.js';
import { restrictions, regexString } from '../../foundation.js';
import { expect } from '@open-wc/testing';

describe('lnodewizard', () => {
  describe('defines a hasLNode function that', () => {
    // value is the representation of the logical node in a IED. Therefore iedName, ldInst, lnClass and inst
    // musst be non empty normalizedString
    // FIXIT: for specification purpose value need to be refactored as connection to
    // LNodeType shall be possible as well. Here iedName shall be "None" and lnClass musst be a non-empty string.
    // prefix, inst as well as ldInst can be null

    let root: Element;
    beforeEach(() => {
      root = new DOMParser().parseFromString(
        `<SCL><Substation><VoltageLevel><Bay>
        </Bay></VoltageLevel></Substation></SCL>`,
        'application/xml'
      ).documentElement;
    });

    it('gets a valid selector', () => {
      fc.assert(
        fc.property(
          regexString(restrictions.tIEDName, 1, 64),
          regexString(restrictions.tLDInst, 1, 64),
          fc.option(regexString(restrictions.tPrefix, 0, 11)),
          regexString(restrictions.tLNClass, 4, 4),
          regexString(restrictions.tLNInst, 0, 12),
          (iedName, ldInst, prefix, lnClass, lnInst) => {
            expect(
              hasLNode(root.querySelector('Bay')!, {
                iedName: iedName,
                ldInst: ldInst,
                prefix: prefix,
                lnClass: lnClass,
                inst: lnInst,
              })
            ).to.not.throw;
          }
        )
      );
    });

    it('returns true on existing LNode references in the parent element', () => {
      fc.assert(
        fc.property(
          regexString(restrictions.tIEDName, 1, 64),
          regexString(restrictions.tLDInst, 1, 64),
          fc.option(regexString(restrictions.tPrefix, 0, 11)),
          regexString(restrictions.tLNClass, 4, 4),
          regexString(restrictions.tLNInst, 0, 12),
          (iedName, ldInst, prefix, lnClass, lnInst) => {
            const element: Element = new DOMParser().parseFromString(
              `<LNode iedName="${iedName}" ldInst="${ldInst}" ${
                prefix === null ? '' : `prefix="${prefix}"`
              } lnClass="${lnClass}" lnInst="${lnInst}"></LNode>`,
              'application/xml'
            ).documentElement;
            root.querySelector('Bay')!.appendChild(element);
            expect(
              hasLNode(root.querySelector('Bay')!, {
                iedName: iedName,
                ldInst: ldInst,
                prefix: prefix,
                lnClass: lnClass,
                inst: lnInst,
              })
            ).to.be.true;
          }
        )
      );
    });

    it('does not give false positive with missing or empty prefix in LN/LN0', () => {
      fc.assert(
        fc.property(
          fc.option(regexString(restrictions.tPrefix, 0, 11)),
          prefix => {
            const element: Element = new DOMParser().parseFromString(
              `<LNode iedName="iedName" ldInst="ldInst" prefix="prefix" lnClass="CSWI" lnInst="2"></LNode>`,
              'application/xml'
            ).documentElement;
            root.querySelector('Bay')!.appendChild(element);
            expect(
              hasLNode(root.querySelector('Bay')!, {
                iedName: 'iedName',
                ldInst: 'ldInst',
                prefix: prefix,
                lnClass: 'CSWI',
                inst: '2',
              })
            ).to.be.false;
          }
        )
      );
    });

    it('correctly connects LNode with missing prefix to LN/LN0 with empty or missing prefix', () => {
      const element: Element = new DOMParser().parseFromString(
        `<LNode iedName="iedName" ldInst="ldInst" lnClass="CSWI" lnInst="2"></LNode>`,
        'application/xml'
      ).documentElement;
      root.querySelector('Bay')!.appendChild(element);
      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: null,
          lnClass: 'CSWI',
          inst: '2',
        })
      ).to.be.true;

      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: '',
          lnClass: 'CSWI',
          inst: '2',
        })
      ).to.be.true;
    });

    it('correctly connects LNode with empty prefix to LN/LN0 with empty or missing prefix', () => {
      const element: Element = new DOMParser().parseFromString(
        `<LNode iedName="iedName" ldInst="ldInst" prefix="" lnClass="CSWI" lnInst="2"></LNode>`,
        'application/xml'
      ).documentElement;
      root.querySelector('Bay')!.appendChild(element);
      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: null,
          lnClass: 'CSWI',
          inst: '2',
        })
      ).to.be.true;

      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: '',
          lnClass: 'CSWI',
          inst: '2',
        })
      ).to.be.true;
    });

    it('does not give false positive with missing or empty inst in LN0', () => {
      fc.assert(
        fc.property(
          fc.option(regexString(restrictions.tLNInst, 0, 11)),
          lnInst => {
            const element: Element = new DOMParser().parseFromString(
              `<LNode iedName="iedName" ldInst="ldInst" prefix="prefix" lnClass="CSWI" lnInst="465364263183364"></LNode>`,
              'application/xml'
            ).documentElement;
            root.querySelector('Bay')!.appendChild(element);
            expect(
              hasLNode(root.querySelector('Bay')!, {
                iedName: 'iedName',
                ldInst: 'ldInst',
                prefix: 'prefix',
                lnClass: 'CSWI',
                inst: lnInst,
              })
            ).to.be.false;
          }
        )
      );
    });

    it('correctly connects LNode with missing lnInst to LN/LN0 with empty or missing inst', () => {
      const element: Element = new DOMParser().parseFromString(
        `<LNode iedName="iedName" ldInst="ldInst" prefix="prefix" lnClass="LLN0"></LNode>`,
        'application/xml'
      ).documentElement;
      root.querySelector('Bay')!.appendChild(element);
      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: 'prefix',
          lnClass: 'LLN0',
          inst: null,
        })
      ).to.be.true;

      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: 'prefix',
          lnClass: 'LLN0',
          inst: '',
        })
      ).to.be.true;
    });

    it('correctly connects LNode with empty lnInst to LN/LN0 with empty or missing inst', () => {
      const element: Element = new DOMParser().parseFromString(
        `<LNode iedName="iedName" ldInst="ldInst" prefix="prefix" lnClass="LLN0" lnInst=""></LNode>`,
        'application/xml'
      ).documentElement;
      root.querySelector('Bay')!.appendChild(element);
      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: 'prefix',
          lnClass: 'LLN0',
          inst: null,
        })
      ).to.be.true;

      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: 'prefix',
          lnClass: 'LLN0',
          inst: '',
        })
      ).to.be.true;
    });

    it('correctly connects LNode with empty lnInst and missing prefix to LN/LN0 with empty or missing inst and empty or missing prefix', () => {
      const element: Element = new DOMParser().parseFromString(
        `<LNode iedName="iedName" ldInst="ldInst" lnClass="LLN0" lnInst=""></LNode>`,
        'application/xml'
      ).documentElement;
      root.querySelector('Bay')!.appendChild(element);
      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: '',
          lnClass: 'LLN0',
          inst: null,
        })
      ).to.be.true;

      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: null,
          lnClass: 'LLN0',
          inst: '',
        })
      ).to.be.true;
    });

    it('correctly connects LNode with missing lnInst and empty prefix to LN/LN0 with empty or missing inst and empty or missing prefix', () => {
      const element: Element = new DOMParser().parseFromString(
        `<LNode iedName="iedName" ldInst="ldInst" prefix="" lnClass="LLN0"></LNode>`,
        'application/xml'
      ).documentElement;
      root.querySelector('Bay')!.appendChild(element);
      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: '',
          lnClass: 'LLN0',
          inst: null,
        })
      ).to.be.true;

      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: null,
          lnClass: 'LLN0',
          inst: '',
        })
      ).to.be.true;
    });

    it('correctly connects LNode with empty lnInst and empty prefix to LN/LN0 with empty or missing inst and empty or missing prefix', () => {
      const element: Element = new DOMParser().parseFromString(
        `<LNode iedName="iedName" ldInst="ldInst" prefix="" lnClass="LLN0" lnInst=""></LNode>`,
        'application/xml'
      ).documentElement;
      root.querySelector('Bay')!.appendChild(element);
      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: '',
          lnClass: 'LLN0',
          inst: null,
        })
      ).to.be.true;

      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: null,
          lnClass: 'LLN0',
          inst: '',
        })
      ).to.be.true;
    });

    it('correctly connects LNode with missing lnInst and missing prefix to LN/LN0 with empty or missing inst and empty or missing prefix', () => {
      const element: Element = new DOMParser().parseFromString(
        `<LNode iedName="iedName" ldInst="ldInst" lnClass="LLN0"></LNode>`,
        'application/xml'
      ).documentElement;
      root.querySelector('Bay')!.appendChild(element);
      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: '',
          lnClass: 'LLN0',
          inst: null,
        })
      ).to.be.true;

      expect(
        hasLNode(root.querySelector('Bay')!, {
          iedName: 'iedName',
          ldInst: 'ldInst',
          prefix: null,
          lnClass: 'LLN0',
          inst: '',
        })
      ).to.be.true;
    });
  });

  describe('defines a existLNode function that', () => {
    // value is the representation of the logical node in a IED. Therefore iedName, ldInst, lnClass and inst
    // musst be non empty normalizedString
    // FIXIT: for specification purpose value need to be refactored as connection to
    // LNodeType shall be possible as well. Here iedName shall be "None" and lnClass musst be a non-empty string.
    // prefix, inst as well as ldInst can be null

    let root: Element;
    beforeEach(() => {
      root = new DOMParser().parseFromString(
        `<SCL><Substation><VoltageLevel><Bay>
        </Bay><VoltageLevel></Substation></SCL>`,
        'application/xml'
      ).documentElement;
    });

    it('returns true on existing LNode references in the substation element', () => {
      fc.assert(
        fc.property(
          regexString(restrictions.tIEDName, 1, 64),
          regexString(restrictions.tLDInst, 1, 64),
          fc.option(regexString(restrictions.tPrefix, 0, 11)),
          regexString(restrictions.tLNClass, 4, 4),
          regexString(restrictions.tLNInst, 0, 12),
          (iedName, ldInst, prefix, lnClass, lnInst) => {
            const element: Element = new DOMParser().parseFromString(
              `<LNode iedName="${iedName}" ldInst="${ldInst}" ${
                prefix === null ? '' : `prefix="${prefix}"`
              } lnClass="${lnClass}" lnInst="${lnInst}"></LNode>`,
              'application/xml'
            ).documentElement;
            root.querySelector('Substation')!.appendChild(element);
            expect(
              hasLNode(root.ownerDocument, {
                iedName: iedName,
                ldInst: ldInst,
                prefix: prefix,
                lnClass: lnClass,
                inst: lnInst,
              })
            ).to.be.true;
          }
        )
      );
    });
  });
});
