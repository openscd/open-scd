import { html, TemplateResult } from 'lit-html';

import '@openscd/open-scd/src/wizard-textfield.js';
import '@openscd/open-scd/src/wizard-select.js';
import { Wizard, WizardInput } from '@openscd/open-scd/src/foundation.js';
import { createLogSettingsGroupServicesWizardPage } from './service-log-settingsgroup.js';
import { createReportConfigurationsWizardPage } from './service-report-configurations.js';
import { createGSEControlWizardPage } from './service-GSEControl.js';
import { createNetworkingWizardPage } from './service-networking.js';
import { createSampledValuesWizardPage } from './service-sampled-values.js';
import { createClientServerConfigurationsWizardPage } from './service-clientServer-configurations.js';

export function isEmptyObject<T = any>(
  target: T,
  dealedAsEmpty: any[] = [null, undefined, '']
): boolean {
  return (
    target === null
      ? [false]
      : Object.keys(target as Object).flatMap(key => {
          const value: any = (target as any)[key];
          if (typeof value === 'object') {
            return isEmptyObject(value);
          } else {
            return [dealedAsEmpty.includes(value)];
          }
        })
  ).includes(true);
}

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
        disabled
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
        disabled
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
        disabled
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

export function createFormElementsFromInputs(
  inputs: WizardInput[]
): TemplateResult[] {
  return inputs.map(input => createFormElementFromInput(input));
}

export function createFormDivider(header?: string): TemplateResult {
  return html`<wizard-divider .header=${header}></wizard-divider>`;
}

export function editServicesWizard(services: Element): Wizard {
  return [
    createLogSettingsGroupServicesWizardPage(services),
    createReportConfigurationsWizardPage(services),
    createGSEControlWizardPage(services),
    createNetworkingWizardPage(services),
    createSampledValuesWizardPage(services),
    createClientServerConfigurationsWizardPage(services),
  ]
    .filter(page => page !== null)
    .map(page => page!);
}
