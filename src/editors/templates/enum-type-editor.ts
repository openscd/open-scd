import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { translate, get } from 'lit-translate';

import { Select } from '@material/mwc-select';

import {
  EditorAction,
  getValue,
  newActionEvent,
  newWizardEvent,
  restrictions,
  Wizard,
  WizardActor,
  WizardInput,
} from '../../foundation.js';

import {
  isCreateOptions,
  styles,
  updateIDNamingAction,
  WizardOptions,
} from './foundation.js';
import './enum-val-editor.js';
import { EnumValEditor } from './enum-val-editor.js';

/** [[`Templates`]] plugin subeditor for editing `EnumType` sections. */
@customElement('enum-type-editor')
export class EnumTypeEditor extends LitElement {
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
  @property({ type: Number })
  get size(): number {
    return this.element.querySelectorAll('EnumVal').length;
  }

  /** Opens a [[`WizardDialog`]] for editing [[`element`]]. */
  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(EnumTypeEditor.wizard({ element: this.element }))
    );
  }

  render(): TemplateResult {
    return html`<mwc-list-item
      @click=${() => this.openEditWizard()}
      graphic="icon"
      hasMeta
      tabindex="0"
    >
      <span>${this.eID}</span>
      <mwc-icon slot="meta">edit</mwc-icon>
      <span slot="graphic">${this.size}</span>
    </mwc-list-item>`;
  }

  static createAction(parent: Element, templates: XMLDocument): WizardActor {
    return (inputs: WizardInput[]): EditorAction[] => {
      const id = getValue(inputs.find(i => i.label === 'id')!);

      if (!id) return [];

      const desc = getValue(inputs.find(i => i.label === 'desc')!);
      const values = <Select>inputs.find(i => i.label === 'values');
      const element = values.selected
        ? <Element>(
            templates
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

      return [action];
    };
  }

  private static createWizard(parent: Element, templates: Document): Wizard {
    return [
      {
        title: get('enum.wizard.title.add'),
        primary: {
          icon: 'add',
          label: get('add'),
          action: EnumTypeEditor.createAction(parent, templates),
        },
        content: [
          html`<mwc-select
            style="--mdc-menu-max-height: 196px;"
            outlined
            icon="playlist_add_check"
            label="values"
            helper="Default enumerations"
          >
            ${Array.from(templates.querySelectorAll('EnumType')).map(
              e =>
                html`<mwc-list-item
                  graphic="icon"
                  hasMeta
                  value="${e.getAttribute('id') ?? ''}"
                  ><span>${e.getAttribute('id')}</span>
                  <span slot="meta"
                    >${e.querySelectorAll('EnumVal').length}</span
                  >
                </mwc-list-item>`
            )}
          </mwc-select>`,
          html`<wizard-textfield
            label="id"
            helper="${translate('scl.id')}"
            .maybeValue=${''}
            required
            maxlength="127"
            minlength="1"
            pattern="${restrictions.nmToken}"
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            helper="${translate('scl.desc')}"
            .maybeValue=${null}
            nullable
            pattern="${restrictions.normalizedString}"
          ></wizard-textfield>`,
        ],
      },
    ];
  }

  private static editWizard(element: Element): Wizard {
    return [
      {
        title: get('enum.wizard.title.edit'),
        primary: {
          icon: 'edit',
          label: get('save'),
          action: updateIDNamingAction(element),
        },
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
                    parent: element.parentElement!,
                    element: element,
                    reference: element.nextElementSibling,
                  },
                })
              );
            }}
            fullwidth
          ></mwc-button> `,
          html`<wizard-textfield
            label="id"
            helper="${translate('scl.id')}"
            .maybeValue=${element.getAttribute('id')}
            required
            maxlength="127"
            minlength="1"
            pattern="${restrictions.nmToken}"
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            helper="${translate('scl.desc')}"
            .maybeValue=${element.getAttribute('desc')}
            nullable
            pattern="${restrictions.normalizedString}"
          ></wizard-textfield>`,
          html`<mwc-button
              slot="graphic"
              icon="playlist_add"
              trailingIcon
              label="${translate('scl.EnumVal')}"
              @click=${(e: MouseEvent) =>
                e.target!.dispatchEvent(
                  newWizardEvent(EnumValEditor.wizard({ parent: element }), {
                    detail: { subwizard: true },
                  })
                )}
            ></mwc-button>
            <mwc-list style="margin-top: 0px;">
              ${repeat(
                // FIXME(c-dinkel): broken lib.dom.iterable.d.ts hack
                <Iterable<ChildNode>>(<unknown>element.childNodes),
                child =>
                  child instanceof Element
                    ? html`<enum-val-editor
                        .element=${child}
                      ></enum-val-editor>`
                    : html``
              )}
            </mwc-list> `,
        ],
      },
    ];
  }

  static wizard(options: WizardOptions): Wizard {
    return isCreateOptions(options)
      ? EnumTypeEditor.createWizard(options.parent, options.templates)
      : EnumTypeEditor.editWizard(options.element);
  }

  static styles = styles;
}
