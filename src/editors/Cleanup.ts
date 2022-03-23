'use strict';

import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import { styles } from './templates/foundation.js';

import './cleanup/datasets.js';
import './cleanup/control-blocks.js';

/** An editor [[`plugin`]] for cleaning SCL references and definitions. */
export default class Cleanup extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  render(): TemplateResult {
    return html`
      <div class="cleanup">
        <cleanup-datasets .doc=${this.doc}></cleanup-datasets>
        <cleanup-control-blocks .doc=${this.doc}></cleanup-control-blocks>
      </div>
    `;
  }

  static styles = css`
    ${styles}

    :host {
      width: 100vw;
    }

    @media (max-width: 800px) {
      .cleanup {
        flex-direction: column;
      }
    }

    cleanup-datasets, cleanup-control-blocks {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      /* any more than 700px and distance between check box and item is too great */
      max-width: 700px;
    }

    .cleanup {
      display: flex;
      /* See: https://css-tricks.com/responsive-layouts-fewer-media-queries/ */
      flex: clamp(100%/3 + 0.1%, (400px - 100hw) * 1000, 100%);
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
    }
  }
  `;
}
