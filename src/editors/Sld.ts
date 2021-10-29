import {} from 'fast-check';
import {
  html,
  LitElement,
  TemplateResult,
  property,
  css,
  query,
} from 'lit-element';
import { GraphEdge, GraphNode } from './SLD/foundation.js';

import panzoom from 'panzoom';

import './SLD/substation-sld.js';
import './SLD/voltagelevel-sld.js';
import './SLD/bay-sld.js';
import './SLD/busbar-sld.js';
import './SLD/connectivity-node-sld.js';

export default class SldPlugin extends LitElement {
  @property()
  doc!: XMLDocument;

  @property()
  iterations = 0;

  nodes: GraphNode[] = [];
  edges: GraphEdge[] = [];

  @query('#panzoomcontainer') container!: HTMLElement;

  firstUpdated(): void {
    panzoom(this.container);
  }

  constructor() {
    super();
  }

  render(): TemplateResult {
    return html`<div id="container">
      <div id="panzoomcontainer">
        <substation-sld
          .element=${this.doc.querySelector('Substation')}
        ></substation-sld>
      </div>
    </div>`;
  }

  static styles = css``;
}
