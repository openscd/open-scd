import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

@customElement('connectivity-node-sld')
export class ConnectivityNodeSld extends LitElement {
  @property({ type: Element })
  element!: Element;

  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }

  render(): TemplateResult {
    return html`<div></div>
      <h4>${this.name}</h4>`;
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

    h4 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      opacity: 1;
      transition: opacity 200ms linear;
      text-align: center;
    }

    #svg {
      position: absolute;
    }
  `;
}
