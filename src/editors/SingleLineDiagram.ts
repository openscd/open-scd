import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import { identity } from '../foundation.js';

import panzoom from 'panzoom';

import { Side } from '../../public/js/ortho-connector.js';
import {
  getAbsolutePosition,
  SVG_GRID_SIZE,
  drawRoute,
  DEFAULT_ELEMENT_SIZE,
  createTerminalElement,
  createBusBarElement,
  createVoltageLevelElement,
  createBayElement,
  createConductingEquipmentElement,
  createConnectivityNodeElement,
  getAbsolutePositionConnectivityNode,
  getBusBarLength,
  createPowerTransformerElement,
} from './singlelinediagram/sld-drawing.js';
import {
  isBusBar,
  getConnectedTerminals,
  getPathNameAttribute,
} from './singlelinediagram/foundation.js';

/**
 * Main class plugin for Single Line Diagram editor.
 */
export default class SingleLineDiagramPlugin extends LitElement {
  // The full given XML document.
  @property()
  doc!: XMLDocument;

  // Container for giving the panzoom to.
  @query('#panzoom') panzoomContainer!: HTMLElement;

  // The main canvas to draw everything on.
  @query('#svg') svg!: HTMLElement;

  /**
   * Get all the BusBars from the document.
   */
  get busBars(): Element[] {
    return Array.from(this.doc.querySelectorAll('Bay')).filter(bay =>
      isBusBar(bay)
    );
  }

  /**
   * Get all the bays from the document.
   */
  get bays(): Element[] {
    return Array.from(this.doc.querySelectorAll('Bay')).filter(
      bay => !isBusBar(bay)
    );
  }

  /**
   * Get all the VoltageLevels from the SCL document.
   */
  get voltageLevels(): Element[] {
    return Array.from(this.doc.querySelectorAll('VoltageLevel'));
  }

  /**
   * Draw all available Voltage Levels of this SCL document.
   * Should only be a <g> element.
   */
  drawVoltageLevels(): void {
    this.voltageLevels.forEach(voltageLevel => {
      const voltageLevelElement = createVoltageLevelElement(voltageLevel);
      this.svg.appendChild(voltageLevelElement);
    });
  }

  /**
   * Draw all available Bays of this SCL document.
   * Should only be a <g> element.
   */
  drawBays(): void {
    this.bays.forEach(bay => {
      const bayElement = createBayElement(bay);

      this.addElementToGroup(bayElement, identity(bay.parentElement));
    });
  }

  /**
   * Draw all available `PowerTransformer`s of this SCL document.
   * Should only be a <g> element.
   */
  drawPowerTransformers(): void {
    Array.from(this.doc.querySelectorAll('PowerTransformer')).forEach(
      powerTransformer => {
        const powerTransformerElement =
          createPowerTransformerElement(powerTransformer);

        if (powerTransformer.parentElement?.tagName === 'Substation')
          this.svg.appendChild(powerTransformerElement);
        else
          this.addElementToGroup(
            powerTransformerElement,
            identity(powerTransformer.parentElement)
          );
      }
    );
  }

  /**
   * Draw all available Conducting Equipments of this SCL document.
   * Should only be a <g> element.
   */
  drawConductingEquipments(): void {
    Array.from(this.doc.querySelectorAll('ConductingEquipment'))
      .filter(
        child =>
          Array.from(child.querySelectorAll('Terminal')).filter(
            terminal => terminal.getAttribute('cNodeName') !== 'grounded'
          ).length !== 0
      )
      .forEach(equipment => {
        const eqElement = createConductingEquipmentElement(equipment);

        this.addElementToGroup(eqElement, identity(equipment.parentElement));
      });
  }

  /**
   * Draw all available Connectivity Nodes of this SCL document.
   */
  drawConnectivityNodes(): void {
    this.bays.forEach(bay => {
      Array.from(bay.querySelectorAll('ConnectivityNode'))
        .filter(cNode => cNode.getAttribute('name') !== 'grounded')
        .filter(cNode => getConnectedTerminals(cNode).length > 0)
        .forEach(cNode => {
          const cNodePosition = getAbsolutePositionConnectivityNode(cNode);
          const cNodeElement = createConnectivityNodeElement(
            cNode,
            cNodePosition
          );

          this.addElementToGroup(cNodeElement, identity(cNode.parentElement));
        });
    });
  }

  /**
   * Draw all available Bus Bars of this SCL document.
   */
  drawBusBars(): void {
    this.busBars.forEach(busBar => {
      const busBarElement = createBusBarElement(
        busBar,
        getBusBarLength(busBar.parentElement ?? this.doc)
      );

      this.addElementToGroup(busBarElement, identity(busBar.parentElement));
    });
  }

  drawConnectivityNodeConnections(): void {
    this.bays.forEach(bay => {
      Array.from(bay.querySelectorAll('ConnectivityNode'))
        .filter(cNode => cNode.getAttribute('name') !== 'grounded')
        .forEach(cNode => {
          const cnPosition = getAbsolutePositionConnectivityNode(cNode);

          Array.from(
            this.doc.querySelectorAll('ConductingEquipment, PowerTransformer')
          )
            .filter(element =>
              element.querySelector(
                `Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`
              )
            )
            .forEach(element => {
              const elementPosition = getAbsolutePosition(element);
              const terminalElement = element.querySelector(
                `Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`
              );

              let sideToDrawTerminalOn: Side;

              if (elementPosition.y! > cnPosition.y!) {
                const sidesOfRoutes = drawRoute(
                  cnPosition,
                  elementPosition,
                  this.svg
                );
                sideToDrawTerminalOn = sidesOfRoutes.pointBSide;
              } else {
                const sidesOfRoutes = drawRoute(
                  elementPosition,
                  cnPosition,
                  this.svg
                );
                sideToDrawTerminalOn = sidesOfRoutes.pointASide;
              }

              const terminal = createTerminalElement(
                elementPosition,
                sideToDrawTerminalOn,
                terminalElement!
              );
              this.svg
                .querySelectorAll(`g[id="${identity(element)}"]`)
                .forEach(eq => eq.appendChild(terminal));
            });
        });
    });
  }

  drawBusBarConnections(): void {
    this.busBars.forEach(busBar => {
      const pathName = getPathNameAttribute(busBar.children[0]);
      const busBarPosition = getAbsolutePosition(busBar);

      Array.from(this.doc.querySelectorAll('ConductingEquipment'))
        .filter(element =>
          element.querySelector(`Terminal[connectivityNode="${pathName}"]`)
        )
        .forEach(element => {
          const eqPosition = getAbsolutePosition(element);
          const terminalElement = element.querySelector(
            `Terminal[connectivityNode="${pathName}"]`
          );

          let sideToDrawTerminalOn: Side;

          // Height of busbar shape should be 1, because it's smaller.
          const customShape = { width: DEFAULT_ELEMENT_SIZE, height: 1 };

          // The X coordinate of
          if (busBarPosition.y! > eqPosition.y!) {
            const sidesOfRoutes = drawRoute(
              eqPosition,
              { x: eqPosition.x, y: busBarPosition.y },
              this.svg,
              customShape
            );
            sideToDrawTerminalOn = sidesOfRoutes.pointASide;
          } else {
            const sidesOfRoutes = drawRoute(
              { x: eqPosition.x, y: busBarPosition.y },
              eqPosition,
              this.svg,
              customShape
            );
            sideToDrawTerminalOn = sidesOfRoutes.pointBSide;
          }

          const terminal = createTerminalElement(
            eqPosition,
            sideToDrawTerminalOn,
            terminalElement!
          );
          this.svg
            .querySelectorAll(` g[id="${identity(element)}"]`)
            .forEach(eq => eq.appendChild(terminal));
        });
    });
  }

  /**
   * Draw all the Substation elements.
   */
  drawSubstationElements(): void {
    this.drawVoltageLevels();
    this.drawBays();
    this.drawConductingEquipments();
    this.drawPowerTransformers();
    this.drawConnectivityNodes();
    this.drawBusBars();

    this.drawConnectivityNodeConnections();
    this.drawBusBarConnections();
  }

  /**
   * Add an element to a specific <g> element.
   * @param elementToAdd - The element to add.
   * @param groupName - Identity sting if the element
   */
  addElementToGroup(elementToAdd: Element, identity: string | number): void {
    this.svg
      .querySelectorAll(`g[id="${identity}"]`)
      .forEach(group => group.appendChild(elementToAdd));
  }

  firstUpdated(): void {
    panzoom(this.panzoomContainer);
    this.drawSubstationElements();
  }

  render(): TemplateResult {
    // TODO: Width and Height should be a percentage, not fixed height/width.
    return html`<div class="sldContainer">
      <div id="panzoom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="svg"
          width="5000"
          height="5000"
        ></svg>
      </div>
    </div>`;
  }

  static styles = css`
    .sldContainer {
      overflow: hidden;
    }
  `;
}
