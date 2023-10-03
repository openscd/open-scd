import {
  css,
  customElement,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-menu';
import '@material/mwc-list';
import '@material/mwc-icon';
import '@material/mwc-icon-button';

import '../../action-pane.js';
import '../../action-icon.js';

import './sitipe-bay.js';

import { selectors } from './foundation.js';

import { BayTypical, getAssignedBayTypicals } from './sitipe-service.js';

export type NamingStrategy = (bay: Element, index?: number) => string;

export const defaultNamingStrategy: NamingStrategy = (
  bay: Element,
  index?: number
) => {
  const bayName: string = (bay.getAttribute('name') || 'BAY').replace(' ', '');
  const voltageLevel: Element | null = bay.closest('VoltageLevel');

  const voltageLevelName: string = (
    voltageLevel?.getAttribute('name') || 'VoltageLevel'
  ).replace(' ', '');

  const substation: Element | null = bay.closest('Substation');
  const substationName: string = (
    substation?.getAttribute('name') || 'Substation'
  ).replace(' ', '');

  const prefix = 'A';
  const suffix =
    typeof index === 'number' ? (index < 10 ? `0${index}` : `${index}`) : '01';

  return `${substationName}_${voltageLevelName}${bayName}${prefix}${suffix}`;
};

/** [[`Sitipe`]] plugin subeditor for editing `Sitipe` configuration. */
@customElement('sitipe-substation')
export class SitipeSubstation extends LitElement {
  /** The document being edited as provided to editor by [[`Sitipe`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  /** The edited `Element`, a common property of all Sitipe subeditors. */
  @property({ attribute: false })
  element!: Element;

  @property({
    type: Number,
  })
  editCount = -1;

  @property()
  namingStrategy: NamingStrategy = defaultNamingStrategy;

  @state()
  get substationHeader(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc');

    return `${name} ${desc ? `- ${desc}` : ''}`;
  }

  @state()
  get voltage(): string | null {
    const V = this.element.querySelector(selectors.VoltageLevel + ' > Voltage');
    if (V === null) return null;
    const v = V.textContent ?? '';
    const m = V.getAttribute('multiplier');
    const u = m === null ? 'V' : ' ' + m + 'V';
    return v ? v + u : null;
  }

  @state()
  voltageLevelHeader(voltageLevel: Element): string {
    const name = voltageLevel.getAttribute('name') ?? '';
    const desc = voltageLevel.getAttribute('desc');

    return `${name} ${desc ? `- ${desc}` : ''}
      ${this.voltage === null ? '' : `(${this.voltage})`}`;
  }

  @state()
  bayHeader(bay: Element): string {
    const name = bay.getAttribute('name') ?? '';
    const desc = bay.getAttribute('desc');

    return `${name} ${desc ? `(${desc})` : ''}`;
  }

  @state()
  bayTypicals: BayTypical[] = [];

  private renderBay(bay: Element): TemplateResult {
    return html`<sitipe-bay
      .bay=${bay}
      .bayTypicals=${this.bayTypicals}
      .doc=${this.doc}
      .namingStrategy=${this.namingStrategy}
      .editCount=${this.editCount}
    ></sitipe-bay>`;
  }

  private renderVoltageLevel(voltageLevel: Element): TemplateResult {
    return html`<action-pane label="${this.voltageLevelHeader(voltageLevel)}">
      <div class="bayContainer">
        ${Array.from(voltageLevel.querySelectorAll(selectors.Bay) ?? []).map(
          this.renderBay.bind(this)
        )}
      </div>
    </action-pane>`;
  }

  protected getBayTypicals(): void {
    getAssignedBayTypicals().then(res => {
      this.bayTypicals = res;
    });
  }

  protected firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this.getBayTypicals();
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.substationHeader}">
      ${Array.from(
        this.element.querySelectorAll(selectors.VoltageLevel) ?? []
      ).map(this.renderVoltageLevel.bind(this))}
    </action-pane>`;
  }
  static styles = css`
    .bayContainer {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      .bayContainer {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
