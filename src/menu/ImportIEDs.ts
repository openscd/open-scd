import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { css, html, LitElement, query, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';
import {
  createElement,
  EditorAction,
  identity,
  newActionEvent,
  newLogEvent,
  newPendingStateEvent,
  newWizardEvent,
  selector,
  SimpleAction,
  Wizard,
  WizardActor,
} from '../foundation.js';

function importIedsAction(
  importDoc: XMLDocument,
  doc: XMLDocument
): WizardActor {
  return (_, wizard: Element): EditorAction[] => {
    const selectedItems = <ListItemBase[]>(
      (<List>wizard.shadowRoot!.querySelector('#iedList')).selected
    );

    const promises = selectedItems
      .map(item => {
        return importDoc.querySelector(selector('IED', item.value));
      })
      .filter(ied => ied)
      .map(ied => importIED(ied!, doc, <HTMLElement>wizard));

    const mergedPromise = new Promise<void>((resolve, reject) =>
      Promise.allSettled(promises).then(
        () => resolve(),
        () => reject()
      )
    );

    wizard.dispatchEvent(newPendingStateEvent(mergedPromise));
    wizard.dispatchEvent(newWizardEvent());
    return [];
  };
}

function importIedsWizard(importDoc: XMLDocument, doc: XMLDocument): Wizard {
  return [
    {
      title: 'Import IEDs',
      primary: {
        icon: 'add',
        label: 'IEDs',
        action: importIedsAction(importDoc, doc),
      },
      content: [
        html`<filtered-list id="iedList" multi
          >${Array.from(importDoc.querySelectorAll(':root > IED')).map(
            ied =>
              html`<mwc-check-list-item value="${identity(ied)}"
                >${ied.getAttribute('name')}</mwc-check-list-item
              >`
          )}</filtered-list
        >`,
      ],
    },
  ];
}

function getSubNetwork(elements: Element[], element: Element): Element {
  const existElement = elements.find(
    item => item.getAttribute('name') === element.getAttribute('name')
  );
  return existElement ? existElement : <Element>element.cloneNode(false);
}

function addCommunicationElements(
  ied: Element,
  doc: XMLDocument
): SimpleAction[] {
  const actions = [];

  const oldCommunicationElement = doc.querySelector(':root > Communication');

  const communication = oldCommunicationElement
    ? oldCommunicationElement
    : createElement(doc, 'Communication', {});

  if (!oldCommunicationElement)
    actions.push({
      new: {
        parent: doc.querySelector(':root')!,
        element: communication,
      },
    });

  const connectedAPs = Array.from(
    ied.ownerDocument.querySelectorAll(
      `:root > Communication > SubNetwork > ConnectedAP[iedName="${ied.getAttribute(
        'name'
      )}"]`
    )
  );

  const createdSubNetworks: Element[] = [];

  connectedAPs.forEach(connectedAP => {
    const newSubNetwork = <Element>connectedAP.parentElement!;
    const oldSubNetworkMatch = communication.querySelector(
      `:root > Communication > SubNetwork[name="${newSubNetwork.getAttribute(
        'name'
      )}"]`
    );

    const subNetwork = oldSubNetworkMatch
      ? oldSubNetworkMatch
      : getSubNetwork(createdSubNetworks, newSubNetwork);
    const element = <Element>connectedAP.cloneNode(true);

    if (!oldSubNetworkMatch && !createdSubNetworks.includes(subNetwork)) {
      actions.push({
        new: {
          parent: communication,
          element: subNetwork,
        },
      });
      createdSubNetworks.push(subNetwork);
    }

    actions.push({
      new: {
        parent: subNetwork,
        element,
      },
    });
  });

  return actions;
}

function hasConnectionToIed(type: Element, ied: Element): boolean {
  const data: Element = type.parentElement!;
  const id = type.getAttribute('id');

  if (!data || !id) return false;

  if (type.tagName === 'EnumType')
    return Array.from(
      data.querySelectorAll(
        `DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`
      )
    ).some(typeChild => hasConnectionToIed(typeChild.parentElement!, ied));

  if (type.tagName === 'DAType')
    return Array.from(
      data.querySelectorAll(
        `DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`
      )
    ).some(typeChild => hasConnectionToIed(typeChild.parentElement!, ied));

  if (type.tagName === 'DOType')
    return Array.from(
      data.querySelectorAll(
        `LNodeType > DO[type="${id}"], DOType > SDO[type="${id}"]`
      )
    ).some(typeChild => hasConnectionToIed(typeChild.parentElement!, ied));

  return Array.from(ied.getElementsByTagName('LN0'))
    .concat(Array.from(ied.getElementsByTagName('LN')))
    .some(anyln => anyln.getAttribute('lnType') === id);
}

function addEnumType(
  ied: Element,
  enumType: Element,
  doc: Document
): SimpleAction | undefined {
  const existEnumType = doc.querySelector(
    `:root > DataTypeTemplates > EnumType[id="${enumType.getAttribute('id')}"]`
  );

  if (existEnumType && enumType.isEqualNode(existEnumType)) return;
  if (!hasConnectionToIed(enumType, ied)) return;

  if (existEnumType) {
    //INFO: id's within DataTypeTemplate must be unique. This is not the case here.
    //Rename the id by adding IED name at the beginning
    const data: Element = enumType.parentElement!;
    const idOld = enumType.getAttribute('id');
    const idNew = ied.getAttribute('name')! + idOld;

    enumType.setAttribute('id', idNew);
    data
      .querySelectorAll(
        `DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`
      )
      .forEach(type => type.setAttribute('type', idNew));
  }

  return {
    new: {
      parent: doc.querySelector(':root > DataTypeTemplates')!,
      element: enumType,
    },
  };
}

function addDAType(
  ied: Element,
  daType: Element,
  doc: Document
): SimpleAction | undefined {
  const existDAType = doc.querySelector(
    `:root > DataTypeTemplates > DAType[id="${daType.getAttribute('id')}"]`
  );

  if (existDAType && daType.isEqualNode(existDAType)) return;
  if (!hasConnectionToIed(daType, ied)) return;

  if (existDAType) {
    //INFO: id's within DataTypeTemplate must be unique. This is not the case here.
    //Rename the id by adding IED name at the beginning
    const data: Element | null = daType.parentElement!;
    const idOld = daType.getAttribute('id');
    const idNew = ied.getAttribute('name')! + idOld;

    daType.setAttribute('id', idNew);
    data
      .querySelectorAll(
        `DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`
      )
      .forEach(type => type.setAttribute('type', idNew));
  }

  return {
    new: {
      parent: doc.querySelector(':root > DataTypeTemplates')!,
      element: daType,
    },
  };
}

function addDOType(
  ied: Element,
  doType: Element,
  doc: Document
): SimpleAction | undefined {
  const existDOType = doc.querySelector(
    `:root > DataTypeTemplates > DOType[id="${doType.getAttribute('id')}"]`
  );

  if (existDOType && doType.isEqualNode(existDOType)) return;
  if (!hasConnectionToIed(doType, ied)) return;

  if (existDOType) {
    //INFO: id's within DataTypeTemplate must be unique. This is not the case here.
    //Rename the id by adding IED name at the beginning
    const data: Element = doType.parentElement!;
    const idOld = doType.getAttribute('id');
    const idNew = ied.getAttribute('name')! + idOld;

    doType.setAttribute('id', idNew);
    data
      .querySelectorAll(
        `LNodeType > DO[type="${idOld}"], DOType > SDO[type="${idOld}"]`
      )
      .forEach(type => type.setAttribute('type', idNew));
  }

  return {
    new: {
      parent: doc.querySelector(':root > DataTypeTemplates')!,
      element: doType,
    },
  };
}

function addLNodeType(
  ied: Element,
  lNodeType: Element,
  doc: Document
): SimpleAction | undefined {
  const existLNodeType = doc.querySelector(
    `:root > DataTypeTemplates > LNodeType[id="${lNodeType.getAttribute(
      'id'
    )}"]`
  );

  if (existLNodeType && lNodeType.isEqualNode(existLNodeType)) return;
  if (!hasConnectionToIed(lNodeType, ied)) return;

  if (existLNodeType) {
    //INFO: id's within DataTypeTemplate must be unique. This is not the case here.
    //Rename the id by adding IED name at the beginning
    const idOld = lNodeType.getAttribute('id')!;
    const idNew = ied.getAttribute('name')!.concat(idOld);

    lNodeType.setAttribute('id', idNew);
    ied
      .querySelectorAll(
        `AccessPoint > Server > LDevice > LN0[lnType="${idOld}"], AccessPoint > Server > LDevice > LN[lnType="${idOld}"]`
      )
      .forEach(ln => ln.setAttribute('lnType', idNew));
  }

  return {
    new: {
      parent: doc.querySelector(':root > DataTypeTemplates')!,
      element: lNodeType,
    },
  };
}

function addDataTypeTemplates(ied: Element, doc: XMLDocument): SimpleAction[] {
  const actions: (SimpleAction | undefined)[] = [];

  ied.ownerDocument
    .querySelectorAll(':root > DataTypeTemplates > LNodeType')
    .forEach(lNodeType => actions.push(addLNodeType(ied, lNodeType, doc)));

  ied.ownerDocument
    .querySelectorAll(':root > DataTypeTemplates > DOType')
    .forEach(doType => actions.push(addDOType(ied, doType, doc)));

  ied.ownerDocument
    .querySelectorAll(':root > DataTypeTemplates > DAType')
    .forEach(daType => actions.push(addDAType(ied, daType, doc)));

  ied.ownerDocument
    .querySelectorAll(':root > DataTypeTemplates > EnumType')
    .forEach(enumType => actions.push(addEnumType(ied, enumType, doc)));

  return <SimpleAction[]>actions.filter(item => item !== undefined);
}

function isIedNameUnique(ied: Element, doc: Document): boolean {
  const existingIedNames = Array.from(doc.querySelectorAll(':root > IED')).map(
    ied => ied.getAttribute('name')!
  );
  const importedIedName = ied.getAttribute('name')!;

  if (existingIedNames.includes(importedIedName)) return false;

  return true;
}

export async function importIED(
  ied: Element,
  doc: XMLDocument,
  dispatchObject: HTMLElement
): Promise<void> {
  if (ied.getAttribute('name') === 'TEMPLATE')
    ied.setAttribute(
      'name',
      'TEMPLATE_IED' +
        (Array.from(doc.querySelectorAll('IED')).filter(ied =>
          ied.getAttribute('name')?.includes('TEMPLATE')
        ).length +
          1)
    );

  if (!isIedNameUnique(ied, doc)) {
    dispatchObject.dispatchEvent(
      newLogEvent({
        kind: 'error',
        title: get('import.log.nouniqueied', {
          name: ied.getAttribute('name')!,
        }),
      })
    );
  }

  const dataTypeTemplateActions = addDataTypeTemplates(ied, doc);
  const communicationActions = addCommunicationElements(ied, doc);
  const actions = communicationActions.concat(dataTypeTemplateActions);
  actions.push({
    new: {
      parent: doc!.querySelector(':root')!,
      element: ied,
    },
  });

  dispatchObject.dispatchEvent(
    newActionEvent({
      title: get('editing.import', { name: ied.getAttribute('name')! }),
      actions,
    })
  );
}

export default class ImportingIedPlugin extends LitElement {
  doc!: XMLDocument;
  parent!: HTMLElement;

  @query('#importied-plugin-input') pluginFileUI!: HTMLInputElement;

  /** Loads the file `event.target.files[0]` into [[`src`]] as a `blob:...`. */
  private async loadIedFiles(event: Event): Promise<void> {
    const files = Array.from(
      (<HTMLInputElement | null>event.target)?.files ?? []
    );

    const promises = files.map(async file => {
      const importDoc = new DOMParser().parseFromString(
        await file.text(),
        'application/xml'
      );

      return this.prepareImport(importDoc, this.doc!);
    });

    const mergedPromise = new Promise<void>((resolve, reject) =>
      Promise.allSettled(promises).then(
        () => resolve(),
        () => reject()
      )
    );

    this.parent.dispatchEvent(newPendingStateEvent(mergedPromise));
  }

  public async prepareImport(
    importDoc: XMLDocument,
    doc: XMLDocument
  ): Promise<void> {
    if (!importDoc) {
      this.parent.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: get('import.log.loaderror'),
        })
      );
      return;
    }

    if (importDoc.querySelector('parsererror')) {
      this.parent.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: get('import.log.parsererror'),
        })
      );
      return;
    }

    const ieds = Array.from(importDoc.querySelectorAll(':root > IED'));
    if (ieds.length === 0) {
      this.parent.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: get('import.log.missingied'),
        })
      );
      return;
    }

    if (!doc.querySelector(':root > DataTypeTemplates')) {
      const element = createElement(doc, 'DataTypeTemplates', {});

      this.parent.dispatchEvent(
        newActionEvent({
          new: {
            parent: doc.documentElement,
            element,
          },
        })
      );
    }

    if (ieds.length === 1) {
      importIED(ieds[0], doc, this.parent);
      return;
    }

    this.parent.dispatchEvent(newWizardEvent(importIedsWizard(importDoc, doc)));
  }

  async run(): Promise<void> {
    this.pluginFileUI.click();
  }

  firstUpdated(): void {
    this.parent = this.parentElement!;
  }

  render(): TemplateResult {
    return html`<input multiple @change=${(event: Event) =>
      this.loadIedFiles(
        event
      )} id="importied-plugin-input" accept=".sed,.scd,.ssd,.iid,.cid,.icd" type="file"></input>`;
  }

  static styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
}
