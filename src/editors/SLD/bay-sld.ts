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
import { getPosition, Point, SldElement } from './foundation.js';
import { OrthogonalConnector } from './ortho-connector.js';

@customElement('bay-sld')
export class BaySld extends LitElement {
  @property()
  element!: Element;

  // Is this Bay builded down or up?
  @property({ type: Boolean })
  downer = false;

  @query('#svg') svg!: HTMLElement;

  /*
   * Get all the unconnected Nodes of this particular Bay.
   */
  @property()
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

  /*
   * Get all the Equipment Nodes of this particular Bay.
   */
  @property()
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
        const [x, y] = getPosition(child);
        elements.push({ element: child, pos: { x, y } });
      });

    return elements;
  }

  /*
   * Get all the Connectivity Nodes of this particular Bay.
   */
  @property()
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
          const x = equipment?.getAttribute('sxy:x');
          const y = equipment?.getAttribute('sxy:y');

          if (x != null && y != null) {
            totalX += parseInt(x);
            totalY += parseInt(y);
          }
        })

        const [x, y] = [Math.round(totalX / nrOfConnections), Math.round(totalY / nrOfConnections)];
        sldelements.push({ element: child, pos: {x, y} });
      });

    return sldelements;
  }

  /*
   * The max x and y of this particular bay.
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
        // All connected Conducting Equipments are here
        if (element.pos.y != null && cn.pos.y != null && (element.pos.y > cn.pos.y)) {
          this.drawConnection(cn.pos, element.pos)
        } else {
          this.drawConnection(element.pos, cn.pos)
        }
      });
    });
  }

  /*
   * Draw an auto-route from 1 Point to another.
   */
  drawConnection(e1: Point, e2: Point): void {
    const shapeA = {
      left: (2 * e1.x! - 2) * 50,
      top: (2 * e1.y! - 2) * 50,
      width: 50,
      height: 50,
    };
    const shapeB = {
      left: (2 * e2.x! - 2) * 50,
      top: (2 * e2.y! - 2) * 50,
      width: 50,
      height: 50,
    };

    const path = OrthogonalConnector.route({
      pointA: { shape: shapeA, side: 'bottom', distance: 0.5 },
      pointB: { shape: shapeB, side: 'top', distance: 0.5 },
      shapeMargin: 10,
      globalBoundsMargin: 25,
      globalBounds: {
        left: 0,
        top: 0,
        width: 10000,
        height: 10000,
      },
    });

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = '';
    path.forEach(({ x, y }, index) => {
      if (index === 0) {
        d = d + `M ${x} ${y}`;
      } else {
        d = d + ` L ${x} ${y}`;
      }
    });

    line.setAttribute('d', d);
    line.setAttribute('fill', 'transparent');
    line.setAttribute('stroke', 'currentColor');
    line.setAttribute('stroke-width', '1.5');

    this.svg.appendChild(line);
  }

  render(): TemplateResult {
    return html`<section class="container" index="0">
      <div class="unconnectedcontainer">
        ${this.unconnectedElements.map(
          element =>
            html`<div class="element">${element.getAttribute('name')}</div>`
        )}
      </div>
      <div
        class="sldcontainer"
        style="grid-template-columns: repeat(${this
          .xMax}, 50px);grid-template-rows: repeat(${this.downer
          ? this.yMax
          : -this.yMax}, 50px)"
      >
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
            html`<connectivity-node-sld
              .element=${element.element}
              style="grid-column:${element.pos.x};grid-row:${this.downer
                ? element.pos.y
                : -element.pos.y!};"
            >
            </connectivity-node-sld>`
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="svg"
          width=${(2 * this.xMax - 1) * 50}
          height=${(2 * this.yMax - 1) * 50}
          viewBox="0 0 ${(2 * this.xMax - 1) * 50} ${(2 * this.yMax - 1) * 50}"
        ></svg>
      </div>
    </section>`;
  }

  static styles = css`
    .container {
      display: grid;
      grid-gap: 50px;
      padding: 50px;
    }

    .container:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .container:focus-within {
      outline: 2px solid var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .unconnectedcontainer {
      display: grid;
      grid-gap: 50px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(50px, 50px));
    }

    .sldcontainer {
      display: grid;
      grid-gap: 50px;
    }

    .element {
      width: 50px;
      height: 50px;
      outline: solid;
    }
    .element:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    #canvas {
      position: absolute;
    }

    #svg {
      position: absolute;
    }
  `;
}
