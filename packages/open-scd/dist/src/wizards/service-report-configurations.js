import { get } from 'lit-translate';
import { createFormDivider, createFormElementsFromInputs, isEmptyObject, } from './services.js';
export function createReportConfigurationsWizardPage(services) {
    const content = createReportConfigurationsWizard(services);
    return content
        ? {
            title: get('wizard.title.edit', { tagName: 'Report Settings' }),
            content: [...content],
            element: services,
        }
        : null;
}
function createReportConfigurationsWizard(parent) {
    const content = {
        reportSettings: {
            cbName: parent.querySelector('ReportSettings')?.getAttribute('cbName') ?? null,
            datSet: parent.querySelector('ReportSettings')?.getAttribute('datSet') ?? null,
            rptID: parent.querySelector('ReportSettings')?.getAttribute('rptID') ?? null,
            optFields: parent.querySelector('ReportSettings')?.getAttribute('optFields') ??
                null,
            bufTime: parent.querySelector('ReportSettings')?.getAttribute('bufTime') ?? null,
            trgOps: parent.querySelector('ReportSettings')?.getAttribute('trgOps') ?? null,
            intgPd: parent.querySelector('ReportSettings')?.getAttribute('intgPd') ?? null,
            resvTms: parent.querySelector('ReportSettings')?.getAttribute('resvTms') ?? null,
            owner: parent.querySelector('ReportSettings')?.getAttribute('owner') ?? null,
        },
        confReportControl: {
            max: parent.querySelector('ConfReportControl')?.getAttribute('max') ?? null,
            bufMode: parent.querySelector('ConfReportControl')?.getAttribute('bufMode') ??
                null,
            maxBuf: parent.querySelector('ConfReportControl')?.getAttribute('maxBuf') ??
                null,
            bufConf: parent.querySelector('ConfReportControl')?.getAttribute('bufConf') ??
                null,
        },
        clientServices: {
            maxReports: parent.querySelector('ClientServices')?.getAttribute('maxReports') ??
                null,
            bufReport: parent.querySelector('ClientServices')?.getAttribute('bufReport') ??
                null,
            unbufReport: parent.querySelector('ClientServices')?.getAttribute('unbufReport') ??
                null,
        },
        dynDataSet: {
            max: parent.querySelector('DynDataSet')?.getAttribute('max') ?? null,
            maxAttributes: parent.querySelector('DynDataSet')?.getAttribute('maxAttributes') ??
                null,
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
                    maybeValue: content.reportSettings.cbName,
                    helper: 'Whether report control block name is configurable offline (Conf) or fixed (Fix)',
                    values: ['Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'datSet',
                    maybeValue: content.reportSettings.datSet,
                    helper: 'Whether report control blocks data set and its structure is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
                    values: ['Dyn', 'Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'rptID',
                    maybeValue: content.reportSettings.rptID,
                    helper: 'Whether report control blocks ID is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
                    values: ['Dyn', 'Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'optFields',
                    maybeValue: content.reportSettings.optFields,
                    helper: 'Whether report control blocks optional fields are configurable offline (Conf), online(Dyn) or are fixed (Fix)',
                    values: ['Dyn', 'Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'bufTime',
                    maybeValue: content.reportSettings.bufTime,
                    helper: 'Whether report control blocks bufTime attribute is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
                    values: ['Dyn', 'Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'trgOps',
                    maybeValue: content.reportSettings.trgOps,
                    helper: 'Whether report control blocks trigger options are configurable offline (Conf), online(Dyn) or are fixed (Fix)',
                    values: ['Dyn', 'Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'intgPd',
                    maybeValue: content.reportSettings.intgPd,
                    helper: 'Whether report control blocks integrity period is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
                    values: ['Dyn', 'Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Checkbox',
                    label: 'resvTms',
                    helper: 'Whether reserve time exists in all buffered report control blocks',
                    maybeValue: content.reportSettings.resvTms?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'owner',
                    helper: 'Whether owner attribute exists on all buffered report control blocks',
                    maybeValue: content.reportSettings.owner?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Publisher Capabilities'),
            ...createFormElementsFromInputs([
                {
                    kind: 'TextField',
                    label: 'max',
                    required: true,
                    helper: 'The maximum number of report control blocks instantiable by system configuration tool',
                    maybeValue: content.confReportControl.max?.toString() ?? null,
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'bufMode',
                    maybeValue: content.confReportControl.bufMode,
                    helper: 'Whether buffered, unbuffered or both type of report control block can be created by system configuration tool',
                    values: ['unbuffered', 'buffered', 'both'],
                    default: 'both',
                    nullable: true,
                },
                {
                    kind: 'TextField',
                    label: 'maxBuf',
                    required: false,
                    helper: 'The maximum number of BUFFERED report control blocks instantiable by system configuration tool',
                    maybeValue: content.confReportControl.maxBuf?.toString() ?? null,
                    nullable: true,
                },
                {
                    kind: 'Checkbox',
                    label: 'bufConf',
                    helper: 'Whether buffered attribute can be configured by system configuration tool',
                    maybeValue: content.confReportControl.bufConf?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Client Capabilities'),
            ...createFormElementsFromInputs([
                {
                    kind: 'TextField',
                    label: 'maxReports',
                    required: true,
                    helper: 'The maximal number of report control blocks the client can work with',
                    maybeValue: content.clientServices.maxReports?.toString() ?? null,
                    nullable: true,
                },
                {
                    kind: 'Checkbox',
                    label: 'bufReport',
                    helper: 'Whether the IED can use buffered report control blocks as a client',
                    maybeValue: content.clientServices.bufReport?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'unbufReport',
                    helper: 'Whether the IED can use un-buffered report control blocks as a client',
                    maybeValue: content.clientServices.unbufReport?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Dynamic Reporting/DataSets'),
            ...createFormElementsFromInputs([
                {
                    kind: 'TextField',
                    label: 'max',
                    required: true,
                    helper: 'The maximum number data sets (including preconfigured once)',
                    maybeValue: content.dynDataSet.max?.toString() ?? null,
                    nullable: true,
                },
                {
                    kind: 'TextField',
                    label: 'maxAttributes',
                    required: false,
                    helper: 'The maximum number of data entries (FCDA) allowed within a dynamic data set',
                    maybeValue: content.dynDataSet.maxAttributes?.toString() ?? null,
                    nullable: true,
                },
            ]),
        ];
}
//# sourceMappingURL=service-report-configurations.js.map