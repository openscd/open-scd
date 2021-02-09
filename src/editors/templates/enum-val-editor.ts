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
  createElement,
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
  WizardOptions,
} from '../substation/foundation.js';

function nextOrd(parent: Element): string {
  const maxOrd = Math.max(
    ...Array.from(parent.children).map(child =>
      parseInt(child.getAttribute('ord') ?? '-2', 10)
    )
  );
  return isFinite(maxOrd) ? (maxOrd + 1).toString(10) : '0';
}

/** [[`Templates`]] plugin subeditor for editing `EnumVal`s. */
@customElement('enum-val-editor')
export class EnumValEditor extends LitElement {
  @property()
  element!: Element;

  /** [[element | `element.ord`]] */
  @property({ type: Number })
  get ord(): string {
    return this.element.getAttribute('ord') ?? '-1';
  }
  /** [[element | `element.desc`]] */
  @property({ type: String })
  get desc(): string | null {
    return this.element.getAttribute('desc');
  }
  /** [[element | `element.textContent` ]] */
  @property({ type: String })
  get value(): string {
    return this.element.textContent ?? '';
  }

  /** Opens a [[`WizardDialog`]] for editing [[`element`]]. */
  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(EnumValEditor.wizard({ element: this.element }), {
        detail: { subwizard: true },
      })
    );
  }

  render(): TemplateResult {
    return html`<mwc-list-item
      @click=${() => this.openEditWizard()}
      graphic="icon"
      hasMeta
      tabindex="0"
    >
      <span>${this.value}</span>
      <span slot="graphic">${this.ord}</span>
      <mwc-icon slot="meta">edit</mwc-icon>
    </mwc-list-item>`;
  }

  static createAction(parent: Element): WizardAction {
    return (inputs: WizardInput[]): EditorAction[] => {
      const value = getValue(inputs.find(i => i.label === 'value')!);
      // TODO(c-dinkel): Find out what IEC61850 calls EnumVal's textContent.
      const desc = getValue(inputs.find(i => i.label === 'desc')!);
      const ord =
        getValue(inputs.find(i => i.label === 'ord')!) || nextOrd(parent);

      const element = createElement(parent.ownerDocument, 'EnumVal', {
        ord,
        desc,
      });

      element.textContent = value;

      const action = {
        new: {
          parent,
          element,
          reference: null,
        },
      };

      return [action];
    };
  }

  static updateAction(element: Element): WizardAction {
    return (inputs: WizardInput[]): EditorAction[] => {
      const value = getValue(inputs.find(i => i.label === 'value')!) ?? '';
      const desc = getValue(inputs.find(i => i.label === 'desc')!);
      const ord =
        getValue(inputs.find(i => i.label === 'ord')!) ||
        element.getAttribute('ord') ||
        nextOrd(element.parentElement!);

      if (
        value === element.textContent &&
        desc === element.getAttribute('desc') &&
        ord === element.getAttribute('ord')
      )
        return [];

      const newElement = <Element>element.cloneNode(false);
      if (desc === null) newElement.removeAttribute('desc');
      else newElement.setAttribute('desc', desc);
      newElement.setAttribute('ord', ord);
      newElement.textContent = value;

      return [{ old: { element }, new: { element: newElement } }];
    };
  }

  static wizard(options: WizardOptions): Wizard {
    const [
      heading,
      actionName,
      actionIcon,
      action,
      ord,
      desc,
      value,
    ] = isCreateOptions(options)
      ? [
          get('enum-val.wizard.title.add'),
          get('add'),
          'add',
          EnumValEditor.createAction(options.parent),
          nextOrd(options.parent),
          null, // desc is uncommon on EnumVal
          '',
        ]
      : [
          get('enum-val.wizard.title.edit'),
          get('save'),
          'edit',
          EnumValEditor.updateAction(options.element),
          options.element.getAttribute('ord'),
          options.element.getAttribute('desc'),
          options.element.textContent,
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
            ? html``
            : html`<mwc-button
                icon="delete"
                trailingIcon
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
              ></mwc-button>`,
          html`<wizard-textfield
            label="ord"
            helper="${translate('scl.ord')}"
            .maybeValue=${ord}
            required
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="value"
            helper="${translate('scl.value')}"
            .maybeValue=${value}
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            id="evDesc"
            label="desc"
            helper="${translate('scl.desc')}"
            .maybeValue=${desc}
            nullable
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
