import {} from 'fast-check';
import { html, LitElement, TemplateResult, property, css } from 'lit-element';
import {
  getEdges,
  getNodes,
  GraphEdge,
  GraphNode,
  updateEdges,
} from './SLD/foundation.js';
import { doSpringy } from './SLD/springembeded.js';

export default class SldPlugin extends LitElement {
  @property()
  doc!: XMLDocument;

  @property()
  iterations = 0;

  nodes: GraphNode[] = [];
  edges: GraphEdge[] = [];

  firstUpdated(): void {
    this.nodes = this.doc
      ? getNodes(this.doc.querySelector('Substation')!)
      : [];
    this.edges = this.doc
      ? getEdges(this.doc.querySelector('Substation')!)
      : [];
    //doSpringEmbedded(this.nodes, this.edges);
    updateEdges(this.nodes, this.edges);
    this.requestUpdate();
  }

  doIteration(): void {
    this.iterations++;
    doSpringy(this.nodes, this.edges);
    updateEdges(this.nodes, this.edges);
    this.requestUpdate();
  }

  render(): TemplateResult {
    return html`<div class="sld"></div>

      ${this.nodes.map(
        node =>
          html` <div style="top:${node.y * 50}px; left: ${node.x * 50}px">
            ${node.element.getAttribute('name')}
          </div>`
      )}${this.edges.map(
        edge => html`<svg>
          <line
            x1="${edge.xStart! * 50 + 25}"
            y1="${edge.yStart! * 50 + 25}"
            x2="${edge.xEnd! * 50 + 25}"
            y2="${edge.yEnd! * 50 + 25} "
            stroke="black"
          ></line>
        </svg>`
      )}
      <div style="top:${10 * 50}px; left: ${10 * 50}px">C</div>
      <mwc-button @click=${() => this.doIteration()} style="z-index:1"
        >${this.iterations}</mwc-button
      >`;
  }

  static styles = css`
    div {
      outline: solid;
      position: absolute;
      width: 50px;
      height: 50px;
    }

    svg {
      top: 0px;
      left: 0px;
      position: absolute;
      width: 5000px;
      height: 5000px;
    }
  `;
}
