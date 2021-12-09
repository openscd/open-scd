import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import panzoom from 'panzoom';

import { identity, newWizardEvent, SCLTag } from '../foundation.js';
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
} from './singlelinediagram/foundation.js';
import { wizards } from '../wizards/wizard-library.js';

/**
 * Main class plugin for Single Line Diagram editor.
 */
export default class SingleLineDiagramPlugin extends LitElement {
  // The full given XML document.
  @property({ attribute: false })
  doc!: XMLDocument;

  /**
   * Get all the BusBars from the document.
   */
  private get busBars(): Element[] {
    return Array.from(this.doc.querySelectorAll('Bay')).filter(bay =>
      isBusBar(bay)
    );
  }

  /**
   * Get all the bays from the document.
   */
  private get bays(): Element[] {
    return Array.from(this.doc.querySelectorAll('Bay')).filter(
      bay => !isBusBar(bay)
    );
  }

  /**
   * Get all the VoltageLevels from the SCL document.
   */
  private get voltageLevels(): Element[] {
    return Array.from(this.doc.querySelectorAll('VoltageLevel'));
  }

  // Container for giving the panzoom to.
  @query('#panzoom') panzoomContainer!: HTMLElement;
  // The main canvas to draw everything on.
  @query('#svg') svg!: HTMLElement;

  /**
   * Add an element to a specific <g> element.
   * @param elementToAdd - The element to add.
   * @param groupName - Identity sting if the element
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
  private drawConductingEquipments(): void {
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
  private drawConnectivityNodes(): void {
    this.bays.forEach(bay => {
      Array.from(bay.querySelectorAll('ConnectivityNode'))
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
        getBusBarLength(busBar.parentElement ?? this.doc)
      );

      this.addElementToGroup(busBarElement, identity(busBar.parentElement));
    });
  }

  private drawConnectivityNodeConnections(): void {
    this.bays.forEach(bay => {
      Array.from(bay.querySelectorAll('ConnectivityNode'))
        .filter(cNode => cNode.getAttribute('name') !== 'grounded')
        .forEach(cNode => {
          Array.from(
            this.doc.querySelectorAll('ConductingEquipment, PowerTransformer')
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

      Array.from(this.doc.querySelectorAll('ConductingEquipment'))
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

    g[type='ConnectivityNode']:hover,
    g[type='Terminal']:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }
  `;
}
