import {css, customElement, html, LitElement, property, TemplateResult} from 'lit-element';
import {get, translate} from "lit-translate";

import {patterns} from "../wizards/foundation/limits.js";
import {checkValidity, ComplexAction, Wizard, WizardAction, WizardInput, wizardInputSelector} from '../foundation.js';
import {Nsdoc} from "../foundation/nsdoc.js";

import '../wizard-textfield.js';

import {
  createEditorAction,
  getInputFieldValue,
  getPrivate,
  getPrivateTextValue,
  hasPrivateElement,
  iedHeader,
  inputFieldChanged,
  lDeviceHeader,
  lnHeader,
} from "./foundation.js";

@customElement('locamation-ln-edit')
export class LocamationVMUEditElement extends LitElement {
  @property({type: Element})
  logicalNode!: Element;
  @property()
  nsdoc!: Nsdoc;

  save(): WizardAction[] {
    const inputs: WizardInput[] = Array.from(this.shadowRoot!.querySelectorAll(wizardInputSelector));
    const locamationPrivate = getPrivate(this.logicalNode);

    if (!this.fieldsChanged(locamationPrivate, inputs) || !this.checkValidityInputs(inputs)) {
      return [];
    }

    const complexAction: ComplexAction = {
      actions: [],
      title: get('locamation.vmu.updateAction', {lnName: lnHeader(this.logicalNode, this.nsdoc)}),
    };

    complexAction.actions.push(...createEditorAction(locamationPrivate, 'IDENTIFIER', getInputFieldValue(inputs, 'Identifier')));
    if (hasPrivateElement(this.logicalNode, 'SUM')) {
      complexAction.actions.push(...createEditorAction(locamationPrivate, 'SUM', getInputFieldValue(inputs, 'Sum')));
    } else {
      complexAction.actions.push(...createEditorAction(locamationPrivate, 'CHANNEL', getInputFieldValue(inputs, 'Channel')));
    }
    complexAction.actions.push(...createEditorAction(locamationPrivate, 'TRANSFORM-PRIMARY', getInputFieldValue(inputs, 'TransformPrimary')));
    complexAction.actions.push(...createEditorAction(locamationPrivate, 'TRANSFORM-SECONDARY', getInputFieldValue(inputs, 'TransformSecondary')));

    return complexAction.actions.length ? [complexAction] : [];
  }

  private fieldsChanged(locamationPrivate: Element, inputs: WizardInput[]): boolean {
    const oldIdentifier= getPrivateTextValue(locamationPrivate, 'IDENTIFIER');
    const oldChannel = getPrivateTextValue(locamationPrivate, 'CHANNEL');
    const oldSum = getPrivateTextValue(locamationPrivate, 'SUM');
    const oldTransformPrimary = getPrivateTextValue(locamationPrivate, 'TRANSFORM-PRIMARY');
    const oldTransformSecondary = getPrivateTextValue(locamationPrivate, 'TRANSFORM-SECONDARY');

    return inputFieldChanged(inputs, 'Identifier', oldIdentifier)
      || (hasPrivateElement(locamationPrivate, 'SUM') ? inputFieldChanged(inputs, 'Sum', oldSum) : false)
      || (hasPrivateElement(locamationPrivate, 'CHANNEL') ? inputFieldChanged(inputs, 'Channel', oldChannel) : false)
      || inputFieldChanged(inputs, 'TransformPrimary', oldTransformPrimary)
      || inputFieldChanged(inputs, 'TransformSecondary', oldTransformSecondary);
  }

  private checkValidityInputs(inputs: WizardInput[]): boolean {
    return Array.from(inputs).every(checkValidity);
  }

  render(): TemplateResult {
    const lDevice = this.logicalNode.closest('LDevice')!;
    const ied = lDevice.closest('IED')!;
    const locamationPrivate = getPrivate(this.logicalNode);

    // Depending on the value of the class the pattern for the CIM or VIM for SUM/CHANNEL will change.
    let channelPattern = '[0-5]';
    let sumPattern = '[0-5],[0-5],[0-5]';
    if (this.logicalNode.getAttribute('lnClass') === 'TVTR') {
      channelPattern = '[0-2]';
      sumPattern = '[0-2],[0-2],[0-2]';
    }

    return html `
      <wizard-textfield label="${translate('locamation.vmu.ied.name')}"
                        .maybeValue=${iedHeader(ied)}
                        disabled>
      </wizard-textfield>
      <wizard-textfield label="${translate('locamation.vmu.ldevice.name')}"
                        .maybeValue=${lDeviceHeader(lDevice)}
                        disabled>
      </wizard-textfield>
      <wizard-textfield label="${translate('locamation.vmu.ln.name')}"
                        .maybeValue=${lnHeader(this.logicalNode, this.nsdoc)}
                        disabled>
      </wizard-textfield>

      <wizard-textfield label="${translate('locamation.vmu.version')}"
                        .maybeValue=${getPrivateTextValue(locamationPrivate, 'VERSION')}
                        disabled>
      </wizard-textfield>

      <wizard-textfield id="Identifier"
                        label="Identifier"
                        .maybeValue=${getPrivateTextValue(locamationPrivate, 'IDENTIFIER')}
                        helper="${translate('locamation.vmu.identifierHelper')}"
                        pattern="^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\\.(?!$)|$)){3}$"
                        required
                        dialogInitialFocus>
      </wizard-textfield>

      ${hasPrivateElement(locamationPrivate, 'SUM') ?
        html `<wizard-textfield id="Sum"
                                label="Sum"
                                .maybeValue=${getPrivateTextValue(locamationPrivate, 'SUM')}
                                helper="The collection of three channel numbers for which the sum of currents or voltages will be calculated. The numbers are separated by commas. Values for the current sensor range from 0 - 5, for the voltage sensor 0-2."
                                pattern="${sumPattern}"
                                required>
              </wizard-textfield>` : html ``
      }
      ${hasPrivateElement(locamationPrivate, 'CHANNEL') ?
        html `<wizard-textfield id="Channel"
                                label="Channel"
                                .maybeValue=${getPrivateTextValue(locamationPrivate, 'CHANNEL')}
                                helper="The channel number on the sensor. Values for the current sensor range from 0 - 5, for the voltage sensor 0-2."
                                pattern="${channelPattern}"
                                required>
        </wizard-textfield>` : html ``
      }

      <wizard-textfield id="TransformPrimary"
                        label="Transform Primary"
                        .maybeValue=${getPrivateTextValue(locamationPrivate, 'TRANSFORM-PRIMARY')}
                        helper="The nominator of the ratio of the measement transformer."
                        pattern="${patterns.unsigned}"
                        required>
      </wizard-textfield>
      <wizard-textfield id="TransformSecondary"
                        label="Transform Secondary"
                        .maybeValue=${getPrivateTextValue(locamationPrivate, 'TRANSFORM-SECONDARY')}
                        helper="The denominator of the ratio of the measement transformer."
                        pattern="${patterns.unsigned}"
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
      return locamationVMUEditElement.save();
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

