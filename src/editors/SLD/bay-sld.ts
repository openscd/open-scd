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
import { drawRoute, ElementPosition, getPosition, Point, SldElement } from './foundation.js';

/**
 * SLD component of a Bay component.
 */
@customElement('bay-sld')
export class BaySld extends LitElement implements ElementPosition {

  /**
   * Property holding the Bay XML element.
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
    return {x: (x! - 1) + this.fullParentOffset.x!, y: (y! - 1) + this.fullParentOffset.y!};
  }

  /**
   * True if this Bay is built up downwards.
   */
  downer = true;

  /**
   * Get all the unconnected Nodes of this particular Bay.
   */
  get unconnectedElements(): Element[] {
    return getChildElementsByTagName(
      this.element,
      'ConductingEquipment'
    ).filter(
      child =>
        Array.from(child.querySelectorAll('Terminal')).filter(
          terminal => terminal.getAttribute('cNodeName') !== 'grounded'
        ).length === 0
    );
  }

  /**
   * Get all the Equipment Nodes of this particular Bay.
   */
  get equipmentElements(): SldElement[] {
    const elements: SldElement[] = [];

    Array.from(this.element.children)
      .filter(
        child =>
          Array.from(child.querySelectorAll('Terminal')).filter(
            terminal => terminal.getAttribute('cNodeName') !== 'grounded'
          ).length !== 0
      )
      .forEach(child => {
        const {x, y} = getPosition(child);
        elements.push({ element: child, pos: { x, y } });
      });

    return elements;
  }

  /**
   * Get all the Connectivity Nodes of this particular Bay.
   */
  get connectivityNodeElements(): SldElement[] {
    const sldelements: SldElement[] = [];

    Array.from(getChildElementsByTagName(this.element, 'ConnectivityNode'))
      .forEach(child => {
        const pathName = child.getAttribute('pathName');
        let nrOfConnections = 0;
        let totalX = 0;
        let totalY = 0;

        getChildElementsByTagName(this.element, 'ConductingEquipment')
        .filter(equipment => equipment.querySelector(`Terminal[connectivityNode="${pathName}"]`) != null)
        .forEach(equipment => {
          nrOfConnections++;

          const {x, y} = getPosition(equipment)

          if (x != null && y != null) {
            totalX += x;
            totalY += y;
          }
        })

        const [x, y] = [Math.round(totalX / nrOfConnections), Math.round(totalY / nrOfConnections)];
        sldelements.push({ element: child, pos: {x, y} });
      });

    return sldelements;
  }

  /**
   * The max x and y of this particular Bay.
   */
  get xMax(): number {
    const posXx = <number[]>(
      this.equipmentElements
        .filter(sldelement => sldelement.pos.x)
        .map(sldelement => sldelement.pos.x)
    );
    return Math.max(...posXx, 2);
  }

  get yMax(): number {
    const posYs = <number[]>(
      this.equipmentElements
        .filter(sldelement => sldelement.pos.y)
        .map(sldelement => sldelement.pos.y)
    );
    return Math.max(...posYs, 2);
  }

  firstUpdated(): void {
    this.connectivityNodeElements.forEach(cn => {
      const pathName = cn.element.getAttribute('pathName');
      this.equipmentElements
      .filter(element => element.element.querySelector(`Terminal[connectivityNode="${pathName}"]`))
      .forEach(element => {
        const cnX = (cn.pos.x! - 1) + this.fullOffset.x!;
        const cnY = (cn.pos.y! - 1) + this.fullOffset.y!;
        const elementX = (element.pos.x! - 1) + this.fullOffset.x!;
        const elementY = (element.pos.y! - 1) + this.fullOffset.y!;

        if ((elementY > cnY)) {
          drawRoute({x: cnX, y: cnY}, {x: elementX, y: elementY}, this.svg)
        } else {
          drawRoute({x: elementX, y: elementY}, {x: cnX, y: cnY}, this.svg)
        }
      });
    });
  }

  /**
        <!--
        <div class="unconnectedcontainer">
        ${this.unconnectedElements.map(
          element =>
            html`<div class="element">${element.getAttribute('name')}</div>`
        )}
        </div>
        -->
   */

  render(): TemplateResult {
    return html`<section>
      <div style="grid-template-columns: repeat(100, 64px);grid-template-rows: repeat(100, 64px)">
        ${this.equipmentElements.map(
          element =>
            html`<conducting-equipment-editor
              .element=${element.element}
              class="element"
              style="grid-column:${element.pos.x};grid-row:${this.downer
                ? element.pos.y
                : -element.pos.y!};"
            >
            </conducting-equipment-editor>`
        )}
        ${this.connectivityNodeElements.map(
          element =>
            html`<connectivity-node-editor
              .element=${element.element}
              class="element"
              style="grid-column:${element.pos.x};grid-row:${this.downer
                ? element.pos.y
                : -element.pos.y!};"
            >
            </connectivity-node-editor>`
        )}

      </div>
    </section>`;
  }

  static styles = css`
    .unconnectedcontainer {
      display: grid;
      grid-gap: 64px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, 64px));
    }

    div {
      display: grid;
    }

    .element {
      width: 64px;
      height: 64px;
    }

    .element:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }
  `;
}
