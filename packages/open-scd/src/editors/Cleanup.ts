'use strict';

import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import { styles } from './templates/foundation.js';

import './cleanup/datasets-container.js';
import './cleanup/control-blocks-container.js';
import './cleanup/datatypes-container.js';

/** An editor [[`plugin`]] for cleaning SCL references and definitions. */
export default class Cleanup extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  render(): TemplateResult {
    return html`
      <div class="cleanup">
        <cleanup-datasets .editCount=${this.editCount} .doc=${this.doc}></cleanup-datasets>
        <cleanup-control-blocks .editCount=${this.editCount} .doc=${this.doc}></cleanup-control-blocks>
        <cleanup-data-types .editCount=${this.editCount} .doc=${this.doc}></cleanup-data-types>
      </div>
    `;
  }

  static styles = css`
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
}
