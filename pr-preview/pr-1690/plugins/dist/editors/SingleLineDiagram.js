import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { css, html, LitElement, property, query, state, } from '../../../_snowpack/pkg/lit-element.js';
import panzoom from '../../../_snowpack/pkg/panzoom.js';
import { compareNames, getDescriptionAttribute, getNameAttribute, getPathNameAttribute, identity, newWizardEvent, } from '../../../openscd/src/foundation.js';
import { addLabelToBay, addLabelToBusBar, createBayElement, createBusBarElement, createConductingEquipmentElement, createConnectivityNodeElement, createPowerTransformerElement, createSubstationElement, createTerminalElement, createVoltageLevelElement, drawBusBarRoute, drawCNodeConnections, getAbsolutePosition, getAbsolutePositionBusBar, getAbsolutePositionTerminal, getBusBarLength, getConnectivityNodesDrawingPosition, getDirections, } from './singlelinediagram/sld-drawing.js';
import { getCommonParentElement, getConnectedTerminals, isBusBar, } from './singlelinediagram/foundation.js';
import { isSCLNamespace } from '../../../openscd/src/schemas.js';
import { wizards } from './singlelinediagram/wizards/wizard-library.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../../_snowpack/pkg/@material/mwc-select.js';
import '../../../_snowpack/pkg/@material/mwc-textfield.js';
/*
 * We need a variable outside the plugin to save the selected substation, because the Plugin is created
 * more than once during working with the SLD, for instance when opening a Wizard to edit equipment.
 */
let sldEditorSelectedSubstation;
/*
 * We will also add an Event Listener when a new document is opened. We then want to reset the selection
 * so setting it to undefined will set the selected Substation again on the first in the list.
 */
function onOpenDocResetSelectedSubstation() {
    sldEditorSelectedSubstation = undefined;
}
addEventListener('open-doc', onOpenDocResetSelectedSubstation);
/**
 * Main class plugin for Single Line Diagram editor.
 */
export default class SingleLineDiagramPlugin extends LitElement {
    get substations() {
        return this.doc
            ? Array.from(this.doc.querySelectorAll(':root > Substation')).sort((a, b) => compareNames(a, b))
            : [];
    }
    set selectedSubstation(element) {
        sldEditorSelectedSubstation = element;
    }
    get selectedSubstation() {
        if (sldEditorSelectedSubstation === undefined) {
            const substationList = this.substations;
            if (substationList.length > 0) {
                sldEditorSelectedSubstation = substationList[0];
            }
        }
        return sldEditorSelectedSubstation;
    }
    /**
     * Get all the Power Transformers from an element.
     */
    getPowerTransformers(parentElement) {
        return Array.from(parentElement.querySelectorAll('PowerTransformer')).filter(isSCLNamespace);
    }
    /**
     * Get all the Voltage Levels from the substation.
     */
    getVoltageLevels(substationElement) {
        return Array.from(substationElement.querySelectorAll('VoltageLevel')).filter(isSCLNamespace);
    }
    /**
     * Get all the BusBars from the voltage level.
     */
    getBusBars(voltageLevelElement) {
        return Array.from(voltageLevelElement.querySelectorAll('Bay'))
            .filter(isSCLNamespace)
            .filter(bay => isBusBar(bay));
    }
    /**
     * Get all the bays from the voltage level.
     */
    getBays(voltageLevelElement) {
        return Array.from(voltageLevelElement.querySelectorAll('Bay'))
            .filter(isSCLNamespace)
            .filter(bay => !isBusBar(bay));
    }
    /**
     * Get all the Conducting Equipment from a Bay.
     * @param bayElement - The Bay to search in.
     */
    getConductingEquipments(bayElement) {
        return Array.from(bayElement.querySelectorAll('ConductingEquipment')).filter(isSCLNamespace);
    }
    /**
     * Get all the Connectivity Nodes from a Bay/Busbar.
     * @param bayElement - The Bay/Busbar to search in.
     */
    getConnectivityNode(bayElement) {
        return Array.from(bayElement.querySelectorAll('ConnectivityNode'))
            .filter(isSCLNamespace)
            .filter(cNode => cNode.getAttribute('name') !== 'grounded');
    }
    /**
     * Search for Equipment (ConductionEquipment or PowerTransformer) which has a terminal wth a connectivityNode
     * tha is the same as the passed pathName.
     * @param parentElement - The Element to search in for Equipment.
     * @param pathName      - The PathName to search for in the Terminal.
     */
    findEquipment(parentElement, pathName) {
        return Array.from(parentElement.querySelectorAll('ConductingEquipment, PowerTransformer'))
            .filter(isSCLNamespace)
            .filter(element => element.querySelector(`Terminal[connectivityNode="${pathName}"]`));
    }
    /**
     * Draw all equipment and connections of the selected Substation.
     */
    drawSubstation(substation) {
        const substationGroup = createSubstationElement(substation);
        this.svg.appendChild(substationGroup);
        this.drawPowerTransformers(substation, substationGroup);
        this.drawVoltageLevels(substation, substationGroup);
    }
    /**
     * Draw all available `PowerTransformer`s of passed parent element.
     * Should only be a <g> element.
     * @param parentElement - The parent element to search for PowerTransformers.
     * @param parentGroup   - The SVG Group to which to add the PowerTransformer.
     */
    drawPowerTransformers(parentElement, parentGroup) {
        this.getPowerTransformers(parentElement).forEach(powerTransformerElement => this.drawPowerTransformer(parentGroup, powerTransformerElement));
    }
    /**
     * Draw an SVG from the passed PowerTransformer Element.
     * Should only be a <g> element.
     * @param parentGroup             - The SVG Group to which to add the PowerTransformer.
     * @param powerTransformerElement - The PowerTransformer to draw.
     */
    drawPowerTransformer(parentGroup, powerTransformerElement) {
        const powerTransformerGroup = createPowerTransformerElement(powerTransformerElement, (event) => this.openEditWizard(event, powerTransformerElement));
        parentGroup.appendChild(powerTransformerGroup);
    }
    /**
     * Draw all available Voltage Levels of the passed Substation Element.
     * Should only be a <g> element.
     *  @param substationElement - The substation containing the voltage levels.
     *  @param substationGroup   - The group to which to add the SVGs.
     */
    drawVoltageLevels(substationElement, substationGroup) {
        // First draw all the devices on the SVG for all voltage levels.
        this.getVoltageLevels(substationElement).forEach(voltageLevelElement => {
            const voltageLevelGroup = createVoltageLevelElement(voltageLevelElement);
            substationGroup.appendChild(voltageLevelGroup);
            this.drawPowerTransformers(voltageLevelElement, voltageLevelGroup);
            this.drawBays(voltageLevelElement, voltageLevelGroup);
            this.drawBusBars(voltageLevelElement, voltageLevelGroup);
        });
        // After all devices are drawn we can draw the connections between the devices.
        // And also add the label on the correct place, we now know where the boundaries are.
        this.getVoltageLevels(substationElement).forEach(voltageLevelElement => {
            this.getBusBars(voltageLevelElement).forEach(busbarElement => {
                this.drawBusBarConnections(substationElement, this.svg, busbarElement);
                addLabelToBusBar(this.svg, busbarElement, (event) => this.openEditWizard(event, busbarElement));
            });
            this.getBays(voltageLevelElement).forEach(bayElement => {
                this.drawBayConnections(substationElement, this.svg, bayElement);
                addLabelToBay(this.svg, bayElement, (event) => this.openEditWizard(event, bayElement));
            });
        });
    }
    /**
     * Draw all available Bays of the passed Voltage Level Element.
     * Should only be a <g> element.
     * @param voltageLevelElement - The Voltage Level containing the bays.
     * @param voltageLevelGroup   - The group to which to add the SVGs.
     * */
    drawBays(voltageLevelElement, voltageLevelGroup) {
        this.getBays(voltageLevelElement).forEach(bayElement => {
            const bayGroup = createBayElement(bayElement);
            voltageLevelGroup.appendChild(bayGroup);
            this.drawPowerTransformers(bayElement, bayGroup);
            this.drawConductingEquipments(bayElement, bayGroup);
            this.drawConnectivityNodes(bayElement, bayGroup);
        });
    }
    /**
     * Draw all available Conducting Equipments of the passed Bay Element.
     * Should only be a <g> element.
     * @param bayElement - The Bay containing the Conducting Equipment.
     * @param bayGroup   - The group to which to add the SVGs.
     */
    drawConductingEquipments(bayElement, bayGroup) {
        this.getConductingEquipments(bayElement)
            .filter(conductingEquipmentElement => Array.from(conductingEquipmentElement.querySelectorAll('Terminal')).filter(terminal => terminal.getAttribute('cNodeName') !== 'grounded').length !== 0)
            .forEach(conductingEquipmentElement => {
            const conductingEquipmentGroup = createConductingEquipmentElement(conductingEquipmentElement, (event) => this.openEditWizard(event, conductingEquipmentElement));
            bayGroup.appendChild(conductingEquipmentGroup);
        });
    }
    /**
     * Draw all available Connectivity Nodes of the passed Bay Element.
     * @param bayElement - The Bay containing the Connectivity Nodes.
     * @param bayGroup   - The group to which to add the SVGs.
     * */
    drawConnectivityNodes(bayElement, bayGroup) {
        this.getConnectivityNode(bayElement)
            .filter(cNode => getConnectedTerminals(cNode).length > 0)
            .forEach(cNode => {
            const cNodegroup = createConnectivityNodeElement(cNode, (event) => this.openEditWizard(event, cNode));
            bayGroup.appendChild(cNodegroup);
        });
    }
    /**
     * Draw all connections between the different Equipment in the Bay and the Bay has with other Equipment outside
     * the bay.
     * @param rootElement - The Element containing all the other elements to which the Bay is connected.
     * @param rootGroup   - The SVG Element that contains all groups from the elements to add path to.
     * @param bayElement  - The Bay that holds the Connectivity Node to connect with.
     */
    drawBayConnections(rootElement, rootGroup, bayElement) {
        this.getConnectivityNode(bayElement).forEach(cNode => {
            this.findEquipment(rootElement, getPathNameAttribute(cNode)).forEach(equipmentElement => {
                const commonParentElement = getCommonParentElement(cNode, equipmentElement, bayElement);
                const sides = getDirections(equipmentElement, cNode);
                const elementsTerminalPosition = getAbsolutePositionTerminal(equipmentElement, sides.startDirection);
                const cNodePosition = getConnectivityNodesDrawingPosition(cNode, sides.endDirection);
                rootGroup
                    .querySelectorAll(`g[id="${identity(commonParentElement)}"]`)
                    .forEach(eq => drawCNodeConnections(cNodePosition, elementsTerminalPosition, eq));
                const terminalElement = equipmentElement.querySelector(`Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`);
                const terminal = createTerminalElement(terminalElement, sides.startDirection, (event) => this.openEditWizard(event, terminalElement));
                rootGroup
                    .querySelectorAll(`g[id="${identity(equipmentElement)}"]`)
                    .forEach(eq => eq.appendChild(terminal));
            });
        });
    }
    /**
     * Draw all available Busbars of the passed Voltage Level Element.
     * @param voltageLevelElement - The Voltage Level containing the Busbars.
     * @param voltageLevelGroup   - The group to which to add the SVGs.
     */
    drawBusBars(voltageLevelElement, voltageLevelGroup) {
        this.getBusBars(voltageLevelElement).forEach(busbarElement => {
            const busbarGroup = createBusBarElement(busbarElement, getBusBarLength(voltageLevelElement));
            voltageLevelGroup.appendChild(busbarGroup);
        });
    }
    /**
     * Draw all the connections a Busbar has with other Equipment.
     * @param rootElement   - The Element containing all the other elements to which the Busbar is connected.
     * @param rootGroup     - The SVG Element that contains all groups from the elements to add path to.
     * @param busbarElement - The Busbar that holds the Connectivity Node to connect with.
     */
    drawBusBarConnections(rootElement, rootGroup, busbarElement) {
        const pathName = getPathNameAttribute(busbarElement.children[0]);
        const busbarPosition = getAbsolutePositionBusBar(busbarElement);
        this.findEquipment(rootElement, pathName).forEach(element => {
            const parentElement = element.parentElement;
            const elementPosition = getAbsolutePosition(element);
            const elementsTerminalSide = busbarPosition.y < elementPosition.y ? 'top' : 'bottom';
            const elementsTerminalPosition = getAbsolutePositionTerminal(element, elementsTerminalSide);
            const busbarTerminalPosition = {
                x: elementsTerminalPosition.x,
                y: busbarPosition.y,
            };
            const terminalElement = element.querySelector(`Terminal[connectivityNode="${pathName}"]`);
            rootGroup
                .querySelectorAll(`g[id="${identity(parentElement)}"]`)
                .forEach(eq => drawBusBarRoute(busbarTerminalPosition, elementsTerminalPosition, eq));
            const terminal = createTerminalElement(terminalElement, elementsTerminalSide, (event) => this.openEditWizard(event, terminalElement));
            rootGroup
                .querySelectorAll(`g[id="${identity(element)}"]`)
                .forEach(eq => eq.appendChild(terminal));
        });
    }
    /**
     * Remove all the child elements (and descendants) from the SVG Element, to have a clean start.
     */
    clearSVG() {
        while (this.svg.firstChild) {
            this.svg.removeChild(this.svg.lastChild);
        }
    }
    /**
     * Draw all the elements of the selected Substation.
     */
    drawSVGElements() {
        // First clean the existing drawing, because the selected substation may have changed.
        this.clearSVG();
        // Only draw the diagram if there is a substation selected.
        const selectedSubstationElement = this.selectedSubstation;
        if (selectedSubstationElement) {
            this.drawSubstation(selectedSubstationElement);
            // Set the new size of the SVG.
            const bbox = this.svg.getBBox();
            this.svg.setAttribute('viewBox', bbox.x -
                10 +
                ' ' +
                (bbox.y - 10) +
                ' ' +
                (bbox.width + 20) +
                ' ' +
                (bbox.height + 20));
            this.svg.setAttribute('width', bbox.width + 20 + 'px');
            this.svg.setAttribute('height', bbox.height + 20 + 'px');
            panzoom(this.panzoomContainer, {
                zoomSpeed: 0.2,
                maxZoom: 1.5,
                minZoom: 0.2,
                initialZoom: 0.5,
            });
        }
    }
    /**
     * Open an Edit wizard for an element.
     * @param element - The element to show the wizard for.
     */
    openEditWizard(event, element) {
        const wizard = wizards[element.tagName].edit(element);
        if (wizard) {
            this.dispatchEvent(newWizardEvent(wizard));
            event.stopPropagation();
        }
    }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        // When the document is updated, we also will retrieve the history again, because probably it has changed.
        if (_changedProperties.has('doc') ||
            _changedProperties.has('selectedSubstation')) {
            this.drawSVGElements();
        }
    }
    onSelect(event) {
        // Set the selected Substation.
        this.selectedSubstation = this.substations[event.detail.index];
        this.requestUpdate('selectedSubstation');
    }
    renderSubstationSelector() {
        const substationList = this.substations;
        if (substationList.length > 0) {
            if (substationList.length > 1) {
                return html `
          <mwc-select
            id="substationSelector"
            label="${get('sld.substationSelector')}"
            @selected=${this.onSelect}
          >
            ${substationList.map(substation => {
                    const name = getNameAttribute(substation);
                    const description = getDescriptionAttribute(substation);
                    return html ` <mwc-list-item
                value="${name}"
                ?selected=${substation == this.selectedSubstation}
              >
                ${name}${description !== undefined
                        ? ' (' + description + ')'
                        : ''}
              </mwc-list-item>`;
                })}
          </mwc-select>
        `;
            }
            const selectedSubstationElement = this.selectedSubstation;
            const name = getNameAttribute(selectedSubstationElement);
            const description = getDescriptionAttribute(selectedSubstationElement);
            return html `
        <mwc-textfield
          label="${get('substation.name')}"
          value="${name}${description !== undefined
                ? ' (' + description + ')'
                : ''}"
          id="selectedSubstation"
          readonly
          disabled
        >
        </mwc-textfield>
      `;
        }
        return html `
      <h1>
        <span id="noSubstationSelector">${get('substation.missing')}</span>
      </h1>
    `;
    }
    render() {
        // TODO: Width and Height should be a percentage, not fixed height/width.
        return html ` ${this.renderSubstationSelector()}

      <div class="sldContainer">
        <div id="panzoom">
          <svg xmlns="http://www.w3.org/2000/svg" id="svg"></svg>
        </div>
      </div>`;
    }
}
SingleLineDiagramPlugin.styles = css `
    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
    }

    #substationSelector,
    #selectedSubstation {
      width: 35vw;
      margin: 0.67em 0 0 0.67em;
    }

    #noSubstationSelector {
      color: var(--base1);
    }

    .sldContainer {
      overflow: hidden;
    }

    g {
      pointer-events: bounding-box;
    }

    g[type='Bay'] > g[type='BayLabel'] {
      visibility: hidden;
    }
    g[type='Bay']:hover > g[type='BayLabel'] {
      visibility: visible;
    }

    g[type='Busbar'] > g[type='BusbarLabel'] {
      visibility: hidden;
    }
    g[type='Busbar'] > g[type='BusbarLabel'] > text,
    g[type='Busbar']:hover > g[type='BusbarLabel'] {
      visibility: visible;
    }

    g[type='Bay']:hover,
    g[type='Busbar']:hover,
    g[type='ConductingEquipment']:hover,
    g[type='ConnectivityNode']:hover,
    g[type='PowerTransformer']:hover,
    g[type='Terminal']:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }
  `;
__decorate([
    property({ attribute: false })
], SingleLineDiagramPlugin.prototype, "doc", void 0);
__decorate([
    query('#panzoom')
], SingleLineDiagramPlugin.prototype, "panzoomContainer", void 0);
__decorate([
    query('#svg')
], SingleLineDiagramPlugin.prototype, "svg", void 0);
__decorate([
    state()
], SingleLineDiagramPlugin.prototype, "selectedSubstation", null);
//# sourceMappingURL=SingleLineDiagram.js.map