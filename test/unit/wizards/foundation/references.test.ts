import {
  expectReplaceAction,
  expectUpdateTextValue,
  fetchDoc,
} from '../test-support.js';
import { updateReferences } from '../../../../src/wizards/foundation/references.js';
import { expect } from '@open-wc/testing';
import { Replace } from '../../../../src/foundation.js';

describe('Update reference for ', () => {
  let doc: XMLDocument;

  describe('IED', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
    });

    it('will update all references to IED IED1', async function () {
      const oldName = 'IED1';
      const newName = 'NewIED1';
      const ied = doc.querySelector(`IED[name="${oldName}"]`)!;

      const updateActions = updateReferences(ied, oldName, newName);
      expect(updateActions.length).to.equal(9);

      expectReplaceAction(
        <Replace>updateActions[0],
        'Association',
        'iedName',
        oldName,
        newName
      );
      expectReplaceAction(
        <Replace>updateActions[1],
        'ClientLN',
        'iedName',
        oldName,
        newName
      );
      expectReplaceAction(
        <Replace>updateActions[3],
        'ConnectedAP',
        'iedName',
        oldName,
        newName
      );
      expectReplaceAction(
        <Replace>updateActions[4],
        'ExtRef',
        'iedName',
        oldName,
        newName
      );
      expectReplaceAction(
        <Replace>updateActions[8],
        'KDC',
        'iedName',
        oldName,
        newName
      );
    });

    it('will update all references to IED IED2', async function () {
      const oldName = 'IED2';
      const newName = 'NewIED2';
      const ied = doc.querySelector(`IED[name="${oldName}"]`)!;

      const updateActions = updateReferences(ied, oldName, newName);
      expect(updateActions.length).to.equal(8);

      expectReplaceAction(
        <Replace>updateActions[4],
        'LNode',
        'iedName',
        oldName,
        newName
      );
      expectUpdateTextValue(
        <Replace>updateActions[6],
        'GSEControl',
        oldName,
        newName
      );
      expectUpdateTextValue(
        <Replace>updateActions[7],
        'SampledValueControl',
        oldName,
        newName
      );
    });
  });

  describe('Substation', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/references.scd');
    });

    it('will update all references to Substation AA1', async function () {
      const oldName = 'AA1';
      const newName = 'NewAA1';
      const substation = doc.querySelector(`Substation[name="${oldName}"]`)!;

      const updateActions = updateReferences(substation, oldName, newName);
      expect(updateActions.length).to.equal(48);

      expectReplaceAction(
        <Replace>updateActions[0],
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

    it('will update all references to VoltageLevel "J1"', async function () {
      const oldName = 'J1';
      const newName = 'J1 UPD';
      const voltageLevel = doc.querySelector(`VoltageLevel[name="${oldName}"]`)!;

      const updateActions = updateReferences(voltageLevel, oldName, newName);
      expect(updateActions.length).to.equal(48);

      expectReplaceAction(
        <Replace>updateActions[0],
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

    it('will update all references to BusBar "BusBar A"', async function () {
      const oldName = 'BusBar A';
      const newName = 'BusBar A UPD';
      const bay = doc.querySelector(`Bay[name="${oldName}"]`)!;

      const updateActions = updateReferences(bay, oldName, newName);
      expect(updateActions.length).to.equal(6);

      expectReplaceAction(
        <Replace>updateActions[0],
        'Terminal',
        'bayName',
        oldName,
        newName
      );
    });

    it('will update all references to Bay "Bay A"', async function () {
      const oldName = 'Bay A';
      const newName = 'Bay A UPD';
      const bay = doc.querySelector(`Bay[name="${oldName}"]`)!;

      const updateActions = updateReferences(bay, oldName, newName);
      expect(updateActions.length).to.equal(8);

      expectReplaceAction(
        <Replace>updateActions[0],
        'Terminal',
        'bayName',
        oldName,
        newName
      );
    });
  });
});
