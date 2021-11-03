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
import { BaySld } from './bay-sld.js';
import { drawConnection, getPosition, isBusBar, SldElement } from './foundation.js';

/**
 * SLD component of a VoltageLevel component.
 */
@customElement('voltagelevel-sld')
export class VoltageLevelSld extends LitElement {

  /**
   * Property holding the VoltageLevel XML element.
   */
  @property()
  element!: Element;
  
  /**
   * Holding a reference to the Substation SVG to draw routes between elements on.
   */
  @property()
  svg!: HTMLElement;

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

  firstUpdated(): void {
    // Pass the Substation SVG to all Bays
    this.shadowRoot!.querySelectorAll("bay-sld").forEach(bay => {
      const castedSldElement = <BaySld>(bay);
      castedSldElement.svg = this.svg;
    });
  }

  render(): TemplateResult {
    return html`<section>
      <div style="grid-template-columns: repeat(100, 64px);grid-template-rows: repeat(100, 64px)">
        ${this.busBars.map(busbar =>
          html`<busbar-sld
            .element=${busbar.element}
            style="grid-column:${busbar.pos.x};grid-row:${busbar.pos.y};">
            </busbar-sld>`
        )}
        ${this.bays.map(bay => 
          html`<bay-sld
            .element=${bay.element}
            style="grid-column:${bay.pos.x!};grid-row:${bay.pos.y!};">
            downer
          >
          </bay-sld>`
        )}
      </div>
    </section>`;
  }

  static styles = css`
    .container:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .container:focus-within {
      outline: 2px solid var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    div {
      display: grid;
    }
  `;
}
