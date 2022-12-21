import { html, TemplateResult } from 'lit-html';

import '../wizard-textfield.js';
import '../wizard-select.js';
import { Wizard, WizardInput } from '../foundation.js';
import { logSettingsGroupServicesWizardPage } from './service-log-settingsgroup.js';

export function createFormElementFromInput(input: WizardInput): TemplateResult {
  let templateResult: TemplateResult = html``;
  switch (input.kind) {
    case 'TextField':
    default:
      templateResult = html`<wizard-textfield
        label=${input.label}
        .maybeValue=${input.maybeValue}
        .helper=${input.helper || ''}
        ?required=${input.required}
        .validationMessage=${input.validationMessage || ''}
        .pattern=${input.pattern || ''}
        .defaultValue=${input.default || ''}
        ?dialogInitialFocus=${input.dialogInitialFocus}
        ?nullable=${input.nullable}
      ></wizard-textfield>`;
      break;
    case 'Checkbox':
      templateResult = html`<wizard-checkbox
        label=${input.label}
        .maybeValue=${input.maybeValue}
        .helper=${input.helper || ''}
        ?defaultValue=${input.default}
        ?dialogInitialFocus=${input.dialogInitialFocus}
        ?nullable=${input.nullable}
      ></wizard-checkbox>`;
      break;
    case 'Select':
      templateResult = html`<wizard-select
        label=${input.label}
        .maybeValue=${input.maybeValue}
        .validationMessage=${input.valadationMessage || ''}
        .defaultValue=${input.default || ''}
        ?dialogInitialFocus=${input.dialogInitialFocus}
        ?nullable=${input.nullable}
      >
        ${input.values.map(value => {
          return html`<mwc-list-item .value=${value}>
            ${value}
          </mwc-list-item>`;
        })}
      </wizard-select>`;
      break;
  }

  return templateResult;
}

export function createFormElementFromInputs(
  inputs: WizardInput[]
): TemplateResult[] {
  return inputs.map(input => createFormElementFromInput(input));
}

export function createFormDivider(header?: string): TemplateResult {
  return html`<wizard-divider .header=${header}></wizard-divider>`;
}

export function editServicesWizard(services: Element): Wizard {
  return [logSettingsGroupServicesWizardPage(services)]
    .filter(page => page !== null)
    .map(page => page!);
}
