import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import '@material/mwc-icon-button';

import { WizardTextField } from '../wizard-textfield.js';

import '../wizard-textfield.js';

import {
  COMPAS_LABELS_MAXIMUM,
  COMPAS_NAMESPACE,
  createLabel,
  createLabels,
  getLabels,
} from './private.js';

@customElement('compas-labels-field')
export class CompasLabelsFieldElement extends LitElement {
  @property()
  set privateElement(privateElement: Element) {
    this.originalLabelsElement = getLabels(privateElement) ?? undefined;
    if (this.originalLabelsElement) {
      this.newLabelsElement = <Element>(
        this.originalLabelsElement.cloneNode(true)
      );
    } else {
      this.newLabelsElement = createLabels(privateElement);
    }
  }

  @property()
  originalLabelsElement: Element | undefined;

  @property()
  newLabelsElement!: Element;

  @state()
  private get labels(): Element[] {
    return Array.from(
      this.newLabelsElement?.querySelectorAll(`:scope > Label`) ?? []
    )
      .filter(element => element.namespaceURI === COMPAS_NAMESPACE)
      .sort((label1, label2) =>
        (label1.textContent ?? '').localeCompare(label2.textContent ?? '')
      );
  }

  @query('wizard-textfield#newLabel')
  private newLabelField!: WizardTextField;

  private addLabel(): void {
    if (this.newLabelField.checkValidity()) {
      const value = this.newLabelField.value;
      createLabel(this.newLabelsElement!, value);

      this.newLabelField.value = '';
      this.requestUpdate('labels');
    }
  }

  private removeLabel(element: Element): void {
    this.newLabelsElement!.removeChild(element);

    this.requestUpdate('labels');
  }

  render(): TemplateResult {
    const labels = this.labels;
    return html`
      <div style="display: flex; flex-direction: row;">
        <div style="flex: auto;">
          <wizard-textfield
            id="newLabel"
            label="${translate('compas.newLabel')}"
            ?disabled="${labels.length >= COMPAS_LABELS_MAXIMUM}"
            .maybeValue=${null}
            required
          >
          </wizard-textfield>
        </div>
        <div style="display: flex; align-items: center; height: 56px;">
          <mwc-icon-button
            icon="new_label"
            ?disabled="${labels.length >= COMPAS_LABELS_MAXIMUM}"
            @click=${() => {
              this.addLabel();
            }}
          ></mwc-icon-button>
        </div>
      </div>
      <mwc-list>
        ${labels.map(element => {
          const value = element.textContent;
          return html` <mwc-list-item hasMeta graphic="icon">
            <span>${value}</span>
            <mwc-icon slot="graphic">label</mwc-icon>
            <mwc-icon-button
              icon="delete"
              slot="meta"
              @click=${() => {
                this.removeLabel(element);
              }}
            ></mwc-icon-button>
          </mwc-list-item>`;
        })}
      </mwc-list>
    `;
  }

  static styles = css`
    wizard-textfield {
      width: 100%;
    }

    mwc-list-item {
      --mdc-list-item-meta-size: 48px;
    }

    mwc-icon-button {
      color: var(--mdc-theme-on-surface);
    }
  `;
}
