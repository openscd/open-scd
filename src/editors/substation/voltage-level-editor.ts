import {
  LitElement,
  TemplateResult,
  customElement,
  html,
  property,
  css,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import {
  createElement,
  EditorAction,
  getMultiplier,
  getReference,
  getValue,
  newActionEvent,
  newWizardEvent,
  patterns,
  Wizard,
  WizardActor,
  WizardInput,
} from '../../foundation.js';

import {
  isCreateOptions,
  selectors,
  startMove,
  styles,
  WizardOptions,
  cloneElement,
} from './foundation.js';
import './bay-editor.js';
import { BayEditor } from './bay-editor.js';
import { editlNode } from './lnodewizard.js';
import { SubstationEditor } from './substation-editor.js';
import { wizards } from '../../wizards/wizard-library.js';

/** Initial attribute values suggested for `VoltageLevel` creation */
const initial = {
  nomFreq: '50',
  numPhases: '3',
  Voltage: '110',
  multiplier: 'k',
};

function getVoltageAction(
  oldVoltage: Element | null,
  Voltage: string | null,
  multiplier: string | null,
  voltageLevel: Element
): EditorAction {
  if (oldVoltage === null) {
    const element = createElement(voltageLevel.ownerDocument, 'Voltage', {
      unit: 'V',
      multiplier,
    });
    element.textContent = Voltage;
    return {
      new: {
        parent: voltageLevel,
        element,
        reference: voltageLevel.firstElementChild,
      },
    };
  }

  if (Voltage === null)
    return {
      old: {
        parent: voltageLevel,
        element: oldVoltage,
        reference: oldVoltage.nextElementSibling,
      },
    };

  const newVoltage = <Element>oldVoltage.cloneNode(false);
  newVoltage.textContent = Voltage;
  if (multiplier === null) newVoltage.removeAttribute('multiplier');
  else newVoltage.setAttribute('multiplier', multiplier);
  return {
    old: { element: oldVoltage },
    new: { element: newVoltage },
  };
}

/** [[`Substation`]] subeditor for a `VoltageLevel` element. */
@customElement('voltage-level-editor')
export class VoltageLevelEditor extends LitElement {
  @property()
  element!: Element;

  @property()
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  @property()
  get desc(): string | null {
    return this.element.getAttribute('desc') ?? null;
  }
  @property()
  get voltage(): string | null {
    const V = this.element.querySelector(selectors.VoltageLevel + ' > Voltage');
    if (V === null) return null;
    const v = V.textContent ?? '';
    const m = V.getAttribute('multiplier');
    const u = m === null ? 'V' : ' ' + m + 'V';
    return v ? v + u : null;
  }

  openEditWizard(): void {
    const wizard = wizards['VoltageLevel'].create(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  openBayWizard(): void {
    this.dispatchEvent(
      newWizardEvent(BayEditor.wizard({ parent: this.element }))
    );
  }

  openLNodeWizard(): void {
    this.dispatchEvent(newWizardEvent(editlNode(this.element)));
  }

  remove(): void {
    if (this.element)
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
    return html`<h2>
      ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
      ${this.voltage === null ? '' : html`(${this.voltage})`}
      <abbr title="${translate('add')}">
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => this.openBayWizard()}
        ></mwc-icon-button>
      </abbr>
      <nav>
        <abbr title="${translate('lnode.tooltip')}">
          <mwc-icon-button
            icon="account_tree"
            @click=${() => this.openLNodeWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr title="${translate('duplicate')}">
          <mwc-icon-button
            icon="content_copy"
            @click=${() => cloneElement(this)}
          ></mwc-icon-button>
        </abbr>
        <abbr title="${translate('edit')}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr title="${translate('move')}">
          <mwc-icon-button
            icon="forward"
            @click=${() =>
              startMove(this, VoltageLevelEditor, SubstationEditor)}
          ></mwc-icon-button>
        </abbr>
        <abbr title="${translate('remove')}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button>
        </abbr>
      </nav>
    </h2>`;
  }

  render(): TemplateResult {
    return html`<section tabindex="0">
      ${this.renderHeader()}
      <div id="bayContainer">
        ${Array.from(this.element?.querySelectorAll(selectors.Bay) ?? []).map(
          bay => html`<bay-editor .element=${bay}></bay-editor>`
        )}
      </div>
    </section>`;
  }

  static styles = css`
    ${styles}

    section {
      background-color: var(--mdc-theme-on-primary);
    }

    #bayContainer {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      #bayContainer {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
