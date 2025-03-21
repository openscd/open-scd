'use strict';

import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import { myUtilityFunction } from './testsclsubstation/foundation.js';
import './testsclsubstation/testsclsubstation-component.js';

export default class TestSclSubstationEditor extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: lightblue;
    }
  `;

  render(): TemplateResult {
    if (!this.doc) {
      return html`
        <h2>No data</h2>
        <p>Please open or create a project to see more info.</p>
      `;
    }

    const message = myUtilityFunction('OpenSCD user');
    return html`
      <h1>Test https://github.com/OpenEnergyTools/scl-substation-editor</h1>
      <p>Found ${this.doc.querySelectorAll('IED').length} IED(s) in the SCL.</p>
      <p>Utility says: ${message}</p>
      <test-scl-substation-component
        .doc=${this.doc}
      ></test-scl-substation-component>
    `;
  }
}
