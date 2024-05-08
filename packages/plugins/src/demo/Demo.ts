'use strict';

import { css, html, LitElement, property, TemplateResult } from 'lit-element';

import { createElement } from '@openscd/open-scd/src/foundation.js';

import { newPendingStateEvent } from '@openscd/core/foundation/deprecated/waiter.js';
import { newEditEvent } from '@openscd/core';

const prettifyXML = (doc: XMLDocument) => {
  const xslt = new DOMParser().parseFromString(
    `<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
        <xsl:strip-space elements="*"/>
        <xsl:template match="para[content-style][not(text())]">
            <xsl:value-of select="normalize-space(.)"/>
        </xsl:template>
        <xsl:template match="node()|@*">
            <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>
        </xsl:template>
        <xsl:output indent="yes"/>
    </xsl:stylesheet>`,
    'application/xml'
  );

  const processor = new XSLTProcessor();
  processor.importStylesheet(xslt);
  const result = processor.transformToDocument(doc);
  return new XMLSerializer().serializeToString(result);
};

export default class Demo extends LitElement {
  @property()
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  @property()
  docName!: string;

  render(): TemplateResult {
    return html`
      <div class="demo">
        <action-pane>
          Document name: ${this.docName} <br />
          Number of substations: ${this.numberOfSubstations}
        </action-pane>
        <action-pane>
          <textarea rows="4" readonly>${this.prettyPrint()}</textarea>
        </action-pane>
        <action-pane>
          <mwc-button @click=${this.onCreateSubstationClick}>
            Create Substation
          </mwc-button>
          <mwc-button @click=${this.onPendingStateClick}
            >Long loading functionality</mwc-button
          >
        </action-pane>
      </div>
    `;
  }

  protected onCreateSubstationClick() {
    const substation: Element = createElement(this.doc, 'Substation', {
      name: 'Substation Name',
    });

    this.dispatchEvent(
      newEditEvent({
        node: substation,
        parent: this.doc.documentElement,
      })
    );
  }

  protected onPendingStateClick() {
    const pendingState: Promise<void> = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
    this.dispatchEvent(newPendingStateEvent(pendingState));
  }

  protected prettyPrint(): string {
    return prettifyXML(this.doc);
  }

  protected get numberOfSubstations(): number {
    return Array.from(this.doc.querySelectorAll(':root > Substation')).length;
  }

  static styles = css`
    :host {
      display: block;
      padding: 32px;
    }
    action-pane {
      margin-bottom: 32px;
      display: block;
    }

    textarea {
      resize: vertical;
    }
  `;
}
