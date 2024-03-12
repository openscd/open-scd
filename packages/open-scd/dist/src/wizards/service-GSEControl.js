import { get } from 'lit-translate';
import { createFormDivider, createFormElementsFromInputs, isEmptyObject, } from './services.js';
export function createGSEControlWizardPage(services) {
    const content = createGSEControlWizard(services);
    return content
        ? {
            title: get('wizard.title.edit', { tagName: 'GSE Control' }),
            content: [...content],
            element: services,
        }
        : null;
}
function createGSEControlWizard(parent) {
    const content = {
        gseSettings: {
            cbName: parent.querySelector('GSESettings')?.getAttribute('cbName') ?? null,
            datSet: parent.querySelector('GSESettings')?.getAttribute('datSet') ?? null,
            appID: parent.querySelector('GSESettings')?.getAttribute('appID') ?? null,
            dataLabel: parent.querySelector('GSESettings')?.getAttribute('dataLabel') ?? null,
            kdaParticipant: parent.querySelector('GSESettings')?.getAttribute('kdaParticipant') ??
                null,
            signature: parent
                .querySelector('GSESettings > McSecurity')
                ?.getAttribute('signature') ?? null,
            encryption: parent
                .querySelector('GSESettings > McSecurity')
                ?.getAttribute('encryption') ?? null,
        },
        goose: {
            max: parent.querySelector('GOOSE')?.getAttribute('max') ?? null,
            fixedOffs: parent.querySelector('GOOSE')?.getAttribute('fixedOffs') ?? null,
            goose: parent.querySelector('GOOSE')?.getAttribute('goose') ?? null,
            rGOOSE: parent.querySelector('GOOSE')?.getAttribute('rGOOSE') ?? null,
        },
        clientServices: {
            maxGOOSE: parent.querySelector('ClientServices')?.getAttribute('maxGOOSE') ??
                null,
            goose: parent.querySelector('ClientServices')?.getAttribute('goose') ?? null,
            rGOOSE: parent.querySelector('ClientServices')?.getAttribute('rGOOSE') ?? null,
            gsse: parent.querySelector('ClientServices')?.getAttribute('gsse') ?? null,
        },
        supSubscription: {
            maxGo: parent.querySelector('SupSubscription')?.getAttribute('maxGo') ?? null,
            maxSv: parent.querySelector('SupSubscription')?.getAttribute('maxSv') ?? null,
        },
        gsse: {
            max: parent.querySelector('GSSE')?.getAttribute('max') ?? null,
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
                    maybeValue: content.gseSettings.cbName,
                    helper: 'Whether GSE control block (GOOSE) name is configurable offline (Conf) or fixed (Fix)',
                    values: ['Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'datSet',
                    maybeValue: content.gseSettings.datSet,
                    helper: 'Whether GSE control blocks (GOOSE) data set and its structure is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
                    values: ['Dyn', 'Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'appID',
                    maybeValue: content.gseSettings.appID,
                    helper: 'Whether GSE control blocks (GOOSE) ID is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
                    values: ['Dyn', 'Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Select',
                    label: 'dataLabel',
                    maybeValue: content.gseSettings.dataLabel,
                    helper: 'Deprecated!: Whether GSSE object reference is configurable offline (Conf), online(Dyn) or are fixed (Fix)',
                    values: ['Dyn', 'Conf', 'Fix'],
                    default: 'Fix',
                    nullable: true,
                },
                {
                    kind: 'Checkbox',
                    label: 'kdaParticipant',
                    maybeValue: content.gseSettings.kdaParticipant,
                    helper: 'Whether key delivery assurance (KDA) is supported by the server',
                    nullable: true,
                },
                {
                    kind: 'Checkbox',
                    label: 'signature',
                    helper: 'Whether calculation of a signature is supported for each GOOSE',
                    maybeValue: content.gseSettings.signature,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'encryption',
                    helper: 'Whether message encryption is supported for each GOOSE',
                    maybeValue: content.gseSettings.encryption,
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
                    helper: 'The maximum number of configurable GOOSE control blocks. 0 means no GOOSE publishing supported',
                    maybeValue: content.goose.max?.toString() ?? null,
                    nullable: true,
                },
                {
                    kind: 'Checkbox',
                    label: 'fixedOffs',
                    maybeValue: content.goose.fixedOffs,
                    helper: 'Whether encoding with fixed offsets is configurable for each GSE control block (GOOSE). See also IEC 61850-8-1',
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'goose',
                    helper: 'Whether GOOSE publishing is supported',
                    maybeValue: content.goose.goose,
                    nullable: true,
                    default: true,
                },
                {
                    kind: 'Checkbox',
                    label: 'rGOOSE',
                    helper: 'Whether GOOSE with network layer 3 (IP) is supported',
                    maybeValue: content.goose.rGOOSE,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Subscription Capabilities'),
            ...createFormElementsFromInputs([
                {
                    kind: 'Checkbox',
                    label: 'goose',
                    helper: 'Whether the IED supports client side GOOSE related services',
                    maybeValue: content.clientServices.goose?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'TextField',
                    label: 'maxGOOSE',
                    required: true,
                    helper: 'The maximal number of GOOSEs the client can subscribe to',
                    maybeValue: content.clientServices.maxGOOSE?.toString() ?? null,
                    nullable: true,
                },
                {
                    kind: 'Checkbox',
                    label: 'rGOOSE',
                    helper: 'The maximal number of GOOSEs with network layer 3 the client can subscribe to',
                    maybeValue: content.clientServices.rGOOSE?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
                {
                    kind: 'Checkbox',
                    label: 'gsse',
                    helper: 'Whether the IED supports client side GSSE related services',
                    maybeValue: content.clientServices.gsse?.toString() ?? null,
                    nullable: true,
                    default: false,
                },
            ]),
            createFormDivider('Supervision Capabilities'),
            ...createFormElementsFromInputs([
                {
                    kind: 'TextField',
                    label: 'maxGo',
                    required: false,
                    helper: 'The maximum number of GOOSE supervision supported by this IED (LGOS)',
                    maybeValue: content.supSubscription.maxGo?.toString() ?? null,
                    nullable: true,
                },
            ]),
            createFormDivider('GSSE Capabilities'),
            ...createFormElementsFromInputs([
                {
                    kind: 'TextField',
                    label: 'max',
                    required: true,
                    helper: 'The maximum number of GSSE supported as publisher. 0 means IED can only subscribe on GSSE messages',
                    maybeValue: content.gsse.max?.toString() ?? null,
                    nullable: true,
                },
            ]),
        ];
}
//# sourceMappingURL=service-GSEControl.js.map