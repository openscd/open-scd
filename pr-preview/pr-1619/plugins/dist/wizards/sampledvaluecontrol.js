import { html } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../../openscd/src/filtered-list.js';
import '../../../openscd/src/wizard-checkbox.js';
import '../../../openscd/src/wizard-select.js';
import '../../../openscd/src/wizard-textfield.js';
import { find, getValue, identity, isPublic, newSubWizardEvent, newWizardEvent, } from '../../../openscd/src/foundation.js';
import { cloneElement, createElement, getUniqueElementName, } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent, } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { securityEnabledEnum, smpModEnum } from './foundation/enums.js';
import { maxLength, patterns } from './foundation/limits.js';
import { editSMvWizard } from './smv.js';
import { contentSmvOptsWizard, editSmvOptsWizard } from './smvopts.js';
import { editDataSetWizard } from './dataset.js';
import { iEDPicker, sampledValueDataPicker } from './foundation/finder.js';
import { getConnectedAP, isAccessPointConnected, uniqueAppId, uniqueMacAddress, } from './foundation/scl.js';
import { contentGseOrSmvWizard, createAddressElement } from './address.js';
import { newFCDA } from './fcda.js';
export function getSMV(element) {
    const cbName = element.getAttribute('name');
    const iedName = element.closest('IED')?.getAttribute('name');
    const apName = element.closest('AccessPoint')?.getAttribute('name');
    const ldInst = element.closest('LDevice')?.getAttribute('inst');
    return (element
        .closest('SCL')
        ?.querySelector(`:root > Communication > SubNetwork > ` +
        `ConnectedAP[iedName="${iedName}"][apName="${apName}"] > ` +
        `SMV[ldInst="${ldInst}"][cbName="${cbName}"]`) ?? null);
}
export function removeSampledValueControlAction(element) {
    if (!element.parentElement)
        return null;
    const dataSet = element.parentElement.querySelector(`DataSet[name="${element.getAttribute('datSet')}"]`);
    const sMV = getSMV(element);
    const singleUse = Array.from(element.parentElement.querySelectorAll('ReportControl, GSEControl, SampledValueControl')).filter(controlblock => controlblock.getAttribute('datSet') === dataSet?.getAttribute('name')).length <= 1;
    const actions = [];
    actions.push({
        old: {
            parent: element.parentElement,
            element,
        },
    });
    if (dataSet && singleUse)
        actions.push({
            old: {
                parent: element.parentElement,
                element: dataSet,
            },
        });
    if (sMV)
        actions.push({
            old: {
                parent: sMV.parentElement,
                element: sMV,
            },
        });
    const name = element.getAttribute('name');
    const iedName = element.closest('IED')?.getAttribute('name') ?? '';
    return {
        title: get('controlblock.action.remove', {
            type: element.tagName,
            name,
            iedName,
        }),
        actions,
    };
}
function contentSampledValueControlWizard(options) {
    return [
        html `<wizard-textfield
      label="name"
      .maybeValue=${options.name}
      helper="${get('scl.name')}"
      required
      validationMessage="${get('textfield.required')}"
      pattern="${patterns.asciName}"
      maxLength="${maxLength.cbName}"
      dialogInitialFocus
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
      pattern="${patterns.normalizedString}"
      helper="${get('scl.desc')}"
    ></wizard-textfield>`,
        options.multicast === 'true'
            ? html ``
            : html `<wizard-checkbox
          label="multicast"
          .maybeValue=${options.multicast}
          helper="${get('scl.multicast')}"
          disabled
        ></wizard-checkbox>`,
        html `<wizard-textfield
      label="smvID"
      .maybeValue=${options.smvID}
      helper="${get('scl.id')}"
      required
      validationMessage="${get('textfield.nonempty')}"
    ></wizard-textfield>`,
        html `<wizard-select
      label="smpMod"
      .maybeValue=${options.smpMod}
      nullable
      required
      helper="${get('scl.smpMod')}"
      >${smpModEnum.map(option => html `<mwc-list-item value="${option}">${option}</mwc-list-item>`)}</wizard-select
    >`,
        html `<wizard-textfield
      label="smpRate"
      .maybeValue=${options.smpRate}
      helper="${get('scl.smpRate')}"
      required
      type="number"
      min="0"
    ></wizard-textfield>`,
        html `<wizard-textfield
      label="nofASDU"
      .maybeValue=${options.nofASDU}
      helper="${get('scl.nofASDU')}"
      required
      type="number"
      min="0"
    ></wizard-textfield>`,
        html `<wizard-select
      label="securityEnabled"
      .maybeValue=${options.securityEnabled}
      nullable
      required
      helper="${get('scl.securityEnable')}"
      >${securityEnabledEnum.map(option => html `<mwc-list-item value="${option}">${option}</mwc-list-item>`)}</wizard-select
    >`,
    ];
}
function createSampledValueControlAction(parent) {
    return (inputs, wizard) => {
        // create SampledValueControl element
        const sampledValueControlAttrs = {};
        const sampledValueControlKeys = [
            'name',
            'desc',
            'multicast',
            'smvID',
            'smpMod',
            'smpRate',
            'nofASDU',
            'securityEnabled',
        ];
        sampledValueControlKeys.forEach(key => {
            const missingMulticast = key === 'multicast' && !inputs.find(i => i.label === key);
            if (missingMulticast) {
                sampledValueControlAttrs['multicast'] = 'true';
                return;
            }
            sampledValueControlAttrs[key] = getValue(inputs.find(i => i.label === key));
        });
        // confRef is handled automatically and is 1 for new referenced SampledValueControl
        sampledValueControlAttrs['confRev'] = '1';
        const dataSetName = sampledValueControlAttrs.name + 'sDataSet';
        sampledValueControlAttrs['datSet'] = dataSetName;
        const sampledValueControl = createElement(parent.ownerDocument, 'SampledValueControl', sampledValueControlAttrs);
        // create SmvOpts element
        const smvOptsAttrs = {};
        const smvOptsKeys = [
            'refreshTime',
            'sampleRate',
            'dataSet',
            'security',
            'synchSourceId',
        ];
        smvOptsKeys.forEach(key => {
            smvOptsAttrs[key] = getValue(inputs.find(i => i.label === key));
        });
        const smvOpts = createElement(parent.ownerDocument, 'SmvOpts', smvOptsAttrs);
        sampledValueControl.appendChild(smvOpts); // add to SampledValueControl element as child
        // create SMV element with connected AccessPoint
        let smv = null;
        let smvParent = null;
        if (isAccessPointConnected(parent)) {
            const instType = wizard.shadowRoot?.querySelector('#instType')?.checked ??
                false;
            const smvAttrs = {};
            const smvKeys = ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'];
            smvKeys.forEach(key => {
                smvAttrs[key] = getValue(inputs.find(i => i.label === key));
            });
            smv = createElement(parent.ownerDocument, 'SMV', {
                ldInst: parent.closest('LDevice')?.getAttribute('inst') ?? '',
                cbName: sampledValueControlAttrs['name'],
            });
            const address = createAddressElement(smvAttrs, smv, instType);
            smv.appendChild(address);
            // get `SMV`'s ``ConnectedAP`` parent
            smvParent = getConnectedAP(parent);
        }
        //add empty dataset that can be filled later
        const dataSet = createElement(parent.ownerDocument, 'DataSet', {
            name: dataSetName,
        });
        const finder = wizard.shadowRoot.querySelector('finder-list');
        const paths = finder?.paths ?? [];
        for (const path of paths) {
            const element = newFCDA(parent, path);
            if (!element)
                continue;
            dataSet.appendChild(element);
        }
        const complexAction = smv
            ? {
                title: 'Create SampledValueControl',
                actions: [
                    { new: { parent, element: sampledValueControl } },
                    { new: { parent: smvParent, element: smv } },
                    { new: { parent, element: dataSet } },
                ],
            }
            : {
                title: 'Create SampledValueControl',
                actions: [
                    { new: { parent, element: sampledValueControl } },
                    { new: { parent, element: dataSet } },
                ],
            };
        return [complexAction];
    };
}
export function createSampledValueControlWizard(ln0OrLn) {
    const server = ln0OrLn.closest('Server');
    const name = getUniqueElementName(ln0OrLn, 'SampledValueControl');
    const desc = null;
    const multicast = 'true';
    const smvID = '';
    const smpMod = 'SmpPerPeriod';
    const smpRate = '80';
    const nofASDU = '1';
    const securityEnabled = null;
    const refreshTime = null;
    const sampleRate = 'true';
    const dataSet = 'true';
    const security = null;
    const synchSourceId = 'true';
    const hasInstType = true;
    const attributes = {
        'MAC-Address': uniqueMacAddress(ln0OrLn.ownerDocument, 'SMV'),
        APPID: uniqueAppId(ln0OrLn.ownerDocument),
        'VLAN-ID': null,
        'VLAN-PRIORITY': null,
    };
    return isAccessPointConnected(ln0OrLn)
        ? [
            {
                title: get('wizard.title.add', { tagName: 'SampledValueControl' }),
                content: contentSampledValueControlWizard({
                    name,
                    desc,
                    multicast,
                    smvID,
                    smpMod,
                    smpRate,
                    nofASDU,
                    securityEnabled,
                }),
            },
            {
                title: get('wizard.title.add', { tagName: 'SmvOpts' }),
                content: contentSmvOptsWizard({
                    refreshTime,
                    sampleRate,
                    dataSet,
                    security,
                    synchSourceId,
                }),
            },
            {
                title: get('wizard.title.add', { tagName: 'SMV' }),
                content: [...contentGseOrSmvWizard({ hasInstType, attributes })],
            },
            {
                title: get('dataset.fcda.add'),
                primary: {
                    icon: 'save',
                    label: get('save'),
                    action: createSampledValueControlAction(ln0OrLn),
                },
                content: [server ? sampledValueDataPicker(server) : html ``],
            },
        ]
        : [
            {
                title: get('wizard.title.add', { tagName: 'SampledValueControl' }),
                content: contentSampledValueControlWizard({
                    name,
                    desc,
                    multicast,
                    smvID,
                    smpMod,
                    smpRate,
                    nofASDU,
                    securityEnabled,
                }),
            },
            {
                title: get('wizard.title.add', { tagName: 'SmvOpts' }),
                content: contentSmvOptsWizard({
                    refreshTime,
                    sampleRate,
                    dataSet,
                    security,
                    synchSourceId,
                }),
            },
            {
                title: get('wizard.title.add', { tagName: 'SMV' }),
                content: [
                    html `<h3
              style="color: var(--mdc-theme-on-surface);
                      font-family: 'Roboto', sans-serif;
                      font-weight: 300;"
            >
              ${get('smv.missingaccp')}
            </h3>`,
                ],
            },
            {
                title: get('dataset.fcda.add'),
                primary: {
                    icon: 'save',
                    label: get('save'),
                    action: createSampledValueControlAction(ln0OrLn),
                },
                content: [server ? sampledValueDataPicker(server) : html ``],
            },
        ];
}
function openSampledValueControlCreateWizard(doc) {
    return (_, wizard) => {
        const finder = wizard.shadowRoot?.querySelector('finder-list');
        const path = finder?.path ?? [];
        if (path.length === 0)
            return [];
        const [tagName, id] = path.pop().split(': ');
        if (tagName !== 'IED')
            return [];
        const ied = find(doc, tagName, id);
        if (!ied)
            return [];
        const ln0 = ied.querySelector('LN0');
        if (!ln0)
            return [];
        return [() => createSampledValueControlWizard(ln0)];
    };
}
export function sampledValueControlParentSelector(doc) {
    return [
        {
            title: get('samvpledvaluecontrol.wizard.location'),
            primary: {
                icon: '',
                label: get('next'),
                action: openSampledValueControlCreateWizard(doc),
            },
            content: [iEDPicker(doc)],
        },
    ];
}
function prepareSampledValueControlCreateWizard(anyParent) {
    return () => {
        if (anyParent.tagName === 'IED' && anyParent.querySelector('LN0'))
            return [
                () => createSampledValueControlWizard(anyParent.querySelector('LN0')),
            ];
        return [() => sampledValueControlParentSelector(anyParent.ownerDocument)];
    };
}
function removeSampledValueControl(element) {
    return (wizard) => {
        const complexAction = removeSampledValueControlAction(element);
        if (complexAction)
            wizard.dispatchEvent(newActionEvent(complexAction));
        wizard.dispatchEvent(newWizardEvent());
    };
}
function openDataSetWizard(element) {
    return (wizard) => {
        wizard.dispatchEvent(newSubWizardEvent(() => editDataSetWizard(element)));
    };
}
function openSmvOptsWizard(element) {
    return (wizard) => {
        wizard.dispatchEvent(newSubWizardEvent(() => editSmvOptsWizard(element)));
    };
}
function openSMvWizard(element) {
    return (wizard) => {
        wizard.dispatchEvent(newSubWizardEvent(() => editSMvWizard(element)));
    };
}
function updateSampledValueControlAction(element) {
    return (inputs) => {
        const attributes = {};
        const attributeKeys = [
            'name',
            'desc',
            'multicast',
            'smvID',
            'smpMod',
            'smpRate',
            'nofASDU',
            'securityEnabled',
        ];
        attributeKeys.forEach(key => {
            const missingMulticast = key === 'multicast' && !inputs.find(i => i.label === key);
            if (missingMulticast) {
                attributes['multicast'] = 'true';
                return;
            }
            attributes[key] = getValue(inputs.find(i => i.label === key));
        });
        let sampledValueControlAction = null;
        if (attributeKeys.some(key => attributes[key] !== element.getAttribute(key))) {
            const newElement = cloneElement(element, attributes);
            sampledValueControlAction = {
                old: { element },
                new: { element: newElement },
            };
        }
        const actions = [];
        if (sampledValueControlAction)
            actions.push(sampledValueControlAction);
        return actions;
    };
}
export function editSampledValueControlWizard(element) {
    const name = element.getAttribute('name');
    const desc = element.getAttribute('desc');
    const multicast = element.getAttribute('multicast');
    const smvID = element.getAttribute('smvID');
    const smpMod = element.getAttribute('smpMod');
    const smpRate = element.getAttribute('smpRate');
    const nofASDU = element.getAttribute('nofASDU');
    const securityEnabled = element.getAttribute('securityEnabled');
    const sMV = getSMV(element);
    const smvOpts = element.querySelector('SmvOpts');
    const dataSet = element.parentElement?.querySelector(`DataSet[name="${element.getAttribute('datSet')}"]`);
    const menuActions = [];
    menuActions.push({
        icon: 'delete',
        label: get('remove'),
        action: removeSampledValueControl(element),
    });
    if (dataSet)
        menuActions.push({
            icon: 'edit',
            label: get('scl.DataSet'),
            action: openDataSetWizard(dataSet),
        });
    if (smvOpts)
        menuActions.push({
            icon: 'edit',
            label: get('scl.SmvOpts'),
            action: openSmvOptsWizard(smvOpts),
        });
    if (sMV)
        menuActions.push({
            icon: 'edit',
            label: get('scl.Communication'),
            action: openSMvWizard(sMV),
        });
    return [
        {
            title: get('wizard.title.edit', { tagName: element.tagName }),
            element,
            primary: {
                icon: 'save',
                label: get('save'),
                action: updateSampledValueControlAction(element),
            },
            menuActions,
            content: [
                ...contentSampledValueControlWizard({
                    name,
                    desc,
                    multicast,
                    smvID,
                    smpMod,
                    smpRate,
                    nofASDU,
                    securityEnabled: securityEnabled,
                }),
            ],
        },
    ];
}
export function selectSampledValueControlWizard(element) {
    const smvControls = Array.from(element.querySelectorAll('SampledValueControl')).filter(isPublic);
    const primary = element.querySelector('LN0')
        ? {
            icon: 'add',
            label: get('scl.SampledValueControl'),
            action: prepareSampledValueControlCreateWizard(element),
        }
        : undefined;
    return [
        {
            title: get('wizard.title.select', { tagName: 'SampledValueControl' }),
            primary,
            content: [
                html `<filtered-list
          @selected=${(e) => {
                    const identity = e.target.selected.value;
                    const sampledValueControl = find(element, 'SampledValueControl', identity);
                    if (!sampledValueControl)
                        return;
                    e.target?.dispatchEvent(newSubWizardEvent(() => editSampledValueControlWizard(sampledValueControl)));
                }}
          >${smvControls.map(smvControl => html `<mwc-list-item twoline value="${identity(smvControl)}"
                ><span>${smvControl.getAttribute('name')}</span
                ><span slot="secondary"
                  >${identity(smvControl)}</span
                ></mwc-list-item
              >`)}</filtered-list
        >`,
            ],
        },
    ];
}
//# sourceMappingURL=sampledvaluecontrol.js.map