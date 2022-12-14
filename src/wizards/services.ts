import { html, TemplateResult } from 'lit-html';
import { get } from 'lit-translate';

import '../wizard-textfield.js';
import '../wizard-select.js';
import { Wizard, WizardInput } from '../foundation.js';

interface LogSettings {
  cbName: string | null;
  datSet: string | null;
  logEna: string | null;
  trgOps: string | null;
  intgPd: string | null;
}

interface ConfLogControl {
  max: number;
}

interface ClientServices {
  readLog: number | null;
}

interface SGEdit {
  resvTms: boolean | null;
}

interface ConfSG {
  resvTms: boolean | null;
}
interface ContentOptions {
  logSettings: LogSettings;
  confLogControl: ConfLogControl;
  clientServices: ClientServices;
  sGEdit: SGEdit;
  confSG: ConfSG;
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
      ></wizard-textfield>`;
      break;
    case 'Checkbox':
      templateResult = html`<wizard-checkbox
        label=${input.label}
        .maybeValue=${input.maybeValue}
        .helper=${input.helper || ''}
        ?defaultValue=${input.default}
        ?dialogInitialFocus=${input.dialogInitialFocus}
      ></wizard-checkbox>`;
      break;
    case 'Select':
      templateResult = html`<wizard-select
        label=${input.label}
        .maybeValue=${input.maybeValue}
        .validationMessage=${input.valadationMessage || ''}
        .defaultValue=${input.default || ''}
        ?dialogInitialFocus=${input.dialogInitialFocus}
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

function createFormDivider(header?: string): TemplateResult {
  return html`<wizard-divider .header=${header}></wizard-divider>`;
}

export function contentServicesWizard(
  content: ContentOptions
): TemplateResult[] {
  return [
    createFormDivider('Log Control Configuration'),
    ...createFormElementFromInputs([
      {
        kind: 'Select',
        label: 'cbName',
        maybeValue: content.logSettings.cbName,
        helper:
          'Whether log control block name is configurable offline (Conf) or fixed (Fix)',
        values: ['Conf', 'Fix'],
        default: 'Fix',
        nullable: true,
      },
      {
        kind: 'Select',
        label: 'datSet',
        maybeValue: content.logSettings.datSet,
        helper:
          'Whether log control blocks data set and its structure is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
        values: ['Dyn', 'Conf', 'Fix'],
        default: 'Fix',
        nullable: true,
      },
      {
        kind: 'Select',
        label: 'logEna',
        maybeValue: content.logSettings.logEna,
        helper:
          'Whether log control blocks attribute logEna is configurable offline (Conf), online (Dyn) or is fixed (Fix)',
        values: ['Dyn', 'Conf', 'Fix'],
        default: 'Fix',
        nullable: true,
      },
      {
        kind: 'Select',
        label: 'trgOps',
        maybeValue: content.logSettings.trgOps,
        helper:
          'Whether log control blocks trigger options are configurable offline (Conf), online(Dyn) or are fixed (Fix)',
        values: ['Dyn', 'Conf', 'Fix'],
        default: 'Fix',
        nullable: true,
      },
      {
        kind: 'Select',
        label: 'intgPd',
        maybeValue: content.logSettings.intgPd,
        helper:
          'Whether log control blocks integrity period is configurable offlien (Conf), online (Dyn), or is fixed (Fix)',
        values: ['Dyn', 'Conf', 'Fix'],
        default: 'Fix',
        nullable: true,
      },
    ]),
    createFormDivider('Log Capabilities'),
    ...createFormElementFromInputs([
      {
        kind: 'TextField',
        label: 'Max',
        required: true,
        helper:
          'The maximum number of log control blocks instantiable by system configuration tool',
        maybeValue: content.confLogControl.max.toString(),
      },
    ]),
    createFormDivider('Client Capabilities'),
    ...createFormElementFromInputs([
      {
        kind: 'TextField',
        label: 'read Log',
        required: false,
        helper:
          'Whether IED supports services to handle logs as a client (see IEC 61850-7-2 for further information)',
        maybeValue: content.clientServices.readLog?.toString() || null,
      },
    ]),
  ];
}

export function editServicesWizard(parent: Element): Wizard {
  console.log('parent:', parent);
  const content: ContentOptions = {
    logSettings: {
      cbName: '',
      datSet: '',
      logEna: '',
      intgPd: '',
      trgOps: '',
    },
    confLogControl: {
      max: 0,
    },
    clientServices: {
      readLog: 0,
    },
    sGEdit: {
      resvTms: false,
    },
    confSG: {
      resvTms: false,
    },
  };

  return [
    {
      title: get('wizard.title.edit', { tagName: 'Services' }),
      content: [...contentServicesWizard(content)],
    },
  ];
}
