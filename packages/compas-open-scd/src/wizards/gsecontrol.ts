import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list/mwc-list-item';
import { Checkbox } from '@material/mwc-checkbox';
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
  createElement,
  Delete,
  EditorAction,
  find,
  getUniqueElementName,
  getValue,
  identity,
  isPublic,
  MenuAction,
  newActionEvent,
  newSubWizardEvent,
  newWizardEvent,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
} from '../foundation.js';
import { maxLength, patterns } from './foundation/limits.js';
import { editDataSetWizard } from './dataset.js';
import { editGseWizard } from './gse.js';
import { securityEnabledEnum } from './foundation/enums.js';
import { dataAttributePicker, iEDPicker } from './foundation/finder.js';
import { FinderList } from '../finder-list.js';
import { newFCDA } from './fcda.js';
import {
  getConnectedAP,
  isAccessPointConnected,
  uniqueAppId,
  uniqueMacAddress,
} from './foundation/scl.js';
import { contentGseOrSmvWizard, createAddressElement } from './address.js';

interface ContentOptions {
  name: string | null;
  desc: string | null;
  type: string | null;
  appID: string | null;
  fixedOffs: string | null;
  securityEnabled: string | null;
}

export function getGSE(element: Element): Element | null | undefined {
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

export function contentGseControlWizard(
  content: ContentOptions
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${content.name}
      helper="${translate('scl.name')}"
      required
      validationMessage="${translate('textfield.required')}"
      pattern="${patterns.asciName}"
      maxLength="${maxLength.cbName}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${content.desc}
      nullable
      helper="${translate('scl.desc')}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="type"
      .maybeValue=${content.type}
      helper="${translate('scl.type')}"
      nullable
      required
      >${['GOOSE', 'GSSE'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="appID"
      .maybeValue=${content.appID}
      helper="${translate('scl.id')}"
      required
      validationMessage="${translate('textfield.nonempty')}"
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="fixedOffs"
      .maybeValue=${content.fixedOffs}
      nullable
      helper="${translate('scl.fixedOffs')}"
    ></wizard-checkbox>`,
    html`<wizard-select
      label="securityEnabled"
      .maybeValue=${content.securityEnabled}
      nullable
      required
      helper="${translate('scl.securityEnable')}"
      >${securityEnabledEnum.map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
  ];
}

function createGseControlAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element) => {
    const actions: SimpleAction[] = [];

    // Create ReportControl element
    const gseControlAttrs: Record<string, string | null> = {};
    const gseControlKeys = [
      'name',
      'desc',
      'type',
      'appID',
      'fixedOffs',
      'securityEnabled',
    ];
    gseControlKeys.forEach(key => {
      gseControlAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    // confRef is handled automatically and is 1 for new referenced GseControl
    gseControlAttrs['confRev'] = '1';

    const dataSetName = gseControlAttrs.name + 'sDataSet';
    gseControlAttrs['datSet'] = dataSetName;

    const gseControl = createElement(
      parent.ownerDocument,
      'GSEControl',
      gseControlAttrs
    );
    actions.push({ new: { parent, element: gseControl } });

    // Create GSE element with connected AccessPoint
    if (isAccessPointConnected(parent)) {
      // Get `GSE`'s ``ConnectedAP`` parent
      const gseParent = getConnectedAP(parent);
      // Create the new GSE Element.
      const gse = createElement(parent.ownerDocument, 'GSE', {
        ldInst: parent.closest('LDevice')?.getAttribute('inst') ?? '',
        cbName: gseControlAttrs['name']!,
      });
      actions.push({ new: { parent: gseParent!, element: gse } });

      // Create Address Element
      const instType: boolean =
        (<Checkbox>wizard.shadowRoot?.querySelector('#instType'))?.checked ??
        false;
      const gseAttrs: Record<string, string | null> = {};
      const gseKeys = ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'];
      gseKeys.forEach(key => {
        gseAttrs[key] = getValue(inputs.find(i => i.label === key)!);
      });
      const address = createAddressElement(gseAttrs, gse, instType);
      actions.push({ new: { parent: gse, element: address } });

      // Create MinTime Element
      const minTime = getValue(inputs.find(i => i.label === 'MinTime')!);
      const minTimeElement = createElement(parent.ownerDocument, 'MinTime', {
        unit: 's',
        multiplier: 'm',
      });
      minTimeElement.textContent = minTime;
      actions.push({ new: { parent: gse, element: minTimeElement } });

      // Create MaxTime Element
      const maxTime = getValue(inputs.find(i => i.label === 'MaxTime')!);
      const maxTimeElement = createElement(parent.ownerDocument, 'MaxTime', {
        unit: 's',
        multiplier: 'm',
      });
      maxTimeElement.textContent = maxTime;
      actions.push({ new: { parent: gse, element: maxTimeElement } });
    }

    //add empty dataset that can be filled later
    const dataSet = createElement(parent.ownerDocument, 'DataSet', {
      name: dataSetName,
    });
    actions.push({ new: { parent, element: dataSet } });

    const finder = wizard.shadowRoot!.querySelector<FinderList>('finder-list');
    const paths = finder?.paths ?? [];

    for (const path of paths) {
      const element = newFCDA(parent, path);

      if (!element) continue;

      actions.push({ new: { parent: dataSet, element } });
    }

    return [
      {
        title: get('editing.created', { name: 'GSEControl' }),
        actions,
      },
    ];
  };
}

export function createGseControlWizard(ln0OrLn: Element): Wizard {
  const server = ln0OrLn.closest('Server');

  const name = getUniqueElementName(ln0OrLn, 'GSEControl');
  const desc = null;
  const type = 'GOOSE';
  const appID = '';
  const fixedOffs = null;
  const securityEnabled = null;

  const hasInstType = true;
  const attributes: Record<string, string | null> = {
    'MAC-Address': uniqueMacAddress(ln0OrLn.ownerDocument, 'GOOSE'),
    APPID: uniqueAppId(ln0OrLn.ownerDocument),
    'VLAN-ID': null,
    'VLAN-PRIORITY': null,
  };
  const minTime = '10';
  const maxTime = '1000';

  return isAccessPointConnected(ln0OrLn)
    ? [
        {
          title: get('wizard.title.add', { tagName: 'GSEControl' }),
          content: contentGseControlWizard({
            name,
            desc,
            type,
            appID,
            fixedOffs,
            securityEnabled,
          }),
        },
        {
          title: get('wizard.title.add', { tagName: 'GSE' }),
          content: [
            ...contentGseOrSmvWizard({ hasInstType, attributes }),
            html`<wizard-textfield
              label="MinTime"
              .maybeValue=${minTime}
              nullable
              suffix="ms"
              type="number"
            ></wizard-textfield>`,
            html`<wizard-textfield
              label="MaxTime"
              .maybeValue=${maxTime}
              nullable
              suffix="ms"
              type="number"
            ></wizard-textfield>`,
          ],
        },
        {
          title: get('dataset.fcda.add'),
          primary: {
            icon: 'save',
            label: get('save'),
            action: createGseControlAction(ln0OrLn),
          },
          content: [server ? dataAttributePicker(server) : html``],
        },
      ]
    : [
        {
          title: get('wizard.title.add', { tagName: 'GSEControl' }),
          content: contentGseControlWizard({
            name,
            desc,
            type,
            appID,
            fixedOffs,
            securityEnabled,
          }),
        },
        {
          title: get('wizard.title.add', { tagName: 'GSE' }),
          content: [
            html`<h3
              style="color: var(--mdc-theme-on-surface);
                      font-family: 'Roboto', sans-serif;
                      font-weight: 300;"
            >
              ${translate('gse.missingaccp')}
            </h3>`,
          ],
        },
        {
          title: get('dataset.fcda.add'),
          primary: {
            icon: 'save',
            label: get('save'),
            action: createGseControlAction(ln0OrLn),
          },
          content: [server ? dataAttributePicker(server) : html``],
        },
      ];
}

function openGseControlCreateWizard(doc: XMLDocument): WizardActor {
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

    return [() => createGseControlWizard(ln0)];
  };
}

export function gseControlParentSelector(doc: XMLDocument): Wizard {
  return [
    {
      title: get('gsecontrol.wizard.location'),
      primary: {
        icon: '',
        label: get('next'),
        action: openGseControlCreateWizard(doc),
      },
      content: [iEDPicker(doc)],
    },
  ];
}

function prepareGseControlCreateWizard(anyParent: Element): WizardActor {
  return () => {
    if (anyParent.tagName === 'IED' && anyParent.querySelector('LN0'))
      return [() => createGseControlWizard(anyParent.querySelector('LN0')!)];

    return [() => gseControlParentSelector(anyParent.ownerDocument)];
  };
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
  return (wizard: Element): void => {
    const complexAction = removeGseControlAction(element);
    if (complexAction) wizard.dispatchEvent(newActionEvent(complexAction));
    wizard.dispatchEvent(newWizardEvent());
  };
}

function openDataSetWizard(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => editDataSetWizard(element)));
  };
}

function openGseWizard(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => editGseWizard(element)));
  };
}

export function updateGseControlAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
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
        ...contentGseControlWizard({
          name,
          desc,
          type,
          appID,
          fixedOffs,
          securityEnabled,
        }),
      ],
    },
  ];
}

export function selectGseControlWizard(element: Element): Wizard {
  const gseControls = Array.from(element.querySelectorAll('GSEControl')).filter(
    isPublic
  );

  const primary = element.querySelector('LN0')
    ? {
        icon: 'add',
        label: get('GOOSE'),
        action: prepareGseControlCreateWizard(element),
      }
    : undefined;

  return [
    {
      title: get('wizard.title.select', { tagName: 'GSEcontrol' }),
      primary,
      content: [
        html`<filtered-list
          @selected=${(e: SingleSelectedEvent) => {
            const gseControlIndentity = (<ListItem>(<List>e.target).selected)
              .value;
            const gseControl = find(element, 'GSEControl', gseControlIndentity);
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
