import { TemplateResult } from 'lit-html';
import { get } from 'lit-translate';
import { WizardPage } from '../foundation.js';

import {
  createFormDivider,
  createFormElementsFromInputs,
  isEmptyObject,
} from './services.js';

interface ControlBlockConfiguration {
  cbName: string | null;
  datSet: string | null;
  svID: string | null;
  optFields: string | null;
  smpRate: string | null;
  nofASDU: string | null;
  samplesPerSec: string | null;
  synchSrcId: string | null;
  pdcTimeStamp: string | null;
  kdaParticipant: string | null;
  signature: string | null;
  encryption: string | null;
  smpRateVal: string | null;
  samplesPerSecVal: string | null;
  secPerSamplesVal: string | null;
}

interface PublisherCapabilities {
  max: string | null;
  delivery: string | null;
  deliveryConf: string | null;
  sv: string | null;
  rSV: string | null;
}

interface SubscriptionCapabilities {
  sv: string | null;
  maxSMV: string | null;
  rSV: string | null;
}

interface SuperVisionCapabilities {
  maxSv: string | null;
}

interface ContentOptions {
  controlBlockConfiguration: ControlBlockConfiguration;
  publisherCapabilities: PublisherCapabilities;
  subscriptionCapabilities: SubscriptionCapabilities;
  superVisionCapabilities: SuperVisionCapabilities;
}

export function createSampledValuesWizardPage(
  services: Element
): WizardPage | null {
  const content: TemplateResult[] | null = createSampledValuesWizard(services);

  return content
    ? {
        title: get('wizard.title.edit', { tagName: 'Sampled Values' }),
        content: [...content],
      }
    : null;
}

function createSampledValuesWizard(parent: Element): TemplateResult[] | null {
  const content: ContentOptions = {
    controlBlockConfiguration: {
      cbName:
        parent.querySelector('SMVSettings')?.getAttribute('cbName') ?? null,
      datSet:
        parent.querySelector('SMVSettings')?.getAttribute('datSet') ?? null,
      svID: parent.querySelector('SMVSettings')?.getAttribute('svID') ?? null,
      optFields:
        parent.querySelector('SMVSettings')?.getAttribute('optFields') ?? null,
      smpRate:
        parent.querySelector('SMVSettings')?.getAttribute('smpRate') ?? null,
      nofASDU:
        parent.querySelector('SMVSettings')?.getAttribute('nofASDU') ?? null,
      samplesPerSec:
        parent.querySelector('SMVSettings')?.getAttribute('samplesPerSec') ??
        null,
      synchSrcId:
        parent.querySelector('SMVSettings')?.getAttribute('synchSrcId') ?? null,
      pdcTimeStamp:
        parent.querySelector('SMVSettings')?.getAttribute('pdcTimeStamp') ??
        null,
      kdaParticipant:
        parent.querySelector('SMVSettings')?.getAttribute('kdaParticipant') ??
        null,
      signature:
        parent
          .querySelector('SMVSettings > McSecurity')
          ?.getAttribute('signature') ?? null,
      encryption:
        parent
          .querySelector('SMVSettings > McSecurity')
          ?.getAttribute('encryption') ?? null,
      smpRateVal:
        parent.querySelector('SMVSettings>SmpRate')?.childNodes[0]?.nodeValue ??
        null,
      samplesPerSecVal:
        parent.querySelector('SMVSettings > SamplesPerSec')?.childNodes[0]
          ?.nodeValue ?? null,
      secPerSamplesVal:
        parent.querySelector('SMVSettings > SecPerSamples')?.childNodes[0]
          ?.nodeValue ?? null,
    },
    publisherCapabilities: {
      max: parent.querySelector('SMVsc')?.getAttribute('max') ?? null,
      delivery: parent.querySelector('SMVsc')?.getAttribute('delivery') ?? null,
      deliveryConf:
        parent.querySelector('SMVsc')?.getAttribute('deliveryConf') ?? null,
      sv: parent.querySelector('SMVsc')?.getAttribute('sv') ?? null,
      rSV: parent.querySelector('SMVsc')?.getAttribute('rSV') ?? null,
    },
    subscriptionCapabilities: {
      sv: parent.querySelector('ClientServices')?.getAttribute('sv') ?? null,
      maxSMV:
        parent.querySelector('ClientServices')?.getAttribute('maxSMV') ?? null,
      rSV: parent.querySelector('ClientServices')?.getAttribute('rSV') ?? null,
    },
    superVisionCapabilities: {
      maxSv:
        parent.querySelector('SupSubscription')?.getAttribute('maxSv') ?? null,
    },
  };

  return isEmptyObject(content)
    ? null
    : [
        createFormDivider('Control Block Configuration'),
        ...createFormElementsFromInputs([
          {
            kind: 'Select',
            label: 'cbName',
            maybeValue: content.controlBlockConfiguration.cbName,
            helper:
              'Whether SMV control block name is configurable offline (Conf) or fixed (Fix)',
            values: ['Conf', 'Fix'],
            default: 'Fix',
            nullable: true,
          },
          {
            kind: 'Select',
            label: 'datSet',
            maybeValue: content.controlBlockConfiguration.datSet,
            helper:
              'Whether SMV control blocks data set and its structure is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
            values: ['Dyn', 'Conf', 'Fix'],
            default: 'Fix',
            nullable: true,
          },
          {
            kind: 'Select',
            label: 'svID',
            maybeValue: content.controlBlockConfiguration.svID,
            helper:
              'Whether SMV control blocks ID is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
            values: ['Dyn', 'Conf', 'Fix'],
            default: 'Fix',
            nullable: true,
          },
          {
            kind: 'Select',
            label: 'optFields',
            maybeValue: content.controlBlockConfiguration.optFields,
            helper:
              'Whether SMV control blocks optional fields are configurable offline (Conf), online(Dyn) or are fixed (Fix)',
            values: ['Dyn', 'Conf', 'Fix'],
            default: 'Fix',
            nullable: true,
          },
          {
            kind: 'Select',
            label: 'smpRate',
            maybeValue: content.controlBlockConfiguration.smpRate,
            helper:
              'Whether SMV control blocks attribute smpRate is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
            values: ['Dyn', 'Conf', 'Fix'],
            default: 'Fix',
            nullable: true,
          },
          {
            kind: 'Select',
            label: 'nofASDU',
            maybeValue: content.controlBlockConfiguration.nofASDU,
            helper:
              'Whether SMV control blocks attribute noASDU (number of timesstapms per packet) is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
            values: ['Conf', 'Fix'],
            default: 'Fix',
            nullable: true,
          },
          {
            kind: 'Checkbox',
            label: 'samplesPerSec',
            helper:
              'Whether SMV supported sample rate definition as SamplesPerSec or SecPerSamples',
            maybeValue:
              content.controlBlockConfiguration.samplesPerSec?.toString() ??
              null,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'synchSrcId',
            helper: 'Whether grandmaster clock ID can be included in the SMV',
            maybeValue:
              content.controlBlockConfiguration.synchSrcId?.toString() ?? null,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'pdcTimeStamp',
            helper: 'Whether the PDC timestamp can be included into SMV',
            maybeValue:
              content.controlBlockConfiguration.pdcTimeStamp?.toString() ??
              null,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'kdaParticipant',
            helper: 'Whether server supports key delivery assurance (KDA)',
            maybeValue:
              content.controlBlockConfiguration.kdaParticipant?.toString() ??
              null,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'signature',
            helper:
              'Whether calculation of a signature is supported for each GOOSE',
            maybeValue:
              content.controlBlockConfiguration.signature?.toString() ?? null,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'encryption',
            helper: 'Whether message encryption is supported for each GOOSE',
            maybeValue:
              content.controlBlockConfiguration.encryption?.toString() ?? null,
            nullable: true,
            default: false,
          },
          {
            kind: 'TextField',
            label: 'SmpRate',
            required: true,
            helper: 'Defines the implemented SmpRate in the IED',
            maybeValue:
              content.controlBlockConfiguration.smpRateVal?.toString() ?? null,
            nullable: true,
          },
          {
            kind: 'TextField',
            label: 'SamplesPerSec',
            required: true,
            helper: 'Defines the implemented SamplesPerSec in the IED',
            maybeValue:
              content.controlBlockConfiguration.samplesPerSecVal?.toString() ??
              null,
            nullable: true,
          },
          {
            kind: 'TextField',
            label: 'SecPerSamples',
            required: true,
            helper: 'Defines the implemented SecPerSamples in the IED',
            maybeValue:
              content.controlBlockConfiguration.secPerSamplesVal?.toString() ??
              null,
            nullable: true,
          },
        ]),
        createFormDivider('Publisher Capabilities'),
        ...createFormElementsFromInputs([
          {
            kind: 'TextField',
            label: 'max',
            required: true,
            helper:
              'The maximum number of SMV control blocks the IED can publish',
            maybeValue: content.publisherCapabilities.max?.toString() ?? null,
            nullable: true,
          },
          {
            kind: 'Select',
            label: 'delivery',
            maybeValue: content.publisherCapabilities.delivery,
            helper:
              'Whether the IED supports publishing of muslticast, unicast or both types of SMV streams',
            values: ['unicast', 'multicast', 'both'],
            default: 'multicast',
            nullable: true,
          },
          {
            kind: 'Checkbox',
            label: 'deliveryConf',
            helper:
              'Whether the system configurator is allowed to configure SMV control blocks',
            maybeValue:
              content.publisherCapabilities.deliveryConf?.toString() ?? null,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'sv',
            helper: 'Whether IED supports layer 2 sampled value streams',
            maybeValue: content.publisherCapabilities.sv?.toString() ?? null,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'rSV',
            helper: 'Whether the IED supports layer 3 sampled value streams',
            maybeValue: content.publisherCapabilities.rSV?.toString() ?? null,
            nullable: true,
            default: false,
          },
        ]),
        createFormDivider('Client Capabilities'),
        ...createFormElementsFromInputs([
          {
            kind: 'Checkbox',
            label: 'sv',
            helper: 'Whether the IED supports client side SMV related services',
            maybeValue: content.subscriptionCapabilities.sv?.toString() ?? null,
            nullable: true,
            default: false,
          },
          {
            kind: 'TextField',
            label: 'maxSMV',
            required: false,
            helper:
              'The maximal number of layer 2 sampled value streams the client can subscribe to',
            maybeValue:
              content.subscriptionCapabilities.maxSMV?.toString() ?? null,
            nullable: true,
          },
          {
            kind: 'Checkbox',
            label: 'rSV',
            helper:
              'The maximal number of layer 3 sampled value streams the client can subscribe to',
            maybeValue:
              content.subscriptionCapabilities.rSV?.toString() ?? null,
            nullable: true,
            default: false,
          },
        ]),
        createFormDivider('Dynamic Reporting/DataSets'),
        ...createFormElementsFromInputs([
          {
            kind: 'TextField',
            label: 'maxSv',
            required: false,
            helper:
              'The maximum number of SMV supervision supported by this IED (LSVS)',
            maybeValue:
              content.superVisionCapabilities.maxSv?.toString() ?? null,
            nullable: true,
          },
        ]),
      ];
}
