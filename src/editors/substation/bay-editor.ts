import {
  customElement,
  LitElement,
  TemplateResult,
  html,
  property,
  css,
  query,
} from 'lit-element';
import {
  Wizard,
  WizardAction,
  WizardInput,
  CloseableElement,
  EditorAction,
  newWizardEvent,
  newActionEvent,
} from '../../foundation.js';
import { get, translate } from 'lit-translate';

interface BayUpdateOptions {
  element: Element;
}
interface BayCreateOptions {
  parent: Element;
}
type BayWizardOptions = BayUpdateOptions | BayCreateOptions;
function isBayCreateOptions(
  options: BayWizardOptions
): options is BayCreateOptions {
  return (<BayCreateOptions>options).parent !== undefined;
}

@customElement('bay-editor')
export class BayEditor extends LitElement {
  @property({ type: Element })
  element!: Element;

  @property({ type: Element })
  parent!: Element;

  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }

  @property({ type: String })
  get desc(): string {
    return this.element.getAttribute('desc') ?? '';
  }

  @query('h1') header!: Element;

  openEditWizard(): void {
    this.dispatchEvent(
      newWizardEvent(BayEditor.wizard({ element: this.element }))
    );
  }

  removeAction(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: { parent: this.parent, element: this.element, reference: null },
        })
      );
  }

  renderHeader(): TemplateResult {
    return html`<h1>
      <mwc-icon-button
        icon="delete"
        @click=${() => this.removeAction()}
      ></mwc-icon-button>
      <mwc-icon-button
        icon="edit"
        @click=${() => this.openEditWizard()}
      ></mwc-icon-button>
      ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
    </h1> `;
  }

  render(): TemplateResult {
    return html`${this.renderHeader()}`;
  }

  static createAction(parent: Element): WizardAction {
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      const name = inputs.find(i => i.label === 'name')!.maybeValue;
      const desc = inputs.find(i => i.label === 'desc')!.maybeValue;

      const action = {
        new: {
          parent,
          element: new DOMParser().parseFromString(
            `<Bay
              name="${name}"
              ${desc === null ? '' : `desc="${desc}"`}
            ></Bay>`,
            'application/xml'
          ).documentElement,
          reference: null,
        },
      };

      wizard.close();
      return [action];
    };
  }

  static updateAction(element: Element): WizardAction {
    return (
      inputs: WizardInput[],
      wizard: CloseableElement
    ): EditorAction[] => {
      const name = inputs.find(i => i.label === 'name')!.value;
      const desc = inputs.find(i => i.label === 'desc')!.maybeValue;

      let bayAction: EditorAction | null;
      console.warn(element.attributes);

      if (
        name === element.getAttribute('name') &&
        desc === element.getAttribute('desc')
      ) {
        bayAction = null;
      } else {
        const newElement = <Element>element.cloneNode(false);
        newElement.setAttribute('name', name);
        if (desc === null) newElement.removeAttribute('desc');
        else newElement.setAttribute('desc', desc);
        bayAction = { old: { element }, new: { element: newElement } };
      }

      if (bayAction) wizard.close();
      const actions: EditorAction[] = [];
      if (bayAction) actions.push(bayAction);
      return actions;
    };
  }

  static wizard(options: BayWizardOptions): Wizard {
    const [heading, actionName, actionIcon, action] = isBayCreateOptions(
      options
    )
      ? [
          get('bay.wizard.title.add'),
          get('add'),
          'add',
          BayEditor.createAction(options.parent),
        ]
      : [
          get('bay.wizard.title.edit'),
          get('save'),
          'edit',
          BayEditor.updateAction(options.element),
        ];
    const [name, desc] = isBayCreateOptions(options)
      ? ['', null]
      : [
          options.element.getAttribute('name'),
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
          html`<wizard-textfield
            label="name"
            .maybeValue=${name}
            helper="${translate('bay.wizard.nameHelper')}"
            iconTrailing="title"
            required
            validationMessage="${translate('textfield.required')}"
            dialogInitialFocus
          ></wizard-textfield>`,
          html`<wizard-textfield
            label="desc"
            .maybeValue=${desc}
            nullable="true"
            helper="${translate('bay.wizard.descHelper')}"
            iconTrailing="description"
          ></wizard-textfield>`,
        ],
      },
    ];
  }

  static styles = css`
    h1 {
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      background: var(--mdc-theme-primary);
      color: var(--mdc-theme-surface);
      margin-top: 5px;
      margin-left: 10px;
      min-width: 200px;
      padding-left: 0.15em;
      padding-top: 0.3em;
    }

    h1 > mwc-icon-button {
      position: relative;
      top: -5px;
    }
  `;
}
