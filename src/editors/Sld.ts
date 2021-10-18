import {} from 'fast-check';
import { html, LitElement, TemplateResult, property, css } from 'lit-element';
import {
  doSpringEmbedded,
  getEdges,
  getNodes,
  GraphEdge,
  GraphNode,
  updateEdges,
} from './SLD/foundation.js';

export default class SldPlugin extends LitElement {
  @property()
  doc!: XMLDocument;

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

  render(): TemplateResult {
    return html`${this.nodes.map(
      node =>
        html`<div style="top:${node.y * 50}px; left: ${node.x * 50}px">
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
    )}`;
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
