import { css, html, LitElement, property, query, TemplateResult } from "lit-element";
import panzoom from "panzoom";
import { createGElement, getAbsolutePosition, getParentElementName, getAbsolutePositionWithoutCoordinatedElement, SVG_GRID_SIZE } from "./singlelinediagram/drawing";
import { getNameAttribute, getCoordinates, isBusBar, Point } from "./singlelinediagram/foundation";

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
            const voltageLevelElement = createGElement(voltageLevel);

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
            const bayElement = createGElement(bay);

            // Set the position of the VoltageLevel.
            const coordinates = getCoordinates(bay);
            bayElement.setAttribute('x', `${coordinates.x}`);
            bayElement.setAttribute('y', `${coordinates.y}`);
            
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
                const eqElement = createGElement(eq);

                // Set the position of the Equipment.
                const coordinates = getCoordinates(eq);
                eqElement.setAttribute('x', `${coordinates.x}`)
                eqElement.setAttribute('y', `${coordinates.y}`);

                // Define a temporary icon
                const eqIcon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                const positionOnSvg = getAbsolutePosition(eq);
                eqIcon.setAttribute('cx', `${positionOnSvg.x}`);
                eqIcon.setAttribute('cy', `${positionOnSvg.y}`);
                eqIcon.setAttribute('r', '6');

                eqElement.appendChild(eqIcon);
            
                this.svg.querySelectorAll(`g[id="${getParentElementName(eq)}"]`)
                    .forEach(bay => bay.appendChild(eqElement))
            })
    }

    drawConnectivityNodes() {
        Array.from(this.doc.querySelectorAll('Bay'))
        .filter(bay => !isBusBar(bay))
        .forEach(bay => {
            bay.querySelectorAll('ConnectivityNode')
            .forEach(cNode => {
                const cNodeElement = createGElement(cNode);

                const coordinates = this.calculateConnectivityNodeCoordinates(cNode.getAttribute('pathName')!);
                cNodeElement.setAttribute('x', `${coordinates.x}`)
                cNodeElement.setAttribute('y', `${coordinates.y}`);

                const position = getAbsolutePositionWithoutCoordinatedElement(cNode, {x: coordinates.x, y: coordinates.y});

                // Define a temporary icon
                const cNodeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                cNodeIcon.setAttribute('cx', `${position.x}`);
                cNodeIcon.setAttribute('cy', `${position.y}`);
                cNodeIcon.setAttribute('r', '3');

                cNodeElement.appendChild(cNodeIcon);
    
                this.svg.querySelectorAll(`g[id="${getParentElementName(cNode)}"]`)
                        .forEach(bay => bay.appendChild(cNodeElement))
                });
        });
    }

    drawBusBars() {
        Array.from(this.doc.querySelectorAll('Bay'))
        .filter(bay => isBusBar(bay))
        .forEach(busBar => {
            const busBarElement = createGElement(busBar);

            const coordinates = getCoordinates(busBar);
            busBarElement.setAttribute('x', `${coordinates.x}`)
            busBarElement.setAttribute('y', `${coordinates.y}`);

            // Define a temporary icon
            const busBarIcon = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            busBarIcon.setAttribute('name', getNameAttribute(busBar)!);
            busBarIcon.setAttribute('stroke-width', '6');
            busBarIcon.setAttribute('stroke', 'currentColor');

            // TODO: Need smoother solution, don't want to use SVG_GRID_SIZE here.
            const position = getAbsolutePosition(busBar);
            busBarIcon.setAttribute('x1', `${position.x}`);
            busBarIcon.setAttribute('y1', `${position.y}`);
            busBarIcon.setAttribute('x2', `${this.biggestVoltageLevelXCoordinate * SVG_GRID_SIZE}`);
            busBarIcon.setAttribute('y2', `${position.y}`);

            busBarElement.appendChild(busBarIcon);
            
            this.svg.querySelectorAll(`g[id=${getParentElementName(busBar)}]`)
                .forEach(voltageLevel => voltageLevel.appendChild(busBarElement))
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

    /**
     * Calculate the X and Y coordinate of a Connectivity Node.
     * By using the path name, all connected equipments can be found, and their X and Y coordinates can be used.
     * @param cnPathName The pathName of the Connectivity Node to calculate.
     * @returns Calculated position.
     */
    calculateConnectivityNodeCoordinates(cnPathName: string): Point {
        let nrOfConnections = 0;
        let totalX = 0;
        let totalY = 0;

        Array.from(this.doc.querySelectorAll('ConductingEquipment'))
            .filter(equipment => equipment.querySelector(`Terminal[connectivityNode="${cnPathName}"]`) != null)
            .forEach(equipment => {
                nrOfConnections++;

                const {x, y} = getCoordinates(equipment)

                totalX += x!;
                totalY += y!;
            })

        return {x: Math.round(totalX / nrOfConnections), y: Math.round(totalY / nrOfConnections)};
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

    static styles = css``;
}
