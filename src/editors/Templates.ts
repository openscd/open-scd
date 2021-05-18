import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  getReference,
  identity,
  newActionEvent,
  newWizardEvent,
  patterns,
  selector,
  Wizard,
} from '../foundation.js';

import '../filtered-list.js';

import {
  getListItemList,
  predefinedBasicTypeEnum,
  styles,
  valKindEnum,
} from './templates/foundation.js';
import './templates/enum-type-editor.js';
import { EnumTypeEditor } from './templates/enum-type-editor.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

const templates = fetch('public/xml/templates.scd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

function bDAWizard(identity: string, doc: XMLDocument): Wizard {
  const bda = doc.querySelector(selector('BDA', identity));
  if (!bda) return [];

  const isEnum = bda.getAttribute('bType') === 'Enum';
  const isStruct = bda.getAttribute('bType') === 'Struct';
  const type = bda.getAttribute('type');
  const referenceList =
    isEnum || isStruct
      ? Array.from(
          doc.querySelectorAll(
            `:root > DataTypeTemplates > ${isEnum ? 'EnumType' : 'DAType'}`
          )
        ).map(type => type.getAttribute('id'))
      : [];

  const typeTemplate =
    isEnum || isStruct ? getListItemList(referenceList, type) : html``;

  return [
    {
      title: get('bda.wizard.title'),
      content: [
        html`<wizard-textfield
          label="name"
          .maybeValue=${bda.getAttribute('name')}
          helper="${translate('scl.name')}"
          required
          pattern="${patterns.alphanumeric}"
          dialogInitialFocus
        >
          ></wizard-textfield
        >`,
        html`<wizard-textfield
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${bda.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<mwc-select
          label="bType"
          helper="${translate('bda.bType')}"
          required
          >${getListItemList(
            predefinedBasicTypeEnum,
            bda.getAttribute('bType')
          )}</mwc-select
        >`,
        html`<wizard-textfield
          label="sAddr"
          helper="${translate('bda.sAddr')}"
          .maybeValue=${bda.getAttribute('sAddr')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<mwc-select label="valKind" helper="${translate('bda.valKind')}"
          >${getListItemList(
            valKindEnum,
            bda.getAttribute('valKind')
          )}</mwc-select
        >`,
        html`<mwc-select
          label="valImport"
          helper="${translate('bda.valImport')}"
          >${getListItemList(
            [null, 'true', 'false'],
            bda.getAttribute('valImport')
          )}</mwc-select
        >`,
        html`<mwc-select
          label="type"
          helper="${translate('bda.type')}"
          ?disabled=${!(isEnum || isStruct)}
          >${typeTemplate}</mwc-select
        >`,
      ],
    },
  ];
}

function dATypeWizard(dATypeIdentity: string, doc: XMLDocument): Wizard {
  const datype = doc.querySelector(selector('DAType', dATypeIdentity));
  if (!datype) return [];

  return [
    {
      title: get('datype.wizard.title'),
      content: [
        html`<mwc-button
          icon="delete"
          trailingIcon
          label="${translate('delete')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: datype.parentElement!,
                  element: datype,
                  reference: datype.nextElementSibling,
                },
              })
            );
          }}
          fullwidth
        ></mwc-button> `,
        html`<wizard-textfield
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${datype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${datype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<mwc-button
            slot="graphic"
            icon="playlist_add"
            trailingIcon
            label="${translate('scl.BDA')}"
          ></mwc-button>
          <mwc-list style="margin-top: 0px;">
            ${Array.from(datype.querySelectorAll('BDA')).map(
              bda =>
                html`<mwc-list-item
                  twoline
                  tabindex="0"
                  value="${identity(bda)}"
                  @click="${(evt: Event) => {
                    evt.target!.dispatchEvent(
                      newWizardEvent(
                        bDAWizard((<ListItemBase>evt.target).value, doc)
                      )
                    );
                    evt.target!.dispatchEvent(newWizardEvent());
                  }}"
                  ><span>${bda.getAttribute('name')}</span
                  ><span slot="secondary"
                    >${bda.getAttribute('bType') === 'Enum' ||
                    bda.getAttribute('bType') === 'Struct'
                      ? '#' + bda.getAttribute('type')
                      : bda.getAttribute('bType')}</span
                  ></mwc-list-item
                >`
            )}
          </mwc-list> `,
      ],
    },
  ];
}

/** An editor [[`plugin`]] for editing the `DataTypeTemplates` section. */
export default class TemplatesPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  openDATypeWizard(identity: string): void {
    this.dispatchEvent(newWizardEvent(dATypeWizard(identity, this.doc)));
  }

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  async openCreateEnumWizard(): Promise<void> {
    if (!this.doc.querySelector(':root > DataTypeTemplates'))
      this.dispatchEvent(
        newActionEvent({
          new: {
            parent: this.doc.documentElement,
            element: this.doc.createElement('DataTypeTemplates'),
            reference: getReference(
              this.doc.documentElement,
              'DataTypeTemplates'
            ),
          },
        })
      );

    this.dispatchEvent(
      newWizardEvent(
        EnumTypeEditor.wizard({
          parent: this.doc.querySelector(':root > DataTypeTemplates')!,
          templates: await templates,
        })
      )
    );
  }

  createDataTypeTemplates(): void {
    if (!this.doc.querySelector(':root > DataTypeTemplates'))
      this.dispatchEvent(
        newActionEvent({
          new: {
            parent: this.doc.documentElement,
            element: this.doc.createElement('DataTypeTemplates'),
            reference: getReference(
              this.doc.documentElement,
              'DataTypeTemplates'
            ),
          },
        })
      );
  }

  render(): TemplateResult {
    if (!this.doc?.querySelector(':root > DataTypeTemplates'))
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('templates.missing')}</span
        >
        <mwc-fab
          extended
          icon="add"
          label="${translate('templates.add')}"
          @click=${() => this.createDataTypeTemplates()}
        ></mwc-fab>
      </h1>`;
    return html`
      <div id="containerTemplates">
        <section tabindex="0">
          <h1>
            ${translate('scl.DAType')}
            <nav>
              <abbr title="${translate('add')}">
                <mwc-icon-button icon="playlist_add"></mwc-icon-button>
              </abbr>
            </nav>
          </h1>
          <filtered-list>
            ${Array.from(
              this.doc.querySelectorAll(':root > DataTypeTemplates > DAType') ??
                []
            ).map(
              datype =>
                html`<mwc-list-item
                  value="${identity(datype)}"
                  tabindex="0"
                  hasMeta
                  @click=${(e: Event) => {
                    this.openDATypeWizard((<ListItemBase>e.target).value);
                  }}
                  ><span>${datype.getAttribute('id')}</span
                  ><span slot="meta"
                    >${datype.querySelectorAll('BDA').length}</span
                  ></mwc-list-item
                >`
            )}
          </filtered-list>
        </section>
        <section tabindex="0">
          <h1>
            ${translate('scl.EnumType')}
            <nav>
              <abbr title="${translate('add')}">
                <mwc-icon-button
                  icon="playlist_add"
                  @click=${() => this.openCreateEnumWizard()}
                ></mwc-icon-button>
              </abbr>
            </nav>
          </h1>
          <mwc-list>
            ${Array.from(
              this.doc.querySelectorAll(
                ':root > DataTypeTemplates > EnumType'
              ) ?? []
            ).map(
              enumType =>
                html`<enum-type-editor .element=${enumType}></enum-type-editor>`
            )}
          </mwc-list>
        </section>
      </div>
    `;
  }

  static styles = css`
    ${styles}

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    :host {
      width: 100vw;
    }

    #containerTemplates {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(400px, auto));
    }

    @media (max-width: 387px) {
      #containerTemplates {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
