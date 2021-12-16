import {
  css,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';

import panzoom from 'panzoom';

import {
  compareNames,
  identity,
  newWizardEvent,
  SCLTag
} from '../foundation.js';
import {
  getAbsolutePosition,
  createTerminalElement,
  createBusBarElement,
  createVoltageLevelElement,
  createBayElement,
  createConductingEquipmentElement,
  createConnectivityNodeElement,
  getBusBarLength,
  createPowerTransformerElement,
  getAbsolutePositionBusBar,
  drawBusBarRoute,
  getDirections,
  getAbsolutePositionTerminal,
  drawCNodeConnections,
  getConnectivityNodesDrawingPosition,
} from './singlelinediagram/sld-drawing.js';
import {
  isBusBar,
  getConnectedTerminals,
  getPathNameAttribute,
  getNameAttribute,
  getDescriptionAttribute,
} from './singlelinediagram/foundation.js';
import {isSCLNamespace} from "../schemas.js";
import { wizards } from '../wizards/wizard-library.js';
import {SingleSelectedEvent} from "@material/mwc-list/mwc-list-foundation";
import {translate} from "lit-translate";

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-textfield';

/**
 * Main class plugin for Single Line Diagram editor.
 */
export default class SingleLineDiagramPlugin extends LitElement {
  // The full given XML document.
  @property({ attribute: false })
  doc!: XMLDocument;

  @state()
  selectedSubstation: Element | undefined;

  private get substations() : Element[] {
    return Array.from(this.doc.querySelectorAll(':root > Substation'))
      .filter(isSCLNamespace)
      .sort((a,b) => compareNames(a,b));
  }

  /**
   * Get all the BusBars from the document.
   */
  private get busBars(): Element[] {
    return Array.from(this.selectedSubstation!.querySelectorAll('Bay'))
      .filter(isSCLNamespace)
      .filter(bay => isBusBar(bay));
  }

  /**
   * Get all the bays from the document.
   */
  private get bays(): Element[] {
    return Array.from(this.selectedSubstation!.querySelectorAll('Bay'))
      .filter(isSCLNamespace)
      .filter(bay => !isBusBar(bay));
  }

  /**
   * Get all the VoltageLevels from the SCL document.
   */
  private get voltageLevels(): Element[] {
    return Array.from(this.selectedSubstation!.querySelectorAll('VoltageLevel'))
      .filter(isSCLNamespace);
  }

  // Container for giving the panzoom to.
  @query('#panzoom') panzoomContainer!: HTMLElement;
  // The main canvas to draw everything on.
  @query('#svg') svg!: HTMLElement;

  /**
   * Add an element to a specific <g> element.
   * @param elementToAdd - The element to add.
   * @param identity - Identity string if the element
   */
  private addElementToGroup(
    elementToAdd: Element,
    identity: string | number
  ): void {
    this.svg
      .querySelectorAll(`g[id="${identity}"]`)
      .forEach(group => group.appendChild(elementToAdd));
  }

  /**
   * Draw all available Voltage Levels of this SCL document.
   * Should only be a <g> element.
   */
  private drawVoltageLevels(): void {
    this.voltageLevels.forEach(voltageLevel => {
      const voltageLevelElement = createVoltageLevelElement(voltageLevel);
      this.svg.appendChild(voltageLevelElement);
    });
  }

  /**
   * Draw all available Bays of this SCL document.
   * Should only be a <g> element.
   */
  private drawBays(): void {
    this.bays.forEach(bay => {
      const bayElement = createBayElement(bay);

      this.addElementToGroup(bayElement, identity(bay.parentElement));
    });
  }

  /**
   * Draw all available `PowerTransformer`s of this SCL document.
   * Should only be a <g> element.
   */
  private drawPowerTransformers(): void {
    Array.from(this.selectedSubstation!.querySelectorAll('PowerTransformer'))
      .filter(isSCLNamespace)
      .forEach(powerTransformer => {
        const powerTransformerElement = createPowerTransformerElement(powerTransformer);

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
  private drawConductingEquipments(): void {
    Array.from(this.selectedSubstation!.querySelectorAll('ConductingEquipment'))
      .filter(isSCLNamespace)
      .filter(
        child =>
          Array.from(child.querySelectorAll('Terminal')).filter(
            terminal => terminal.getAttribute('cNodeName') !== 'grounded'
          ).length !== 0
      )
      .forEach(equipment => {
        const eqElement = createConductingEquipmentElement(equipment, () =>
          this.openEditWizard(equipment!)
        );

        this.addElementToGroup(eqElement, identity(equipment.parentElement));
      });
  }

  /**
   * Draw all available Connectivity Nodes of this SCL document.
   */
  private drawConnectivityNodes(): void {
    this.bays.forEach(bay => {
      Array.from(bay.querySelectorAll('ConnectivityNode'))
        .filter(isSCLNamespace)
        .filter(cNode => cNode.getAttribute('name') !== 'grounded')
        .filter(cNode => getConnectedTerminals(cNode).length > 0)
        .forEach(cNode => {
          const cNodeElement = createConnectivityNodeElement(cNode, () =>
            this.openEditWizard(cNode)
          );

          this.addElementToGroup(cNodeElement, identity(cNode.parentElement));
        });
    });
  }

  /**
   * Draw all available Bus Bars of this SCL document.
   */
  private drawBusBars(): void {
    this.busBars.forEach(busBar => {
      const busBarElement = createBusBarElement(
        busBar,
        getBusBarLength(busBar.parentElement ?? this.selectedSubstation!)
      );

      this.addElementToGroup(busBarElement, identity(busBar.parentElement));
    });
  }

  private drawConnectivityNodeConnections(): void {
    this.bays.forEach(bay => {
      Array.from(bay.querySelectorAll('ConnectivityNode'))
        .filter(isSCLNamespace)
        .filter(cNode => cNode.getAttribute('name') !== 'grounded')
        .forEach(cNode => {
          Array.from(
            this.selectedSubstation!.querySelectorAll('ConductingEquipment, PowerTransformer')
          )
            .filter(element =>
              element.querySelector(
                `Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`
              )
            )
            .forEach(element => {
              const sides = getDirections(element, cNode);

              const elementsTerminalPosition = getAbsolutePositionTerminal(
                element,
                sides.startDirection
              );

              const cNodePosition = getConnectivityNodesDrawingPosition(
                cNode,
                sides.endDirection
              );

              drawCNodeConnections(
                cNodePosition,
                elementsTerminalPosition,
                this.svg
              );

              const terminalElement = element.querySelector(
                `Terminal[connectivityNode="${cNode.getAttribute('pathName')}"]`
              );

              const terminal = createTerminalElement(
                terminalElement!,
                sides.startDirection,
                () => this.openEditWizard(terminalElement!)
              );

              this.svg
                .querySelectorAll(`g[id="${identity(element)}"]`)
                .forEach(eq => eq.appendChild(terminal));
            });
        });
    });
  }

  private drawBusBarConnections(): void {
    this.busBars.forEach(busBar => {
      const pathName = getPathNameAttribute(busBar.children[0]);
      const busBarPosition = getAbsolutePositionBusBar(busBar);

      Array.from(this.selectedSubstation!.querySelectorAll('ConductingEquipment'))
        .filter(isSCLNamespace)
        .filter(cEquipment =>
          cEquipment.querySelector(`Terminal[connectivityNode="${pathName}"]`)
        )
        .forEach(element => {
          const elementPosition = getAbsolutePosition(element);

          const elementsTerminalSide =
            busBarPosition.y < elementPosition.y ? 'top' : 'bottom';

          const elementsTerminalPosition = getAbsolutePositionTerminal(
            element,
            elementsTerminalSide
          );

          const busbarTerminalPosition = {
            x: elementsTerminalPosition.x,
            y: busBarPosition.y,
          };

          const terminalElement = element.querySelector(
            `Terminal[connectivityNode="${pathName}"]`
          );

          drawBusBarRoute(
            busbarTerminalPosition,
            elementsTerminalPosition,
            this.svg
          );

          const terminal = createTerminalElement(
            terminalElement!,
            elementsTerminalSide,
            () => this.openEditWizard(terminalElement!)
          );

          this.svg
            .querySelectorAll(` g[id="${identity(element)}"]`)
            .forEach(eq => eq.appendChild(terminal));
        });
    });
  }

  /**
   * Remove all the child elements (and descendants) from the SVG Element, to have a clean start.
   */
  private removeChildren(): void {
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.lastChild!);
    }
  }

  /**
   * Draw all the elements of the selected Substation.
   */
  drawSubstationElements(): void {
    // First clean the existing drawing, because the selected substation may have changed.
    this.removeChildren();

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
   * Open an Edit wizard for an element.
   * @param element - The element to show the wizard for.
   */
  openEditWizard(element: Element): void {
    const wizard = wizards[<SCLTag>element.tagName].edit(element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  firstUpdated(): void {
    panzoom(this.panzoomContainer);
    this.drawSubstationElements();
  }

  onSelect(event: SingleSelectedEvent): void {
    // Set the selected Substation.
    this.selectedSubstation = this.substations[event.detail.index];
    this.drawSubstationElements();
  }

  private renderSubstationSelector(): TemplateResult {
    const substationList = this.substations;
    if (substationList.length > 0) {
      if (this.selectedSubstation === undefined) {
        this.selectedSubstation = this.substations[0];
      }

      if (substationList.length > 1) {
        const selectedSubstationName = getNameAttribute(this.selectedSubstation);
        return html `
          <mwc-select id="substationSelector"
                      label="${translate("sld.substationSelector")}"
                      @selected=${this.onSelect}>
            ${this.substations.map(
              substation => {
                const name = getNameAttribute(substation);
                const description = getDescriptionAttribute(substation);
                return html`
                  <mwc-list-item value="${name}"
                                 ?selected=${name === selectedSubstationName}>
                    ${name}${description !== undefined ? ' (' + description + ')' : ''}
                  </mwc-list-item>`
              })}
          </mwc-select>
        `;
      }

      const name = getNameAttribute(this.selectedSubstation);
      const description = getDescriptionAttribute(this.selectedSubstation);
      return html `
        <mwc-textfield label="${translate('substation.name')}"
                       value="${name}${description !== undefined ? ' (' + description + ')' : ''}"
                       id="selectedSubstation"
                       readonly
                       disabled>
        </mwc-textfield>
      `;
    }
    return html `
      <h1>
        <span id="noSubstationSelector">${translate('substation.missing')}</span>
      </h1>
    `
  }

  render(): TemplateResult {
    // TODO: Width and Height should be a percentage, not fixed height/width.
    return html `
      ${this.renderSubstationSelector()}

      <div class="sldContainer">
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
      transition: background-color 150ms linear;
    }

    #substationSelector {
      width: 30vw;
    }

    #noSubstationSelector {
      color: var(--base1)
    }

    .sldContainer {
      overflow: hidden;
    }

    g {
      pointer-events: bounding-box;
    }

    g[type='ConnectivityNode']:hover,
    g[type='Terminal']:hover,
    g[type='ConductingEquipment']:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }
  `;
}
