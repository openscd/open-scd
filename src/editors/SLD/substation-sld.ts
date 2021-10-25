import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

@customElement('substation-sld')
export class SubstationSld extends LitElement {
  @property()
  element!: Element;
  @property()
  get voltagelevels(): Element[] {
    return Array.from(this.element.getElementsByTagName('VoltageLevel'));
  }

  render(): TemplateResult {
    return html`<section class="container">
      <div>
        ${this.voltagelevels.map(
          voltagelevel =>
            html`<voltageLevel-sld .element=${voltagelevel}></voltageLevel-sld>`
        )}
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
  `;
}
