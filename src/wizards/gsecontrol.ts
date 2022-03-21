import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list/mwc-list-item';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
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
  newSubWizardEvent,
  selector,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
  WizardMenuActor,
} from '../foundation.js';
import { maxLength, patterns } from './foundation/limits.js';
import { editDataSetWizard } from './dataset.js';
import { editGseWizard } from './gse.js';
import { securityEnableEnum } from './foundation/enums.js';

function getGSE(element: Element): Element | null | undefined {
  const cbName = element.getAttribute('name');
  const iedName = element.closest('IED')?.getAttribute('name');
  const apName = element.closest('AccessPoint')?.getAttribute('name');
  const ldInst = element.closest('LDevice')?.getAttribute('inst');
  return element
    .closest('SCL')
    ?.querySelector(
      `:root > Communication > SubNetwork > ` +
        `ConnectedAP[iedName="${iedName}"][apName="${apName}"] > ` +
        `GSE[ldInst="${ldInst}"][cbName="${cbName}"]`
    );
}

export function renderGseAttributes(
  name: string | null,
  desc: string | null,
  type: string | null,
  appID: string | null,
  fixedOffs: string | null,
  securityEnabled: string | null
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('scl.name')}"
      required
      validationMessage="${translate('textfield.required')}"
      pattern="${patterns.asciName}"
      maxLength="${maxLength.cbName}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('scl.desc')}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="type"
      .maybeValue=${type}
      helper="${translate('scl.type')}"
      nullable
      required
      >${['GOOSE', 'GSSE'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="appID"
      .maybeValue=${appID}
      helper="${translate('scl.id')}"
      required
      validationMessage="${translate('textfield.nonempty')}"
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="fixedOffs"
      .maybeValue=${fixedOffs}
      nullable
      helper="${translate('scl.fixedOffs')}"
    ></wizard-checkbox>`,
    html`<wizard-select
      label="securityEnabled"
      .maybeValue=${securityEnabled}
      nullable
      required
      helper="${translate('scl.securityEnable')}"
      >${securityEnableEnum.map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
  ];
}

export function removeGseControlAction(element: Element): ComplexAction | null {
  if (!element.parentElement) return null;

  const dataSet = element.parentElement.querySelector(
    `DataSet[name="${element.getAttribute('datSet')}"]`
  );
  const gSE = getGSE(element);

  const singleUse =
    Array.from(
      element.parentElement?.querySelectorAll<Element>(
        'ReportControl, GSEControl, SampledValueControl'
      ) ?? []
    ).filter(
      controlblock =>
        controlblock.getAttribute('datSet') === dataSet?.getAttribute('name')
    ).length <= 1;

  const actions: Delete[] = [];

  actions.push({
    old: {
      parent: element.parentElement,
      element,
      reference: element.nextSibling,
    },
  });

  if (dataSet && singleUse)
    actions.push({
      old: {
        parent: element.parentElement,
        element: dataSet,
        reference: dataSet.nextSibling,
      },
    });

  if (gSE)
    actions.push({
      old: {
        parent: gSE.parentElement!,
        element: gSE,
        reference: gSE.nextSibling,
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

export function removeGseControl(element: Element): WizardMenuActor {
  return (): WizardAction[] => {
    const complexAction = removeGseControlAction(element);
    if (complexAction) return [complexAction];
    return [];
  };
}

function openDataSetWizard(element: Element): WizardMenuActor {
  return (): WizardAction[] => {
    return [() => editDataSetWizard(element)];
  };
}

function openGseWizard(element: Element): WizardMenuActor {
  return (): WizardAction[] => {
    return [() => editGseWizard(element)];
  };
}

export function updateGseControlAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);
    const appID = getValue(inputs.find(i => i.label === 'appID')!)!;
    const fixedOffs = getValue(inputs.find(i => i.label === 'fixedOffs')!);
    const securityEnabled = getValue(
      inputs.find(i => i.label === 'securityEnabled')!
    );

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      type === element.getAttribute('type') &&
      appID === element.getAttribute('appID') &&
      fixedOffs === element.getAttribute('fixedOffs') &&
      securityEnabled === element.getAttribute('securityEnabled')
    )
      return [];

    const newElement = cloneElement(element, {
      name,
      desc,
      type,
      appID,
      fixedOffs,
      securityEnabled,
    });

    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function editGseControlWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const appID = element.getAttribute('appID');
  const fixedOffs = element.getAttribute('fixedOffs');
  const securityEnabled = element.getAttribute('securityEnabled');

  const gSE = getGSE(element);

  const dataSet = element.parentElement?.querySelector(
    `DataSet[name="${element.getAttribute('datSet')}"]`
  );

  const menuActions: MenuAction[] = [];
  menuActions.push({
    icon: 'delete',
    label: get('remove'),
    action: removeGseControl(element),
  });

  if (dataSet)
    menuActions.push({
      icon: 'edit',
      label: get('scl.DataSet'),
      action: openDataSetWizard(dataSet),
    });

  if (gSE)
    menuActions.push({
      icon: 'edit',
      label: get('scl.Communication'),
      action: openGseWizard(gSE),
    });

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateGseControlAction(element),
      },
      menuActions,
      content: [
        ...renderGseAttributes(
          name,
          desc,
          type,
          appID,
          fixedOffs,
          securityEnabled
        ),
      ],
    },
  ];
}

export function selectGseControlWizard(element: Element): Wizard {
  const gseControls = Array.from(element.querySelectorAll('GSEControl')).filter(
    isPublic
  );

  return [
    {
      title: get('wizard.title.select', { tagName: 'GSEcontrol' }),
      content: [
        html`<filtered-list
          @selected=${(e: SingleSelectedEvent) => {
            const gseControlIndentity = (<ListItem>(<List>e.target).selected)
              .value;
            const gseControl = element.querySelector<Element>(
              selector('GSEControl', gseControlIndentity)
            );
            if (gseControl) {
              e.target!.dispatchEvent(
                newSubWizardEvent(() => editGseControlWizard(gseControl))
              );
            }
          }}
          >${gseControls.map(
            gseControl =>
              html`<mwc-list-item twoline value="${identity(gseControl)}"
                ><span>${gseControl.getAttribute('name')}</span
                ><span slot="secondary"
                  >${identity(gseControl)}</span
                ></mwc-list-item
              >`
          )}</filtered-list
        >`,
      ],
    },
  ];
}
