import { get } from 'lit-translate';
import { createFormDivider, createFormElementsFromInputs, isEmptyObject, } from './services.js';
export function createNetworkingWizardPage(services) {
    const content = createNetworkingWizard(services);
    return content
        ? {
            title: get('wizard.title.edit', { tagName: 'Networking' }),
            content: [...content],
            element: services,
        }
        : null;
}
function createNetworkingWizard(parent) {
    const content = {
        fileHandling: {
            mms: parent.querySelector('FileHandling')?.getAttribute('mms') ?? null,
            ftp: parent.querySelector('FileHandling')?.getAttribute('ftp') ?? null,
            ftps: parent.querySelector('FileHandling')?.getAttribute('ftps') ?? null,
        },
        timeSyncProt: {
            sntp: parent.querySelector('TimeSyncProt')?.getAttribute('sntp') ?? null,
            iec61850_9_3: parent.querySelector('TimeSyncProt')?.getAttribute('iec61850_9_3') ??
                null,
            c37_238: parent.querySelector('TimeSyncProt')?.getAttribute('c37_238') ?? null,
            other: parent.querySelector('TimeSyncProt')?.getAttribute('other') ?? null,
        },
        cs_TimeSyncProt: {
            sntp: parent
                .querySelector('ClientServices > TimeSyncProt')
                ?.getAttribute('sntp') ?? null,
            iec61850_9_3: parent
                .querySelector('ClientServices > TimeSyncProt')
                ?.getAttribute('iec61850_9_3') ?? null,
            c37_238: parent
                .querySelector('ClientServices > TimeSyncProt')
                ?.getAttribute('c37_238') ?? null,
            other: parent
                .querySelector('ClientServices > TimeSyncProt')
                ?.getAttribute('other') ?? null,
        },
        cs_McSecurity: {
            signature: parent
                .querySelector('ClientServices > McSecurity')
                ?.getAttribute('signature') ?? null,
            encryption: parent
                .querySelector('ClientServices > McSecurity')
                ?.getAttribute('encryption') ?? null,
        },
        redProt: {
            hsr: parent.querySelector('RedProt')?.getAttribute('hsr') ?? null,
            prp: parent.querySelector('RedProt')?.getAttribute('prp') ?? null,
            rstp: parent.querySelector('RedProt')?.getAttribute('rstp') ?? null,
        },
        commProt: {
            ipv6: parent.querySelector('CommProt')?.getAttribute('ipv6') ?? null,
        },
    };
    return isEmptyObject(content)
        ? null
        : [
            createFormDivider('File Handling'),
            ...createFormElementsFromInputs([
                {
                    kind: 'Checkbox',
                    label: 'mms',
                    helper: 'Whether the IED supports file transfer as defined by the manufacturer messaging service (MMS)',
                    maybeValue: content.fileHandling.mms?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'ftp',
                    helper: 'Whether the IED supports file transfer service (FTP)',
                    maybeValue: content.fileHandling.ftp?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'ftps',
                    helper: 'Whether the IED supports encrypted file transfer service (FTPS)',
                    maybeValue: content.fileHandling.ftps?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Time Server Capabilities'),
            ...createFormElementsFromInputs([
                {
                    kind: 'Checkbox',
                    label: 'sntp',
                    helper: 'Whether the IED supports simple network time protocol as time-server',
                    maybeValue: content.timeSyncProt.sntp?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'iec61850_9_3',
                    helper: 'Whether the IED supports precision time protocol (PTP) acc. to IEC 61850-9-3 as time-server',
                    maybeValue: content.timeSyncProt.iec61850_9_3?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'c37_238',
                    helper: 'Whether the IED supports precision time protocol (PTP) acc. to C37.238 as time-server',
                    maybeValue: content.timeSyncProt.c37_238?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'other',
                    helper: 'Whether IED support other type of synchronization as time-server (e.g. PPS)',
                    maybeValue: content.timeSyncProt.other?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Time Client Capabilities'),
            ...createFormElementsFromInputs([
                {
                    kind: 'Checkbox',
                    label: 'sntp',
                    helper: 'Whether the IED supports simple network time protocol as time-client',
                    maybeValue: content.cs_TimeSyncProt.sntp?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'iec61850_9_3',
                    helper: 'Whether the IED supports precision time protocol (PTP) acc. to IEC 61850-9-3 as time-client',
                    maybeValue: content.cs_TimeSyncProt.iec61850_9_3?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'c37_238',
                    helper: 'Whether the IED supports precision time protocol (PTP) acc. to C37.238 as time-client',
                    maybeValue: content.cs_TimeSyncProt.c37_238?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'other',
                    helper: 'Whether IED support other type of synchronization as time-client (e.g. PPS)',
                    maybeValue: content.cs_TimeSyncProt.other?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Multicast Security on Server'),
            ...createFormElementsFromInputs([
                {
                    kind: 'Checkbox',
                    label: 'signature',
                    helper: 'Whether calculation of a signature is supported for SMV/GOOSE on this IED/access point',
                    maybeValue: content.cs_McSecurity.signature?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'encryption',
                    helper: 'Whether message encryption is supported for SMV/GOOSE on this IED/access point',
                    maybeValue: content.cs_McSecurity.encryption?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Redundancy Protocols'),
            ...createFormElementsFromInputs([
                {
                    kind: 'Checkbox',
                    label: 'hsr',
                    helper: 'Whether the IED supports redundancy protocol HSR',
                    maybeValue: content.redProt.hsr?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'prp',
                    helper: 'Whether the IED supports redundancy protocol PRP',
                    maybeValue: content.redProt.prp?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'rstp',
                    helper: 'Whether the IED supports redundancy protocol RSTP',
                    maybeValue: content.redProt.rstp?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Others'),
            ...createFormElementsFromInputs([
                {
                    kind: 'Checkbox',
                    label: 'ipv6',
                    helper: 'Whether the IED supports IP version 6',
                    maybeValue: content.commProt.ipv6?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
        ];
}
//# sourceMappingURL=service-networking.js.map