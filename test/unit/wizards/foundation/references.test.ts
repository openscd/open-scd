import {
  expectReplaceAction,
  expectUpdateTextValue,
  fetchDoc,
} from '../foundation.js';
import { updateReferences } from '../../../../src/wizards/foundation/references.js';
import { expect } from '@open-wc/testing';
import { Replace } from '../../../../src/foundation.js';

describe('Update reference for ', () => {
  let doc: XMLDocument;

  describe('IED ', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
    });

    it('will update all references to IED1', async function () {
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

    it('will update all references to IED2', async function () {
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
});
