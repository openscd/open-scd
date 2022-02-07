import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list/mwc-list-item';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '../filtered-list.js';
import '../wizard-select.js';
import '../wizard-textfield.js';
import {
  cloneElement,
  Delete,
  EditorAction,
  getValue,
  identity,
  isPublic,
  newActionEvent,
  newSubWizardEvent,
  newWizardEvent,
  selector,
  Wizard,
  WizardActor,
  WizardInput,
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
    html`<wizard-select
      label="fixedOffs"
      .maybeValue=${fixedOffs}
      nullable
      required
      helper="${translate('scl.fixedOffs')}"
      >${['true', 'false'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
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

export function removeGseControl(element: Element): Delete[] {
  const dataSet = element.parentElement!.querySelector(
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
      parent: element.parentElement!,
      element,
      reference: element.nextSibling,
    },
  });

  if (dataSet && singleUse)
    actions.push({
      old: {
        parent: element.parentElement!,
        element: dataSet,
        reference: element.nextSibling,
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

  return actions;
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

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateGseControlAction(element),
      },
      content: [
        html`<mwc-button
          label="${translate('remove')}"
          icon="delete"
          @click=${(e: MouseEvent) => {
            const deleteActions = removeGseControl(element);
            deleteActions.forEach(deleteAction =>
              e.target?.dispatchEvent(newActionEvent(deleteAction))
            );
            e.target?.dispatchEvent(newWizardEvent());
          }}
        ></mwc-button>`,
        ...renderGseAttributes(
          name,
          desc,
          type,
          appID,
          fixedOffs,
          securityEnabled
        ),
        dataSet
          ? html`<mwc-button
              id="editdataset"
              label=${translate('wizard.title.edit', {
                tagName: get('scl.DataSet'),
              })}
              icon="edit"
              @click="${(e: MouseEvent) => {
                e.target?.dispatchEvent(
                  newSubWizardEvent(() => editDataSetWizard(dataSet))
                );
              }}}"
            ></mwc-button>`
          : html``,
        gSE
          ? html`<mwc-button
              id="editgse"
              label=${translate('scl.Communication')}
              icon="edit"
              @click="${(e: MouseEvent) => {
                e.target?.dispatchEvent(
                  newSubWizardEvent(() => editGseWizard(gSE))
                );
              }}}"
            ></mwc-button>`
          : html``,
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
