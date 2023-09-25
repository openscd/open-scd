import { expect } from '@open-wc/testing';

import { typeStr } from '../../../../src/wizards/conductingequipment.js';

describe('conductingequipmentwizard', () => {
  describe('recognises an earth switch in the conducting equipment wizard that', () => {
    let doc: Document;
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/conductingequipmentwizard.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    it('has the first terminal grounded', () => {
      expect(
        typeStr(doc.querySelector('ConductingEquipment[name="ES239"]')!)
      ).to.equal('ERS');
    });

    it('has the second terminal grounded', () => {
      expect(
        typeStr(doc.querySelector('ConductingEquipment[name="ES249"]')!)
      ).to.equal('ERS');
    });

    it('has no grounded connectivityNodes but has an XSWI LN and DOI:SWTyp > DAI:stVal defining an "Earthing Switch"', () => {
      expect(
        typeStr(doc.querySelector('ConductingEquipment[name="ES259"]')!)
      ).to.equal('ERS');
    });

    it('has no grounded connectivityNodes but has an XSWI LN and LNodeType > DOType > DA:stVal defining an "Earthing Switch"', () => {
      expect(
        typeStr(doc.querySelector('ConductingEquipment[name="ES269"]')!)
      ).to.equal('ERS');
    });

    it('has no grounded connectivityNodes but has an XSWI LN within SubEquipment and DOI:SWTyp > DAI:stVal defining an "Earthing Switch"', () => {
      expect(
        typeStr(doc.querySelector('ConductingEquipment[name="ES279"]')!)
      ).to.equal('ERS');
    });

    it('has no grounded connectivityNodes but has an IED with name "None" and a definition in the DataTypeTemplates', () => {
      expect(
        typeStr(doc.querySelector('ConductingEquipment[name="ES289"]')!)
      ).to.equal('ERS');
    });
  });
});
