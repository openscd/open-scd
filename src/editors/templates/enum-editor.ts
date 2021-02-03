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
  updateNamingAction,
  WizardOptions,
} from '../substation/foundation.js';
import { Select } from '@material/mwc-select';
const templates = fetch('public/default/templates.scd')
  .then(response => response.text())
  .then(str => {
    const doc = new DOMParser().parseFromString(str, 'text/xml');
    console.warn(doc);
    return doc;
  });

/** [[`Templates`]] plugin subeditor for editing `EnumType` sections. */
@customElement('enum-editor')
export class EnumEditor extends LitElement {
  @property()
  element!: Element;

  /** [[element | `element.name`]] */
  @property({ type: String })
  get id(): string {
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

  /** Deletes [[`element`]]. */
  remove(): void {
    this.dispatchEvent(
      newActionEvent({
        old: {
          parent: this.element.parentElement!,
          element: this.element,
          reference: this.element.nextElementSibling,
        },
      })
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

  renderHeader(): TemplateResult {
    return html`
      <h1>
        ${this.id} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
        (${this.size})
        <nav>
          <abbr title="${translate('lnode.tooltip')}">
            <mwc-icon-button icon="account_tree"></mwc-icon-button>
          </abbr>
          <abbr title="${translate('edit')}">
            <mwc-icon-button
              icon="edit"
              @click=${() => this.openEditWizard()}
            ></mwc-icon-button>
          </abbr>
          <abbr title="${translate('remove')}">
            <mwc-icon-button
              icon="delete"
              @click=${() => this.remove()}
            ></mwc-icon-button>
          </abbr>
        </nav>
      </h1>
    `;
  }

  static async createAction(parent: Element): Promise<WizardAction> {
    const tmp = await templates;
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
            tmp
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
      <span>${this.id}</span>
      <mwc-icon slot="meta">edit</mwc-icon>
      <span slot="graphic">${this.size}</span>
    </mwc-list-item>`;
    return html`
      ${this.renderHeader()}
      <mwc-list>
        ${Array.from(
          this.element.querySelectorAll(
            ':root > DataTypeTemplates > EnumType > EnumVal'
          )
        ).map(
          value =>
            html`<mwc-list-item graphic="icon">
              <span>${value.textContent}</span>
              <mwc-icon slot="meta">delete</mwc-icon>
              <span slot="graphic">${value.getAttribute('ord')}</span>
            </mwc-list-item>`
        )}
      </mwc-list>
    `;
  }

  static async wizard(options: WizardOptions): Promise<Wizard> {
    const temp = await templates;
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
          updateNamingAction(options.element),
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
                ${Array.from(temp.querySelectorAll('EnumType')).map(
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
            : html`<mwc-list>
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
          html`<wizard-textfield
            label="id"
            .maybeValue=${id}
            required
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            .maybeValue=${desc}
            nullable="true"
          ></wizard-textfield>`,
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
