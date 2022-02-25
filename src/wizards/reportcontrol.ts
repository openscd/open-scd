import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list/mwc-list-item';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '../wizard-checkbox.js';
import '../wizard-textfield.js';
import '../wizard-select.js';
import '../filtered-list.js';
import {
  cloneElement,
  createElement,
  EditorAction,
  getReference,
  getValue,
  identity,
  isPublic,
  newSubWizardEvent,
  newWizardEvent,
  newActionEvent,
  selector,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInput,
  Delete,
  getUniqueElementName,
} from '../foundation.js';
import { FinderList } from '../finder-list.js';
import { dataAttributePicker, iEDPicker } from './foundation/finder.js';
import { maxLength, patterns } from './foundation/limits.js';
import { editDataSetWizard } from './dataset.js';
import { newFCDA } from './fcda.js';
import { contentOptFieldsWizard, editOptFieldsWizard } from './optfields.js';
import { contentTrgOpsWizard, editTrgOpsWizard } from './trgops.js';

interface ContentOptions {
  name: string | null;
  desc: string | null;
  buffered: string | null;
  rptID: string | null;
  indexed: string | null;
  max: string | null;
  bufTime: string | null;
  intgPd: string | null;
}

function contentReportControlWizard(options: ContentOptions): TemplateResult[] {
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
    html`<wizard-checkbox
      label="buffered"
      .maybeValue=${options.buffered}
      helper="${translate('scl.buffered')}"
    ></wizard-checkbox>`,
    html`<wizard-textfield
      label="rptID"
      .maybeValue=${options.rptID}
      nullable
      required
      helper="${translate('scl.id')}"
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="indexed"
      .maybeValue=${options.indexed}
      nullable
      helper="${translate('scl.indexed')}"
    ></wizard-checkbox>`,
    html`<wizard-textfield
      label="max Clients"
      .maybeValue=${options.max}
      helper="${translate('scl.maxReport')}"
      nullable
      type="number"
      suffix="#"
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

function createReportControlAction(parent: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element) => {
    // create ReportControl element
    const reportControlAttrs: Record<string, string | null> = {};
    const reportKeys = [
      'name',
      'desc',
      'buffered',
      'rptID',
      'indexed',
      'bufTime',
      'intgPd',
    ];
    reportKeys.forEach(key => {
      reportControlAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    // confRef is handled automatically and is 1 for new referenced ReportControl
    reportControlAttrs['confRev'] = '1';

    const dataSetName = reportControlAttrs.name + 'sDataSet';
    reportControlAttrs['datSet'] = dataSetName;

    const reportControl = createElement(
      parent.ownerDocument,
      'ReportControl',
      reportControlAttrs
    );

    // create OptFields child element
    const optFieldsAttrs: Record<string, string | null> = {};
    const optFieldKeys = [
      'seqNum',
      'timeStamp',
      'dataSet',
      'reasonCode',
      'dataRef',
      'entryID',
      'configRef',
      'bufOvfl',
    ];
    optFieldKeys.forEach(key => {
      optFieldsAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });
    const optFields = createElement(
      parent.ownerDocument,
      'OptFields',
      optFieldsAttrs
    );

    // create TrgOps child element
    const trgOpsAttrs: Record<string, string | null> = {};
    const trgOpKeys = ['dchg', 'qchg', 'dupd', 'period', 'gi'];
    trgOpKeys.forEach(key => {
      trgOpsAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });
    const trgOps = createElement(parent.ownerDocument, 'TrgOps', trgOpsAttrs);

    // create RptEnabled element
    const max = getValue(inputs.find(i => i.label === 'max Clients')!);
    const rptEnabled = max
      ? createElement(parent.ownerDocument, 'RptEnabled', {
          max,
        })
      : null;

    // add all three child elements to ReportControl
    reportControl.appendChild(trgOps);
    reportControl.appendChild(optFields);
    if (rptEnabled) reportControl.appendChild(rptEnabled);

    //add empty dataset that can be filled later
    const dataSet = createElement(parent.ownerDocument, 'DataSet', {
      name: dataSetName,
    });
    const finder = wizard.shadowRoot!.querySelector<FinderList>('finder-list');
    const paths = finder?.paths ?? [];

    for (const path of paths) {
      const element = newFCDA(parent, path);

      if (!element) continue;

      dataSet.appendChild(element);
    }

    const complexAction = {
      title: 'Create ReportControl',
      actions: [
        { new: { parent, element: reportControl } },
        { new: { parent, element: dataSet } },
      ],
    };
    return [complexAction];
  };
}

export function createReportControlWizard(ln0OrLn: Element): Wizard {
  const server = ln0OrLn.closest('Server');

  const name = getUniqueElementName(ln0OrLn, 'ReportControl');
  const desc = null;
  const buffered = 'true';
  const rptID = null;
  const indexed = 'true';
  const max = '5';
  const bufTime = '100';
  const intgPd = '1000';

  const dchg = 'true';
  const qchg = 'true';
  const dupd = 'true';
  const period = 'true';
  const gi = 'false';

  const seqNum = 'true';
  const timeStamp = 'true';
  const dataSet = 'true';
  const reasonCode = 'true';
  const dataRef = 'true';
  const entryID = 'true';
  const configRef = 'true';
  const bufOvfl = 'true';

  return [
    {
      title: get('wizard.title.add', { tagName: 'ReportControl' }),
      content: contentReportControlWizard({
        name,
        desc,
        buffered,
        rptID,
        indexed,
        max,
        bufTime,
        intgPd,
      }),
    },
    {
      title: get('scl.TrgOps'),
      content: contentTrgOpsWizard({ dchg, qchg, dupd, period, gi }),
    },
    {
      title: get('scl.OptFields'),
      content: contentOptFieldsWizard({
        seqNum,
        timeStamp,
        dataSet,
        reasonCode,
        dataRef,
        entryID,
        configRef,
        bufOvfl,
      }),
    },
    {
      title: get('dataset.fcda.add'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createReportControlAction(ln0OrLn),
      },

      content: [server ? dataAttributePicker(server) : html``],
    },
  ];
}

function openReportControlCreateWizard(doc: XMLDocument): WizardActor {
  return (_: WizardInput[], wizard: Element) => {
    const finder = wizard.shadowRoot?.querySelector<FinderList>('finder-list');
    const path = finder?.path ?? [];

    if (path.length === 0) return [];

    const [tagName, id] = path.pop()!.split(': ');
    if (tagName !== 'IED') return [];

    const ied = doc.querySelector(selector(tagName, id));
    if (!ied) return [];

    const ln0 = ied.querySelector('LN0');
    if (!ln0) return [];

    return [() => createReportControlWizard(ln0)];
  };
}

export function reportControlParentSelector(doc: XMLDocument): Wizard {
  return [
    {
      title: get('report.wizard.location'),
      primary: {
        icon: '',
        label: get('next'),
        action: openReportControlCreateWizard(doc),
      },
      content: [iEDPicker(doc)],
    },
  ];
}

function prepareReportControlCreateWizard(anyParent: Element): WizardActor {
  return () => {
    if (anyParent.tagName === 'IED' && anyParent.querySelector('LN0'))
      return [() => createReportControlWizard(anyParent.querySelector('LN0')!)];

    return [() => reportControlParentSelector(anyParent.ownerDocument)];
  };
}

export function removeReportControlAction(element: Element): Delete[] {
  if (!element.parentElement) return [];

  const dataSet = element.parentElement.querySelector(
    `DataSet[name="${element.getAttribute('datSet')}"]`
  );

  const isDataSetUsedByThisControlBlockOnly =
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
      reference: element.nextSibling,
    },
  });

  if (dataSet && isDataSetUsedByThisControlBlockOnly)
    actions.push({
      old: {
        parent: element.parentElement!,
        element: dataSet,
        reference: element.nextSibling,
      },
    });

  return actions;
}

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

export function editReportControlWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const buffered = element.getAttribute('buffered');

  const rptID = element.getAttribute('rptID');

  const indexed = element.getAttribute('indexed');
  const max = element.querySelector('RptEnabled')?.getAttribute('max') ?? null;
  const bufTime = element.getAttribute('bufTime');
  const intgPd = element.getAttribute('intgPd');

  const trgOps = element.querySelector('TrgOps');
  const optFields = element.querySelector('OptFields');
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
        action: updateReportControlAction(element),
      },
      content: [
        ...contentReportControlWizard({
          name,
          desc,
          buffered,
          rptID,
          indexed,
          max,
          bufTime,
          intgPd,
        }),
        dataSet
          ? html`<mwc-button
              label=${translate('scl.DataSet')}
              icon="edit"
              id="editdataset"
              @click=${(e: MouseEvent) => {
                e.target?.dispatchEvent(
                  newSubWizardEvent(() => editDataSetWizard(dataSet))
                );
              }}
            ></mwc-button>`
          : html``,
        trgOps
          ? html`<mwc-button
              label=${translate('scl.TrgOps')}
              icon="edit"
              id="edittrgops"
              @click=${(e: MouseEvent) => {
                e.target?.dispatchEvent(
                  newSubWizardEvent(() => editTrgOpsWizard(trgOps))
                );
              }}
            ></mwc-button>`
          : html``,
        optFields
          ? html`<mwc-button
              label=${translate('scl.OptFields')}
              icon="edit"
              id="editoptfields"
              @click=${(e: MouseEvent) => {
                e.target?.dispatchEvent(
                  newSubWizardEvent(() => editOptFieldsWizard(optFields))
                );
              }}
            ></mwc-button>`
          : html``,
        html`<mwc-button
          label="${translate('remove')}"
          icon="delete"
          @click=${(e: MouseEvent) => {
            const deleteActions = removeReportControlAction(element);
            deleteActions.forEach(deleteAction =>
              e.target?.dispatchEvent(newActionEvent(deleteAction))
            );
            e.target?.dispatchEvent(newWizardEvent());
          }}
        ></mwc-button>`,
      ],
    },
  ];
}

export function selectReportControlWizard(element: Element): Wizard {
  const reportControls = Array.from(
    element.querySelectorAll('ReportControl')
  ).filter(isPublic);

  const primary = element.querySelector('LN0')
    ? {
        icon: 'add',
        label: get('Report'),
        action: prepareReportControlCreateWizard(element),
      }
    : undefined;

  return [
    {
      title: get('wizard.title.select', { tagName: 'ReportControl' }),
      primary,
      content: [
        html`<filtered-list
          @selected=${(e: SingleSelectedEvent) => {
            const identity = (<ListItemBase>(<List>e.target).selected).value;
            const reportControl = element.querySelector(
              selector('ReportControl', identity)
            );
            if (!reportControl) return;

            e.target?.dispatchEvent(
              newSubWizardEvent(() => editReportControlWizard(reportControl))
            );
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
