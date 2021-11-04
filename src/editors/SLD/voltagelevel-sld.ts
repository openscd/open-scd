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
import { ElementPosition, getPosition, isBusBar, Point, SldElement } from './foundation.js';

/**
 * SLD component of a VoltageLevel component.
 */
@customElement('voltagelevel-sld')
export class VoltageLevelSld extends LitElement implements ElementPosition {

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

  @property()
  fullParentOffset!: Point

  get fullOffset(): Point {
    const {x, y} = getPosition(this.element);
    // Extract 1 because SLD is 1-based, grid is 0-based.
    // Also, add offset from parent.
    return {x: x! - 1, y: y! - 1};
  }

  /**
   * Get all the BusBars from the VoltageLevel element.
   */
  get busBars(): SldElement[] {
    return getChildElementsByTagName(this.element, 'Bay')
      .filter(bay => isBusBar(bay))
      .map(bay => {
        const {x, y} = getPosition(bay);
        return { element: bay, pos: { x, y } };
      });
  }

  /**
   * Get all the regular Bays from the VoltageLevel element.
   */
  get bays(): SldElement[] {
    return getChildElementsByTagName(this.element, 'Bay')
      .filter(bay => !isBusBar(bay))
      .map(bay => {
        const {x, y} = getPosition(bay);
        return { element: bay, pos: { x, y } };
      });
  }

  /**
   * Calculate the full X coordinates of this VoltageLevel.
   */
  get fullVoltageLevelX(): number {
    let highestNumber = 0;
    Array.from(this.bays).forEach(bay => highestNumber = Math.max(highestNumber, bay.pos.x!))

    Array.from(this.bays).filter(bay => bay.pos.x! == highestNumber)
      .forEach(bay => {
        let bayMaxX = 0;
        bay.element.querySelectorAll('ConductingEquipment')
        .forEach(equipment => bayMaxX = Math.max(bayMaxX, getPosition(equipment).x!))
        highestNumber = highestNumber + bayMaxX;
      })
    return highestNumber;
  }

  firstUpdated(): void {
    // Pass the Substation SVG to all Bays
    this.shadowRoot!.querySelectorAll("bay-sld").forEach(bay => (<BaySld>(bay)).svg = this.svg);
  }

  render(): TemplateResult {
    return html`<section>
      <div style="grid-template-columns: repeat(100, 64px);grid-template-rows: repeat(100, 64px)">
        ${this.busBars.map(busbar =>
          html`<busbar-sld
            .element=${busbar.element}
            style="grid-column-start:${busbar.pos.x};grid-column-end:${this.fullVoltageLevelX};grid-row:${busbar.pos.y};">
            </busbar-sld>`
        )}
        ${this.bays.map(bay => 
          html`<bay-sld
            .element=${bay.element}
            .fullParentOffset=${this.fullOffset}
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
