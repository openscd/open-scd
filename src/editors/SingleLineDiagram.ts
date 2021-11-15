import { css, html, LitElement, property, query, TemplateResult } from "lit-element";
import panzoom from "panzoom";
import { getIcon } from "../zeroline/foundation";
import { createGElement, getAbsolutePosition, getParentElementName, getAbsolutePositionWithoutCoordinatedElement, SVG_GRID_SIZE, drawRoute, createTextElement, DEFAULT_ELEMENT_SIZE } from "./singlelinediagram/drawing";
import { getNameAttribute, getSCLCoordinates, isBusBar, calculateConnectivityNodeCoordinates, getConnectedTerminals, getPathNameAttribute } from "./singlelinediagram/foundation";

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

    /**
     * Get all the BusBars from the document.
     */
    get busBars() {
        return Array.from(this.doc.querySelectorAll('Bay'))
        .filter(bay => isBusBar(bay));
    }

    /**
     * Get all the bays from the document.
     */
    get bays() {
        return Array.from(this.doc.querySelectorAll('Bay'))
        .filter(bay => !isBusBar(bay));
    }

    drawVoltageLevels(): void {
        this.doc.querySelectorAll('VoltageLevel').forEach(voltageLevel => {
            const voltageLevelElement = createGElement(voltageLevel);

            // Set the position of the VoltageLevel.
            const {x, y} = getSCLCoordinates(voltageLevel);
            voltageLevelElement.setAttribute('x', `${x}`)
            voltageLevelElement.setAttribute('y', `${y}`)

            // Styling
            voltageLevelElement.setAttribute('fill', 'currentColor');
            
            this.svg.appendChild(voltageLevelElement);
        })
    }

    drawBays(): void {
        this.bays.forEach(bay => {
            const bayElement = createGElement(bay);

            // Set the position of the VoltageLevel.
            const coordinates = getSCLCoordinates(bay);
            bayElement.setAttribute('x', `${coordinates.x}`);
            bayElement.setAttribute('y', `${coordinates.y}`);
            
            this.svg.querySelectorAll(`g[id=${getParentElementName(bay)}]`)
                .forEach(voltageLevel => voltageLevel.appendChild(bayElement))
        })
    }

    drawConductingEquipments(): void {
        Array.from(this.doc.querySelectorAll('ConductingEquipment'))
            .filter(
            child =>
              Array.from(child.querySelectorAll('Terminal')).filter(
                terminal => terminal.getAttribute('cNodeName') !== 'grounded'
              ).length !== 0
            ).forEach(eq => {
                const eqElement = createGElement(eq);

                // Set the position of the Equipment.
                const coordinates = getSCLCoordinates(eq);
                eqElement.setAttribute('x', `${coordinates.x}`)
                eqElement.setAttribute('y', `${coordinates.y}`);

                // Get the correct icon.
                const position = getAbsolutePosition(eq);
                const parsedIcon = new DOMParser().parseFromString(getIcon(eq).strings[0], 'application/xml');

                parsedIcon.querySelectorAll('svg').forEach(svg => {
                    svg.removeAttribute('viewBox');
                    svg.setAttribute('x', position.x + '')
                    svg.setAttribute('y', position.y + '')
                    eqElement.appendChild(svg)
                });
    
                // Add the name.
                eqElement.appendChild(createTextElement(eq, {x: position.x! - 15, y: position.y! + 30}, 'x-small'));
            
                this.svg.querySelectorAll(`g[id="${getParentElementName(eq)}"]`)
                    .forEach(bay => bay.appendChild(eqElement))
            })
    }

    drawConnectivityNodes(): void {
        this.bays.forEach(bay => {
            Array.from(bay.querySelectorAll('ConnectivityNode'))
            .filter(cNode => getConnectedTerminals(cNode).length > 0)
            .forEach(cNode => {
                const cNodeElement = createGElement(cNode);

                const coordinates = calculateConnectivityNodeCoordinates(this.doc, getPathNameAttribute(cNode)!);
                cNodeElement.setAttribute('x', `${coordinates.x}`)
                cNodeElement.setAttribute('y', `${coordinates.y}`);

                const position = getAbsolutePositionWithoutCoordinatedElement(cNode, {x: coordinates.x, y: coordinates.y});
                const parsedIcon = new DOMParser().parseFromString(getIcon(cNode).strings[0], 'application/xml');

                parsedIcon.querySelectorAll('svg').forEach(svg => {
                    svg.removeAttribute('viewBox');
                    svg.setAttribute('x', position.x! + 2 + '')
                    svg.setAttribute('y', position.y! + 2 + '')
                    cNodeElement.appendChild(svg)
                });

                this.svg.querySelectorAll(`g[id="${getParentElementName(cNode)}"]`)
                        .forEach(bay => bay.appendChild(cNodeElement))
                });
        });
    }

    drawBusBars(): void {
        this.busBars.forEach(busBar => {
            const busBarElement = createGElement(busBar);

            const coordinates = getSCLCoordinates(busBar);
            busBarElement.setAttribute('x', `${coordinates.x}`)
            busBarElement.setAttribute('y', `${coordinates.y}`);

            const busBarIcon = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            busBarIcon.setAttribute('name', getNameAttribute(busBar)!);
            busBarIcon.setAttribute('stroke-width', '4');
            busBarIcon.setAttribute('stroke', 'currentColor');

            // Adjust the position.
            const position = getAbsolutePosition(busBar);
            busBarIcon.setAttribute('x1', `${position.x}`);
            busBarIcon.setAttribute('y1', `${position.y}`);
            busBarIcon.setAttribute('x2', `${this.biggestVoltageLevelXCoordinate}`);
            busBarIcon.setAttribute('y2', `${position.y}`);
            busBarElement.appendChild(busBarIcon);

            // Add the name.
            busBarElement.appendChild(createTextElement(busBar, {x: position.x, y: position.y! - 10}, 'small'));
            
            this.svg.querySelectorAll(`g[id=${getParentElementName(busBar)}]`)
                .forEach(voltageLevel => voltageLevel.appendChild(busBarElement))
        });
    }

    drawConnectivityNodeConnections(): void {
        this.bays.forEach(bay => {
            bay.querySelectorAll('ConnectivityNode')
            .forEach(cn => {
                const position = calculateConnectivityNodeCoordinates(this.doc, getPathNameAttribute(cn)!);
                const cnPosition = getAbsolutePositionWithoutCoordinatedElement(cn, {x: position.x, y: position.y});

                Array.from(this.doc.querySelectorAll('ConductingEquipment'))
                    .filter(element => element.querySelector(`Terminal[connectivityNode="${cn.getAttribute('pathName')}"]`))
                    .forEach(element => {
                        const elementPosition = getAbsolutePosition(element);

                        if (elementPosition.y! > cnPosition.y!) {
                            drawRoute(cnPosition, elementPosition, this.svg);
                        } else {
                            drawRoute(elementPosition, cnPosition, this.svg);
                        }
                    });
            });
        });
    }

    drawBusBarConnections() {
        this.busBars.forEach(busBar => {
            const pathName = getPathNameAttribute(busBar.children[0]);
            const busBarPosition = getAbsolutePosition(busBar);

            Array.from(this.doc.querySelectorAll('ConductingEquipment'))
                .filter(eq => eq.querySelector(`Terminal[connectivityNode="${pathName}"]`))
                .forEach(eq => {
                    const eqPosition = getAbsolutePosition(eq);

                    // Height of busbar shape should be 1, because it's smaller.
                    const customShape = {width: DEFAULT_ELEMENT_SIZE, height: 1}

                    // The X coordinate of 
                    if (busBarPosition.y! > eqPosition.y!) {
                        drawRoute(eqPosition, {x: eqPosition.x, y: busBarPosition.y}, this.svg, customShape);
                    } else {
                        drawRoute({x: eqPosition.x, y: busBarPosition.y}, eqPosition, this.svg, customShape);
                    }
                });
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
        Array.from(this.doc.querySelectorAll('Bay')).forEach(bay => biggestXOfBay = Math.max(biggestXOfBay, getSCLCoordinates(bay).x!))

        // Then, get the 'biggest' x available in this particular bay.
        Array.from(this.doc.querySelectorAll('Bay'))
        .filter(bay => getSCLCoordinates(bay).x! == biggestXOfBay)
        .forEach(bay => {
            // Also, an extra SVG_GRID_SIZE is added for making it a bit longer.
            bay.querySelectorAll('ConductingEquipment')
                .forEach(equipment => finalX = Math.max(finalX, getAbsolutePosition(equipment).x! + SVG_GRID_SIZE))
        })

        return finalX;
    }
  
    firstUpdated(): void {
        // panzoom(this.container);
        this.drawSubstationElements();
    }

    render(): TemplateResult {
        // TODO: Width and Height should be a percentage, not fixed height/width.
        return html`<div>
            <div id="panzoom">
                <svg xmlns="http://www.w3.org/2000/svg"
                    id="svg"
                    width="5000"
                    height="5000">
                </svg>
            </div>
        </div>`;
    }

    static styles = css``;
}
