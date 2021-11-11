import { css, html, LitElement, property, query, TemplateResult } from "lit-element";
import panzoom from "panzoom";
import { getNameAttribute, getCoordinates, getDescriptionAttribute, getParentElementName, getPosition as getAbsolutePosition, SVG_GRID_SIZE, isBusBar, getPositionWithoutCoordinatedElement } from "./singlelinediagram/foundation";

/**
 * Main class plugin for Single Line Diagram editor.
 */
export default class SingleLineDiagramPlugin extends LitElement {

    // The full given XML document.
    @property()
    doc!: XMLDocument;

    // Container for giving the panzoom to.
    @query('#panzoom') container!: HTMLElement;

    // The main canvas to draw everything on.
    @query('#svg') svg!: HTMLElement;

    drawVoltageLevels() {
        this.doc.querySelectorAll('VoltageLevel').forEach(voltageLevel => {
            const voltageLevelElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            voltageLevelElement.setAttribute('id', getNameAttribute(voltageLevel)!);

            const description = getDescriptionAttribute(voltageLevel);
            if (description) voltageLevelElement.setAttribute('desc', description);

            // Set the position of the VoltageLevel.
            const {x, y} = getCoordinates(voltageLevel);
            voltageLevelElement.setAttribute('x', `${x}`)
            voltageLevelElement.setAttribute('y', `${y}`)

            // Styling
            voltageLevelElement.setAttribute('fill', 'currentColor');
            
            this.svg.appendChild(voltageLevelElement);
        })
    }

    drawBays() {
        Array.from(this.doc.querySelectorAll('Bay'))
        .filter(bay => !isBusBar(bay))
        .forEach(bay => {
            const bayElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            bayElement.setAttribute('id', getNameAttribute(bay)!);

            const description = getDescriptionAttribute(bay);
            if (description) bayElement.setAttribute('desc', description);

            // Set the position of the VoltageLevel.
            const {x, y} = getCoordinates(bay);
            bayElement.setAttribute('x', `${x}`);
            bayElement.setAttribute('y', `${y}`);
            
            this.svg.querySelectorAll(`g[id=${getParentElementName(bay)}]`)
                .forEach(voltageLevel => voltageLevel.appendChild(bayElement))
        })
    }

    drawConductingEquipments() {
        Array.from(this.doc.querySelectorAll('ConductingEquipment'))
            .filter(
            child =>
              Array.from(child.querySelectorAll('Terminal')).filter(
                terminal => terminal.getAttribute('cNodeName') !== 'grounded'
              ).length !== 0
            ).forEach(eq => {
                const eqElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

                // Set the position of the Equipment.
                const coordinates = getCoordinates(eq);
                eqElement.setAttribute('x', `${coordinates.x}`)
                eqElement.setAttribute('y', `${coordinates.y}`);

                const positionOnSvg = getAbsolutePosition(eq);
                eqElement.setAttribute('cx', `${positionOnSvg.x}`);
                eqElement.setAttribute('cy', `${positionOnSvg.y}`);

                eqElement.setAttribute('r', '6');
            
                this.svg.querySelectorAll(`g[id="${getParentElementName(eq)}"]`)
                    .forEach(bay => bay.appendChild(eqElement))
            })
    }

    drawConnectivityNodes() {
        Array.from(this.doc.querySelectorAll('Bay'))
        .filter(bay => !isBusBar(bay))
        .forEach(bay => {
            bay.querySelectorAll('ConnectivityNode')
            .forEach(connectivityNode => {
                const pathName = connectivityNode.getAttribute('pathName');
                let nrOfConnections = 0;
                let totalX = 0;
                let totalY = 0;
    
                Array.from(this.doc.querySelectorAll('ConductingEquipment'))
                    .filter(equipment => equipment.querySelector(`Terminal[connectivityNode="${pathName}"]`) != null)
                    .forEach(equipment => {
                        nrOfConnections++;
        
                        const {x, y} = getCoordinates(equipment)
        
                        totalX += x!;
                        totalY += y!;
                    })

                const calculatedPosition = {x: Math.round(totalX / nrOfConnections), y: Math.round(totalY / nrOfConnections)};
    
                const connectivityNodeElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

                const position = getPositionWithoutCoordinatedElement(connectivityNode, {x: calculatedPosition.x, y: calculatedPosition.y});
                connectivityNodeElement.setAttribute('cx', `${position.x}`);
                connectivityNodeElement.setAttribute('cy', `${position.y}`);
    
                connectivityNodeElement.setAttribute('r', '3');
    
                this.svg.querySelectorAll(`g[id="${getParentElementName(connectivityNode)}"]`)
                        .forEach(bay => bay.appendChild(connectivityNodeElement))
                });
        });
    }

    drawBusBars() {
        Array.from(this.doc.querySelectorAll('Bay'))
        .filter(bay => isBusBar(bay))
        .forEach(bay => {
            const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineElement.setAttribute('name', getNameAttribute(bay)!);

            // Styling
            lineElement.setAttribute('stroke-width', '6');
            lineElement.setAttribute('stroke', 'currentColor');

            const position = getAbsolutePosition(bay);
            lineElement.setAttribute('x1', `${position.x}`);
            lineElement.setAttribute('y1', `${position.y}`);
            lineElement.setAttribute('x2', `${this.biggestVoltageLevelXCoordinate * SVG_GRID_SIZE}`);
            lineElement.setAttribute('y2', `${position.y}`);
            
            this.svg.querySelectorAll(`g[id=${getParentElementName(bay)}]`)
                .forEach(voltageLevel => voltageLevel.appendChild(lineElement))
        });
    }

    /**
     * Draw all the Substation elements.
     */
    drawSubstationElements() {
        this.drawVoltageLevels();
        this.drawBays();
        this.drawConductingEquipments();
        this.drawConnectivityNodes();
        this.drawBusBars();
    }

      /**
   * Calculate the full X coordinates of this VoltageLevel.
   */
  get biggestVoltageLevelXCoordinate(): number {
    let finalX = 0;
    // Get the x of the last bay (basically the 'biggest' x)
    Array.from(this.doc.querySelectorAll('Bay')).forEach(bay => finalX = Math.max(finalX, getAbsolutePosition(bay).x!))

    /**
     * Because the width of the last bay is also needed, look up the bay
     * and find the ConductingEquipment containing the biggest x coordinate.
     */
    Array.from(this.doc.querySelectorAll('Bay'))
      .filter(bay => getAbsolutePosition(bay).x! == finalX)
      .forEach(bay => {
        let bayMaxX = 0;
        bay.querySelectorAll('ConductingEquipment')
        .forEach(equipment => bayMaxX = Math.max(bayMaxX, getAbsolutePosition(equipment).x!))
        // Also extend the max X coordinate with a multiplyer.
        finalX += bayMaxX;
      })

    return finalX;
  }
  
    firstUpdated(): void {
      panzoom(this.container);

      this.drawSubstationElements();
    }

    render(): TemplateResult {
        // TODO: Width and Height should be a percentage, not fixed height/width.
        return html`<div>
            <div id="panzoom">
                <svg xmlns="http://www.w3.org/2000/svg"
                    id="svg"
                    width="2000"
                    height="2000">
                </svg>
            </div>
        </div>`;
    }

    static styles = css`
        svg {
            position: absolute;
        }
    `;
}
