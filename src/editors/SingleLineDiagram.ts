import { css, html, LitElement, property, query, TemplateResult } from "lit-element";
import panzoom from "panzoom";
import { Side } from "../../public/js/ortho-connector";
import { getAbsolutePosition, getParentElementName, getAbsolutePositionWithCustomCoordinates, SVG_GRID_SIZE, drawRoute, DEFAULT_ELEMENT_SIZE, createTerminalElement, createBusBarElement, createVoltageLevelElement, createBayElement, createConductingEquipmentElement, createConnectivityNodeElement } from "./singlelinediagram/sld-drawing";
import { getNameAttribute, getSCLCoordinates, isBusBar, calculateConnectivityNodeSclCoordinates, getConnectedTerminals, getPathNameAttribute } from "./singlelinediagram/foundation";

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

    /**
     * Get all the VoltageLevels from the SCL document.
     */
    get voltageLevels() {
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
        })
    }

    /**
     * Draw all available Bays of this SCL document.
     * Should only be a <g> element.
     */
    drawBays(): void {
        this.bays.forEach(bay => {
            const bayElement = createBayElement(bay);
            this.svg.querySelectorAll(`g[id=${getParentElementName(bay)}]`)
                .forEach(voltageLevel => voltageLevel.appendChild(bayElement))
        })
    }

    /**
     * Draw all available Conducting Equipments of this SCL document.
     * Should only be a <g> element.
     */
    drawConductingEquipments(): void {
        Array.from(this.doc.querySelectorAll('ConductingEquipment'))
            .filter(child =>
                Array.from(child.querySelectorAll('Terminal')).filter(
                    terminal => terminal.getAttribute('cNodeName') !== 'grounded'
                ).length !== 0
            ).forEach(equipment => {
                const eqElement = createConductingEquipmentElement(equipment);

                this.svg.querySelectorAll(`g[id="${getParentElementName(equipment)}"]`)
                    .forEach(bay => bay.appendChild(eqElement))
            })
    }

    /**
     * Draw all available Connectivity Nodes of this SCL document.
     */
    drawConnectivityNodes(): void {
        this.bays.forEach(bay => {
            Array.from(bay.querySelectorAll('ConnectivityNode'))
                .filter(cNode => getConnectedTerminals(cNode).length > 0)
                .forEach(cNode => {
                    const cNodePosition = calculateConnectivityNodeSclCoordinates(cNode);
                    const cNodeElement = createConnectivityNodeElement(cNode, cNodePosition);

                    this.svg.querySelectorAll(`g[id="${getParentElementName(cNode)}"]`)
                        .forEach(bay => bay.appendChild(cNodeElement))
                });
        });
    }

    /**
     * Draw all available Bus Bars of this SCL document.
     */
    drawBusBars(): void {
        this.busBars.forEach(busBar => {
            const busBarElement = createBusBarElement(busBar, this.biggestVoltageLevelXCoordinate);

            this.svg.querySelectorAll(`g[id=${getParentElementName(busBar)}]`)
                .forEach(voltageLevel => voltageLevel.appendChild(busBarElement))
        });
    }

    drawConnectivityNodeConnections(): void {
        this.bays.forEach(bay => {
            bay.querySelectorAll('ConnectivityNode')
                .forEach(cNode => {
                    const position = calculateConnectivityNodeSclCoordinates(cNode);
                    const cnPosition = getAbsolutePositionWithCustomCoordinates(cNode, position);

                    Array.from(this.doc.querySelectorAll('ConductingEquipment'))
                        .filter(element => element.querySelector(`Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`))
                        .forEach(element => {
                            const elementPosition = getAbsolutePosition(element);
                            const terminalElement = element.querySelector(`Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`);

                            let sideToDrawTerminalOn: Side;

                            if (elementPosition.y! > cnPosition.y!) {
                                const sidesOfRoutes = drawRoute(cnPosition, elementPosition, this.svg);
                                sideToDrawTerminalOn = sidesOfRoutes.pointBSide;
                            } else {
                                const sidesOfRoutes = drawRoute(elementPosition, cnPosition, this.svg);
                                sideToDrawTerminalOn = sidesOfRoutes.pointASide;
                            }

                            const terminal = createTerminalElement(elementPosition, sideToDrawTerminalOn, terminalElement!);
                            this.svg.querySelectorAll(`g[id="${getNameAttribute(bay)}"] > g[id="${getNameAttribute(element)}"]`)
                                .forEach(eq => eq.appendChild(terminal))
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
                    const terminalElement = eq.querySelector(`Terminal[connectivityNode="${pathName}"]`);

                    let sideToDrawTerminalOn: Side;

                    // Height of busbar shape should be 1, because it's smaller.
                    const customShape = { width: DEFAULT_ELEMENT_SIZE, height: 1 }

                    // The X coordinate of 
                    if (busBarPosition.y! > eqPosition.y!) {
                        const sidesOfRoutes = drawRoute(eqPosition, { x: eqPosition.x, y: busBarPosition.y }, this.svg, customShape);
                        sideToDrawTerminalOn = sidesOfRoutes.pointASide;
                    } else {
                        const sidesOfRoutes = drawRoute({ x: eqPosition.x, y: busBarPosition.y }, eqPosition, this.svg, customShape);
                        sideToDrawTerminalOn = sidesOfRoutes.pointBSide;
                    }

                    const terminal = createTerminalElement(eqPosition, sideToDrawTerminalOn, terminalElement!);
                    this.svg.querySelectorAll(`g[id="${getNameAttribute(eq.parentElement!)}"] > g[id="${getNameAttribute(eq)}"]`)
                        .forEach(eq => eq.appendChild(terminal))
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
