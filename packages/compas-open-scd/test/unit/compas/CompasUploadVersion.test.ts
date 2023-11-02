import {expect, fixture, fixtureSync, html, waitUntil} from '@open-wc/testing';
import sinon from "sinon";

import { MockWizard } from '../../mock-wizard.js';
import '../../mock-wizard.js';

import {addVersionToCompasWizard, CompasUploadVersionElement} from "../../../src/compas/CompasUploadVersion.js";
import {CompasExistsInElement} from "../../../src/compas/CompasExistsIn.js";
import "../../../src/compas/CompasUploadVersion.js";

describe('compas-upload-version', () => {
  let element: CompasUploadVersionElement & CompasExistsInElement;
  const docName = 'station123.scd';
  const docId = '6a45ae97-5605-44f8-b4e6-25305bc6c036';

  describe('still determining if document exists in CoMPAS', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html `<compas-upload-version .docName="${docName}" .docId="${docId}"></compas-upload-version>`
      );

      sinon.stub(element, 'checkExistInCompas').callsFake(() => {
        // Do nothing so that it seems like loading from compas.
      });

      await element;
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('no document in compas (anymore)', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html `<compas-upload-version .docName="${docName}" .docId="${docId}"></compas-upload-version>`
      );

      sinon.stub(element, 'checkExistInCompas').callsFake(() => {
        element.existInCompas = false;
      });

      await element;
      await waitUntil(() => element.existInCompas !== undefined);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('existing document in compas', () => {
    beforeEach(async () => {
      element = fixtureSync(
        html `<compas-upload-version .docName="${docName}" .docId="${docId}"></compas-upload-version>`
      );

      sinon.stub(element, 'checkExistInCompas').callsFake(() => {
        element.existInCompas = true;
      });

      await element;
      await waitUntil(() => element.existInCompas !== undefined);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  })

  describe('existing document in compas through wizard', () => {
    let wizardElement: MockWizard;

    beforeEach(async () => {
      wizardElement = await fixture(html `<mock-wizard></mock-wizard>`);
      wizardElement.workflow.push(() => addVersionToCompasWizard({docId: docId, docName: docName}));
      await wizardElement.requestUpdate();

      element = wizardElement.wizardUI.dialog!
        .querySelector<CompasUploadVersionElement & CompasExistsInElement>('compas-upload-version')!;

      sinon.stub(element, 'checkExistInCompas').callsFake(() => {
        element.existInCompas = true;
      });

      await element;
      await waitUntil(() => element.existInCompas !== undefined);
    });

    it('looks like the latest snapshot', async () => {
      await expect(wizardElement.wizardUI.dialog).to.equalSnapshot();
    });
  })

  afterEach(() => {
    sinon.restore();
  });
});
