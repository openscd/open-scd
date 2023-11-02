import {
  expectDeleteAction,
  expectReplaceAction,
  expectUpdateTextValue,
  fetchDoc,
} from '../test-support.js';
import {
  deleteReferences,
  updateReferences,
} from '../../../../src/wizards/foundation/references.js';
import { expect } from '@open-wc/testing';

describe('Update reference for ', () => {
  let doc: XMLDocument;

  describe('element without Reference Info (ConductingEquipment)', () => {
    const ceName = 'QA1';
    let conductingEquipment: Element;

    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
      conductingEquipment = doc.querySelector(
        `ConductingEquipment[name="${ceName}"]`
      )!;
    });

    it('will update no references to ConductingEquipment', function () {
      const updateActions = updateReferences(
        conductingEquipment,
        ceName,
        'Other CE Name'
      );
      expect(updateActions.length).to.equal(0);
    });

    it('will delete no references to ConductingEquipment', function () {
      const updateActions = deleteReferences(conductingEquipment);
      expect(updateActions.length).to.equal(0);
    });
  });

  describe('element without Name Attribute (Value)', () => {
    let connectAP: Element;

    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
      connectAP = doc.querySelector(
        `ConnectedAP[iedName="IED1"][apName="P1"]`
      )!;
    });

    it('will update no references to ConnectedAP', function () {
      const updateActions = updateReferences(connectAP, null, 'New Name');
      expect(updateActions.length).to.equal(0);
    });

    it('will delete no references to ConnectedAP', function () {
      const updateActions = deleteReferences(connectAP);
      expect(updateActions.length).to.equal(0);
    });
  });

  describe('IED update Val element', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/iedRename.scd');
    });
  });

  describe('IED', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
    });

    it('will update all references to IED IED1', function () {
      const oldName = 'IED1';
      const newName = 'NewIED1';
      const ied = doc.querySelector(`IED[name="${oldName}"]`)!;

      const updateActions = updateReferences(ied, oldName, newName);
      expect(updateActions.length).to.equal(9);

      expectReplaceAction(
        updateActions[0],
        'Association',
        'iedName',
        oldName,
        newName
      );
      expectReplaceAction(
        updateActions[1],
        'ClientLN',
        'iedName',
        oldName,
        newName
      );
    });

    it('will update all references to IED IED2', function () {
      const oldName = 'IED2';
      const newName = 'NewIED2';
      const ied = doc.querySelector(`IED[name="${oldName}"]`)!;

      const updateActions = updateReferences(ied, oldName, newName);
      expect(updateActions.length).to.equal(8);

      expectUpdateTextValue(updateActions[6], 'GSEControl', oldName, newName);
      expectUpdateTextValue(
        updateActions[7],
        'SampledValueControl',
        oldName,
        newName
      );
    });

    it('will update all references to IED Pub and checks for correct Val elements', function () {
      const oldName = 'Pub';
      const newName = 'NewPub';
      const ied = doc.querySelector(`IED[name="${oldName}"]`)!;

      const updateActions = updateReferences(ied, oldName, newName);
      expect(updateActions.length).to.equal(5);

      const input1 = updateActions[0].old.element;
      const input2 = updateActions[1].old.element;
      const input3 = updateActions[2].old.element;
      const input4 = updateActions[3].old.element;

      expect(input1.getAttribute('srcCBName')).to.be.equal(null);
      expect(input2.getAttribute('srcCBName')).to.be.equal(null);
      expect(input3.getAttribute('srcCBName')).to.be.equal('cb1');
      expect(input4.getAttribute('srcCBName')).to.be.equal('cb1');

      const valSuffix3 =
        input3.getAttribute('srcLDInst') +
        '/' +
        input3.getAttribute('srcLNClass') +
        '.' +
        input3.getAttribute('srcCBName');

      expectUpdateTextValue(
        updateActions[4],
        'DAI',
        oldName + valSuffix3,
        newName + valSuffix3
      );
    });

    it('will delete all references to IED IED1', function () {
      const name = 'IED1';
      const ied = doc.querySelector(`IED[name="${name}"]`)!;

      const updateActions = deleteReferences(ied);
      expect(updateActions.length).to.equal(9);

      expectDeleteAction(updateActions[0], 'Association');
      expectDeleteAction(updateActions[1], 'ClientLN');
    });

    it('will delete all references to IED IED2', async function () {
      const name = 'IED2';
      const ied = doc.querySelector(`IED[name="${name}"]`)!;

      const updateActions = deleteReferences(ied);
      expect(updateActions.length).to.equal(8);

      expectDeleteAction(updateActions[6], 'GSEControl');
      expectDeleteAction(updateActions[7], 'SampledValueControl');
    });
  });

  describe('Substation', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/references.scd');
    });

    it('will update all references to Substation AA1', function () {
      const oldName = 'AA1';
      const newName = 'NewAA1';
      const substation = doc.querySelector(`Substation[name="${oldName}"]`)!;

      const updateActions = updateReferences(substation, oldName, newName);
      expect(updateActions.length).to.equal(48);

      expectReplaceAction(
        updateActions[0],
        'Terminal',
        'substationName',
        oldName,
        newName
      );
    });
  });

  describe('VoltageLevel', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/references.scd');
    });

    it('will update all references to VoltageLevel "J1"', function () {
      const oldName = 'J1';
      const newName = 'J1 UPD';
      const voltageLevel = doc.querySelector(
        `VoltageLevel[name="${oldName}"]`
      )!;

      const updateActions = updateReferences(voltageLevel, oldName, newName);
      expect(updateActions.length).to.equal(48);

      expectReplaceAction(
        updateActions[0],
        'Terminal',
        'voltageLevelName',
        oldName,
        newName
      );
    });
  });

  describe('Bay', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/references.scd');
    });

    it('will update all references to BusBar "BusBar A"', function () {
      const oldName = 'BusBar A';
      const newName = 'BusBar A UPD';
      const bay = doc.querySelector(`Bay[name="${oldName}"]`)!;

      const updateActions = updateReferences(bay, oldName, newName);
      expect(updateActions.length).to.equal(6);

      expectReplaceAction(
        updateActions[0],
        'Terminal',
        'bayName',
        oldName,
        newName
      );
    });

    it('will update all references to Bay "Bay A"', function () {
      const oldName = 'Bay A';
      const newName = 'Bay A UPD';
      const bay = doc.querySelector(`Bay[name="${oldName}"]`)!;

      const updateActions = updateReferences(bay, oldName, newName);
      expect(updateActions.length).to.equal(8);

      expectReplaceAction(
        updateActions[0],
        'Terminal',
        'bayName',
        oldName,
        newName
      );
    });
  });
});
