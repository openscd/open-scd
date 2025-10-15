import { html } from '../../../_snowpack/pkg/lit-html.js';
import '../../../openscd/src/wizard-textfield.js';
import '../../../openscd/src/wizard-select.js';
import { createLogSettingsGroupServicesWizardPage } from './service-log-settingsgroup.js';
import { createReportConfigurationsWizardPage } from './service-report-configurations.js';
import { createGSEControlWizardPage } from './service-GSEControl.js';
import { createNetworkingWizardPage } from './service-networking.js';
import { createSampledValuesWizardPage } from './service-sampled-values.js';
import { createClientServerConfigurationsWizardPage } from './service-clientServer-configurations.js';
export function isEmptyObject(target, dealedAsEmpty = [null, undefined, '']) {
    return (target === null
        ? [false]
        : Object.keys(target).flatMap(key => {
            const value = target[key];
            if (typeof value === 'object') {
                return isEmptyObject(value);
            }
            else {
                return [dealedAsEmpty.includes(value)];
            }
        })).includes(true);
}
export function createFormElementFromInput(input) {
    let templateResult = html ``;
    switch (input.kind) {
        case 'TextField':
        default:
            templateResult = html `<wizard-textfield
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
            templateResult = html `<wizard-checkbox
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
            templateResult = html `<wizard-select
        label=${input.label}
        .maybeValue=${input.maybeValue}
        .validationMessage=${input.valadationMessage || ''}
        .defaultValue=${input.default || ''}
        ?dialogInitialFocus=${input.dialogInitialFocus}
        ?nullable=${input.nullable}
        disabled
      >
        ${input.values.map(value => {
                return html `<mwc-list-item .value=${value}>
            ${value}
          </mwc-list-item>`;
            })}
      </wizard-select>`;
            break;
    }
    return templateResult;
}
export function createFormElementsFromInputs(inputs) {
    return inputs.map(input => createFormElementFromInput(input));
}
export function createFormDivider(header) {
    return html `<wizard-divider .header=${header}></wizard-divider>`;
}
export function editServicesWizard(services) {
    return [
        createLogSettingsGroupServicesWizardPage(services),
        createReportConfigurationsWizardPage(services),
        createGSEControlWizardPage(services),
        createNetworkingWizardPage(services),
        createSampledValuesWizardPage(services),
        createClientServerConfigurationsWizardPage(services),
    ]
        .filter(page => page !== null)
        .map(page => page);
}
//# sourceMappingURL=services.js.map