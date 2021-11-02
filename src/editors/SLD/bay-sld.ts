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
import { drawConnection, getPosition, Point, SldElement } from './foundation.js';

/**
 * SLD component of a Bay component.
 */
@customElement('bay-sld')
export class BaySld extends LitElement {
  @property()
  element!: Element;

  // Is this Bay builded down or up?
  @property({ type: Boolean })
  downer = false;

  @query('#bayRoutingSvg') bayRoutingSvg!: HTMLElement;

  /**
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

  /**
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

  /**
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
    /*
     * Drawing routes between ConnectivityNodes and ConductingEquipments.
     */
    this.connectivityNodeElements.forEach(cn => {
      const pathName = cn.element.getAttribute('pathName');
      this.equipmentElements
      .filter(element => element.element.querySelector(`Terminal[connectivityNode="${pathName}"]`))
      .forEach(element => {
        // All connected Conducting Equipments are here
        if (element.pos.y != null && cn.pos.y != null && (element.pos.y > cn.pos.y)) {
          drawConnection(cn.pos, element.pos, this.bayRoutingSvg)
        } else {
          drawConnection(element.pos, cn.pos, this.bayRoutingSvg)
        }
      });
    });
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
          .xMax}, 64px);grid-template-rows: repeat(${this.downer
          ? this.yMax
          : -this.yMax}, 64px)"
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
            html`<connectivity-node-editor
              .element=${element.element}
              class="element"
              style="grid-column:${element.pos.x};grid-row:${this.downer
                ? element.pos.y
                : -element.pos.y!};"
            >
            </connectivity-node-editor>`
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="bayRoutingSvg"
          width=${(2 * this.xMax) * 64}
          height=${(2 * this.yMax) * 64}
          viewBox="0 0 ${(2 * this.xMax) * 64} ${(2 * this.yMax) * 64}"
        ></svg>
      </div>
    </section>`;
  }

  static styles = css`
    .container {
      display: grid;
      grid-gap: 64px;
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

    .unconnectedcontainer {
      display: grid;
      grid-gap: 64px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, 64px));
    }

    .sldcontainer {
      display: grid;
      grid-gap: 64px;
    }

    .element {
      width: 64px;
      height: 64px;
    }

    .element:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    #canvas {
      position: absolute;
    }

    #bayRoutingSvg {
      position: absolute;
      z-index: -5;
    }
  `;
}
