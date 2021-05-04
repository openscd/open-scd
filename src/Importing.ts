import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { html, internalProperty } from 'lit-element';
import { get } from 'lit-translate';

import {
  getReference,
  LitElementConstructor,
  Mixin,
  newLogEvent,
  newActionEvent,
  SimpleAction,
  createElement,
  Wizard,
  identity,
  WizardActor,
  EditorAction,
  newWizardEvent,
  selector,
} from './foundation.js';

function dummyImportIED(importDoc: XMLDocument, doc: XMLDocument): WizardActor {
  return (_, wizard: Element): EditorAction[] => {
    const selectedItems = <ListItemBase[]>(
      (<List>wizard.shadowRoot!.querySelector('#iedList')).selected
    );

    selectedItems.forEach(item => {
      const ied = importDoc.querySelector(selector('IED', item.value));

      if (ied)
        importIED(
          ied,
          importDoc.querySelector(':root > DataTypeTemplates')!,
          doc,
          <HTMLElement>wizard
        );
    });

    return [];
  };
}

function getSubNetwork(elements: Element[], element: Element): Element {
  const existElement = elements.find(
    item => item.getAttribute('name') === element.getAttribute('name')
  );
  return existElement ? existElement : <Element>element.cloneNode(false);
}

function addCommunicationElements(
  incommingIedName: string,
  incommingCommunication: Element,
  doc: XMLDocument
): SimpleAction[] {
  const actions = [];

  // make sure the communication section does exist
  const existingCommunicationElement = doc.querySelector(
    ':root > Communication'
  );

  const communication = existingCommunicationElement
    ? existingCommunicationElement
    : createElement(doc, 'Communication', {});

  if (!existingCommunicationElement)
    actions.push({
      new: {
        parent: doc.querySelector(':root')!,
        element: communication,
        reference: getReference(doc.querySelector(':root')!, 'Communication'),
      },
    });

  const connectedAPs = Array.from(
    incommingCommunication.querySelectorAll(
      `:root > Communication > SubNetwork > ConnectedAP[iedName="${incommingIedName}"]`
    )
  );

  const createdSubNetworks: Element[] = [];

  connectedAPs.forEach(connectedAP => {
    const incommingSubnetwork = <Element>connectedAP.parentElement!;
    const existingSubnetworkMatch = communication.querySelector(
      `:root > Communication > SubNetwork[name="${incommingSubnetwork.getAttribute(
        'name'
      )}"]`
    );

    const parent = existingSubnetworkMatch
      ? existingSubnetworkMatch
      : getSubNetwork(createdSubNetworks, incommingSubnetwork);
    const element = <Element>connectedAP.cloneNode(true);

    if (!existingSubnetworkMatch && !createdSubNetworks.includes(parent)) {
      actions.push({
        new: {
          parent: communication,
          element: parent,
          reference: getReference(communication, 'SubNetwork'),
        },
      });
      createdSubNetworks.push(parent);
    }

    actions.push({
      new: {
        parent,
        element,
        reference: getReference(parent, 'ConnectedAP'),
      },
    });
  });

  return actions;
}

function isConnected(type: Element, ied: Element): boolean {
  const data: Element = type.parentElement!;
  const id = type.getAttribute('id');

  if (!data || !id) return false;

  if (type.tagName === 'EnumType')
    return Array.from(
      data.querySelectorAll(
        `DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`
      )
    ).some(typeChild => isConnected(typeChild.parentElement!, ied));

  if (type.tagName === 'DAType')
    return Array.from(
      data.querySelectorAll(
        `DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`
      )
    ).some(typeChild => isConnected(typeChild.parentElement!, ied));

  if (type.tagName === 'DOType')
    return Array.from(
      data.querySelectorAll(
        `LNodeType > DO[type="${id}"], DOType > SDO[type="${id}"]`
      )
    ).some(typeChild => isConnected(typeChild.parentElement!, ied));

  return (
    ied.querySelectorAll(
      `AccessPoint > Server > LDevice > LN0[lnType="${id}"], AccessPoint > Server > LDevice > LN[lnType="${id}"]`
    ).length > 0
  );
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

  if (!isConnected(enumType, ied)) return;

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
      reference: getReference(
        doc.querySelector(':root > DataTypeTemplates')!,
        'EnumType'
      ),
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
  if (!isConnected(daType, ied)) return;

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
      reference: getReference(
        doc.querySelector(':root > DataTypeTemplates')!,
        'DAType'
      ),
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
  if (!isConnected(doType, ied)) return;

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
      reference: getReference(
        doc.querySelector(':root > DataTypeTemplates')!,
        'DOType'
      ),
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
  if (!isConnected(lNodeType, ied)) return;

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
      reference: getReference(
        doc.querySelector('DataTypeTemplates')!,
        'LNodeType'
      ),
    },
  };
}

function addDataTypeTemplates(
  ied: Element,
  templates: Element,
  doc: XMLDocument
): SimpleAction[] {
  const actions: (SimpleAction | undefined)[] = [];

  templates
    .querySelectorAll(':root > DataTypeTemplates > LNodeType')
    .forEach(lNodeType => actions.push(addLNodeType(ied, lNodeType, doc)));

  templates
    .querySelectorAll(':root > DataTypeTemplates > DOType')
    .forEach(doType => actions.push(addDOType(ied, doType, doc)));

  templates
    .querySelectorAll(':root > DataTypeTemplates > DAType')
    .forEach(daType => actions.push(addDAType(ied, daType, doc)));

  templates
    .querySelectorAll(':root > DataTypeTemplates > EnumType')
    .forEach(enumType => actions.push(addEnumType(ied, enumType, doc)));

  return <SimpleAction[]>actions.filter(item => item !== undefined);
}

function addIED(ied: Element, doc: Document): SimpleAction {
  return {
    new: {
      parent: doc!.querySelector(':root')!,
      element: ied,
      reference: getReference(doc!.querySelector(':root')!, 'IED'),
    },
  };
}

function isIedNameUnique(ied: Element, doc: Document): boolean {
  const existingIedNames = Array.from(doc.querySelectorAll(':root > IED')).map(
    ied => ied.getAttribute('name')!
  );
  const importedIedName = ied.getAttribute('name')!;

  if (existingIedNames.includes(importedIedName)) return false;

  return true;
}

function importIEDsWizard(importDoc: XMLDocument, doc: XMLDocument): Wizard {
  return [
    {
      title: 'Import IEDs',
      primary: {
        icon: 'add',
        label: 'IEDs',
        action: dummyImportIED(importDoc, doc),
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

async function importIED(
  ied: Element,
  templates: Element,
  doc: Document,
  object: HTMLElement
): Promise<void> {
  if (!isIedNameUnique(ied, doc)) {
    object.dispatchEvent(
      newLogEvent({
        kind: 'error',
        title: get('import.log.nouniqueied', {
          name: ied.getAttribute('name')!,
        }),
      })
    );
    throw new Error(get('import.log.importerror'));
  }

  const iedAction = addIED(ied, doc);
  const dataTypeTemplateActions = addDataTypeTemplates(ied, templates, doc);
  const communicationActions = addCommunicationElements(
    ied.getAttribute('name')!,
    ied.ownerDocument.querySelector('Communication')!,
    doc
  );

  const actions = communicationActions.concat(dataTypeTemplateActions, [
    iedAction,
  ]);

  object.dispatchEvent(
    newActionEvent({
      title: get('editing.import', { name: ied.getAttribute('name')! }),
      actions: <SimpleAction[]>actions.filter(action => action !== undefined),
    })
  );

  object.dispatchEvent(
    newLogEvent({
      kind: 'info',
      title: get('import.log.successful', {
        name: ied.getAttribute('name') ?? '',
      }),
    })
  );
}

/** Mixin that handles IED import*/
export type ImportingElement = Mixin<typeof Importing>;

/** @typeParam TBase - a type extending `LitElement`
 * @returns `Base` dispatching [[`LogEvent`]]s and [[`EditorActionEvent`]]s. */
export function Importing<TBase extends LitElementConstructor>(Base: TBase) {
  class ImportingElement extends Base {
    /** Loads and parses an `XMLDocument` after [[`srcIED`]] has changed. */
    async importIEDs(src: string, doc: XMLDocument): Promise<void> {
      const response = await fetch(src);
      const text = await response.text();
      const importDoc = new DOMParser().parseFromString(
        text,
        'application/xml'
      );

      if (!importDoc) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('import.log.loaderror'),
          })
        );
        throw new Error(get('import.log.loaderror'));
      }

      if (importDoc.querySelector('parsererror')) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('import.log.parsererror'),
          })
        );
        throw new Error(get('import.log.loaderror'));
      }

      const ieds = Array.from(importDoc.querySelectorAll(':root > IED'));
      if (ieds.length === 0) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('import.log.missingied'),
          })
        );
        return;
      }

      if (!doc.querySelector(':root > DataTypeTemplates')) {
        const element = createElement(doc, 'DataTypeTemplates', {});

        this.dispatchEvent(
          newActionEvent({
            new: {
              parent: doc.documentElement,
              element,
              reference: getReference(doc.documentElement, 'DataTypeTemplates'),
            },
          })
        );
      }

      if (ieds.length === 1) {
        importIED(
          ieds[0],
          importDoc.querySelector(':root>DataTypeTemplates')!,
          doc,
          this
        );
        return;
      }

      this.dispatchEvent(newWizardEvent(importIEDsWizard(importDoc, doc)));
    }
  }

  return ImportingElement;
}
