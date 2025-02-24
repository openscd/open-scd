'use strict';

import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import { WizardFactory } from '@openscd/open-scd/src/foundation.js';
import { newCreateWizardEvent, newEditWizardEvent } from 'scl-wizarding';

@customElement('v3-test')
export class V3testComponent extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      padding: 8px;
      margin-top: 16px;
      background-color: #fafafa;
    }
  `;

  render(): TemplateResult {
    return html`
      <section>
        <h2>Sub Editor Wizarding v1</h2>
        <p>
          This sub-editor sees ${this.doc?.querySelectorAll('LN').length ?? 0}
          Logical Nodes in the SCL.
        </p>
        <button @click=${this._handleV1Click}>Click me v1!</button>
      </section>

      <section>
        <h2>Sub Editor Wizarding v3</h2>
        <p>
          This sub-editor sees ${this.doc?.querySelectorAll('LN').length ?? 0}
          Logical Nodes in the SCL.
        </p>
        <button @click=${this._handleV3Click}>Click me v3!</button>
      </section>

      <section>
        <h2>REAL scl-wizarding events</h2>
        <p>
          We can dispatch "oscd-edit-wizard-request" or
          "oscd-create-wizard-request".
        </p>
        <button @click=${this._handleSclEditNoWizard}>
          Edit LN (no wizard => fallback)
        </button>
        <button @click=${this._handleSclEditWithWizard}>
          Edit LN (with plugin wizard)
        </button>
        <button @click=${this._handleSclCreateNoWizard}>
          Create LN0 (no wizard => fallback)
        </button>
        <button @click=${this._handleSclCreateWithWizard}>
          Create LN0 (with plugin wizard)
        </button>
      </section>
    `;
  }

  /**
   * 1) Demonstrates old v1 wizard
   */
  private _handleV1Click() {
    const v1WizardFactory: WizardFactory = () => [
      {
        title: 'V1 Wizard Step',
        content: [html`<p>Hello from a v1 wizard!</p>`],
        actions: [
          {
            label: 'Close',
            icon: 'close',
            action: () => [],
          },
        ],
      },
    ];

    this.dispatchEvent(
      new CustomEvent('wizard', {
        detail: { wizard: v1WizardFactory },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * 2) "v3Wizard" bridging => dispatch 'wizard' with detail.v3Wizard
   */
  private _handleV3Click() {
    const v3WizardDef = {
      steps: [
        {
          title: 'V3 Wizard Step',
          render: () => html`<p>Hello from a v3 wizard!</p>`,
        },
      ],
    };

    this.dispatchEvent(
      new CustomEvent('wizard', {
        detail: { v3Wizard: v3WizardDef },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * 3) Real scl-wizarding => "edit LN" but no wizard => bridging logs fallback
   */
  private _handleSclEditNoWizard() {
    const ln = this.doc.querySelector('LN');
    if (!ln) {
      console.warn('[MyPluginSubEditor] No LN found for editing');
      return;
    }

    const evt = newEditWizardEvent(ln, false);
    this.dispatchEvent(evt);
  }

  /**
   * 4) Real scl-wizarding => "edit LN"
   */
  private _handleSclEditWithWizard() {
    const ln = this.doc.querySelector('LN');
    if (!ln) {
      console.warn('[MyPluginSubEditor] No LN found for editing');
      return;
    }

    const myEditWizard: WizardFactory = () => [
      {
        title: `Edit LN ${ln.getAttribute('lnType') ?? ''} (Plugin Wizard)`,
        content: [
          html`<p>Plugin-supplied LN editor for ${ln.tagName} goes here.</p>`,
        ],
        actions: [
          {
            label: 'Close',
            icon: 'close',
            action: () => [],
          },
        ],
      },
    ];

    const editEvent = newEditWizardEvent(ln, false, {
      detail: {},
    });

    Object.assign(editEvent.detail, { wizard: myEditWizard });

    console.log(
      '[MyPluginSubEditor] Dispatching real oscd-edit-wizard-request with plugin wizard:',
      editEvent
    );
    this.dispatchEvent(editEvent);
  }

  /**
   * 5) Real scl-wizarding => "create LN0"
   */
  private _handleSclCreateNoWizard() {
    const ied = this.doc.querySelector('IED');
    if (!ied) {
      console.warn('[MyPluginSubEditor] No IED found for creation');
      return;
    }
    const evt = newCreateWizardEvent(ied, 'LN0', false);
    this.dispatchEvent(evt);
  }

  /**
   * 6) Real scl-wizarding => "create LN0"
   */
  private _handleSclCreateWithWizard() {
    const ied = this.doc.querySelector('IED');
    if (!ied) {
      console.warn('[MyPluginSubEditor] No IED found for creation');
      return;
    }

    const createWizard: WizardFactory = () => [
      {
        title: `Create LN0 under ${ied.tagName} (Plugin Wizard)`,
        content: [html`<p>Plugin's custom create LN0 wizard!</p>`],
        actions: [
          {
            label: 'Confirm',
            icon: 'check',
            action: () => {
              const ln0 = document.createElement('LN0');
              ied.appendChild(ln0);
              return [];
            },
          },
          {
            label: 'Close',
            icon: 'close',
            action: () => [],
          },
        ],
      },
    ];

    const createEvent = newCreateWizardEvent(ied, 'LN0', false, {
      detail: {},
    });

    Object.assign(createEvent.detail, { wizard: createWizard });

    console.log(
      '[MyPluginSubEditor] Dispatching real oscd-create-wizard-request with plugin wizard:',
      createEvent
    );
    this.dispatchEvent(createEvent);
  }
}
