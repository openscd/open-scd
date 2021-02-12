import { fixture, html, expect } from '@open-wc/testing';
import {
  WizardInput,
  isCreate,
  isDelete,
  isSimple,
  ComplexAction,
} from '../../../src/foundation.js';
import { ConnectedAPEditor } from '../../../src/editors/communication/connectedap-editor.js';

describe('ConnectedAPEditor', () => {
  describe('has a editorAction that', () => {
    describe('with existing Address element', () => {
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
          ['IP', 'IP-SUBNET', 'IP-GATEWAY'].map(
            label =>
              <Promise<WizardInput>>(
                fixture(
                  html`<wizard-textfield label=${label}></wizard-textfield>`
                )
              )
          )
        );
      });

      let scl: Element;
      let element: Element;
      beforeEach(async () => {
        scl = new DOMParser().parseFromString(
          `<SCL>
                <Communication>
                  <SubNetwork name="StationBus">
                    <ConnectedAP iedName="IED1" apName="P1">
                      <Address>
                        <P type="IP">192.168.210.111</P>
                        <P type="IP-SUBNET">255.255.255.0</P>
                        <P type="IP-GATEWAY">192.168.210.1</P>
                        <P type="OSI-AP-Title">1,3,9999,23</P>
                        <P type="OSI-AE-Qualifier">23</P>
                        <P type="OSI-PSEL">00000001</P>
                        <P type="OSI-SSEL">0001</P>
                        <P type="OSI-TSEL">0001</P>
                      </Address>
                    </ConnectedAP>
                  </SubNetwork>
                </Communication>
              </SCL>
              `,
          'application/xml'
        ).documentElement;

        element = scl.querySelector('ConnectedAP')!;
      });

      it('returns a WizardAction with the returned EditorAction beeing a ComplexAction', () => {
        const wizardAction = ConnectedAPEditor.editAction(element);
        expect(wizardAction(inputs, newWizard()).length).to.equal(1);
        expect(wizardAction(inputs, newWizard())[0]).to.not.satisfy(isSimple);
      });

      it('the complexAction ncontaining two EditorActions', () => {
        const wizardAction = ConnectedAPEditor.editAction(element);
        expect(
          (<ComplexAction>wizardAction(inputs, newWizard())[0]).actions.length
        ).to.equal(2);
      });

      it('the 1st beeing an Delete', () => {
        const wizardAction = ConnectedAPEditor.editAction(element);
        expect(
          (<ComplexAction>wizardAction(inputs, newWizard())[0]).actions[0]
        ).to.satisfy(isDelete);
      });

      it('the 2nd beeing an Create', () => {
        const wizardAction = ConnectedAPEditor.editAction(element);
        expect(
          (<ComplexAction>wizardAction(inputs, newWizard())[0]).actions[1]
        ).to.satisfy(isCreate);
      });
    });
    describe('with missing Address element', () => {
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
          ['IP', 'IP-SUBNET', 'IP-GATEWAY'].map(
            label =>
              <Promise<WizardInput>>(
                fixture(
                  html`<wizard-textfield label=${label}></wizard-textfield>`
                )
              )
          )
        );
      });

      let scl: Element;
      let element: Element;
      beforeEach(async () => {
        scl = new DOMParser().parseFromString(
          `<SCL>
                <Communication>
                  <SubNetwork name="StationBus">
                    <ConnectedAP iedName="IED1" apName="P1">
                    </ConnectedAP>
                  </SubNetwork>
                </Communication>
              </SCL>
              `,
          'application/xml'
        ).documentElement;

        element = scl.querySelector('ConnectedAP')!;
      });

      it('returns a WizardAction with the returned EditorAction beeing a ComplexAction', () => {
        const wizardAction = ConnectedAPEditor.editAction(element);
        expect(wizardAction(inputs, newWizard()).length).to.equal(1);
        expect(wizardAction(inputs, newWizard())[0]).to.not.satisfy(isSimple);
      });

      it('the complexAction ncontaining one EditorActions', () => {
        const wizardAction = ConnectedAPEditor.editAction(element);
        expect(
          (<ComplexAction>wizardAction(inputs, newWizard())[0]).actions.length
        ).to.equal(1);
      });

      it('beeing an Delete', () => {
        const wizardAction = ConnectedAPEditor.editAction(element);
        expect(
          (<ComplexAction>wizardAction(inputs, newWizard())[0]).actions[0]
        ).to.satisfy(isCreate);
      });
    });
  });
});
