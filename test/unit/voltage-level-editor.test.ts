import { fixture, html, expect } from '@open-wc/testing';

import '@material/mwc-dialog';

import '../../src/wizard-textfield.js';
import '../../src/editors/substation/voltage-level-editor.js';
import { VoltageLevelEditor } from '../../src/editors/substation/voltage-level-editor.js';
import {
  CloseableElement,
  isCreate,
  WizardInput,
} from '../../src/foundation.js';
import { getDocument } from '../data.js';

describe('voltage-level-editor', () => {
  let element: VoltageLevelEditor;
  const validSCL = getDocument();
  beforeEach(async () => {
    element = <VoltageLevelEditor>(
      await fixture(
        html`<voltage-level-editor
          .element=${validSCL.querySelector('VoltageLevel')}
          .parent=${validSCL.querySelector('Substation')}
        ></voltage-level-editor>`
      )
    );
  });

  it('has a name property', () =>
    expect(element).to.have.property('name', 'E1'));

  it('has a desc property', () =>
    expect(element).to.have.property('desc', 'Voltage Level'));

  it('renders header with name and desc visible', () => {
    expect(element).property('header').to.contain.text('E1');
    expect(element).property('header').to.contain.text('Voltage Level');
  });
});

describe('VoltageLevelEditor', () => {
  const noOp = () => {
    return;
  };
  const newWizard = (done = noOp) => {
    const element = document.createElement('mwc-dialog');
    element.close = done;
    return element;
  };

  let inputs: WizardInput[];
  beforeEach(async () => {
    inputs = await Promise.all(
      ['name', 'desc', 'nomFreq', 'numPhases', 'Voltage'].map(
        label =>
          <Promise<WizardInput>>(
            fixture(html`<wizard-textfield label=${label}></wizard-textfield>`)
          )
      )
    );
  });

  describe('createAction', () => {
    let parent: Element;
    beforeEach(() => {
      parent = new DOMParser().parseFromString(
        '<parent></parent>',
        'application/xml'
      ).documentElement;
    });

    it('returns a WizardAction which returns a Create EditorAction', () => {
      const wizardAction = VoltageLevelEditor.createAction(parent);
      expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isCreate);
    });

    it('closes the wizard before returning', done => {
      const wizardAction = VoltageLevelEditor.createAction(parent);
      wizardAction(inputs, newWizard(done));
    });
  });
});
