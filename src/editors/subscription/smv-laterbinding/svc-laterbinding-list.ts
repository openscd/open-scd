import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import {
  getNameAttribute,
  identity,
  newWizardEvent,
} from '../../../foundation.js';
import { smvIcon } from '../../../icons/icons.js';
import { styles } from '../foundation.js';
import { wizards } from '../../../wizards/wizard-library.js';

/** A sub element for showing all Sampled Value Controls. */
@customElement('svc-later-binding-list')
export class SVCLaterBindingList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  getSvcElements(): Element[] {
    return Array.from(this.doc.querySelectorAll('LN0 > SampledValueControl'));
  }

  getFcdaElements(svcElement: Element): Element[] {
    const lnElement = svcElement.parentElement;
    if (lnElement) {
      return Array.from(
        lnElement.querySelectorAll(
          `:scope > DataSet[name=${svcElement.getAttribute('datSet')}] > FCDA`
        )
      );
    }
    return [];
  }

  private openEditWizard(svcElement: Element): void {
    const wizard = wizards['SampledValueControl'].edit(svcElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  renderFCDA(fcdaElement: Element): TemplateResult {
    return html`<mwc-list-item
      graphic="large"
      twoline
      value="${identity(fcdaElement)}"
    >
      <span>
        ${fcdaElement.getAttribute('doName')}${fcdaElement.hasAttribute(
          'doName'
        ) && fcdaElement.hasAttribute('daName')
          ? html`.`
          : nothing}${fcdaElement.getAttribute('daName')}
      </span>
      <span slot="secondary">
        ${fcdaElement.getAttribute('ldInst')}${fcdaElement.hasAttribute(
          'ldInst'
        ) && fcdaElement.hasAttribute('prefix')
          ? html`/`
          : nothing}${fcdaElement.getAttribute('prefix')}
        ${fcdaElement.getAttribute('lnClass')}
        ${fcdaElement.getAttribute('lnInst')}
      </span>
      <mwc-icon slot="graphic">subdirectory_arrow_right</mwc-icon>
    </mwc-list-item>`;
  }

  render(): TemplateResult {
    return html` <section tabindex="0">
      <filtered-list>
        ${this.getSvcElements().map(svcElement => {
          const fcdaElements = this.getFcdaElements(svcElement);
          return html`
            <mwc-list-item
              noninteractive
              graphic="icon"
              twoline
              hasMeta
              value="${identity(svcElement)} ${fcdaElements
                .map(fcdaElement => identity(fcdaElement) as string)
                .join(' ')}"
            >
              <mwc-icon-button
                slot="meta"
                icon="edit"
                class="interactive"
                @click=${() => this.openEditWizard(svcElement)}
              ></mwc-icon-button>
              <span>${getNameAttribute(svcElement)}</span>
              <span slot="secondary">${identity(svcElement)}</span>
              <mwc-icon slot="graphic">${smvIcon}</mwc-icon>
            </mwc-list-item>
            <li divider role="separator"></li>
            ${fcdaElements.map(fcdaElement => this.renderFCDA(fcdaElement))}
          `;
        })}
      </filtered-list>
    </section>`;
  }

  static styles = css`
    ${styles}

    mwc-list-item {
      --mdc-list-item-meta-size: 48px;
    }

    mwc-icon-button.hidden {
      display: none;
    }

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }

    .interactive {
      pointer-events: all;
    }
  `;
}
