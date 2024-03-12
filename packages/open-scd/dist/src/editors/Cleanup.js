'use strict';
import { __decorate } from "tslib";
import { css, html, LitElement, property } from 'lit-element';
import { styles } from './templates/foundation.js';
import './cleanup/datasets-container.js';
import './cleanup/control-blocks-container.js';
import './cleanup/datatypes-container.js';
/** An editor [[`plugin`]] for cleaning SCL references and definitions. */
export default class Cleanup extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    render() {
        return html `
      <div class="cleanup">
        <cleanup-datasets .editCount=${this.editCount} .doc=${this.doc}></cleanup-datasets>
        <cleanup-control-blocks .editCount=${this.editCount} .doc=${this.doc}></cleanup-control-blocks>
        <cleanup-data-types .editCount=${this.editCount} .doc=${this.doc}></cleanup-data-types>
      </div>
    `;
    }
}
Cleanup.styles = css `
    ${styles}

    :host {
      width: 100vw;
    }

    @media (max-width: 799px) {
      .cleanup {
        flex-direction: column;
      }
    }

    @media (min-width: 800px) {
      .cleanup {
        max-height: 60vh;
      }
    }

    cleanup-datasets, cleanup-control-blocks, cleanup-data-types {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
    }

    .cleanup {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
    }
  }
  `;
__decorate([
    property()
], Cleanup.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], Cleanup.prototype, "editCount", void 0);
//# sourceMappingURL=Cleanup.js.map