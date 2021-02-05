import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item';
import { Select } from '@material/mwc-select';

import {
  CloseableElement,
  EditorAction,
  getValue,
  newActionEvent,
  newWizardEvent,
  Wizard,
  WizardAction,
  WizardInput,
} from '../../foundation.js';
import {
  isCreateOptions,
  styles,
  updateIDNamingAction,
  WizardOptions,
} from '../substation/foundation.js';

export const templates = fetch('public/default/templates.scd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'text/xml'));

/** [[`Templates`]] plugin subeditor for editing `EnumType` sections. */
@customElement('enum-editor')
export class EnumEditor extends LitElement {
  @property()
  element!: Element;

  /** [[element | `element.id`]] */
  @property({ type: String })
  get eID(): string {
    return this.element.getAttribute('id') ?? '';
  }
  /** [[element | `element.desc`]] */
  @property({ type: String })
  get desc(): string | null {
    return this.element.getAttribute('desc');
  }
  /** Number of enum values. */
  get size(): number {
    return this.element.querySelectorAll('EnumVal').length;
  }

  /** Opens a [[`WizardDialog`]] for editing [[`element`]]. */
  async openEditWizard(): Promise<void> {
    this.dispatchEvent(
      newWizardEvent(await EnumEditor.wizard({ element: this.element }))
    );
  }

  newUpdateAction(name: string, desc: string | null): EditorAction {
    const newElement = <Element>this.element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    return {
      old: { element: this.element },
      new: { element: newElement },
    };
  }

  static async createAction(parent: Element): Promise<WizardAction> {
    const tpl = await templates;
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      const id = getValue(inputs.find(i => i.label === 'id')!);

      if (id === null) return [];

      const desc = getValue(inputs.find(i => i.label === 'desc')!);
      const values = <Select>inputs.find(i => i.label === 'values');
      const element = values.selected
        ? <Element>(
            tpl
              .querySelector(`EnumType[id="${values.selected.value}"]`)!
              .cloneNode(true)
          )
        : parent.ownerDocument.createElement('EnumType');

      element.setAttribute('id', id);
      if (desc) element.setAttribute('desc', desc);

      const action = {
        new: {
          parent,
          element,
          reference: parent.firstElementChild,
        },
      };

      wizard.close();
      return [action];
    };
  }

  render(): TemplateResult {
    return html`<mwc-list-item
      @click=${() => this.openEditWizard()}
      graphic="icon"
      hasMeta
    >
      <span>${this.eID}</span>
      <mwc-icon slot="meta">edit</mwc-icon>
      <span slot="graphic">${this.size}</span>
    </mwc-list-item>`;
  }

  static async wizard(options: WizardOptions): Promise<Wizard> {
    // FIXME: translate helpers
    const tpl = await templates;
    const [heading, actionName, actionIcon, action, id, desc] = isCreateOptions(
      options
    )
      ? [
          get('enum.wizard.title.add'),
          get('add'),
          'add',
          await EnumEditor.createAction(options.parent),
          '',
          '',
        ]
      : [
          get('enum.wizard.title.edit'),
          get('save'),
          'edit',
          updateIDNamingAction(options.element),
          options.element.getAttribute('id'),
          options.element.getAttribute('desc'),
        ];

    return [
      {
        title: heading,
        primary: {
          icon: actionIcon,
          label: actionName,
          action: action,
        },
        content: [
          isCreateOptions(options)
            ? html`<mwc-select
                style="--mdc-menu-max-height: 196px;"
                outlined
                icon="library_add"
                label="values"
                helper="Default enumerations"
              >
                ${Array.from(tpl.querySelectorAll('EnumType')).map(
                  e =>
                    html`<mwc-list-item
                      graphic="icon"
                      hasMeta
                      .value=${e.getAttribute('id')}
                      ><span>${e.getAttribute('id')}</span>
                      <span slot="meta"
                        >${e.querySelectorAll('EnumVal').length}</span
                      >
                    </mwc-list-item>`
                )}
              </mwc-select>`
            : html``,
          html`<wizard-textfield
            label="id"
            helper="ID"
            .maybeValue=${id}
            required
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            helper="DESCRIPTION"
            .maybeValue=${desc}
            nullable="true"
          ></wizard-textfield>`,
          isCreateOptions(options)
            ? html``
            : html`<mwc-button
                  icon="delete"
                  label=${translate('delete')}
                  @click=${(e: MouseEvent) => {
                    e.target!.dispatchEvent(newWizardEvent());
                    e.target!.dispatchEvent(
                      newActionEvent({
                        old: {
                          parent: options.element.parentElement!,
                          element: options.element,
                          reference: options.element.nextElementSibling,
                        },
                      })
                    );
                  }}
                  fullwidth
                ></mwc-button>
                <mwc-list>
                  ${Array.from(
                    options.element.querySelectorAll(
                      ':root > DataTypeTemplates > EnumType > EnumVal'
                    )
                  ).map(
                    val =>
                      html`<mwc-list-item
                        graphic="icon"
                        value=${val.getAttribute('ord')}
                      >
                        <span>${val.textContent}</span>
                        <span slot="graphic">${val.getAttribute('ord')}</span>
                      </mwc-list-item>`
                  )}
                </mwc-list>`,
        ],
      },
    ];
  }

  static styles = css`
    ${styles}

    section {
      overflow: auto;
    }

    :host {
      width: 100vw;
    }
  `;
}
