import {expect} from "@open-wc/testing";

import {SCLTag} from "@openscd/open-scd/src/foundation.js";
import {emptyWizard} from "../../../../../src/wizards/wizard-library.js";
import {wizards} from "../../../../../src/editors/singlelinediagram/wizards/wizard-library.js";

import { editConnectivityNodeWizard } from "../../../../../src/wizards/connectivitynode.js";
import { editTerminalWizard } from "../../../../../src/wizards/terminal.js";

import { editBayWizard } from "../../../../../src/editors/singlelinediagram/wizards/bay.js";
import { editConductingEquipmentWizard } from '../../../../../src/editors/singlelinediagram/wizards/conductingequipment.js';
import { editPowerTransformerWizard } from '../../../../../src/editors/singlelinediagram/wizards/powertransformer.js';

describe('Wizard Library (X/Y Coordinates)', () => {
  it('Check that all create wizards are empty wizards', async () => {
    for (const wizardKey in wizards) {
      expect(wizards[<SCLTag>wizardKey].create).to.be.equal(emptyWizard);
    }
  });

  it('Check that some edit wizards are correct SLD Editors', async () => {
    for (const wizardKey in wizards) {
      const editWizard = wizards[<SCLTag>wizardKey].edit;
      switch (wizardKey) {
        case "Bay":
          expect(editWizard).to.be.equal(editBayWizard);
          break;
        case "ConductingEquipment":
          expect(editWizard).to.be.equal(editConductingEquipmentWizard);
          break;
        case "ConnectivityNode":
          expect(editWizard).to.be.equal(editConnectivityNodeWizard);
          break;
        case "PowerTransformer":
          expect(editWizard).to.be.equal(editPowerTransformerWizard);
          break;
        case "Terminal":
          expect(editWizard).to.be.equal(editTerminalWizard);
          break;
        default:
          expect(editWizard).to.be.equal(emptyWizard);
          break;
      }
    }
  });
});
