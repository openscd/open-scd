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
import { getPosition, SldElement } from './foundation.js';
import { OrthogonalConnector } from './ortho-connector.js';

@customElement('bay-sld')
export class BaySld extends LitElement {
  @property()
  element!: Element;
  @property({ type: Boolean })
  downer = false;

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

  get xMax(): number {
    const posXx = <number[]>(
      this.sldelements
        .filter(sldelement => sldelement.pos.x)
        .map(sldelement => sldelement.pos.x)
    );
    return Math.max(...posXx, 2);
  }

  get yMax(): number {
    const posYs = <number[]>(
      this.sldelements
        .filter(sldelement => sldelement.pos.y)
        .map(sldelement => sldelement.pos.y)
    );
    return Math.max(...posYs, 2);
  }

  @property()
  get sldelements(): SldElement[] {
    const sldelements: SldElement[] = [];

    Array.from(this.element.children)
      .filter(
        child =>
          Array.from(child.querySelectorAll('Terminal')).filter(
            terminal => terminal.getAttribute('cNodeName') !== 'grounded'
          ).length !== 0
      )
      .filter(child => {
        const [x, y] = getPosition(child);
        return x && y;
      })
      .forEach(child => {
        const [x, y] = getPosition(child);
        sldelements.push({ element: child, pos: { x, y } });
      });

    return sldelements;
  }

  @query('#svg') svg!: HTMLElement;

  firstUpdated(): void {
    this.drawConnection(this.sldelements[0], this.sldelements[1]);
  }

  drawConnection(e1: SldElement, e2: SldElement): void {
    const shapeA = {
      left: (2 * e1.pos.x! - 2) * 50,
      top: (2 * e1.pos.y! - 2) * 50,
      width: 50,
      height: 50,
    };
    const shapeB = {
      left: (2 * e2.pos.x! - 2) * 50,
      top: (2 * e2.pos.y! - 2) * 50,
      width: 50,
      height: 50,
    };

    const path = OrthogonalConnector.route({
      pointA: { shape: shapeA, side: 'bottom', distance: 0.5 },
      pointB: { shape: shapeB, side: 'bottom', distance: 0.5 },
      shapeMargin: 10,
      globalBoundsMargin: 25,
      globalBounds: {
        left: 0,
        top: 0,
        width: 10000,
        height: 10000,
      },
    });

    const line = document.createElement('path');
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
        ${this.sldelements.map(
          sldelement =>
            html`<conducting-equipment-editor
              .element=${sldelement.element}
              class="element"
              style="grid-column:${sldelement.pos.x};grid-row:${this.downer
                ? sldelement.pos.y
                : -sldelement.pos.y!};"
            >
            </conducting-equipment-editor>`
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="svg"
          viewBox="0 0 ${(2 * this.xMax - 2) * 50} ${(2 * this.yMax - 2) * 50}"
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
  `;
}
