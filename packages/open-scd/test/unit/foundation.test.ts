import { expect, fixture, html } from '@open-wc/testing';

import {
  cloneElement,
  ComplexAction,
  depth,
  EditorAction,
  find,
  findControlBlocks,
  findFCDAs,
  getChildElementsByTagName,
  getNameAttribute,
  getReference,
  getSclSchemaVersion,
  getUniqueElementName,
  identity,
  ifImplemented,
  invert,
  isCreate,
  isDelete,
  isMove,
  isReplace,
  isSame,
  isSimple,
  newActionEvent,
  newLnInstGenerator,
  newPendingStateEvent,
  newWizardEvent,
  SCLTag,
  tags,
  minAvailableLogicalNodeInstance,
} from '../../src/foundation.js';

import { MockAction } from './mock-actions.js';

describe('foundation', () => {
  let scl1: Element;
  let scl2: Element;

  let substation: Element;
  let ied: Element;
  let communication: Element;
  let bay: Element;
  let privateSection: Element;
  let privateElement: Element;
  let publicElement: Element;

  beforeEach(async () => {
    scl1 = (
      await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    ).documentElement;
    scl2 = (
      await fetch('/test/testfiles/valid2003.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    ).documentElement;

    substation = scl1.querySelector('Substation')!;
    ied = scl1.querySelector('IED')!;
    communication = scl1.querySelector('Communication')!;
    bay = scl1.querySelector('Bay')!;
    privateSection = bay.querySelector('Private')!;
    privateElement = privateSection.firstElementChild!;
    publicElement = bay.children.item(1)!;
  });
  describe('EditorAction', () => {
    it('consists of four disjunct simple types', () => {
      expect(MockAction.cre).to.satisfy(isCreate);
      expect(MockAction.del).to.satisfy(isDelete);
      expect(MockAction.mov).to.satisfy(isMove);
      expect(MockAction.upd).to.satisfy(isReplace);
      isReplace;
      expect(MockAction.cre).to.satisfy(isSimple);
      expect(MockAction.del).to.satisfy(isSimple);
      expect(MockAction.mov).to.satisfy(isSimple);
      expect(MockAction.upd).to.satisfy(isSimple);

      expect(MockAction.cre).to.not.satisfy(isDelete);
      expect(MockAction.cre).to.not.satisfy(isMove);
      expect(MockAction.cre).to.not.satisfy(isReplace);
      isReplace;
      expect(MockAction.del).to.not.satisfy(isCreate);
      expect(MockAction.del).to.not.satisfy(isMove);
      expect(MockAction.del).to.not.satisfy(isReplace);
      isReplace;
      expect(MockAction.mov).to.not.satisfy(isCreate);
      expect(MockAction.mov).to.not.satisfy(isDelete);
      expect(MockAction.mov).to.not.satisfy(isReplace);
      isReplace;
      expect(MockAction.upd).to.not.satisfy(isCreate);
      expect(MockAction.upd).to.not.satisfy(isDelete);
      expect(MockAction.upd).to.not.satisfy(isMove);
    });

    it('consists of one complex type', () => {
      expect(MockAction.complex).to.not.satisfy(isSimple);

      expect(MockAction.complex).to.not.satisfy(isCreate);
      expect(MockAction.complex).to.not.satisfy(isDelete);
      expect(MockAction.complex).to.not.satisfy(isMove);
      expect(MockAction.complex).to.not.satisfy(isReplace);
    });
    isReplace;

    describe('invert', () => {
      it('turns Create into Delete and vice versa', () => {
        expect(invert(MockAction.cre)).to.satisfy(isDelete);
        expect(invert(MockAction.del)).to.satisfy(isCreate);
      });

      it('turns Move into Move', () => {
        expect(invert(MockAction.mov)).to.satisfy(isMove);
      });

      it('turns Update into Update', () => {
        expect(invert(MockAction.upd)).to.satisfy(isReplace);
      });
      isReplace;

      it('inverts components of complex actions in reverse order', () => {
        const action = MockAction.complex;
        const inverse = <ComplexAction>invert(action);

        action.actions.forEach((element, index) =>
          expect(
            inverse.actions[inverse.actions.length - index - 1]
          ).to.deep.equal(invert(action.actions[index]))
        );
      });

      it('throws on unknown Action type', () => {
        const invalid = <EditorAction>(<unknown>'Not an action!');
        expect(() => invert(invalid)).to.throw();
      });
    });

    describe('ActionEvent', () => {
      it('bears an EditorAction in its detail', () => {
        expect(newActionEvent(MockAction.mov))
          .property('detail')
          .property('action')
          .to.satisfy(isMove);
      });
    });
  });

  describe('PendingStateEvent', () => {
    it('bears a void Promise in its detail', () => {
      expect(newPendingStateEvent(Promise.resolve()))
        .property('detail')
        .property('promise')
        .to.be.a('promise');
    });
  });

  describe('WizardEvent', () => {
    it('optionally bears a wizard factory in its detail', () => {
      expect(newWizardEvent()).property('detail').property('wizard').to.be.null;
      expect(newWizardEvent([]))
        .property('detail')
        .property('wizard')
        .to.be.a('function');
    });

    it('allows to dispatch dynamic wizards', () => {
      expect(newWizardEvent(() => []))
        .property('detail')
        .property('wizard')
        .to.be.a('function');
    });
  });

  describe('ifImplemented', () => {
    let nonEmpty: HTMLElement;
    let empty: HTMLElement;

    beforeEach(async () => {
      nonEmpty = await fixture(html`<p>${ifImplemented('test')}</p>`);
      empty = await fixture(html`<p>${ifImplemented({})}</p>`);
    });

    it('renders non-empty objects into its template', () =>
      expect(nonEmpty).dom.to.have.text('test'));

    it('does not render empty objects into its template', () =>
      expect(empty).dom.to.be.empty);
  });

  describe('isSame', () => {
    it('is true of any two SCL Elements', () => {
      expect(isSame(scl1, scl2)).to.be.true;
    });

    it('is true of any two Header Elements', () => {
      expect(
        isSame(scl1.querySelector('Header')!, scl2.querySelector('Header')!)
      ).to.be.true;
    });

    it('is true of any two Communication Elements', () => {
      expect(
        isSame(
          scl1.querySelector('Communication')!,
          scl2.querySelector('Communication')!
        )
      ).to.be.true;
    });

    it('is true of any two DataTypeTemplates Elements', () => {
      expect(
        isSame(
          scl1.querySelector('DataTypeTemplates')!,
          scl2.querySelector('DataTypeTemplates')!
        )
      ).to.be.true;
    });

    it('is true of identical private sections', () => {
      expect(isSame(privateSection, privateSection)).to.be.true;
    });

    it('is false of any private elements', () => {
      expect(isSame(privateElement, privateElement)).to.be.false;
      expect(isSame(privateElement, publicElement)).to.be.false;
    });

    it('is true of any one Element and itself', () => {
      expect(isSame(substation, substation)).to.be.true;
      expect(isSame(ied, ied)).to.be.true;
      expect(isSame(bay, bay)).to.be.true;
      expect(isSame(communication, communication)).to.be.true;
    });

    it('is false of elements with different tagNames', () => {
      expect(isSame(substation, ied)).to.be.false;
      expect(isSame(substation, bay)).to.be.false;
      expect(isSame(bay, communication)).to.be.false;
      expect(isSame(communication, ied)).to.be.false;
    });

    it('is true of elements with equal nonempty id attributes', () => {
      expect(
        isSame(
          scl1.querySelector('LNodeType[id="Dummy.LLN0"]')!,
          scl2.querySelector('LNodeType[id="Dummy.LLN0"]')!
        )
      ).to.be.true;
    });

    it('is false of elements with unequal id attributes', () => {
      expect(
        isSame(
          scl1.querySelector('LNodeType[id="Dummy.LLN0"]')!,
          scl1.querySelector('LNodeType[id="Dummy.LLN0.two"]')!
        )
      ).to.be.false;
    });
  });
  describe('identity', () => {
    it('returns NaN for any private element', () => {
      expect(identity(privateElement)).to.be.NaN;
    });
    it('returns parent identity for singleton identities', () => {
      Object.entries(tags).forEach(([tag, data]) => {
        if (data.identity !== tags['Server'].identity) return;

        const element = scl1.querySelector(tag);
        if (element) {
          expect(identity(element)).to.equal(identity(element.parentElement!));
        }
      });
    });
    it('returns valid identity for special identities', () => {
      const expectations: Partial<Record<string, string>> = {
        Hitem: '1\t143',
        Terminal: 'AA1>E1>COUPLING_BAY>QC11>AA1/E1/COUPLING_BAY/L2',
        'Bay>LNode': 'IED2 CBSW/ LPHD 1',
        KDC: 'IED1>IED1 P1',
        LDevice: 'IED1>>CircuitBreaker_CB1',
        IEDName:
          'IED1>>CircuitBreaker_CB1>GCB>IED2 P1 CircuitBreaker_CB1/ CSWI 1',
        FCDA: 'IED1>>CircuitBreaker_CB1>GooseDataSet1>CircuitBreaker_CB1/ XCBR 1.Pos stVal (ST)',
        ExtRef: 'IED1>>Disconnectors>DC CSWI 1>intAddr[0]',
        'ExtRef:not([iedName])': 'IED1>>Disconnectors>DC CSWI 1>stVal-t[0]',
        LN: 'IED1>>CircuitBreaker_CB1> XCBR 1',
        ClientLN:
          'IED2>>CBSW> XSWI 1>ReportCb>IED1 P1 CircuitBreaker_CB1/ XCBR 1',
        DAI: 'IED1>>CircuitBreaker_CB1> XCBR 1>Pos>ctlModel',
        SDI: 'IED1>>CircuitBreaker_CB1>CB CSWI 2>Pos>pulseConfig',
        Val: 'IED1>>CircuitBreaker_CB1> XCBR 1>Pos>ctlModel> 0',
        ConnectedAP: 'IED1 P1',
        GSE: 'CircuitBreaker_CB1 GCB',
        SMV: 'MU01 MSVCB01',
        PhysConn: 'IED1 P1>RedConn',
        P: 'IED1 P1>IP [0]',
        EnumVal: '#Dummy_ctlModel>0',
        ProtNs: '#Dummy.LLN0.Mod.SBOw>8-MMS\tIEC 61850-8-1:2003',
      };

      Object.keys(expectations).forEach(key => {
        const element = scl1.querySelector(key);
        expect(identity(element!)).to.equal(expectations[key]);
      });
    });
    it('returns valid identity for naming identities', () => {
      Object.entries(tags).forEach(([tag, data]) => {
        if (data.identity !== tags['Substation'].identity) return;

        const element = scl1.querySelector(tag);
        if (element) {
          expect(identity(element)).to.equal(
            identity(element.parentElement!) +
              (element.parentElement?.tagName === 'SCL' ? '' : '>') +
              element.getAttribute('name')
          );
        }
      });
    });
  });

  describe('find', () => {
    it('returns null for the identity NaN', () => {
      const element = scl1.querySelector('Assotiation');
      const ident = identity(element!);
      expect(find(scl1, 'Assotiation', ident)).to.equal(null);
    });
    it('returns correct element for all tags except IEDName and ProtNs', () => {
      Object.keys(tags).forEach(tag => {
        const element = Array.from(scl1.querySelectorAll(tag)).filter(
          item => !item.closest('Private')
        )[0];
        if (element && tag !== 'IEDName' && tag !== 'ProtNs')
          expect(element)
            .to.satisfy((element: Element) =>
              element.isEqualNode(find(scl1, tag, identity(element)))
            )
            .and.to.equal(find(scl1, tag, identity(element)));
      });
    });
  });

  describe('getReference', () => {
    it('returns correct reference for already existing elements', () => {
      Object.keys(tags)
        .filter(tag => tags[<SCLTag>tag].children.length > 0)
        .forEach(tag => {
          const element = Array.from(scl1.querySelectorAll(tag)).filter(
            item => !item.closest('Private')
          )[0];

          if (
            !element ||
            element.tagName === 'Services' ||
            element.tagName === 'SettingGroups'
          )
            return;

          const children = Array.from(element.children);
          const childTags = new Set(children.map(child => child.tagName));

          for (const childTag of childTags) {
            expect(getReference(element, <SCLTag>childTag)).to.equal(
              children.find(child => child.tagName === childTag)
            );
          }
        });
    });

    it('returns correct reference for LNode element', () => {
      const scl = new DOMParser().parseFromString(
        `<Bay>
          <Private>testprivate</Private>
          <ConductingEquipment name="QA1"></ConductingEquipment>
        </Bay>`,
        'application/xml'
      ).documentElement;
      expect(getReference(scl, 'LNode')).to.equal(
        scl.querySelector('ConductingEquipment')
      );
      const scl2 = new DOMParser().parseFromString(
        `<Bay>
          <Private>testprivate</Private>
          <PowerTransformer name="pTrans"></PowerTransformer>
          <ConductingEquipment name="QA1"></ConductingEquipment>
        </Bay>`,
        'application/xml'
      ).documentElement;
      expect(getReference(scl2, 'LNode')).to.equal(
        scl2.querySelector('PowerTransformer')
      );
    });
    it('returns correct reference for Substation element', () => {
      const scl = new DOMParser().parseFromString(
        `<SCL>
          <Header></Header>
          <IED name="IED"></IED>
          <DataTypeTemplates></DataTypeTemplates>
        </SCL>`,
        'application/xml'
      ).documentElement;
      expect(getReference(scl, 'Substation')).to.equal(
        scl.querySelector('IED')
      );
    });
    it('returns correct reference for VoltageLevel element', () => {
      const scl = new DOMParser().parseFromString(
        `<Substation>
          <Private></Private>
          <LNode></LNode>
        </Substation>`,
        'application/xml'
      ).documentElement;
      expect(getReference(scl, 'VoltageLevel')).to.be.null;
    });
    it('returns correct reference for Bay element', () => {
      const scl = new DOMParser().parseFromString(
        `<VoltageLevel>
          <Private></Private>
          <Function></Function>
        </VoltageLevel>`,
        'application/xml'
      ).documentElement;
      expect(getReference(scl, 'Bay')).to.equal(scl.querySelector('Function'));
    });
    it('returns correct reference for ConductingEquipment element', () => {
      const scl = new DOMParser().parseFromString(
        `<Bay>
          <Private></Private>
          <ConnectivityNode></ConnectivityNode>
        </Bay>`,
        'application/xml'
      ).documentElement;
      expect(getReference(scl, 'ConductingEquipment')).to.equal(
        scl.querySelector('ConnectivityNode')
      );
    });
  });

  describe('findControlBlocks', () => {
    let doc: Document;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/comm-map.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });
    it('returns an Set of controlBlocks connected to the ExtRef', () => {
      const extRef = doc.querySelector(
        ':root > IED[name="IED2"] > AccessPoint > Server > LDevice[inst="CircuitBreaker_CB1"] ExtRef'
      )!;
      expect(findControlBlocks(extRef).size).to.have.equal(1);
      expect(
        Array.from(findControlBlocks(extRef))[0].isEqualNode(
          doc.querySelector(
            'IED[name="IED1"] LDevice[inst="CircuitBreaker_CB1"] GSEControl[name="GCB"]'
          )
        )
      ).to.be.true;
    });

    it('returns empty Set if input not ExtRef', () => {
      expect(findControlBlocks(doc.querySelector('LN')!).size).to.equal(0);
    });

    it('returns empty array if input is not public', () => {
      expect(
        findControlBlocks(doc.querySelector('Private > ExtRef')!).size
      ).to.equal(0);
    });
  });

  describe('getUniqueElementName', () => {
    let parent: Element;
    beforeEach(() => {
      const testDoc = new DOMParser().parseFromString(
        '<Parent>' +
          '<Child name="newChild1"/><Child name="newChild2"/>' +
          '<Child2 name="newChild3"/><Child2 name="newChild21"/>' +
          '</Parent>',
        'application/xml'
      );
      parent = testDoc.querySelector<Element>('Parent')!;
    });

    it('returns unique name for Child', () =>
      expect(getUniqueElementName(parent, 'Child')).to.equal('newChild3'));

    it('returns unique name for Child2', () =>
      expect(getUniqueElementName(parent, 'Child2')).to.equal('newChild22'));
  });

  describe('getNameAttribute', () => {
    it('expect the correct value of the name attribute', () => {
      const doElement = scl1.querySelector(
        'LNodeType[id="Dummy.LLN0"] > DO[type="Dummy.LLN0.Mod"]'
      )!;
      expect(getNameAttribute(doElement)).to.be.equal('Mod');
    });
  });

  describe('findFCDAs', () => {
    let doc: Document;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/comm-map.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });
    it('returns an array of FCDAs connected to the ExtRef', () => {
      const extRef = doc.querySelector(
        ':root > IED[name="IED2"] > AccessPoint > Server > LDevice[inst="CircuitBreaker_CB1"] ExtRef'
      )!;
      expect(findFCDAs(extRef).length).to.have.equal(1);
      expect(
        findFCDAs(extRef)[0].isEqualNode(
          doc.querySelector(
            'IED[name="IED1"] LDevice[inst="CircuitBreaker_CB1"] ' +
              'FCDA[ldInst="CircuitBreaker_CB1"][lnClass="XCBR"][doName="Pos"][daName="stVal"]'
          )
        )
      ).to.be.true;
    });

    it('returns empty array if input not ExtRef', () => {
      expect(findFCDAs(doc.querySelector('LN')!).length).to.equal(0);
    });

    it('returns empty array if input is not public', () => {
      expect(findFCDAs(doc.querySelector('Private > ExtRef')!).length).to.equal(
        0
      );
    });
  });

  describe('getChildElementsByTagName', () => {
    let doc: Document;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/lnodewizard.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });
    it('returns a child Element array with a specific tag', () => {
      const parent = doc.querySelector('Bay[name="COUPLING_BAY"]');
      expect(getChildElementsByTagName(parent!, 'LNode').length).to.have.equal(
        parent?.querySelectorAll(
          ':root > Substation > VoltageLevel > Bay[name="COUPLING_BAY"] > LNode'
        ).length
      );
    });
  });

  describe('cloneElement', () => {
    let element: Element;
    beforeEach(() => {
      element = new DOMParser().parseFromString(
        `<Element attr1="attrValue" ></Element>`,
        'application/xml'
      ).documentElement;
    });
    it('does not copy child nodes', () => {
      const newElement = cloneElement(element, {});
      expect(newElement.childNodes.length).to.equal(0);
    });
    it('creates a newElement with specified attrs', () => {
      const attr1 = 'newAttr1';
      const attr2 = 'newAttr2';
      const newElement = cloneElement(element, { attr1, attr2 });
      expect(newElement.attributes.length).to.equal(2);
      expect(newElement).to.have.attribute('attr2', 'newAttr2');
    });
    it('leaves attr untouched if not part of attrs', () => {
      const attr2 = 'newAttr2';
      const newElement = cloneElement(element, { attr2 });
      expect(newElement.attributes.length).to.equal(2);
      expect(newElement).to.have.attribute('attr1', 'attrValue');
    });
    it('updates existing attr if part of attrs', () => {
      const attr1 = 'newAttr1';
      const newElement = cloneElement(element, { attr1 });
      expect(newElement.attributes.length).to.equal(1);
      expect(newElement).to.have.attribute('attr1', 'newAttr1');
    });
    it('removes existing attr if set to null', () => {
      const attr1 = null;
      const attr2 = 'newAttr2';
      const newElement = cloneElement(element, { attr1, attr2 });
      expect(newElement.attributes.length).to.equal(1);
      expect(newElement).to.not.have.attribute('attr1');
    });
  });

  describe('depth', () => {
    const circular = { a: { b: {} }, c: {} };
    circular.a.b = circular;

    const fiveDeep: unknown = [
      'first level',
      2,
      {
        a: 'second level',
        b: 2,
        c: [
          'third level',
          { a: 'fourth level', b: 2, c: { a: 'fifth level!' } },
        ],
      },
      'test',
    ];

    it("returns the given object's or array's depth", () =>
      expect(depth(<Record<string, unknown>>fiveDeep)).to.equal(5));

    it('returns zero if given something other than an object or array', () =>
      expect(depth(<Record<string, unknown>>(<unknown>'test'))).to.equal(0));

    it('returns Infinity if given a circularly defined object or array', () =>
      expect(depth(circular)).to.not.be.finite);
  });

  describe('getSclSchemaVersion', () => {
    let doc: Document;

    it('when passing a SCL 2003 Document then correct edition is returned', async () => {
      doc = await fetch('/test/testfiles/valid2003.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      expect(getSclSchemaVersion(doc)).to.be.equal('2003');
    });

    it('when passing a SCL 2007B Document then correct edition is returned', async () => {
      doc = await fetch('/test/testfiles/valid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      expect(getSclSchemaVersion(doc)).to.be.equal('2007B');
    });

    it('when passing a SCL 2007B4 Document then correct edition is returned', async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      expect(getSclSchemaVersion(doc)).to.be.equal('2007B4');
    });
  });

  describe('generator function for new `lnInst` attribute', () => {
    let lnInstGenerator: (lnClass: string) => string | undefined;
    let parent: Element;

    describe('with existing unique lnInst', () => {
      beforeEach(() => {
        parent = new DOMParser().parseFromString(
          `<Function name="someName">
            <LNode name="None" lnClass="CSWI" lnInst="1"/>
            <LNode name="None" lnClass="XCBR" lnInst="1"/>
            <LNode name="None" lnClass="CILO" lnInst="1"/>
            <LNode name="None" lnClass="CSWI" lnInst="2"/>
            <LNode name="None" lnClass="PDIS" lnInst="1"/>
            <LNode name="None" lnClass="CSWI" lnInst="5"/>
            <LNode name="None" lnClass="CSWI" lnInst="6"/>
            <LNode name="None" lnClass="CSWI" lnInst="8"/>
          </Function>`,
          'application/xml'
        ).documentElement;

        lnInstGenerator = newLnInstGenerator(parent);
      });

      it('returns unique lnInst called once', () =>
        expect(lnInstGenerator('CSWI')).to.equal('3'));

      it('returns unique lnInst called several times', () => {
        expect(lnInstGenerator('CSWI')).to.equal('3');
        expect(lnInstGenerator('CSWI')).to.equal('4');
        expect(lnInstGenerator('CSWI')).to.equal('7');
        expect(lnInstGenerator('CSWI')).to.equal('9');
      });

      it('returns unique lnInst called several times', () => {
        expect(lnInstGenerator('CSWI')).to.equal('3');
        expect(lnInstGenerator('CSWI')).to.equal('4');
        expect(lnInstGenerator('CSWI')).to.equal('7');
        expect(lnInstGenerator('CSWI')).to.equal('9');
      });
    });

    describe('with missing unique lnInst for lnClass PDIS', () => {
      beforeEach(() => {
        parent = new DOMParser().parseFromString(
          `<Function name="someName">
          </Function>`,
          'application/xml'
        ).documentElement;

        for (let i = 1; i <= 99; i++) {
          const lNode = new DOMParser().parseFromString(
            `<LNode iedName="None" lnClass="PDIS" lnInst="${i}" />`,
            'application/xml'
          ).documentElement;
          parent.appendChild(lNode);
        }

        lnInstGenerator = newLnInstGenerator(parent);
      });

      it('return undefined for the lnClass PDIS', () =>
        expect(lnInstGenerator('PDIS')).to.be.undefined);

      it('return unique lnInst for another lnClass', () =>
        expect(lnInstGenerator('CSWI')).to.equal('1'));
    });
  });

  describe('minAvailableLogicalNodeInstance', () => {
    it('generates the minimum number not present yet as an "inst" attribute in a set of elements', () => {
      const docFragment: Document = new DOMParser().parseFromString(
        `
        <LDevice inst="SV_supervision">
          <LN0 lnClass="LLN0" lnType="Dummy.LLN0"/>
          <LN lnClass="LSVS" inst="1" lnType="Dummy.LSVS1">
            <DOI name="SvCBRef">
              <DAI name="setSrcRef">
                <Val>SMV_PublisherCurrentTransformer/LLN0.currrentOnly</Val>
              </DAI>
            </DOI>
          </LN>
          <LN lnClass="LSVS" inst="3" lnType="Dummy.LSVS1"/>
          <LN lnClass="LSVS" inst="4" lnType="Dummy.LSVS1"/>
        </LDevice>
      `,
        'application/xml'
      );
      let lnElements = Array.from(
        docFragment.querySelectorAll('LN[lnClass="LSVS"]')
      );
      expect(minAvailableLogicalNodeInstance(lnElements)).to.be.equal('2');
      lnElements = Array.from(
        docFragment.querySelectorAll('LN[lnClass="LLN0"]')
      );
      expect(minAvailableLogicalNodeInstance(lnElements)).to.be.equal('1');
    });
  });
});
