import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import panzoom from 'panzoom';

import { Side } from '../../public/js/ortho-connector.js';
import {
  getAbsolutePosition,
  getParentElementName,
  getAbsolutePositionWithCustomCoordinates,
  SVG_GRID_SIZE,
  drawRouteBetweenElements,
  DEFAULT_ELEMENT_SIZE,
  createTerminalElement,
  createBusBarElement,
  createVoltageLevelElement,
  createBayElement,
  createConductingEquipmentElement,
  createConnectivityNodeElement,
  getElementDimensions,
} from './singlelinediagram/sld-drawing.js';
import {
  getNameAttribute,
  getSCLCoordinates,
  isBusBar,
  calculateConnectivityNodeSclCoordinates,
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

      this.addElementToGroup(bayElement, getParentElementName(bay)!);
    });
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

        this.addElementToGroup(eqElement, getParentElementName(equipment)!);
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
          const cNodePosition = calculateConnectivityNodeSclCoordinates(cNode);
          const cNodeElement = createConnectivityNodeElement(
            cNode,
            cNodePosition
          );

          this.addElementToGroup(cNodeElement, getParentElementName(cNode)!);
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
        this.biggestVoltageLevelXCoordinate
      );

      this.addElementToGroup(busBarElement, getParentElementName(busBar)!);
    });
  }

  drawConnectivityNodeConnections(): void {
    this.bays.forEach(bay => {
      Array.from(bay.querySelectorAll('ConnectivityNode'))
        .filter(cNode => cNode.getAttribute('name') !== 'grounded')
        .forEach(cNode => {
          // For each Connectivity Node, the routes must be drawn.
          const cNodeAbsolutePosition = getAbsolutePositionWithCustomCoordinates(
            cNode,
            calculateConnectivityNodeSclCoordinates(cNode)
          );
          const cNodeDimensions = getElementDimensions(getNameAttribute(bay)!, getNameAttribute(cNode)!, this.svg);

          // Get all the connected Conducting Equipments to this specific Connectivity Node..
          Array.from(this.doc.querySelectorAll('ConductingEquipment'))
            .filter(cEquipment =>
              cEquipment.querySelector(
                `Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`
              )
            )
            .forEach(cEquipment => {
              const cEquipmentAbsolutePosition = getAbsolutePosition(cEquipment);
              let sideToDrawTerminalOn: Side;

              /**
               * TODO: ConductingEquipment dimensions are just the defaults,
               * retrieving dimensions the same way as for ConnectivityNode doesn't work.
               * 
               * Instead, just insert DEFAULT_ELEMENT_SIZE for height and width for ConductingEquipment.
               */
              if (cEquipmentAbsolutePosition.y! > cNodeAbsolutePosition.y!) {
                const sidesOfRoutes = drawRouteBetweenElements(
                  cNodeAbsolutePosition,
                  cEquipmentAbsolutePosition,
                  cNodeDimensions,
                  {
                    height: DEFAULT_ELEMENT_SIZE,
                    width: DEFAULT_ELEMENT_SIZE
                  },
                  this.svg
                );
                sideToDrawTerminalOn = sidesOfRoutes.pointBSide;
              } else {
                const sidesOfRoutes = drawRouteBetweenElements(
                  cEquipmentAbsolutePosition,
                  cNodeAbsolutePosition,
                  {
                    height: DEFAULT_ELEMENT_SIZE,
                    width: DEFAULT_ELEMENT_SIZE
                  },
                  cNodeDimensions,
                  this.svg
                );
                sideToDrawTerminalOn = sidesOfRoutes.pointASide;
              }

              /**
               * Add the terminal belonging to the connected Conducting Equipment.
               */
              const terminalElement = cEquipment.querySelector(
                `Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`
              );

              // Create the Terminal SVG element and add it to the Conducting Equipment group.
              const terminal = createTerminalElement(
                cEquipmentAbsolutePosition,
                sideToDrawTerminalOn,
                terminalElement!
              );

              this.svg
                .querySelectorAll(
                  `g[id="${getNameAttribute(bay)}"] > g[id="${getNameAttribute(
                    cEquipment
                  )}"]`
                )
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
        .filter(cEquipment =>
          cEquipment.querySelector(`Terminal[connectivityNode="${pathName}"]`)
        )
        .forEach(cEquipment => {
          const cEquipmentAbsolutePosition = getAbsolutePosition(cEquipment);

          let sideToDrawTerminalOn: Side;

          // Height of busbar shape should be 1, because it's smaller.
          const customShape = { width: DEFAULT_ELEMENT_SIZE, height: 1 };

          if (busBarPosition.y! > cEquipmentAbsolutePosition.y!) {
            const sidesOfRoutes = drawRouteBetweenElements(
              cEquipmentAbsolutePosition,
              // The x of the busbar position should equal the x of the Conducting Equipment,
              // so it will be a straight line.
              {
                x: cEquipmentAbsolutePosition.x!,
                // The drawRoute function draws the routes to the middle of the elements,
                // for the Bus Bar the height is 1, so we extract the value that is added in the function.
                y: busBarPosition.y! - ((DEFAULT_ELEMENT_SIZE - customShape.height) / 2)
              },
              customShape,
              customShape,
              this.svg,
            );
            sideToDrawTerminalOn = sidesOfRoutes.pointASide;
          } else {
            const sidesOfRoutes = drawRouteBetweenElements(
              {
                x: cEquipmentAbsolutePosition.x!,
                y: busBarPosition.y! - ((DEFAULT_ELEMENT_SIZE - customShape.height) / 2)
              },
              cEquipmentAbsolutePosition,
              customShape,
              customShape,
              this.svg,
            );
            sideToDrawTerminalOn = sidesOfRoutes.pointBSide;
          }

          /**
           * Add the terminal belonging to the connected Conducting Equipment.
           */
          const terminalElement = cEquipment.querySelector(
            `Terminal[connectivityNode="${pathName}"]`
          );
          
          const terminal = createTerminalElement(
            cEquipmentAbsolutePosition,
            sideToDrawTerminalOn,
            terminalElement!
          );

          this.svg
            .querySelectorAll(
              `g[id="${getNameAttribute(
                cEquipment.parentElement!
              )}"] > g[id="${getNameAttribute(cEquipment)}"]`
            )
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
    this.drawConnectivityNodes();
    this.drawBusBars();

    this.drawConnectivityNodeConnections();
    this.drawBusBarConnections();
  }

  /**
   * Calculate the absolute X coordinate for the bus bar.
   */
  get biggestVoltageLevelXCoordinate(): number {
    let biggestXOfBay = 0;
    let finalX = 0;

    // First get the Bay with the 'biggest' x (otherwise all bays/elements are being processed)
    Array.from(this.doc.querySelectorAll('Bay')).forEach(
      bay =>
        (biggestXOfBay = Math.max(biggestXOfBay, getSCLCoordinates(bay).x!))
    );

    // Then, get the 'biggest' x available in this particular bay.
    Array.from(this.doc.querySelectorAll('Bay'))
      .filter(bay => getSCLCoordinates(bay).x! == biggestXOfBay)
      .forEach(bay => {
        // Also, an extra SVG_GRID_SIZE is added for making it a bit longer.
        bay
          .querySelectorAll('ConductingEquipment')
          .forEach(
            equipment =>
              (finalX = Math.max(
                finalX,
                getAbsolutePosition(equipment).x! + SVG_GRID_SIZE
              ))
          );
      });

    return finalX;
  }

  /**
   * Add an element to a specific <g> element.
   * @param elementToAdd - The element to add.
   * @param groupName - The name of the group
   */
  addElementToGroup(elementToAdd: Element, groupName: string): void {
    this.svg
      .querySelectorAll(`g[id="${groupName}"]`)
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
