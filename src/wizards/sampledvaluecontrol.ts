import { List } from '@material/mwc-list';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  cloneElement,
  EditorAction,
  getValue,
  identity,
  isPublic,
  newSubWizardEvent,
  selector,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { securityEnableEnum, smpModEnum } from './foundation/enums.js';
import { maxLength, patterns } from './foundation/limits.js';

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
      helper="${translate('scl.desc')}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="multicast"
      .maybeValue=${options.multicast}
      helper="${translate('scl.multicast')}"
      disabled
      >${['true', 'false'].map(
        option =>
          html`<mwc-list-item value="${option}">${option}</mwc-list-item>`
      )}</wizard-select
    >`,
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

function updateSampledValueControlAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const multicast = getValue(inputs.find(i => i.label === 'multicast')!);
    const smvID = getValue(inputs.find(i => i.label === 'smvID')!)!;
    const smpMod = getValue(inputs.find(i => i.label === 'smpMod')!);
    const smpRate = getValue(inputs.find(i => i.label === 'smpRate')!);
    const nofASDU = getValue(inputs.find(i => i.label === 'nofASDU')!);
    const securityEnable = getValue(
      inputs.find(i => i.label === 'securityEnable')!
    );

    let sampledValueControlAction: EditorAction | null;
    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      multicast === element.getAttribute('multicast') &&
      smvID === element.getAttribute('smvID') &&
      smpMod === element.getAttribute('smpMod') &&
      smpRate === element.getAttribute('smpRate') &&
      nofASDU === element.getAttribute('nofASDU') &&
      securityEnable === element.getAttribute('securityEnable')
    ) {
      sampledValueControlAction = null;
    } else {
      const newElement = cloneElement(element, {
        name,
        desc,
        multicast,
        smvID,
        smpMod,
        smpRate,
        nofASDU,
        securityEnable,
      });
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

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateSampledValueControlAction(element),
      },
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
