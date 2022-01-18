import {fetchDoc} from "../foundation.js";
import {updateReferences} from "../../../../src/wizards/foundation/references.js";
import {expect} from "@open-wc/testing";
import {Update} from "../../../../src/foundation.js";

describe('Update reference for ', () => {
  let doc: XMLDocument;

  function expectUpdatedAttributeValue(action: Update, tagName: string, oldValue: string, newValue: string): void {
    expect(action.old.element.tagName).to.be.equal(tagName);
    expect(action.old.element).to.have.attribute('iedName', oldValue);
    expect(action.new.element.tagName).to.be.equal(tagName);
    expect(action.new.element).to.have.attribute('iedName', newValue);
  }

  function expectUpdatedTextValue(action: Update, parentTagName: string, oldValue: string, newValue: string): void {
    expect(action.old.element.parentElement!.tagName).to.be.equal(parentTagName);
    expect(action.old.element.textContent).to.be.equal(oldValue);
    expect(action.new.element.textContent).to.be.equal(newValue);
  }

  describe('IED ', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
    });

    it('will update all references to IED1', async function () {
      const oldName = "IED1"
      const newName = "NewIED1";
      const ied = doc.querySelector(`IED[name="${oldName}"]`)!;

      const updateActions = updateReferences(ied, oldName, newName);
      expect(updateActions.length).to.equal(9);

      expectUpdatedAttributeValue(<Update>updateActions[0], 'Association', oldName, newName);
      expectUpdatedAttributeValue(<Update>updateActions[1], 'ClientLN', oldName, newName);
      expectUpdatedAttributeValue(<Update>updateActions[3], 'ConnectedAP', oldName, newName);
      expectUpdatedAttributeValue(<Update>updateActions[4], 'ExtRef', oldName, newName);
      expectUpdatedAttributeValue(<Update>updateActions[8], 'KDC', oldName, newName);
    });

    it('will update all references to IED2', async function () {
      const oldName = "IED2"
      const newName = "NewIED2";
      const ied = doc.querySelector(`IED[name="${oldName}"]`)!;

      const updateActions = updateReferences(ied, oldName, newName);
      expect(updateActions.length).to.equal(8);

      expectUpdatedAttributeValue(<Update>updateActions[4], 'LNode', oldName, newName);
      expectUpdatedTextValue(<Update>updateActions[6], 'GSEControl', oldName, newName);
      expectUpdatedTextValue(<Update>updateActions[7], 'SampledValueControl', oldName, newName);
    });
  });
});
