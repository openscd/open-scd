import { TemplateResult } from 'lit-html';

import { createFormDivider, createFormElementFromInputs } from './services.js';

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

export function createLogSettingsGroupServicesWizard(
  parent: Element
): TemplateResult[] {
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
