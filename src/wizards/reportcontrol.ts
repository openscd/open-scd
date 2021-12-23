import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list/mwc-list-item';

import '../wizard-textfield.js';
import '../wizard-select.js';
import '../filtered-list.js';
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
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { renderOptFields } from './optfields.js';

function getRptEnabledAction(
  olRptEnabled: Element | null,
  max: string | null,
  reportCb: Element
): SimpleAction {
  if (olRptEnabled === null) {
    const element = createElement(reportCb.ownerDocument, 'RptEnabled', {
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

  const newRptEnabled = <Element>cloneElement(olRptEnabled!, { max });
  return {
    old: { element: olRptEnabled! },
    new: { element: newRptEnabled },
  };
}

function updateReportControlAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const attributes: Record<string, string | null> = {};
    const attributeKeys = [
      'name',
      'desc',
      'buffered',
      'rptID',
      'indexed',
      'bufTime',
      'intgPd',
    ];

    attributeKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    let reportControlAction: EditorAction | null = null;
    if (
      attributeKeys.some(key => attributes[key] !== element.getAttribute(key))
    ) {
      const newElement = cloneElement(element, attributes);
      reportControlAction = {
        old: { element },
        new: { element: newElement },
      };
    }

    const max = getValue(inputs.find(i => i.label === 'max Clients')!);

    let rptEnabledAction: EditorAction | null = null;
    if (
      max !== (element.querySelector('RptEnabled')?.getAttribute('max') ?? null)
    )
      rptEnabledAction = getRptEnabledAction(
        element.querySelector('RptEnabled')!,
        max,
        element
      );

    const actions: EditorAction[] = [];
    if (reportControlAction) actions.push(reportControlAction);
    if (rptEnabledAction) actions.push(rptEnabledAction);
    return actions;
  };
}

interface RenderOptions {
  name: string | null;
  desc: string | null;
  buffered: string | null;
  rptID: string | null;
  indexed: string | null;
  max: string | null;
  bufTime: string | null;
  intgPd: string | null;
}

function renderReportControlWizardInputs(
  options: RenderOptions
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
      label="buffered"
      .maybeValue=${options.buffered}
      helper="${translate('scl.buffered')}"
      disabled
      >${['true', 'false'].map(
        option =>
          html`<mwc-list-item value="${option}">${option}</mwc-list-item>`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="rptID"
      .maybeValue=${options.rptID}
      helper="${translate('scl.id')}"
      required
      validationMessage="${translate('textfield.nonempty')}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="indexed"
      .maybeValue=${options.indexed}
      nullable
      required
      helper="${translate('scl.indexed')}"
      >${['true', 'false'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="max Clients"
      .maybeValue=${options.max}
      helper="${translate('scl.maxReport')}"
      nullable
      type="number"
      suffix="ms"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="bufTime"
      .maybeValue=${options.bufTime}
      helper="${translate('scl.bufTime')}"
      nullable
      required
      type="number"
      min="0"
      suffix="ms"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="intgPd"
      .maybeValue=${options.intgPd}
      helper="${translate('scl.intgPd')}"
      nullable
      required
      type="number"
      min="0"
      suffix="ms"
    ></wizard-textfield>`,
  ];
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
        ...renderReportControlWizardInputs({
          name,
          desc,
          buffered,
          rptID,
          indexed,
          max,
          bufTime,
          intgPd,
        }),
      ],
    },
  ];
}

export function testReportControlWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const buffered = element.getAttribute('buffered');

  const rptID = element.getAttribute('rptID');

  const indexed = element.getAttribute('indexed');
  const max = element.querySelector('RptEnabled')?.getAttribute('max') ?? null;
  const bufTime = element.getAttribute('bufTime');
  const intgPd = element.getAttribute('intgPd');

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      type: 'finder',
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateReportControlAction(element),
      },
      content: [
        ...renderReportControlWizardInputs({
          name,
          desc,
          buffered,
          rptID,
          indexed,
          max,
          bufTime,
          intgPd,
        }),
      ],
    },
    {
      title: '',
      content: [...renderOptFields(element.querySelector('OptFields')!)],
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
        html`<div class="pane">
          <div class="column">
            <filtered-list activatable>
              ${reportControls.map(
                reportControl =>
                  html`<mwc-list-item
                    twoline
                    value="${identity(reportControl)}"
                    @request-selected=${(e: Event) => {
                      const identity = (e.target as ListItem).value;
                      const report = element.querySelector(
                        selector('ReportControl', identity)
                      );

                      const pane = (e.target as ListItem).closest('div');

                      pane?.dispatchEvent(newWizardEvent());
                      pane?.dispatchEvent(
                        newWizardEvent(testReportControlWizard(report!))
                      );
                    }}
                    ><span>${reportControl.getAttribute('name')}</span
                    ><span slot="secondary">${identity(reportControl)}</span>
                  </mwc-list-item>`
              )}</filtered-list
            >
          </div>
        </div>`,
      ],
    },
  ];
}
