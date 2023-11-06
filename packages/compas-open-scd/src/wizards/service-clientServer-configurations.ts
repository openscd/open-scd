import { TemplateResult } from 'lit-html';
import { get } from 'lit-translate';
import { WizardPage } from '../foundation.js';

import {
  createFormDivider,
  createFormElementsFromInputs,
  isEmptyObject,
} from './services.js';

interface DynamicAssociations {
  max: string | null;
}

interface DiscoverCapabilities {
  getDirectory: string | null;
  getDataObjectDefinition: string | null;
  dataObjectDirectory: string | null;
  getDataSetValue: string | null;
  setDataSetValue: string | null;
  setDataSetDirectory: string | null;
  readWrite: string | null;
}

interface FunctionalNaming {
  confLdName: string | null;
  supportsLdName: string | null;
}

interface ClientCapabilities {
  maxAttributes: string | null;
  timerActivatedControl: string | null;
  getCBValues: string | null;
  GSEDir: string | null;
}

interface ValKindManipulationConfig {
  setToRO: string | null;
}

interface SignalReferenceConfig {
  max: string | null;
}

interface ContentOptions {
  dynamicAssociations: DynamicAssociations;
  discoverCapabilities: DiscoverCapabilities;
  functionalNaming: FunctionalNaming;
  clientCapabilities: ClientCapabilities;
  valKindManipulationConfig: ValKindManipulationConfig;
  signalReferenceConfig: SignalReferenceConfig;
}

export function createClientServerConfigurationsWizardPage(
  services: Element
): WizardPage | null {
  const content: TemplateResult[] | null =
    createClientServerConfigurationsWizard(services);

  return content
    ? {
        title: get('wizard.title.edit', { tagName: 'Client Server Services' }),
        content: [...content],
      }
    : null;
}

function createClientServerConfigurationsWizard(
  parent: Element
): TemplateResult[] | null {
  const content: ContentOptions = {
    dynamicAssociations: {
      max: parent.querySelector('DynAssociation')?.getAttribute('max') ?? null,
    },
    discoverCapabilities: {
      getDirectory: parent.querySelector('GetDirectory') ? 'true' : null,
      getDataObjectDefinition: parent.querySelector('GetDataObjectDefinition')
        ? 'true'
        : null,
      dataObjectDirectory: parent.querySelector('DataObjectDirectory')
        ? 'true'
        : null,
      getDataSetValue: parent.querySelector('GetDataSetValue') ? 'true' : null,
      setDataSetValue: parent.querySelector('SetDataSetValue') ? 'true' : null,
      setDataSetDirectory: parent.querySelector('DataSetDirectory')
        ? 'true'
        : null,
      readWrite: parent.querySelector('ReadWrite') ? 'true' : null,
    },
    functionalNaming: {
      confLdName: parent.querySelector('ConfLdName') ? 'true' : null,
      supportsLdName:
        parent
          .querySelector('ClientServices')
          ?.getAttribute('supportsLdName') ?? null,
    },
    clientCapabilities: {
      maxAttributes:
        parent.querySelector('ClientServices')?.getAttribute('maxAttributes') ??
        null,
      timerActivatedControl: parent.querySelector('TimerActivatedControl')
        ? 'true'
        : null,
      getCBValues: parent.querySelector('GetCBValues') ? 'true' : null,
      GSEDir: parent.querySelector('GSEDir') ? 'true' : null,
    },
    valKindManipulationConfig: {
      setToRO:
        parent.querySelector('ValueHandling')?.getAttribute('setToRO') ?? null,
    },
    signalReferenceConfig: {
      max: parent.querySelector('ConfSigRef')?.getAttribute('max') ?? null,
    },
  };

  return isEmptyObject(content)
    ? null
    : [
        createFormDivider('Dynamic Associations'),
        ...createFormElementsFromInputs([
          {
            kind: 'TextField',
            label: 'max',
            required: false,
            helper:
              'The maximum number of guaranteed parallel association with the IED. If missing, no association is possible',
            maybeValue: content.dynamicAssociations.max?.toString() ?? null,
            nullable: true,
          },
        ]),
        createFormDivider('Discover Capabilities'),
        ...createFormElementsFromInputs([
          {
            kind: 'Checkbox',
            label: 'GetDirectory',
            helper:
              'Whether IED supports GetServerDirectory, GetLogicalDeviceDirectory, GetLogicalNodeDirectory',
            maybeValue: content.discoverCapabilities.getDirectory,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'GetDataObjectDefinition',
            helper: 'Whether IED supports the service GetDataDefinition',
            maybeValue: content.discoverCapabilities.getDataObjectDefinition,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'DataObjectDirectory',
            helper: 'Whether IED supports the service GetDataDirectory',
            maybeValue: content.discoverCapabilities.dataObjectDirectory,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'GetDataSetValue',
            helper: 'Whether IED supports the service GetDataSetValues',
            maybeValue: content.discoverCapabilities.getDataSetValue,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'SetDataSetValue',
            helper: 'Whether IED supports the service SetDataSetValue',
            maybeValue: content.discoverCapabilities.setDataSetValue,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'SetDataSetDirectory',
            helper: 'Whether IED supports the service SetDataSetDirectory',
            maybeValue: content.discoverCapabilities.setDataSetDirectory,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'ReadWrite',
            helper:
              'Whether IED supports the service GetData, SetData, and the Operate services',
            maybeValue: content.discoverCapabilities.readWrite,
            nullable: true,
            default: false,
          },
        ]),
        createFormDivider('Functional Naming'),
        ...createFormElementsFromInputs([
          {
            kind: 'Checkbox',
            label: 'ConfLdName',
            helper:
              'Whether the IED allows defining the attribute ldName in logical devices (LDevice)',
            maybeValue: content.functionalNaming.confLdName,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'supportsLdName',
            helper:
              'Whether the IED understands the logical device (LDevice) name (ldName) setting as a client',
            maybeValue: content.functionalNaming.supportsLdName,
            nullable: true,
            default: false,
          },
        ]),
        createFormDivider('Client Capabilities'),
        ...createFormElementsFromInputs([
          {
            kind: 'TextField',
            label: 'maxAttributes',
            required: false,
            helper:
              'The maximum receivable data attributes (across all data sets)',
            maybeValue:
              content.clientCapabilities.maxAttributes?.toString() ?? null,
            nullable: true,
          },
          {
            kind: 'Checkbox',
            label: 'TimerActivatedControl',
            helper: 'Whether IED supports time activated control',
            maybeValue: content.clientCapabilities.timerActivatedControl,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'GetCBValues',
            helper: 'Whether IED can read control blocks online',
            maybeValue: content.clientCapabilities.getCBValues,
            nullable: true,
            default: false,
          },
          {
            kind: 'Checkbox',
            label: 'GSEDir',
            helper:
              'Whether IED supports GSE directory services acc. to IEC 61850-7-2',
            maybeValue: content.clientCapabilities.GSEDir,
            nullable: true,
            default: false,
          },
        ]),
        createFormDivider('ValKind Manipulation Configuration'),
        ...createFormElementsFromInputs([
          {
            kind: 'Checkbox',
            label: 'setToRO',
            helper:
              'Whether valKind attribute in DA/BDA element that are Set can be modified to RO (only for function constrains for CF, DC, SP)',
            maybeValue: content.valKindManipulationConfig.setToRO,
            nullable: true,
            default: false,
          },
        ]),
        createFormDivider('Signal Reference Configuration'),
        ...createFormElementsFromInputs([
          {
            kind: 'TextField',
            label: 'max',
            required: false,
            helper:
              'The maximum object references that the IED can create (instantiation only by IED Configuration Tool)',
            maybeValue: content.signalReferenceConfig.max?.toString() ?? null,
            nullable: true,
          },
        ]),
      ];
}
