import { LitElement, html, TemplateResult, property, query } from 'lit-element';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-fab';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import { Dialog } from '@material/mwc-dialog';
import { TextField } from '@material/mwc-textfield';
import { Menu } from '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';

interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

declare interface TransformOrigin {
  x: number;
  y: number;
}

declare interface Transform {
  x: number;
  y: number;
  scale: number;
}

declare interface PanZoomController {
  getOwner: () => Element;
  applyTransform: (transform: Transform) => void;
}

declare interface PanZoomOptions {
  filterKey?: () => boolean;
  bounds?: boolean | Bounds;
  realPinch?: boolean;
  maxZoom?: number;
  minZoom?: number;
  boundsPadding?: number;
  zoomDoubleClickSpeed?: number;
  zoomSpeed?: number;
  pinchSpeed?: number;
  beforeWheel?: (e: WheelEvent) => void;
  beforeMouseDown?: (e: MouseEvent) => void;
  autocenter?: boolean;
  onTouch?: (e: TouchEvent) => void;
  onDoubleClick?: (e: Event) => void;
  smoothScroll?: boolean;
  controller?: PanZoomController;
  enableTextSelection?: boolean;
  disableKeyboardInteraction?: boolean;
  transformOrigin?: TransformOrigin;
}

declare interface PanZoom {
  dispose: () => void;
  moveBy: (dx: number, dy: number, smooth: boolean) => void;
  moveTo: (x: number, y: number) => void;
  centerOn: (ui: any) => void;
  zoomTo: (clientX: number, clientY: number, scaleMultiplier: number) => void;
  zoomAbs: (clientX: number, clientY: number, zoomLevel: number) => void;
  smoothZoom: (
    clientX: number,
    clientY: number,
    scaleMultiplier: number
  ) => void;
  smoothZoomAbs: (
    clientX: number,
    clientY: number,
    toScaleValue: number
  ) => void;
  getTransform: () => Transform;
  showRectangle: (rect: ClientRect) => void;
  pause: () => void;
  resume: () => void;
  isPaused: () => boolean;
  on: <T>(eventName: string, handler: (e: T) => void) => void;
  off: <T>(eventName: string, handler: (e: T) => void) => void;
  fire: (eventName: string) => void;
  getMinZoom: () => number;
  setMinZoom: (newMinZoom: number) => number;
  getMaxZoom: () => number;
  setMaxZoom: (newMaxZoom: number) => number;
  getTransformOrigin: () => TransformOrigin;
  setTransformOrigin: (newTransformOrigin: TransformOrigin) => void;
  getZoomSpeed: () => number;
  setZoomSpeed: (zoomSpeed: number) => void;
}

declare function panzoom(
  domElement: HTMLElement | SVGElement,
  options?: PanZoomOptions
): PanZoom;

import '../mwc-textfield-nullable.js';
import { TextFieldNullable } from '../mwc-textfield-nullable.js';
import { newActionEvent, Action } from '../foundation.js';
import { styles } from './substation/substation-css.js';

export default class SubstationEditor extends LitElement {
  defaultNomFreq = 50;
  defaultNumPhases = 3;
  defaultVoltage = 110;

  @property()
  doc!: XMLDocument;
  @property()
  get element(): Element | null {
    return this.doc?.querySelector('Substation') ?? null;
  }
  @property()
  get parent(): Element {
    return this.doc.documentElement; // <SCL>
  }

  @property({ type: String })
  get name(): string {
    return this.element?.getAttribute('name') ?? '';
  }
  @property({ type: String })
  get desc(): string | null {
    return this.element?.getAttribute('desc') ?? null;
  }

  @query('mwc-dialog#edit-substation') editSubstationUI!: Dialog;
  @query('#edit-substation > mwc-textfield[label="name"]')
  substationNameUI!: TextField;
  @query('#edit-substation > mwc-textfield-nullable[label="desc"]')
  substationDescUI!: TextFieldNullable;
  @query('mwc-menu') menuUI!: Menu;
  @query('h1 > mwc-icon-button') menuIconUI!: IconButton;
  @query('mwc-dialog#create-voltage-level') createVoltageLevelUI!: Dialog;
  @query('#create-voltage-level > mwc-textfield[label="name"]')
  voltageLevelNameUI!: TextField;
  @query('#create-voltage-level > mwc-textfield-nullable[label="desc"]')
  voltageLevelDescUI!: TextFieldNullable;
  @query('#create-voltage-level > mwc-textfield[label="nomFreq"]')
  voltageLevelNomFreqUI!: TextField;
  @query('#create-voltage-level > mwc-textfield[label="numPhases"]')
  voltageLevelNumPhasesUI!: TextField;
  @query('#create-voltage-level > mwc-textfield[label="Voltage"]')
  voltageLevelVoltageUI!: TextField;
  @query('div')
  container!: HTMLElement;

  checkSubstationValidity(): boolean {
    return (
      this.substationNameUI.checkValidity() &&
      this.substationDescUI.checkValidity()
    );
  }

  checkVoltageLevelValidity(): boolean {
    return (
      this.element !== null &&
      Array.from(
        this.createVoltageLevelUI.querySelectorAll('mwc-textfield')
      ).every(tf => tf.checkValidity())
    );
  }

  newUpdateAction(name: string, desc: string | null): Action {
    if (!this.element) throw new Error('Cannot edit a missing Substation');
    const newElement = <Element>this.element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    return {
      old: { element: this.element },
      new: { element: newElement },
    };
  }

  newCreateAction(name: string, desc: string | null): Action {
    if (this.element) throw new Error('Will not create a second Substation');
    return {
      new: {
        parent: this.parent,
        element: new DOMParser().parseFromString(
          `<Substation name="${name}"${
            desc === null ? '' : ` desc="${desc}"`
          }></Substation>`,
          'application/xml'
        ).documentElement,
        reference: null,
      },
    };
  }

  newVoltageLevelCreateAction(
    name: string,
    desc: string | null,
    nomFreq: string,
    numPhases: string,
    Voltage: string
  ): Action {
    if (!this.element)
      throw new Error('Cannot create VoltageLevel without Substation');
    return {
      new: {
        parent: this.element,
        element: new DOMParser().parseFromString(
          `<VoltageLevel
            name="${name}"
            ${desc === null ? '' : `desc="${desc}"`}
            nomFreq="${nomFreq}"
            numPhases="${numPhases}"
          ><Voltage unit="V" multiplier="k">${Voltage}</Voltage>
          </VoltageLevel>`,
          'application/xml'
        ).documentElement,
        reference: null,
      },
    };
  }

  requestSubstationUpdate(): void {
    if (
      this.element &&
      this.checkSubstationValidity() &&
      (this.substationNameUI.value !== this.name ||
        this.substationDescUI.getValue() !== this.desc)
    ) {
      this.dispatchEvent(
        newActionEvent(
          this.newUpdateAction(
            this.substationNameUI.value,
            this.substationDescUI.getValue()
          )
        )
      );
      this.editSubstationUI.close();
    }
  }

  requestSubstationCreate(): void {
    if (
      !this.element &&
      this.checkSubstationValidity() &&
      this.substationNameUI.value
    ) {
      this.dispatchEvent(
        newActionEvent(
          this.newCreateAction(
            this.substationNameUI.value,
            this.substationDescUI.getValue()
          )
        )
      );
      this.editSubstationUI.close();
    }
  }

  requestVoltageLevelCreate(): void {
    if (this.element && this.checkVoltageLevelValidity()) {
      this.dispatchEvent(
        newActionEvent(
          this.newVoltageLevelCreateAction(
            this.voltageLevelNameUI.value,
            this.voltageLevelDescUI.getValue(),
            this.voltageLevelNomFreqUI.value,
            this.voltageLevelNumPhasesUI.value,
            this.voltageLevelVoltageUI.value
          )
        )
      );
      this.createVoltageLevelUI.close();
    }
  }

  updated(): void {
    if (this.menuUI) this.menuUI.anchor = this.menuIconUI;
  }

  firstUpdated(): void {
    panzoom(this);
  }

  renderEditSubstationUI(): TemplateResult {
    const [heading, action, actionName] = this.element
      ? ['Edit Substation', this.requestSubstationUpdate, 'Save']
      : ['Add Substation', this.requestSubstationCreate, 'Add'];
    return html`
      <mwc-dialog heading="${heading}" id="edit-substation">
        <mwc-textfield
          value="${this.name ?? ''}"
          label="name"
          helper="Substation Name"
          required
          dialogInitialFocus
        ></mwc-textfield>
        <mwc-textfield-nullable
          value="${this.desc ?? ''}"
          ?null=${this.element !== null && this.desc === null}
          label="desc"
          helper="Description"
        ></mwc-textfield-nullable>
        <mwc-button slot="secondaryAction" dialogAction="close">
          Cancel
        </mwc-button>
        <mwc-button @click=${action} slot="primaryAction">
          ${actionName}
        </mwc-button>
      </mwc-dialog>
    `;
  }

  renderCreateVoltageLevelUI(): TemplateResult {
    if (!this.element) return html``;
    return html`<mwc-dialog
      heading="Add Voltage Level"
      id="create-voltage-level"
    >
      <mwc-textfield
        label="name"
        helper="Voltage Level Name"
        required
        dialogInitialFocus
      ></mwc-textfield>
      <mwc-textfield-nullable
        label="desc"
        helper="Description"
      ></mwc-textfield-nullable>
      <mwc-textfield
        value="${this.defaultNomFreq}"
        label="nomFreq"
        helper="Nominal Frequency in Hz"
      ></mwc-textfield>
      <mwc-textfield
        value="${this.defaultNumPhases}"
        label="numPhases"
        helper="Number of Phases"
        type="number"
        min="1"
        max="255"
      ></mwc-textfield>
      <mwc-textfield
        value="${this.defaultVoltage}"
        label="Voltage"
        helper="Voltage in kV"
      ></mwc-textfield>
      <mwc-button slot="secondaryAction" dialogAction="close">
        Cancel
      </mwc-button>
      <mwc-button @click=${this.requestVoltageLevelCreate} slot="primaryAction">
        Add
      </mwc-button>
    </mwc-dialog>`;
  }

  renderHeader(): TemplateResult {
    if (!this.element) return html`<h1>No Substation</h1>`;
    return html`
      <h1>
        ${this.name}${this.desc === null ? '' : html`&mdash;`}${this.desc}
        <mwc-icon-button
          icon="more_vert"
          @click=${() => this.menuUI.show()}
        ></mwc-icon-button>
        <mwc-menu
          .anchor=${this.menuIconUI}
          corner="BOTTOM_RIGHT"
          @action=${(ae: CustomEvent<ActionDetail>) => {
            if (ae.detail.index == 0) this.createVoltageLevelUI.show();
          }}
        >
          <mwc-list-item>Add Voltage Level</mwc-list-item>
        </mwc-menu>
      </h1>
    `;
  }

  render(): TemplateResult {
    return html`
      <div>${this.renderHeader()}</div>
      ${this.renderCreateVoltageLevelUI()} ${this.renderEditSubstationUI()}
      <mwc-fab
        @click=${() => (this.editSubstationUI.open = true)}
        icon="${this.element ? 'edit' : 'add'}"
      >
      </mwc-fab>
    `;
  }

  static styles = styles;
}
