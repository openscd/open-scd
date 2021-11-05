import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import { getChildElementsByTagName } from '../../foundation.js';
import { BaySld } from './bay-sld.js';
import { drawRoute, XYPosition, getPosition, Point, SldElement } from './foundation.js';

/**
 * SLD component of a VoltageLevel component.
 */
@customElement('voltagelevel-sld')
export class VoltageLevelSld extends LitElement implements XYPosition {

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
   * Overridden from XYPosition
   */
  // --------------------------
  @property()
  fullParentOffset!: Point

  get myOwnFullOffset(): Point {
    // Substation doesn't have a position, so not used it.
    const {x, y} = getPosition(this.element);
    return {x: x! - 1, y: y! - 1};
  }
  // --------------------------
  
  /**
   * Checking of a Bay is a BusBar or not.
   * @param bay The bay to check.
   * @returns Is the Bay a BusBar or not.
   */
  isBusBar(bay: Element): boolean {
    return (
      bay.children.length === 1 && bay.children[0].tagName === 'ConnectivityNode'
    );
  }

  /**
   * Get all the BusBars from the VoltageLevel element.
   */
  get busBars(): SldElement[] {
    return getChildElementsByTagName(this.element, 'Bay')
      .filter(bay => this.isBusBar(bay))
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
      .filter(bay => !this.isBusBar(bay))
      .map(bay => {
        const {x, y} = getPosition(bay);
        return { element: bay, pos: { x, y } };
      });
  }

  /**
   * Calculate the full X coordinates of this VoltageLevel.
   */
  get biggestVoltageLevelXCoordinate(): number {
    let finalX = 0;
    // Get the x of the last bay (basically the 'biggest' x)
    Array.from(this.bays).forEach(bay => finalX = Math.max(finalX, bay.pos.x!))

    /**
     * Because the width of the last bay is also needed, look up the bay
     * and find the ConductingEquipment containing the biggest x coordinate.
     * 
     * TODO: Make more elegant.
     */
    Array.from(this.bays)
      .filter(bay => bay.pos.x! == finalX)
      .forEach(bay => {
        let bayMaxX = 0;
        bay.element.querySelectorAll('ConductingEquipment')
        .forEach(equipment => bayMaxX = Math.max(bayMaxX, getPosition(equipment).x!))
        finalX += bayMaxX;
      })

    return finalX;
  }

  /**
   * Draw all the routes of all the BusBars in this VoltageLevel.
   */
  drawBusBarConnections(): void {
    this.busBars.forEach(busbar => {
      const pathName = busbar.element.getElementsByTagName('ConnectivityNode')[0].getAttribute('pathName');

      this.bays.forEach(bay => {
        // Get the Bay offset.
        let bayOffsetX: number | undefined;
        let bayOffsetY: number | undefined;

        Array.from(this.shadowRoot!.querySelectorAll("bay-sld"))
          .filter(a => (<BaySld>(a)).name == bay.element.getAttribute('name'))
          .forEach(b => {
            const casted = (<BaySld>(b));
            bayOffsetX = casted.myOwnFullOffset.x;
            bayOffsetY = casted.myOwnFullOffset.y;
          });

        Array.from(bay.element.getElementsByTagName('ConductingEquipment'))
          .filter(eq => eq.querySelector(`Terminal[connectivityNode="${pathName}"]`))
          .forEach(eq => {

          const busbarX = (busbar.pos.x! - 1) + this.myOwnFullOffset.x!;
          const busbarY = (busbar.pos.y! - 1) + this.myOwnFullOffset.y!;

          const eqX = (getPosition(eq).x! - 1) + bayOffsetX!;
          const eqY = (getPosition(eq).y! - 1) + bayOffsetY!;

          if (busbarY != null && eqY != null && (busbarY > eqY)) {
            drawRoute({x: eqX, y: eqY}, {x: eqX, y: busbarY}, this.svg)
          } else {
            drawRoute({x: eqX, y: busbarY}, {x: eqX, y: eqY}, this.svg)
          }
        })
      })
    })
  }

  firstUpdated(): void {
    // Pass the Substation SVG to all Bays
    this.shadowRoot!.querySelectorAll("bay-sld").forEach(bay => (<BaySld>(bay)).svg = this.svg);

    this.drawBusBarConnections();
  }

  render(): TemplateResult {
    return html`<section>
      <div style="grid-template-columns: repeat(100, 64px);grid-template-rows: repeat(100, 64px)">
        ${this.busBars.map(busbar =>
          html`<busbar-sld
            .element=${busbar.element}
            .downer=${true}
            style="grid-column-start:${busbar.pos.x};grid-column-end:${this.biggestVoltageLevelXCoordinate};grid-row:${busbar.pos.y};">
            </busbar-sld>`
        )}
        ${this.bays.map(bay => 
          html`<bay-sld
            .element=${bay.element}
            .fullParentOffset=${this.myOwnFullOffset}
            style="grid-column:${bay.pos.x!};grid-row:${bay.pos.y!};"
            .downer=${true}
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
