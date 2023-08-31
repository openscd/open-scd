import {
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';

import { Menu } from '@material/mwc-menu';

import '@material/mwc-menu';
import '@material/mwc-list';
import '@material/mwc-icon';
import '@material/mwc-icon-button';

import { IconButton } from '@material/mwc-icon-button';

import {
  ComplexAction,
  createElement,
  isPublic,
  newActionEvent,
  newLogEvent,
  SimpleAction,
} from '../../foundation.js';

import '../../action-pane.js';
import '../../action-icon.js';

import {
  SIEMENS_SITIPE_IED_REF,
  SIEMENS_SITIPE_BAY_TEMPLATE,
  SIEMENS_SITIPE_IED_TEMPLATE_REF,
} from './foundation.js';

import {
  BayTypical,
  BTComponent,
  getBayTypicalComponents,
  getImportedBTComponentData,
  getImportedBtComponents,
  ImportedBTComponent,
} from './sitipe-service.js';
import { defaultNamingStrategy, NamingStrategy } from './sitipe-substation.js';
import { get } from 'lit-translate';

/**
 * Transfer namespaces from one element to another
 * @param destElement - Element to transfer namespaces to
 * @param sourceElement  - Element to transfer namespaces from
 */
function updateNamespaces(destElement: Element, sourceElement: Element) {
  Array.prototype.slice
    .call(sourceElement.attributes)
    .filter(attr => attr.name.startsWith('xmlns:'))
    .filter(attr => !destElement.hasAttribute(attr.name))
    .forEach(attr => {
      destElement.setAttributeNS(
        'http://www.w3.org/2000/xmlns/',
        attr.name,
        attr.value
      );
    });
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
  parent: Element
): SimpleAction | undefined {
  if (!hasConnectionToIed(enumType, ied)) return;

  const existEnumType = parent.querySelector(
    `EnumType[id="${enumType.getAttribute('id')}"]`
  );
  if (existEnumType && enumType.isEqualNode(existEnumType)) return;

  if (existEnumType) {
    // There is an `id` conflict in the project that must be resolved by
    // concatenating the IED name with the id
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
      parent,
      element: enumType,
    },
  };
}

function addDAType(
  ied: Element,
  daType: Element,
  parent: Element
): SimpleAction | undefined {
  if (!hasConnectionToIed(daType, ied)) return;

  const existDAType = parent.querySelector(
    `DAType[id="${daType.getAttribute('id')}"]`
  );
  if (existDAType && daType.isEqualNode(existDAType)) return;

  if (existDAType) {
    // There is an `id` conflict in the project that must be resolved by
    // concatenating the IED name with the id
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
      parent,
      element: daType,
    },
  };
}

function addDOType(
  ied: Element,
  doType: Element,
  parent: Element
): SimpleAction | undefined {
  if (!hasConnectionToIed(doType, ied)) return;

  const existDOType = parent.querySelector(
    `DOType[id="${doType.getAttribute('id')}"]`
  );
  if (existDOType && doType.isEqualNode(existDOType)) return;

  if (existDOType) {
    // There is an `id` conflict in the project that must be resolved by
    // concatenating the IED name with the id
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
      parent,
      element: doType,
    },
  };
}

function addLNodeType(
  ied: Element,
  lNodeType: Element,
  parent: Element
): SimpleAction | undefined {
  if (!hasConnectionToIed(lNodeType, ied)) return;

  const existLNodeType = parent.querySelector(
    `LNodeType[id="${lNodeType.getAttribute('id')}"]`
  );
  if (existLNodeType && lNodeType.isEqualNode(existLNodeType)) return;

  if (existLNodeType) {
    // There is an `id` conflict in the project that must be resolved by
    // concatenating the IED name with the id
    const idOld = lNodeType.getAttribute('id')!;
    const idNew = ied.getAttribute('name')!.concat(idOld);
    lNodeType.setAttribute('id', idNew);

    Array.from(
      ied.querySelectorAll(`LN0[lnType="${idOld}"],LN[lnType="${idOld}"]`)
    )
      .filter(isPublic)
      .forEach(ln => ln.setAttribute('lnType', idNew));
  }

  return {
    new: {
      parent,
      element: lNodeType,
    },
  };
}

function addDataTypeTemplates(ied: Element, doc: XMLDocument): SimpleAction[] {
  const actions: (SimpleAction | undefined)[] = [];

  const dataTypeTemplates = doc.querySelector(':root > DataTypeTemplates')
    ? doc.querySelector(':root > DataTypeTemplates')!
    : createElement(doc, 'DataTypeTemplates', {});

  if (!dataTypeTemplates.parentElement) {
    actions.push({
      new: {
        parent: doc.querySelector('SCL')!,
        element: dataTypeTemplates,
      },
    });
  }

  ied.ownerDocument
    .querySelectorAll(':root > DataTypeTemplates > LNodeType')
    .forEach(lNodeType =>
      actions.push(addLNodeType(ied, lNodeType, dataTypeTemplates!))
    );

  ied.ownerDocument
    .querySelectorAll(':root > DataTypeTemplates > DOType')
    .forEach(doType =>
      actions.push(addDOType(ied, doType, dataTypeTemplates!))
    );

  ied.ownerDocument
    .querySelectorAll(':root > DataTypeTemplates > DAType')
    .forEach(daType =>
      actions.push(addDAType(ied, daType, dataTypeTemplates!))
    );

  ied.ownerDocument
    .querySelectorAll(':root > DataTypeTemplates > EnumType')
    .forEach(enumType =>
      actions.push(addEnumType(ied, enumType, dataTypeTemplates!))
    );

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

/** [[`Sitipe`]] plugin subeditor for editing `Sitipe` configuration. */
@customElement('sitipe-bay')
export class SitipeBay extends LitElement {
  /** The document being edited as provided to editor by [[`Sitipe`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  /** The edited `Element`, a common property of all Sitipe subeditors. */
  @property({ attribute: false })
  bay!: Element;

  @property()
  bayTypicals: BayTypical[] = [];

  @property({
    type: Number,
  })
  editCount = -1;

  @property()
  namingStrategy: NamingStrategy = defaultNamingStrategy;

  @state()
  bayHeader(): string {
    const name = this.bay.getAttribute('name') ?? '';
    const desc = this.bay.getAttribute('desc');

    return `${name} ${desc ? `(${desc})` : ''}`;
  }

  @query('mwc-menu')
  menu?: Menu;

  @query('mwc-icon-button[icon="playlist_add"]')
  iconButton?: IconButton;

  updated(): void {
    if (this.menu && this.iconButton) {
      this.menu!.anchor = <HTMLElement>this.iconButton!;
    }
  }

  get bayTypicalTemplate(): string {
    return (
      this.bay.querySelector(`Private[type="${SIEMENS_SITIPE_BAY_TEMPLATE}"]`)
        ?.textContent ?? ''
    );
  }

  private renderIEDs(): TemplateResult {
    return html`
      <div>
        ${Array.from(
          this.bay.querySelectorAll(
            `Private[type="${SIEMENS_SITIPE_IED_REF}"]` ?? []
          )
        ).map(
          iedTemplate =>
            html`<action-icon
              .label=${iedTemplate.textContent
                ? `${iedTemplate.textContent} (${this.bayTypicalTemplate})`
                : ''}
              icon="developer_board"
            ></action-icon>`
        )}
      </div>
    `;
  }

  protected renderMenu(): TemplateResult {
    return html`<mwc-menu
      class="actions-menu"
      corner="BOTTOM_RIGHT"
      menuCorner="END"
    >
      ${this.bayTypicals.map(bayTypical => {
        return html`<mwc-list-item
          @click=${() => this.handleSelected(bayTypical)}
          .disabled=${this.isDisabled(bayTypical)}
          >${bayTypical.name}</mwc-list-item
        >`;
      })}
    </mwc-menu>`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.bayHeader()}">
      <abbr slot="action" title="Add" style="position:relative;">
        <mwc-icon-button
          icon="playlist_add"
          @click="${() => {
            this.menu!.open = true;
          }}"
        ></mwc-icon-button>
        ${this.renderMenu()}
      </abbr>
      ${this.renderIEDs()}</action-pane
    >`;
  }

  private isDisabled(bayTypical: BayTypical): boolean {
    return bayTypical.name === this.bayTypicalTemplate;
  }

  private handleSelected(bayTypical: BayTypical) {
    const complexAction: ComplexAction = {
      actions: [],
      title: 'Sitipe',
    };

    const bayTypicalElement: Element = createElement(this.doc, 'Private', {
      type: SIEMENS_SITIPE_BAY_TEMPLATE,
    });

    bayTypicalElement.textContent = bayTypical.name;

    complexAction.actions.push({
      new: {
        parent: this.bay,
        element: bayTypicalElement,
      },
    });

    getBayTypicalComponents(bayTypical.accessId).then(btComponents => {
      btComponents.forEach((btComponent, index) => {
        const iedRefElement: Element = createElement(this.doc, 'Private', {
          type: SIEMENS_SITIPE_IED_REF,
        });
        const iedName: string = this.namingStrategy(this.bay, index + 1);
        iedRefElement.textContent = iedName;

        complexAction.actions.push({
          new: {
            parent: this.bay,
            element: iedRefElement,
          },
        });

        getImportedBtComponents(btComponent.accessId).then(res => {
          res.forEach(importedBTComponent => {
            getImportedBTComponentData(importedBTComponent.id).then(data => {
              const doc: Document = new DOMParser().parseFromString(
                data.data,
                'application/xml'
              );

              if (this.isValidDoc(doc)) {
                this.prepareImport(doc, iedName, btComponent);
              }
            });
          });
        });
      });
      this.dispatchEvent(newActionEvent(complexAction));
    });
  }

  private isValidDoc(doc: Document): boolean {
    if (!doc) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: get('import.log.loaderror'),
        })
      );
      return false;
    }

    if (doc.querySelector('parsererror')) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: get('import.log.parsererror'),
        })
      );
      return false;
    }

    return true;
  }

  private getIeds(doc: Document): Element[] {
    return Array.from(doc.querySelectorAll(':root > IED'));
  }

  protected prepareImport(
    doc: Document,
    iedName: string,
    btComponent: BTComponent
  ): void {
    const ieds: Element[] = this.getIeds(doc);
    if (!ieds.length) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: get('import.log.missingied'),
        })
      );
      return;
    }
    if (ieds.length > 1) {
      return;
    }

    const ied: Element = ieds[0];

    const oldIEDName: string = ied.getAttribute('name') || '';
    ied.setAttribute('name', iedName);

    this.importIED(ied);

    if (iedName || oldIEDName) {
      const privateIEDRef: Element = createElement(this.doc, 'Private', {
        type: SIEMENS_SITIPE_IED_TEMPLATE_REF,
      });
      privateIEDRef.textContent = btComponent.name || oldIEDName;

      this.dispatchEvent(
        newActionEvent({
          title: get('editing.import', { name: ied.getAttribute('name')! }),
          actions: [
            {
              new: {
                parent: ied,
                element: privateIEDRef,
              },
            },
          ],
        })
      );
    }
    return;
  }

  private importIED(ied: Element): void {
    if (!isIedNameUnique(ied, this.doc)) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: get('import.log.nouniqueied', {
            name: ied.getAttribute('name')!,
          }),
        })
      );
      return;
    }

    // This doesn't provide redo/undo capability as it is not using the Editing
    // action API. To use it would require us to cache the full SCL file in
    // OpenSCD as it is now which could use significant memory.
    // TODO: In open-scd core update this to allow including in undo/redo.
    updateNamespaces(
      this.doc.documentElement,
      ied.ownerDocument.documentElement
    );

    const dataTypeTemplateActions = addDataTypeTemplates(ied, this.doc);
    const communicationActions = addCommunicationElements(ied, this.doc);
    const actions = communicationActions.concat(dataTypeTemplateActions);
    actions.push({
      new: {
        parent: this.doc!.querySelector(':root')!,
        element: ied,
      },
    });

    this.dispatchEvent(
      newActionEvent({
        title: get('editing.import', { name: ied.getAttribute('name')! }),
        actions,
      })
    );
  }
}
