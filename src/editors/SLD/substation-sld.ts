import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

/**
 * SLD component of a Substation component.
 */
@customElement('substation-sld')
export class SubstationSld extends LitElement {
  @property()
  element!: Element;

  @property()
  get voltageLevels(): Element[] {
    return Array.from(this.element.getElementsByTagName('VoltageLevel'));
  }

  render(): TemplateResult {
    return html`<section class="container">
      <div>
        ${this.voltageLevels.map(
          voltagelevel =>
            html`<voltageLevel-sld
              .element=${voltagelevel}>
            </voltageLevel-sld>`
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="substationRoutingSvg"
          width=100%
          height=100%
          viewBox="0 0 100 100"
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
      display: flex;
    }

    #substationRoutingSvg {
      display: flex;
      position: absolute;
      z-index: -5;
    }
  `;
}
