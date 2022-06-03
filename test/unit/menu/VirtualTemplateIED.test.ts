import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import {
  Create,
  isCreate,
  WizardInputElement,
} from '../../../src/foundation.js';
import VirtualTemplateIED from '../../../src/menu/VirtualTemplateIED.js';
import { CheckListItem } from '@material/mwc-list/mwc-check-list-item';

describe('Plugin that creates with some user input a virtual template IED - SPECIFICATION', () => {
  if (customElements.get('virtual-template-i-e-d') === undefined)
    customElements.define('virtual-template-i-e-d', VirtualTemplateIED);

  let doc: XMLDocument;
  let parent: MockWizard;
  let element: VirtualTemplateIED;

  let primaryAction: HTMLElement;
  let inputs: WizardInputElement[];
  let checkItems: CheckListItem[];

  let editorAction: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/virtualied/specificfromfunctions.ssd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(html`
      <mock-wizard
        ><virtual-template-i-e-d .doc=${doc}></virtual-template-i-e-d
      ></mock-wizard>
    `);

    element = <VirtualTemplateIED>(
      parent.querySelector('virtual-template-i-e-d')!
    );

    editorAction = spy();
    window.addEventListener('editor-action', editorAction);

    element.run();
    await parent.requestUpdate();

    inputs = Array.from(parent.wizardUI.inputs);

    checkItems = Array.from(
      parent.wizardUI.dialog?.querySelectorAll('mwc-check-list-item') ?? []
    );

    primaryAction = <HTMLElement>(
      parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
    );
  });

  it('looks like the latest snapshot', async () =>
    await expect(parent.wizardUI.dialog).dom.to.equalSnapshot());

  it('shows all LNode that is not class LLN0 as check list items', () =>
    expect(checkItems.length).to.equal(
      doc.querySelectorAll('LNode[iedName="None"]:not([lnClass="LLN0"])').length
    ));

  it('does not trigger any actions with missing input fields', () => {
    primaryAction.click();

    expect(editorAction).to.not.have.been.called;
  });

  it('does not trigger any actions with missing input fields', () => {
    inputs[0].value = 'SomeCompanyName';
    inputs[2].value = 'P1';

    primaryAction.click();

    expect(editorAction).to.not.have.been.called;
  });

  it('does not trigger any actions with missing input fields', () => {
    inputs[0].value = 'SomeCompanyName';
    inputs[2].value = 'P1';

    primaryAction.click();

    expect(editorAction).to.not.have.been.called;
  });

  it('does trigger an create actions if at least one LNode is selected', async () => {
    inputs[0].value = 'SomeCompanyName';
    inputs[2].value = 'P1';

    checkItems[1].selected = true;

    await parent.requestUpdate();

    primaryAction.click();

    expect(editorAction).to.have.been.calledOnce;
  });

  it('allows to add more than one SPECIFICATION type IED to the document', async () => {
    inputs[0].value = 'SomeCompanyName';
    inputs[2].value = 'P1';

    checkItems[1].selected = true;

    await element.requestUpdate();

    primaryAction.click();

    const action = editorAction.args[0][0].detail.action;
    expect(action).to.satisfy(isCreate);

    const createAction = <Create>action;
    expect(createAction.checkValidity).to.exist;
    expect(createAction.checkValidity!()).to.be.true;
  });

  it('IEDs data model show selected logical nodes and its structure', async () => {
    inputs[0].value = 'SomeCompanyName';
    inputs[2].value = 'P1';

    checkItems[1].selected = true;
    checkItems[10].selected = true;
    checkItems[15].selected = true;

    await element.requestUpdate();

    primaryAction.click();

    const action = editorAction.args[0][0].detail.action;
    expect(action).to.satisfy(isCreate);

    const createAction = <Create>action;
    await expect(createAction.new.element).dom.to.equalSnapshot();
  });
});
