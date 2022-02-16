import {css, customElement, html, LitElement, property, TemplateResult} from 'lit-element';
import {get, translate} from "lit-translate";

import {Wizard, WizardAction, WizardInput} from '../foundation.js';
import {Nsdoc} from "../foundation/nsdoc.js";

import {
  getPrivateTextValue,
  hasPrivateElement,
  iedHeader,
  lDeviceHeader,
  lnHeader,
  LOCAMATION_PRIVATE
} from "./foundation.js";
import Protocol from "devtools-protocol";
import integer = Protocol.integer;

@customElement('locamation-ln-edit')
export class LocamationVMUEditElement extends LitElement {
  @property({type: Element})
  logicalNode!: Element;
  @property()
  nsdoc!: Nsdoc;

  save(inputs: WizardInput[]): WizardAction[] {
    // if (!this.fieldsChanged(inputs)) {
      return [];
    // }
    //
    // cloneElement(element, { name, desc });
    //
    // const oldPrivateElement = getPrivate(oldElement, 'compas_substation');
    // const newPrivateElement = getOrCreatePrivate(oldElement, newElement, 'compas_substation');
    //
    // const compasName = getInputFieldValue(inputs, 'compasName');
    // processPrivateTextElement(newPrivateElement, EXTENSION_NAMESPACE, 'compas', 'CompasName', compasName);
    //
    // if (oldPrivateElement) {
    //   return [{old: {element: oldPrivateElement}, new: {element: newPrivateElement}}];
    // }
    // return [{new: {parent: newElement, element: newPrivateElement}}];
  }
  //
  // private fieldsChanged(inputs: WizardInput[]): boolean {
  //   const oldIdentifier= getPrivateTextValue(this.logicalNode, LOCAMATION_PRIVATE, 'IDENTIFIER');
  //   const oldChannel = getPrivateTextValue(this.logicalNode, LOCAMATION_PRIVATE, 'CHANNEL');
  //   const oldTransformPrimary = getPrivateTextValue(this.logicalNode, LOCAMATION_PRIVATE, 'TRANSFORM-PRIMARY');
  //   const oldTransformSecondary = getPrivateTextValue(this.logicalNode, LOCAMATION_PRIVATE, 'TRANSFORM-SECONDARY');
  //   return inputFieldChanged(inputs, 'Identifier', oldIdentifier)
  //     || inputFieldChanged(inputs, 'Channel', oldChannel)
  //     || inputFieldChanged(inputs, 'TransformPrimary', oldTransformPrimary)
  //     || inputFieldChanged(inputs, 'TransformSecondary', oldTransformSecondary);
  // }

  private getIdentifierPart(partNr: integer): string {
    const identifier = getPrivateTextValue(this.logicalNode, LOCAMATION_PRIVATE, 'IDENTIFIER')?? '';
    const parts = identifier.trim().split('.');
    if (parts.length < partNr) {
      return '';
    }
    return parts[partNr];
  }

  render(): TemplateResult {
    const lDevice = this.logicalNode.closest('LDevice')!;
    const ied = lDevice.closest('IED')!;
    return html `
      <wizard-textfield label="IED"
                        .maybeValue=${iedHeader(ied)}
                        helper="${translate('locamation.vmu.ied.name')}"
                        disabled>
      </wizard-textfield>
      <wizard-textfield label="Logical Device"
                        .maybeValue=${lDeviceHeader(lDevice)}
                        helper="${translate('locamation.vmu.ldevice.name')}"
                        disabled>
      </wizard-textfield>
      <wizard-textfield label="Logical Node"
                        .maybeValue=${lnHeader(this.logicalNode, this.nsdoc)}
                        helper="${translate('locamation.vmu.ln.name')}"
                        disabled>
      </wizard-textfield>

      <div id="Identifier">
        <wizard-textfield label="IdentifierPart0"
                          .maybeValue=${this.getIdentifierPart(0)}
                          helper="Identifier"
                          required>
        </wizard-textfield>
        <wizard-textfield label="IdentifierPart1"
                          .maybeValue=${this.getIdentifierPart(1)}
                          helper="Identifier"
                          required>
        </wizard-textfield>
        <wizard-textfield label="IdentifierPart2"
                          .maybeValue=${this.getIdentifierPart(2)}
                          helper="Identifier"
                          required>
        </wizard-textfield>
      </div>
      ${hasPrivateElement(this.logicalNode, LOCAMATION_PRIVATE, 'SUM') ?
        html `<wizard-textfield label="Sum"
                                  .maybeValue=${getPrivateTextValue(this.logicalNode, LOCAMATION_PRIVATE, 'SUM')}
                                  helper="Sum"
                                  required>
              </wizard-textfield>` :
        html `<wizard-textfield label="Channel"
                                  .maybeValue=${getPrivateTextValue(this.logicalNode, LOCAMATION_PRIVATE, 'CHANNEL')}
                                  helper="Channel"
                                  required>
               </wizard-textfield>`
      }
      <wizard-textfield label="TransformPrimary"
                        .maybeValue=${getPrivateTextValue(this.logicalNode, LOCAMATION_PRIVATE, 'TRANSFORM-PRIMARY')}
                        helper="TransformPrimary"
                        required>
      </wizard-textfield>
      <wizard-textfield label="TransformSecondary"
                        .maybeValue=${getPrivateTextValue(this.logicalNode, LOCAMATION_PRIVATE, 'TRANSFORM-SECONDARY')}
                        helper="TransformSecondary"
                        required>
      </wizard-textfield>
    `;
  }

  static styles = css`
    :host {
      width: 20vw;
    }

    * {
      display: block;
      margin-top: 16px;
    }
  `
}

export function locamationLNEditWizard(logicalNode: Element, nsdoc: Nsdoc): Wizard {
  function save() {
    return function (inputs: WizardInput[], wizard: Element): WizardAction[] {
      const locamationVMUEditElement = <LocamationVMUEditElement>wizard.shadowRoot!.querySelector('locamation-ln-edit')
      return locamationVMUEditElement.save(inputs);
    };
  }

  return [
    {
      title: get('locamation.vmu.ln.editTitle'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: save(),
      },
      content: [
        html`<locamation-ln-edit .logicalNode="${logicalNode}" .nsdoc="${nsdoc}"></locamation-ln-edit>`,
      ],
    },
  ];
}

