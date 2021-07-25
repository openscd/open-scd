import { List } from '@material/mwc-list';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  EditorAction,
  getValue,
  identity,
  isPublic,
  newActionEvent,
  newWizardEvent,
  selector,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { editDataSetWizard } from './dataset.js';

function render(
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
      helper="${translate('gse.name')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('gse.desc')}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="type"
      .maybeValue=${type}
      helper="${translate('gse.type')}"
      nullable
      required
      >${['GOOSE', 'GSE'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="appID"
      .maybeValue=${appID}
      helper="${translate('gse.appID')}"
      required
      validationMessage="${translate('textfield.nonempty')}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="fixedOffs"
      .maybeValue=${fixedOffs}
      nullable
      required
      >${['true', 'false'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
    html`<wizard-select
      lable="securityEnabled"
      .maybeValue=${securityEnabled}
      nullable
      required
      >${['None', 'Signature', 'SignatureAndEncryption'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
      )}</wizard-select
    >`,
  ];
}

function removeGseControl(
  dispatcher: EventTarget | null,
  element: Element
): void {
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

  dispatcher?.dispatchEvent(newWizardEvent());
  dispatcher?.dispatchEvent(
    newActionEvent({
      old: {
        parent: element.parentElement!,
        element,
        reference: element.nextSibling,
      },
    })
  );

  if (dataSet && singleUse) {
    dispatcher?.dispatchEvent(
      newActionEvent({
        old: {
          parent: element.parentElement!,
          element: dataSet,
          reference: element.nextSibling,
        },
      })
    );
  }
}

export function updateAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);
    const fixedOffs = getValue(inputs.find(i => i.label === 'fixedOffs')!);
    const securityEnabled = getValue(
      inputs.find(i => i.label === 'securityEnabled')!
    );

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      type === element.getAttribute('type') &&
      fixedOffs === element.getAttribute('numPhases') &&
      securityEnabled === element.getAttribute('securityEnabled')
    )
      return [];

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    if (type === null) newElement.removeAttribute('type');
    else newElement.setAttribute('type', type);
    if (fixedOffs === null) newElement.removeAttribute('fixedOffs');
    else newElement.setAttribute('fixedOffs', fixedOffs);
    if (securityEnabled === null) newElement.removeAttribute('securityEnabled');
    else newElement.setAttribute('securityEnabled', securityEnabled);

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

  return [
    {
      title: get('gsecontrol.wizard.edit'),
      element,
      primary: {
        icon: 'aave',
        label: get('save'),
        action: updateAction(element),
      },
      content: [
        html`<mwc-button
          label="delete"
          icon="delete"
          @click=${(e: MouseEvent) => {
            removeGseControl(e.target, element);
          }}
        ></mwc-button>`,
        ...render(name, desc, type, appID, fixedOffs, securityEnabled),
        html`<mwc-button
          label=${translate('edit.dataset')}
          icon="edit"
          @click=${(e: MouseEvent) => {
            const dataSet = element.parentElement?.querySelector(
              `DataSet[name="${element.getAttribute('datSet')}"]`
            );

            if (dataSet) {
              e.target?.dispatchEvent(newWizardEvent());
              e.target?.dispatchEvent(
                newWizardEvent(editDataSetWizard(dataSet))
              );
            }
          }}
        ></mwc-button>`,
      ],
    },
  ];
}

export function gseControlSelectionWizard(element: Element): Wizard {
  const gseControls = Array.from(element.querySelectorAll('GSEControl')).filter(
    isPublic
  );

  return [
    {
      title: get('gse.select'),
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
                newWizardEvent(editGseControlWizard(gseControl))
              );
              e.target!.dispatchEvent(newWizardEvent());
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
