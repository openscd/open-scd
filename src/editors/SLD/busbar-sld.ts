import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

@customElement('busbar-sld')
export class BusBasSld extends LitElement {
  @property()
  busBarName!: String;

  render(): TemplateResult {
    return html`<div class="busbar">
      <svg>
        <text x="0" y="20" fill="black">${this.busBarName}</text>
        <line x1="0" y1="0" x2="100%" y2="0"/>
      </svg>
    </div>`;
  }

  static styles = css`
    .busbar {
      grid-template-columns: repeat(1, 1fr);
    }

    .busbar svg {
      width: 100%;
    }

    .busbar svg line {
      stroke: black;
      stroke-width: 5;
    }
  `;
}
