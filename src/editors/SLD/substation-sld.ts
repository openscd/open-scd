import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { XYPosition, getPosition, Point } from './foundation';
import { VoltageLevelSld } from './voltagelevel-sld';

/**
 * SLD component of a Substation component.
 */
@customElement('substation-sld')
export class SubstationSld extends LitElement implements XYPosition {

  /**
   * Property holding the Substation XML element.
   */
  @property()
  element!: Element;
  
  /**
   * Holding a reference to the Substation SVG to draw routes between elements on.
   */
  @query('#svg') svg!: HTMLElement;

  /**
   * Overridden from XYPosition
   */
  // --------------------------
  fullParentOffset!: Point

  get myOwnFullOffset(): Point {
    return {x: 0, y: 0};
  }
  // --------------------------

  get voltageLevels(): Element[] {
    return Array.from(this.element.getElementsByTagName('VoltageLevel'));
  }
  
  firstUpdated(): void {
    // Pass the Substation SVG to all VoltageLevels
    this.shadowRoot!.querySelectorAll("voltagelevel-sld").forEach(voltageLevel => (<VoltageLevelSld>(voltageLevel)).svg = this.svg);
  }

  render(): TemplateResult {
    return html`<section>
      <div style="grid-template-columns: repeat(100, 64px);grid-template-rows: repeat(100, 64px)">
        ${this.voltageLevels.map(
          voltagelevel => {
            const {x, y} = getPosition(voltagelevel);
            return html`<voltagelevel-sld
              .element=${voltagelevel}
              .fullParentOffset=${this.myOwnFullOffset}
              .downer=${true}
              style="grid-column:${x};grid-row:${y};">
            </voltagelevel-sld>`
          })}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="svg"
          width=2000
          height=2000
          viewBox="0 0 2000 2000"
        ></svg>
      </div>
    </section>`;
  }

  static styles = css`
    .container:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .container:focus-within {
      outline: 2px solid var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    div {
      display: grid;
      padding: 64px;
    }

    svg {
      position: absolute;
      z-index: -5;
    }
  `;
}
