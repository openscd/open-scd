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
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item';

import {
  CloseableElement,
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
  selectors,
  styles,
  updateNamingAction,
  WizardOptions,
} from './foundation.js';

import './voltage-level-editor.js';
import { VoltageLevelEditor } from './voltage-level-editor.js';
import { editlNode } from './lnodewizard.js';
import { guessVoltageLevel } from './guess-wizard.js';
/** [[`Substation`]] plugin subeditor for editing `Substation` sections. */
@customElement('substation-editor')
export class SubstationEditor extends LitElement {
  /** The edited `Element`, a common property of all Substation subeditors. */
  @property()
  element!: Element;

  /** [[element | `element.name`]] */
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  /** [[element | `element.desc`]] */
  @property({ type: String })
  get desc(): string | null {
    return this.element.getAttribute('desc');
  }

  /** Opens a [[`WizardDialog`]] for editing [[`element`]]. */
  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(SubstationEditor.wizard({ element: this.element }))
    );
  }

  /** Opens a [[`WizardDialog`]] for adding a new `VoltageLevel`. */
  openVoltageLevelWizard(): void {
    this.dispatchEvent(
      newWizardEvent(VoltageLevelEditor.wizard({ parent: this.element }))
    );
  }

  /** Opens a [[`WizardDialog`]] for editing `LNode` connections. */
  openLNodeWizard(): void {
    this.dispatchEvent(newWizardEvent(editlNode(this.element)));
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

  renderHeader(): TemplateResult {
    return html`
      <h1>
        ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
        <abbr title="${translate('add')}">
          <mwc-icon-button
            icon="playlist_add"
            @click=${() => this.openVoltageLevelWizard()}
          ></mwc-icon-button>
        </abbr>
        <nav>
          <abbr title="${translate('lnode.tooltip')}">
            <mwc-icon-button
              icon="account_tree"
              @click=${() => this.openLNodeWizard()}
            ></mwc-icon-button>
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

  static createAction(parent: Element): WizardAction {
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      const name = getValue(inputs.find(i => i.label === 'name')!);
      const desc = getValue(inputs.find(i => i.label === 'desc')!);
      const guess = wizard.shadowRoot?.querySelector('mwc-checkbox')?.checked;
      parent.ownerDocument.createElement('Substation');
      const element = createElement(parent.ownerDocument, 'Substation', {
        name,
        desc,
      });

      const action = {
        new: {
          parent,
          element,
          reference: null,
        },
      };

      if (guess)
        wizard.dispatchEvent(
          newWizardEvent(guessVoltageLevel(parent.ownerDocument))
        );

      wizard.close();
      return [action];
    };
  }

  render(): TemplateResult {
    return html`
      <section tabindex="0">
        ${this.renderHeader()}
        ${Array.from(this.element.querySelectorAll(selectors.VoltageLevel)).map(
          voltageLevel =>
            html`<voltage-level-editor
              .element=${voltageLevel}
            ></voltage-level-editor>`
        )}
      </section>
    `;
  }

  static wizard(options: WizardOptions): Wizard {
    const [
      heading,
      actionName,
      actionIcon,
      action,
      name,
      desc,
      guessable,
    ] = isCreateOptions(options)
      ? [
          get('substation.wizard.title.add'),
          get('add'),
          'add',
          SubstationEditor.createAction(options.parent),
          '',
          '',
          options.parent.querySelector(':root > IED'),
        ]
      : [
          get('substation.wizard.title.edit'),
          get('save'),
          'edit',
          updateNamingAction(options.element),
          options.element.getAttribute('name'),
          options.element.getAttribute('desc'),
          false,
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
          html`<wizard-textfield
            label="name"
            .maybeValue=${name}
            helper="${translate('substation.wizard.nameHelper')}"
            required
            validationMessage="${translate('textfield.required')}"
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            .maybeValue=${desc}
            nullable="true"
            helper="${translate('substation.wizard.descHelper')}"
          ></wizard-textfield>`,
          guessable
            ? html`<mwc-formfield label="${translate('guess.wizard.primary')}">
                <mwc-checkbox></mwc-checkbox>
              </mwc-formfield>`
            : html``,
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
