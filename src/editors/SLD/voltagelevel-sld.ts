import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import { getChildElementsByTagName } from '../../foundation.js';
import { drawConnection, getPosition, isBusBar, SldElement } from './foundation.js';

/**
 * SLD component of a VoltageLevel component.
 */
@customElement('voltagelevel-sld')
export class VoltageLevelSld extends LitElement {
  @property()
  element!: Element;
  
  @query('#routingSvg') routingSvg!: HTMLElement;

  /**
   * Get all the BusBars from the VoltageLevel element.
   */
  @property()
  get busBars(): SldElement[] {
    return getChildElementsByTagName(this.element, 'Bay')
      .filter(bay => isBusBar(bay))
      .map(bay => {
        const [x, y] = getPosition(bay);
        return { element: bay, pos: { x, y } };
      });
  }

  /**
   * Get all the regular Bays from the VoltageLevel element.
   */
  @property()
  get bays(): SldElement[] {
    return getChildElementsByTagName(this.element, 'Bay')
      .filter(bay => !isBusBar(bay))
      .map(bay => {
        const [x, y] = getPosition(bay);
        return { element: bay, pos: { x, y } };
      });
  }

  render(): TemplateResult {
    return html`<section class="container">
      <div class="container bay"></div>
      <div
        class="container"
        style="grid-template-rows: repeat(${this.busBars.length},64px);"
      >
        ${this.busBars.map(busbar => html`<busbar-sld
          .element=${busbar.element}>
        </busbar-sld>`)}
      </div>
      <div class="container bay">
        ${this.bays.map(
          feeder => html`<bay-sld
            .element=${feeder.element}
            downer
          >
          </bay-sld>`
        )}
      </div>
    </section>`;
  }

  static styles = css`
    .container {
      display: grid;
      grip-gap: 64px;
      padding: 64px;
    }

    .container:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .container:focus-within {
      outline: 2px solid var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .container.bay {
      display: flex;
    }
  `;
}
