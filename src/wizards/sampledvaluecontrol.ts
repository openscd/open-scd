import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-list/mwc-list-item.js';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '../filtered-list.js';
import '../wizard-checkbox.js';
import '../wizard-select.js';
import '../wizard-textfield.js';
import {
  cloneElement,
  ComplexAction,
  Delete,
  EditorAction,
  getValue,
  identity,
  isPublic,
  MenuAction,
  newActionEvent,
  newSubWizardEvent,
  newWizardEvent,
  selector,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
} from '../foundation.js';
import { securityEnableEnum, smpModEnum } from './foundation/enums.js';
import { maxLength, patterns } from './foundation/limits.js';
import { editSMvWizard } from './smv.js';
import { editSmvOptsWizard } from './smvopts.js';
import { editDataSetWizard } from './dataset.js';

export function getSMV(element: Element): Element | null {
  const cbName = element.getAttribute('name');
  const iedName = element.closest('IED')?.getAttribute('name');
  const apName = element.closest('AccessPoint')?.getAttribute('name');
  const ldInst = element.closest('LDevice')?.getAttribute('inst');

  return (
    element
      .closest('SCL')
      ?.querySelector(
        `:root > Communication > SubNetwork > ` +
          `ConnectedAP[iedName="${iedName}"][apName="${apName}"] > ` +
          `SMV[ldInst="${ldInst}"][cbName="${cbName}"]`
      ) ?? null
  );
}

export function removeSampledValueControlAction(
  element: Element
): ComplexAction | null {
  if (!element.parentElement) return null;

  const dataSet = element.parentElement!.querySelector(
    `DataSet[name="${element.getAttribute('datSet')}"]`
  );
  const sMV = getSMV(element);

  const singleUse =
    Array.from(
      element.parentElement.querySelectorAll<Element>(
        'ReportControl, GSEControl, SampledValueControl'
      )
    ).filter(
      controlblock =>
        controlblock.getAttribute('datSet') === dataSet?.getAttribute('name')
    ).length <= 1;

  const actions: Delete[] = [];

  actions.push({
    old: {
      parent: element.parentElement!,
      element,
    },
  });

  if (dataSet && singleUse)
    actions.push({
      old: {
        parent: element.parentElement!,
        element: dataSet,
      },
    });

  if (sMV)
    actions.push({
      old: {
        parent: sMV.parentElement!,
        element: sMV,
      },
    });

  const name = element.getAttribute('name')!;
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

interface ContentOptions {
  name: string | null;
  desc: string | null;
  multicast: string | null;
  smvID: string | null;
  smpMod: string | null;
  smpRate: string | null;
  nofASDU: string | null;
  securityEnable: string | null;
}

function contentSampledValueControlWizard(
  options: ContentOptions
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${options.name}
      helper="${translate('scl.name')}"
      required
      validationMessage="${translate('textfield.required')}"
      pattern="${patterns.asciName}"
      maxLength="${maxLength.cbName}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
      pattern="${patterns.normalizedString}"
      helper="${translate('scl.desc')}"
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="multicast"
      .maybeValue=${options.multicast}
      helper="${translate('scl.multicast')}"
      disabled
    ></wizard-checkbox>`,
    html`<wizard-textfield
      label="smvID"
      .maybeValue=${options.smvID}
      helper="${translate('scl.id')}"
      required
      validationMessage="${translate('textfield.nonempty')}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="smpMod"
      .maybeValue=${options.smpMod}
      nullable
      required
      helper="${translate('scl.smpMod')}"
      >${smpModEnum.map(
        option =>
          html`<mwc-list-item value="${option}">${option}</mwc-list-item>`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="smpRate"
      .maybeValue=${options.smpRate}
      helper="${translate('scl.smpRate')}"
      required
      type="number"
      min="0"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="nofASDU"
      .maybeValue=${options.nofASDU}
      helper="${translate('scl.nofASDU')}"
      required
      type="number"
      min="0"
    ></wizard-textfield>`,
    html`<wizard-select
      label="securityEnable"
      .maybeValue=${options.securityEnable}
      nullable
      required
      helper="${translate('scl.securityEnable')}"
      >${securityEnableEnum.map(
        option =>
          html`<mwc-list-item value="${option}">${option}</mwc-list-item>`
      )}</wizard-select
    >`,
  ];
}

function removeSampledValueControl(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    const complexAction = removeSampledValueControlAction(element);
    if (complexAction) wizard.dispatchEvent(newActionEvent(complexAction));
    wizard.dispatchEvent(newWizardEvent());
  };
}

function openDataSetWizard(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => editDataSetWizard(element)));
  };
}

function openSmvOptsWizard(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => editSmvOptsWizard(element)));
  };
}

function openSMvWizard(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => editSMvWizard(element)));
  };
}

function updateSampledValueControlAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const attributes: Record<string, string | null> = {};
    const attributeKeys = [
      'name',
      'desc',
      'multicast',
      'smvID',
      'smpMod',
      'smpRate',
      'nofASDU',
      'securityEnable',
    ];

    attributeKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    let sampledValueControlAction: EditorAction | null = null;
    if (
      attributeKeys.some(key => attributes[key] !== element.getAttribute(key))
    ) {
      const newElement = cloneElement(element, attributes);
      sampledValueControlAction = {
        old: { element },
        new: { element: newElement },
      };
    }

    const actions: EditorAction[] = [];
    if (sampledValueControlAction) actions.push(sampledValueControlAction);
    return actions;
  };
}

export function editSampledValueControlWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const multicast = element.getAttribute('multicast');
  const smvID = element.getAttribute('smvID');
  const smpMod = element.getAttribute('smpMod');
  const smpRate = element.getAttribute('smpRate');
  const nofASDU = element.getAttribute('nofASDU');
  const securityEnable = element.getAttribute('securityEnabled');

  const sMV = getSMV(element);
  const smvOpts = element.querySelector('SmvOpts')!;

  const dataSet = element.parentElement?.querySelector(
    `DataSet[name="${element.getAttribute('datSet')}"]`
  );

  const menuActions: MenuAction[] = [];
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
          securityEnable,
        }),
      ],
    },
  ];
}

export function selectSampledValueControlWizard(element: Element): Wizard {
  const smvControls = Array.from(
    element.querySelectorAll('SampledValueControl')
  ).filter(isPublic);

  return [
    {
      title: get('wizard.title.select', { tagName: 'SampledValueControl' }),
      content: [
        html`<filtered-list
          @selected=${(e: SingleSelectedEvent) => {
            const identity = (<ListItemBase>(<List>e.target).selected).value;
            const sampledValueControl = element.querySelector(
              selector('SampledValueControl', identity)
            );
            if (!sampledValueControl) return;

            e.target?.dispatchEvent(
              newSubWizardEvent(() =>
                editSampledValueControlWizard(sampledValueControl)
              )
            );
          }}
          >${smvControls.map(
            smvControl =>
              html`<mwc-list-item twoline value="${identity(smvControl)}"
                ><span>${smvControl.getAttribute('name')}</span
                ><span slot="secondary"
                  >${identity(smvControl)}</span
                ></mwc-list-item
              >`
          )}</filtered-list
        >`,
      ],
    },
  ];
}
