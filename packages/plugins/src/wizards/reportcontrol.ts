import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '@openscd/open-scd/src/wizard-checkbox.js';
import '@openscd/open-scd/src/wizard-textfield.js';
import '@openscd/open-scd/src/wizard-select.js';
import '@openscd/open-scd/src/filtered-list.js';
import {
  find,
  getReference,
  getValue,
  identity,
  isPublic,
  newSubWizardEvent,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
  MenuAction,
  newWizardEvent,
} from '@openscd/open-scd/src/foundation.js';

import {
  cloneElement,
  createElement,
  getUniqueElementName,
} from '@openscd/xml';

import {
  EditorAction,
  SimpleAction,
  Delete,
  ComplexAction,
  newActionEvent,
} from '@openscd/core/foundation/deprecated/editor.js';
import { FilteredList } from '@openscd/open-scd/src/filtered-list.js';
import { FinderList } from '@openscd/open-scd/src/finder-list.js';
import { dataAttributePicker, iEDPicker } from './foundation/finder.js';
import { maxLength, patterns } from './foundation/limits.js';
import { editDataSetWizard } from './dataset.js';
import { newFCDA } from './fcda.js';
import { contentOptFieldsWizard, editOptFieldsWizard } from './optfields.js';
import { contentTrgOpsWizard, editTrgOpsWizard } from './trgops.js';
import { existFcdaReference } from '@openscd/open-scd/src/foundation/scl.js';

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
      helper="${get('scl.name')}"
      required
      validationMessage="${get('textfield.required')}"
      pattern="${patterns.asciName}"
      maxLength="${maxLength.cbName}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
      helper="${get('scl.desc')}"
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="buffered"
      .maybeValue=${options.buffered}
      helper="${get('scl.buffered')}"
    ></wizard-checkbox>`,
    html`<wizard-textfield
      label="rptID"
      .maybeValue=${options.rptID}
      nullable
      required
      helper="${get('report.rptID')}"
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="indexed"
      .maybeValue=${options.indexed}
      nullable
      helper="${get('scl.indexed')}"
    ></wizard-checkbox>`,
    html`<wizard-textfield
      label="max Clients"
      .maybeValue=${options.max}
      helper="${get('scl.maxReport')}"
      nullable
      type="number"
      suffix="#"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="bufTime"
      .maybeValue=${options.bufTime}
      helper="${get('scl.bufTime')}"
      nullable
      required
      type="number"
      min="0"
      suffix="ms"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="intgPd"
      .maybeValue=${options.intgPd}
      helper="${get('scl.intgPd')}"
      nullable
      required
      type="number"
      min="0"
      suffix="ms"
    ></wizard-textfield>`,
  ];
}

function createReportControlAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element) => {
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

    const name = reportControlAttrs['name']!;
    const iedName = parent.closest('IED')!.getAttribute('name')!;

    const complexAction = {
      title: get('controlblock.action.add', {
        type: 'Report',
        name,
        iedName,
      }),
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
  return (_: WizardInputElement[], wizard: Element) => {
    const finder = wizard.shadowRoot?.querySelector<FinderList>('finder-list');
    const path = finder?.path ?? [];

    if (path.length === 0) return [];

    const [tagName, id] = path.pop()!.split(': ');
    if (tagName !== 'IED') return [];

    const ied = find(doc, tagName, id);
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

export function removeReportControlAction(
  element: Element
): ComplexAction | null {
  if (!element.parentElement) return null;

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
        reference: dataSet.nextSibling,
      },
    });

  const name = element.getAttribute('name')!;
  const iedName = element.closest('IED')?.getAttribute('name') ?? '';

  return {
    title: get('controlblock.action.remove', { type: 'Report', name, iedName }),
    actions,
  };
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

function copyReportControlActions(element: Element): WizardActor {
  return (_: WizardInputElement[], wizard: Element) => {
    const doc = element.ownerDocument;

    const iedItems = <ListItemBase[]>(
      wizard.shadowRoot?.querySelector<FilteredList>('filtered-list')?.selected
    );

    const complexActions: ComplexAction[] = [];
    iedItems.forEach(iedItem => {
      const ied = find(doc, 'IED', iedItem.value);
      if (!ied) return;

      const sinkLn0 = ied.querySelector('LN0');
      if (!sinkLn0) return [];

      const sourceDataSet = element.parentElement?.querySelector(
        `DataSet[name="${element.getAttribute('datSet')}"]`
      );
      if (
        sourceDataSet &&
        sinkLn0.querySelector(
          `DataSet[name="${sourceDataSet!.getAttribute('name')}"]`
        )
      )
        return [];

      if (
        sinkLn0.querySelector(
          `ReportControl[name="${element.getAttribute('name')}"]`
        )
      )
        return [];

      // clone DataSet and make sure that FCDA is valid in ied
      const sinkDataSet = <Element>sourceDataSet?.cloneNode(true);
      Array.from(sinkDataSet.querySelectorAll('FCDA')).forEach(fcda => {
        if (!existFcdaReference(fcda, ied)) sinkDataSet.removeChild(fcda);
      });
      if (sinkDataSet.children.length === 0) return []; // when no data left no copy needed

      const sinkReportControl = <Element>element.cloneNode(true);

      const source = element.closest('IED')?.getAttribute('name');
      const sink = ied.getAttribute('name');

      complexActions.push({
        title: `ReportControl copied from ${source} to ${sink}`,
        actions: [
          { new: { parent: sinkLn0, element: sinkDataSet } },
          { new: { parent: sinkLn0, element: sinkReportControl } },
        ],
      });
    });

    return complexActions;
  };
}

function renderIedListItem(sourceCb: Element, ied: Element): TemplateResult {
  const sourceDataSet = sourceCb.parentElement?.querySelector(
    `DataSet[name="${sourceCb.getAttribute('datSet')}"]`
  );

  const isSourceIed =
    sourceCb.closest('IED')?.getAttribute('name') === ied.getAttribute('name');
  const ln0 = ied.querySelector('AccessPoint > Server > LDevice > LN0');
  const hasCbNameConflict = ln0?.querySelector(
    `ReportControl[name="${sourceCb.getAttribute('name')}"]`
  )
    ? true
    : false;
  const hasDataSetConflict = ln0?.querySelector(
    `DataSet[name="${sourceDataSet?.getAttribute('name')}"]`
  )
    ? true
    : false;

  // clone DataSet and make sure that FCDA is valid in ied
  const sinkDataSet = <Element>sourceDataSet?.cloneNode(true);
  Array.from(sinkDataSet.querySelectorAll('FCDA')).forEach(fcda => {
    if (!existFcdaReference(fcda, ied)) sinkDataSet.removeChild(fcda);
  });
  const hasDataMatch = sinkDataSet.children.length > 0;

  const primSpan = ied.getAttribute('name');
  let secondSpan = '';
  if (isSourceIed) secondSpan = get('controlblock.hints.source');
  else if (!ln0) secondSpan = get('controlblock.hints.missingServer');
  else if (hasDataSetConflict && !isSourceIed)
    secondSpan = get('controlblock.hints.exist', {
      type: 'RerportControl',
      name: sourceCb.getAttribute('name')!,
    });
  else if (hasCbNameConflict && !isSourceIed)
    secondSpan = get('controlblock.hints.exist', {
      type: 'DataSet',
      name: sourceCb.getAttribute('name')!,
    });
  else if (!hasDataMatch) secondSpan = get('controlblock.hints.noMatchingData');
  else secondSpan = get('controlBlock.hints.valid');

  return html`<mwc-check-list-item
    twoline
    value="${identity(ied)}"
    ?disabled=${isSourceIed ||
    !ln0 ||
    hasCbNameConflict ||
    hasDataSetConflict ||
    !hasDataMatch}
    ><span>${primSpan}</span
    ><span slot="secondary">${secondSpan}</span></mwc-check-list-item
  >`;
}

export function reportControlCopyToIedSelector(element: Element): Wizard {
  return [
    {
      title: get('report.wizard.location'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: copyReportControlActions(element),
      },
      content: [
        html`<filtered-list multi
          >${Array.from(element.ownerDocument.querySelectorAll('IED')).map(
            ied => renderIedListItem(element, ied)
          )}</filtered-list
        >`,
      ],
    },
  ];
}

function openIedsSelector(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(
      newSubWizardEvent(() => reportControlCopyToIedSelector(element))
    );
  };
}

export function removeReportControl(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    const complexAction = removeReportControlAction(element);
    if (complexAction) wizard.dispatchEvent(newActionEvent(complexAction));
    wizard.dispatchEvent(newWizardEvent());
  };
}

function openDataSetWizard(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => editDataSetWizard(element)));
  };
}

function openTrgOpsWizard(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => editTrgOpsWizard(element)));
  };
}

function openOptFieldsWizard(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => editOptFieldsWizard(element)));
  };
}

function updateReportControlAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
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

    let rptEnabledAction: SimpleAction | null = null;
    if (
      max !== (element.querySelector('RptEnabled')?.getAttribute('max') ?? null)
    )
      rptEnabledAction = getRptEnabledAction(
        element.querySelector('RptEnabled')!,
        max,
        element
      );

    const actions: SimpleAction[] = [];
    if (reportControlAction) actions.push(reportControlAction);
    if (rptEnabledAction) actions.push(rptEnabledAction);

    const name = attributes['name']!;
    const iedName = element.closest('IED')!.getAttribute('name')!;
    const complexAction = {
      title: get('controlblock.action.edit', {
        type: 'Report',
        name,
        iedName,
      }),
      actions,
    };

    return actions.length ? [complexAction] : [];
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

  const menuActions: MenuAction[] = [];
  menuActions.push({
    icon: 'delete',
    label: get('remove'),
    action: removeReportControl(element),
  });

  if (dataSet)
    menuActions.push({
      icon: 'edit',
      label: get('scl.DataSet'),
      action: openDataSetWizard(dataSet),
    });

  if (trgOps)
    menuActions.push({
      icon: 'edit',
      label: get('scl.TrgOps'),
      action: openTrgOpsWizard(trgOps),
    });

  if (optFields)
    menuActions.push({
      icon: 'edit',
      label: get('scl.OptFields'),
      action: openOptFieldsWizard(optFields),
    });

  menuActions.push({
    icon: 'copy',
    label: get('controlblock.label.copy'),
    action: openIedsSelector(element),
  });

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateReportControlAction(element),
      },
      menuActions,
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
            const reportControl = find(element, 'ReportControl', identity);
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
