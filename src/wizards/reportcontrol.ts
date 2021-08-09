import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  cloneElement,
  createElement,
  Delete,
  EditorAction,
  getReference,
  getValue,
  identity,
  isPublic,
  newActionEvent,
  newWizardEvent,
  selector,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { maxLength, patterns } from './foundation/limits.js';

import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import { editDataSetWizard } from './dataset.js';
import { editOptFieldsWizard } from './optfields.js';
import { editTrgOpsWizard } from './trgopt.js';

export function openEditReportControlWizardAction(
  element: Element
): WizardActor {
  return () => [() => editReportControlWizard(element)];
}

export function renderReportControlAttributes(
  name: string | null,
  desc: string | null,
  buffered: string | null,
  rptID: string | null,
  indexed: string | null,
  max: string | null,
  bufTime: string | null,
  intgPd: string | null
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
      label="buffered"
      .maybeValue=${buffered}
      helper="${translate('scl.buffered')}"
      disabled
      >${['true', 'false'].map(
        option =>
          html`<mwc-list-item value="${option}">${option}</mwc-list-item>`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="rptID"
      .maybeValue=${rptID}
      helper="${translate('scl.id')}"
      required
      validationMessage="${translate('textfield.nonempty')}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="indexed"
      .maybeValue=${indexed}
      nullable
      required
      helper="${translate('scl.indexed')}"
      >${['true', 'false'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="max Clients"
      .maybeValue=${max}
      helper="${translate('scl.maxReport')}"
      nullable
      type="number"
      suffix="ms"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="bufTime"
      .maybeValue=${bufTime}
      helper="${translate('scl.bufTime')}"
      nullable
      required
      type="number"
      min="0"
      suffix="ms"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="intgPd"
      .maybeValue=${intgPd}
      helper="${translate('scl.intgPd')}"
      nullable
      required
      type="number"
      min="0"
      suffix="ms"
    ></wizard-textfield>`,
  ];
}

export function removeReportAction(element: Element): Delete[] {
  const dataSet = element.parentElement!.querySelector(
    `DataSet[name="${element.getAttribute('datSet')}"]`
  );

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

  return actions;
}

export function getRptEnableAction(
  olRptEnable: Element | null,
  max: string | null,
  reportCb: Element
): SimpleAction {
  if (olRptEnable === null) {
    const element = createElement(reportCb.ownerDocument, 'RptEnable', {
      max,
    });
    return {
      new: {
        parent: reportCb,
        element,
        reference: getReference(reportCb, 'RptEnabled'),
      },
    };
  }

  const newRptEnable = <Element>cloneElement(olRptEnable!, { max });
  return {
    old: { element: olRptEnable! },
    new: { element: newRptEnable },
  };
}

export function updateReportControlAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const buffered = getValue(inputs.find(i => i.label === 'buffered')!);
    const rptID = getValue(inputs.find(i => i.label === 'rptID')!)!;
    const indexed = getValue(inputs.find(i => i.label === 'indexed')!);
    const max = getValue(inputs.find(i => i.label === 'max Clients')!);
    const bufTime = getValue(inputs.find(i => i.label === 'bufTime')!);
    const intgPd = getValue(inputs.find(i => i.label === 'intgPd')!);

    let reportControlAction: EditorAction | null;
    let rptEnableAction: EditorAction | null;
    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      buffered === element.getAttribute('buffered') &&
      rptID === element.getAttribute('rptID') &&
      indexed === element.getAttribute('indexed') &&
      bufTime === element.getAttribute('bufTime') &&
      intgPd === element.getAttribute('intgPd')
    ) {
      reportControlAction = null;
    } else {
      const newElement = cloneElement(element, {
        name,
        desc,
        buffered,
        rptID,
        indexed,
        bufTime,
        intgPd,
      });
      reportControlAction = { old: { element }, new: { element: newElement } };
    }

    if (
      max === (element.querySelector('RptEnabled')?.getAttribute('max') ?? null)
    )
      rptEnableAction = null;
    else
      rptEnableAction = getRptEnableAction(
        element.querySelector('RptEneable')!,
        max,
        element
      );

    const actions: EditorAction[] = [];
    if (reportControlAction) actions.push(reportControlAction);
    if (rptEnableAction) actions.push(rptEnableAction);
    return actions;
  };
}

export function editReportControlWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const buffered = element.getAttribute('buffered');

  const rptID = element.getAttribute('rptID');

  const indexed = element.getAttribute('indexed');
  const max = element.querySelector('RptEnabled')?.getAttribute('max') ?? null;
  const bufTime = element.getAttribute('bufTime');
  const intgPd = element.getAttribute('intgPd');

  const dataSet = element.parentElement?.querySelector(
    `DataSet[name="${element.getAttribute('datSet')}"]`
  );
  const optFields = element.querySelector('OptFields');
  const trgOps = element.querySelector('TrgOps');

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateReportControlAction(element),
      },
      content: [
        html`<mwc-button
          label="${translate('remove')}"
          icon="delete"
          @click=${(e: MouseEvent) => {
            const deleteActions = removeReportAction(element);
            deleteActions.forEach(deleteAction =>
              e.target?.dispatchEvent(newActionEvent(deleteAction))
            );
            e.target?.dispatchEvent(newWizardEvent());
          }}
        ></mwc-button>`,
        ...renderReportControlAttributes(
          name,
          desc,
          buffered,
          rptID,
          indexed,
          max,
          bufTime,
          intgPd
        ),
        dataSet
          ? html`<mwc-button
              id="editdataset"
              label=${translate('wizard.title.edit', {
                tagName: get('scl.DataSet'),
              })}
              icon="edit"
              @click=${(e: MouseEvent) => {
                if (dataSet) {
                  e.target?.dispatchEvent(newWizardEvent());
                  e.target?.dispatchEvent(
                    newWizardEvent(editDataSetWizard(dataSet))
                  );
                }
              }}
            ></mwc-button>`
          : html``,
        optFields
          ? html`<mwc-button
              id="editoptfields"
              label=${get('scl.OptFields')}
              icon="edit"
              @click=${(e: MouseEvent) => {
                if (dataSet) {
                  e.target?.dispatchEvent(newWizardEvent());
                  e.target?.dispatchEvent(
                    newWizardEvent(editOptFieldsWizard(optFields))
                  );
                }
              }}
            ></mwc-button>`
          : html``,
        trgOps
          ? html`<mwc-button
              id="edittrgops"
              label=${get('scl.TrgOps')}
              icon="edit"
              @click=${(e: MouseEvent) => {
                if (dataSet) {
                  e.target?.dispatchEvent(newWizardEvent());
                  e.target?.dispatchEvent(
                    newWizardEvent(editTrgOpsWizard(trgOps))
                  );
                }
              }}
            ></mwc-button>`
          : html``,
      ],
    },
  ];
}

export function selectReportControlWizard(element: Element): Wizard {
  const reportControls = Array.from(
    element.querySelectorAll('ReportControl')
  ).filter(isPublic);

  return [
    {
      title: get('wizard.title.select', { tagName: 'ReportControl' }),
      content: [
        html`<filtered-list
          @selected=${(e: SingleSelectedEvent) => {
            const reportControlIndentity = (<ListItem>(<List>e.target).selected)
              .value;
            const reportControl = element.querySelector<Element>(
              selector('ReportControl', reportControlIndentity)
            );
            if (reportControl) {
              e.target!.dispatchEvent(
                newWizardEvent(editReportControlWizard(reportControl))
              );
              e.target!.dispatchEvent(newWizardEvent());
            }
          }}
          >${reportControls.map(
            reportControl =>
              html`<mwc-list-item twoline value="${identity(reportControl)}"
                ><span>${reportControl.getAttribute('name')}</span
                ><span slot="secondary"
                  >${identity(reportControl)}</span
                ></mwc-list-item
              >`
          )}</filtered-list
        >`,
      ],
    },
  ];
}
