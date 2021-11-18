import { fixture, expect } from '@open-wc/testing';

import TemplatesPlugin from '../../../../src/editors/Templates.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { Select } from '@material/mwc-select';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { FilteredList } from '../../../../src/filtered-list.js';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Switch } from '@material/mwc-switch';
import { html } from '../../../../src/foundation.js';

describe('LNodeType wizards', () => {
  if (customElements.get('templates-editor') === undefined)
    customElements.define('templates-editor', TemplatesPlugin);
  let doc: Document;
  let parent: MockWizardEditor;
  let templates: TemplatesPlugin;
  let lNodeTypeList: FilteredList;

  beforeEach(async () => {
    parent = await fixture(
      html`<mock-wizard-editor
        ><templates-editor></templates-editor
      ></mock-wizard-editor>`
    );

    templates = <TemplatesPlugin>parent.querySelector('templates-editor')!;

    doc = await fetch('/base/test/testfiles/templates/dotypes.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    templates.doc = doc;
    await templates.updateComplete;
    lNodeTypeList = <FilteredList>(
      templates.shadowRoot?.querySelector('filtered-list[id="lnodetypelist"]')
    );
  });

  describe('defines a lNodeTypeHelperWizard', () => {
    let idField: WizardTextField;
    let primayAction: HTMLElement;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        lNodeTypeList.querySelector('mwc-list-item[value="#Dummy.CSWI"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); //recursive call takes time
      idField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-text-field[label="id"]')
      );
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'c-button[slot="primaryAction"]'
        )
      );
      deleteButton = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector('c-button[icon="delete"]')
      );
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
    it('edits LNodeType attributes id', async () => {
      expect(doc.querySelector('LNodeType[id="Dummy.CSWI"]')).to.exist;
      idField.value = 'changedLNodeType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.requestUpdate();
      expect(doc.querySelector('LNodeType[id="Dummy.CSWI"]')).to.not.exist;
      expect(doc.querySelector('LNodeType[id="changedLNodeType"]')).to.exist;
    });
    it('deletes the LNodeType attribute on delete button click', async () => {
      expect(doc.querySelector('LNodeType[id="Dummy.CSWI"]')).to.exist;
      expect(doc.querySelectorAll('LNodeType').length).to.equal(8);
      deleteButton.click();
      await parent.requestUpdate();
      expect(doc.querySelector('LNodeType[id="Dummy.CSWI"]')).to.not.exist;
      expect(doc.querySelectorAll('LNodeType').length).to.equal(7);
    });
    it('does not edit LNodeType element without changes', async () => {
      const originData = (<Element>(
        doc.querySelector('LNodeType[id="Dummy.CSWI"]')
      )).cloneNode(true);
      primayAction.click();
      await parent.requestUpdate();
      expect(
        originData.isEqualNode(doc.querySelector('LNodeType[id="Dummy.CSWI"]'))
      ).to.be.true;
    });
  });

  describe('defines a createLNodeTypeWizard', () => {
    let selector: Select;
    let autoimport: Switch;
    let idField: WizardTextField;
    let primayAction: HTMLElement;
    beforeEach(async () => {
      const button = <HTMLElement>(
        templates?.shadowRoot?.querySelectorAll(
          'mwc-icon-button[icon="playlist_add"]'
        )[0]
      );
      button.click();
      await parent.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      selector = parent.wizardUI.dialog!.querySelector<Select>(
        'mwc-select[label="lnClass"]'
      )!;
      idField = parent.wizardUI.dialog!.querySelector<WizardTextField>(
        'wizard-text-field[label="id"]'
      )!;
      primayAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'c-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
    it('recursively add missing! subsequent DOType elements', async () => {
      expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.not.exist;
      expect(doc.querySelector('DOType[id="OpenSCD_ENC_Mod"]')).to.not.exist;
      expect(doc.querySelector('DOType[id="OpenSCD_ENS_Beh"]')).to.not.exist;
      expect(doc.querySelector('DOType[id="OpenSCD_ENS_Health"]')).to.not.exist;
      expect(doc.querySelector('DOType[id="OpenSCD_LPL_noLD"]')).to.not.exist;
      expect(doc.querySelector('DOType[id="OpenSCD_SPS_simple"]')).to.not.exist;
      expect(doc.querySelector('DOType[id="OpenSCD_DPC"]')).to.not.exist;
      await new Promise(resolve => setTimeout(resolve, 100)); //recursive call takes time
      selector.value = '#OpenSCD_CSWI_noPB';
      await parent.requestUpdate(); // selector updates autoimport
      idField.maybeValue = 'myCSWI';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.exist;
      expect(
        doc.querySelectorAll('DOType[id="OpenSCD_ENC_Mod"]').length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('DOType[id="OpenSCD_ENS_Beh"]').length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('DOType[id="OpenSCD_ENS_Health"]').length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('DOType[id="OpenSCD_LPL_noLD"]').length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('DOType[id="OpenSCD_SPS_simple"]').length
      ).to.equal(1);
      expect(doc.querySelectorAll('DOType[id="OpenSCD_DPC"]').length).to.equal(
        1
      );
    }).timeout(5000);
    it('recursively add missing! subsequent DAType elements', async () => {
      expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.not.exist;
      expect(doc.querySelector('DAType[id="OpenSCD_Originator"]')).to.not.exist;
      expect(doc.querySelector('DAType[id="OpenSCD_OperSBOw_Dbpos"]')).to.not
        .exist;
      expect(doc.querySelector('DAType[id="OpenSCD_Cancel_Dbpos"]')).to.not
        .exist;
      expect(
        doc.querySelector('DAType[id="OpenSCD_OperSBOw_BehaviourModeKind"]')
      ).to.not.exist;
      expect(doc.querySelector('DAType[id="OpenSCD_Cancel_BehaviourModeKind"]'))
        .to.not.exist;
      expect(doc.querySelector('DAType[id="OpenSCD_PulseConfig"]')).to.not
        .exist;
      selector.value = '#OpenSCD_CSWI_noPB';
      await parent.requestUpdate(); // selector updates autoimport
      idField.maybeValue = 'myCSWI';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.exist;
      expect(
        doc.querySelectorAll('DAType[id="OpenSCD_Originator"]').length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('DAType[id="OpenSCD_OperSBOw_Dbpos"]').length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('DAType[id="OpenSCD_Cancel_Dbpos"]').length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('DAType[id="OpenSCD_OperSBOw_BehaviourModeKind"]')
          .length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('DAType[id="OpenSCD_Cancel_BehaviourModeKind"]')
          .length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('DAType[id="OpenSCD_PulseConfig"]').length
      ).to.equal(1);
    }).timeout(5000);
    it('recursively add missing! subsequent EnumType elements', async () => {
      expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.not.exist;
      expect(doc.querySelector('EnumType[id="OriginatorCategoryKind"]')).to.not
        .exist;
      expect(doc.querySelector('EnumType[id="BehaviourModeKind"]')).to.not
        .exist;
      expect(doc.querySelector('EnumType[id="CtlModelKind"]')).to.not.exist;
      expect(doc.querySelector('EnumType[id="HealthKind"]')).to.not.exist;
      expect(doc.querySelector('EnumType[id="OutputSignalKind"]')).to.not.exist;
      selector.value = '#OpenSCD_CSWI_noPB';
      await parent.requestUpdate(); // selector updates autoimport
      idField.maybeValue = 'myCSWI';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('LNodeType[id="myCSWI"]')).to.exist;
      expect(
        doc.querySelectorAll('EnumType[id="OriginatorCategoryKind"]').length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('EnumType[id="BehaviourModeKind"]').length
      ).to.equal(1);
      expect(
        doc.querySelectorAll('EnumType[id="CtlModelKind"]').length
      ).to.equal(1);
      expect(doc.querySelectorAll('EnumType[id="HealthKind"]').length).to.equal(
        1
      );
      expect(
        doc.querySelectorAll('EnumType[id="OutputSignalKind"]').length
      ).to.equal(1);
    }).timeout(5000);
    it('respects the sequence defined in the standard', async () => {
      selector.value = '#OpenSCD_CSWI_noPB';
      await parent.requestUpdate(); // selector updates autoimport
      idField.maybeValue = 'myGeneralLNodeType';
      await parent.requestUpdate();
      primayAction.click();
      await parent.updateComplete;
      const element = doc.querySelector('LNodeType[id="myGeneralLNodeType"]');
      expect(element?.nextElementSibling?.tagName).to.equal('LNodeType');
      expect(element?.previousElementSibling).to.be.null;
    }).timeout(5000);

    describe('opens a createLNodeTypeHelperWizard', () => {
      let saveButton: HTMLElement;
      let beh: Select;
      let enaOpn: Select;
      let enaCls: Select;
      let ens: Element;
      let sps: Element;
      let ensId: string;
      let spsId: string;

      beforeEach(async () => {
        selector.value = 'CILO';
        idField.maybeValue = 'myGeneralLNodeType';
        await parent.updateComplete;

        (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'c-button[slot="primaryAction"]'
          )
        )).click();
        await parent.updateComplete;
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation

        saveButton = parent.wizardUI.shadowRoot!.querySelector<HTMLElement>(
          'c-button[slot="primaryAction"]'
        )!;

        beh = parent.wizardUI.shadowRoot!.querySelector<Select>(
          'wizard-select:nth-child(2)'
        )!;
        enaOpn = parent.wizardUI.shadowRoot!.querySelector<Select>(
          'wizard-select:nth-child(21)'
        )!;
        enaCls = parent.wizardUI.shadowRoot!.querySelector<Select>(
          'wizard-select:nth-child(22)'
        )!;

        ens = doc.querySelector('DOType[cdc="ENS"]')!;
        sps = doc.querySelector('DOType[cdc="SPS"]')!;
        ensId = ens?.getAttribute('id') ?? '';
        spsId = sps?.getAttribute('id') ?? '';
      });

      it('looks like the latest snapshot', () => {
        expect(parent.wizardUI.dialog).to.equalSnapshot();
      });

      it('filters the type selection for each DO to fit the cdc', () => {
        expect(beh.querySelectorAll('mwc-list-item').length).to.equal(
          doc.querySelectorAll('DOType[cdc="ENS"]').length
        );
      });

      it('requires all mandatory DOs to be defined', async () => {
        beh.value = ensId;
        await parent.updateComplete;
        saveButton.click();
        await parent.updateComplete;
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation

        expect(parent.wizardUI.dialog).to.exist;
        expect(
          doc.querySelector(
            'LNodeType[id="myGeneralLNodeType"][lnClass="CILO"]'
          )
        ).to.not.exist;
      });
      it('adds new LNodeType with correct id and lnClass', async () => {
        beh.value = ensId;
        enaOpn.value = spsId;
        enaCls.value = spsId;
        await parent.updateComplete;
        saveButton.click();
        await parent.updateComplete;
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation

        expect(parent.wizardUI.dialog).to.not.exist;
        expect(
          doc.querySelector(
            'LNodeType[id="myGeneralLNodeType"][lnClass="CILO"]'
          )
        ).to.exist;
      });
      it('adds selected DOs to new LNodeType', async () => {
        beh.value = ensId;
        enaOpn.value = spsId;
        enaCls.value = spsId;
        await parent.updateComplete;
        saveButton.click();
        await parent.updateComplete;
        await new Promise(resolve => setTimeout(resolve, 100)); // await animation

        expect(
          doc.querySelector(
            `LNodeType[id="myGeneralLNodeType"][lnClass="CILO"] > DO[name="Beh"][bType="Struct"][type="${ensId}"]`
          )
        ).to.exist;
        expect(
          doc.querySelector(
            `LNodeType[id="myGeneralLNodeType"][lnClass="CILO"] > DO[name="EnaOpn"][bType="Struct"][type="${spsId}"]`
          )
        ).to.exist;
        expect(
          doc.querySelector(
            `LNodeType[id="myGeneralLNodeType"][lnClass="CILO"] > DO[name="EnaCls"][bType="Struct"][type="${spsId}"]`
          )
        ).to.exist;
      });
    });
  });

  describe('defines a dOWizard to edit an existing DO', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let typeSelect: Select;
    let accessControlField: WizardTextField;
    let transientSelect: Select;
    let primaryAction: HTMLElement;
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        lNodeTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI?.dialog?.querySelector(
          'mwc-list-item[value="#Dummy.LLN0>Mod"]'
        )
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-text-field[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-text-field[label="desc"]')
      );
      accessControlField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-text-field[label="accessControl"]'
        )
      );
      typeSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="type"]')
      );
      transientSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="transient"]')
      );
      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'c-button[slot="primaryAction"]'
        )
      );
      deleteButton = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector('c-button[icon="delete"]')
      );
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
    it('edits DO attributes name', async () => {
      expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'))
        .to.exist;
      nameField.value = 'NewMod';
      await parent.requestUpdate();
      primaryAction.click();
      await parent.requestUpdate();
      expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'))
        .to.not.exist;
      expect(
        doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]')
      ).to.exist;
    });
    it('edits yet another attribute of the DO element', async () => {
      expect(
        doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]')
      ).to.not.exist;

      nameField.value = 'NewMod';
      descField.nullable = false;
      descField.value = 'myDesc';
      typeSelect.value = 'Dummy.CMV';
      accessControlField.nullable = false;
      accessControlField.maybeValue = 'myAccessControl';
      transientSelect.value = 'true';

      await parent.requestUpdate();
      primaryAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          `LNodeType[id="Dummy.LLN0"] >` +
            `DO[name="NewMod"][desc="myDesc"][type="Dummy.CMV"][accessControl="myAccessControl"][transient="true"]`
        )
      ).to.exist;
    });
    it('deletes the DO element on delete button click', async () => {
      expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'))
        .to.exist;
      expect(
        doc.querySelectorAll('LNodeType[id="Dummy.LLN0"] > DO').length
      ).to.equal(4);
      deleteButton.click();
      await parent.requestUpdate();
      expect(doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]'))
        .to.not.exist;
      expect(
        doc.querySelectorAll('LNodeType[id="Dummy.LLN0"] > DO').length
      ).to.equal(3);
    });
    it('does not edit DO element without changes', async () => {
      const originData = (<Element>(
        doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]')
      )).cloneNode(true);
      primaryAction.click();
      await parent.requestUpdate();
      expect(
        originData.isEqualNode(
          doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="Mod"]')
        )
      ).to.be.true;
    });
    it('filters the type selector to DOTypes', async () => {
      expect(typeSelect!.querySelectorAll('mwc-list-item').length).to.equal(
        doc.querySelectorAll('DOType').length
      );
    });
  });

  describe('defines a dOWizard to create a new DO element', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let typeSelect: Select;
    let accessControlField: WizardTextField;
    let transientSelect: Select;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      (<ListItem>(
        lNodeTypeList.querySelector('mwc-list-item[value="#Dummy.LLN0"]')
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelectorAll(
          'c-button[icon="playlist_add"]'
        )[0]
      )).click();
      await parent.requestUpdate();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-text-field[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-text-field[label="desc"]')
      );
      accessControlField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-text-field[label="accessControl"]'
        )
      );
      typeSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="type"]')
      );
      transientSelect = <Select>(
        parent.wizardUI.dialog?.querySelector('mwc-select[label="transient"]')
      );
      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'c-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', () => {
      expect(parent.wizardUI.dialog).to.equalSnapshot();
    });
    it('creates a new DO element', async () => {
      expect(
        doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]')
      ).to.not.exist;
      nameField.value = 'NewMod';
      typeSelect.value = 'Dummy.CMV';
      await parent.requestUpdate();
      primaryAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]:not([desc])[type="Dummy.CMV"]:not([accessControl]):not([transient])'
        )
      ).to.exist;
    });
    it('creates yet another new DO element', async () => {
      expect(
        doc.querySelector('LNodeType[id="Dummy.LLN0"] > DO[name="NewMod"]')
      ).to.not.exist;

      nameField.value = 'NewMod';
      descField.nullable = false;
      descField.value = 'myDesc';
      typeSelect.value = 'Dummy.CMV';
      accessControlField.nullable = false;
      accessControlField.maybeValue = 'myAccessControl';
      transientSelect.value = 'true';

      await parent.requestUpdate();
      primaryAction.click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          `LNodeType[id="Dummy.LLN0"] >` +
            `DO[name="NewMod"][desc="myDesc"][type="Dummy.CMV"][accessControl="myAccessControl"][transient="true"]`
        )
      ).to.exist;
    });
  });
});
