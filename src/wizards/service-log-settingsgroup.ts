import { TemplateResult } from 'lit-html';
import { get } from 'lit-translate';
import { WizardPage } from '../foundation.js';

import {
  createFormDivider,
  createFormElementsFromInputs,
  isEmptyObject,
} from './services.js';

interface LogSettings {
  cbName: string | null;
  datSet: string | null;
  logEna: string | null;
  trgOps: string | null;
  intgPd: string | null;
}

interface ConfLogControl {
  max: string | null;
}

interface ClientServices {
  readLog: string | null;
}

interface SGEdit {
  resvTms: string | null;
}

interface ConfSG {
  resvTms: string | null;
}
interface ContentOptions {
  logSettings: LogSettings;
  confLogControl: ConfLogControl;
  clientServices: ClientServices;
  sGEdit: SGEdit;
  confSG: ConfSG;
}

export function createLogSettingsGroupServicesWizardPage(
  services: Element
): WizardPage | null {
  const content: TemplateResult[] | null =
    createLogSettingsGroupServicesWizard(services);

  return content
    ? {
        title: get('wizard.title.edit', { tagName: 'Services' }),
        content: [...content],
      }
    : null;
}

function createLogSettingsGroupServicesWizard(
  parent: Element
): TemplateResult[] | null {
  const content: ContentOptions = {
    logSettings: {
      cbName:
        parent.querySelector('LogSettings')?.getAttribute('cbName') ?? null,
      datSet:
        parent.querySelector('LogSettings')?.getAttribute('datSet') ?? null,
      logEna:
        parent.querySelector('LogSettings')?.getAttribute('logEna') ?? null,
      intgPd:
        parent.querySelector('LogSettings')?.getAttribute('trgOps') ?? null,
      trgOps:
        parent.querySelector('LogSettings')?.getAttribute('intgPd') ?? null,
    },
    confLogControl: {
      max: parent.querySelector('ConfLogControl')?.getAttribute('max') ?? null,
    },
    clientServices: {
      readLog:
        parent.querySelector('CientServices')?.getAttribute('readLog') ?? null,
    },
    sGEdit: {
      resvTms:
        parent
          .querySelector('SettingGroups > SGEdit')
          ?.getAttribute('resvTms') || null,
    },
    confSG: {
      resvTms:
        parent
          .querySelector('SettingGroups > ConfSG')
          ?.getAttribute('resvTms') || null,
    },
  };

  return isEmptyObject(content)
    ? null
    : [
        createFormDivider('Log Control Configuration'),
        ...createFormElementsFromInputs([
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
        ...createFormElementsFromInputs([
          {
            kind: 'TextField',
            label: 'Max',
            required: true,
            helper:
              'The maximum number of log control blocks instantiable by system configuration tool',
            maybeValue: content.confLogControl.max,
          },
        ]),
        createFormDivider('Client Capabilities'),
        ...createFormElementsFromInputs([
          {
            kind: 'Checkbox',
            label: 'read Log',
            nullable: true,
            helper:
              'Whether IED supports services to handle logs as a client (see IEC 61850-7-2 for further information)',
            maybeValue: content.clientServices.readLog,
          },
        ]),
        createFormDivider('Setting Group'),
        ...createFormElementsFromInputs([
          {
            kind: 'Checkbox',
            label: 'SGEdit',
            nullable: true,
            helper:
              'Whether IED allows manipulating editable setting groups online',
            maybeValue: content.sGEdit.resvTms,
          },
          {
            kind: 'Checkbox',
            label: 'ConfSG',
            nullable: true,
            helper:
              'Whether IED accepts the system configuration tool to configure the number of setting groups',
            maybeValue: content.confSG.resvTms,
          },
        ]),
      ];
}
