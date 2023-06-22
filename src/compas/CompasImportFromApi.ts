import { customElement, html, LitElement, TemplateResult } from 'lit-element';

import '@material/mwc-list/mwc-list-item';

import {
  newOpenDocEvent,
  newPendingStateEvent,
  newWizardEvent,
} from '../foundation.js';

import '../filtered-list.js';

import {
  createLogEvent,
  handleError,
  handleResponse,
  parseXml,
} from '../compas-services/foundation.js';

import { CompasCimMappingService } from '../compas-services/CompasCimMappingService.js';

@customElement('compas-import-from-api')
export default class CompasImportFromApiElement extends LitElement {
  private async processCimFile(name: string) {
    const doc = await fetch('/public/cim/' + name + '.xml')
      .catch(handleError)
      .then(handleResponse)
      .then(parseXml);

    await CompasCimMappingService()
      .map({ cimData: [{ name: name + '.xml', doc: doc }] })
      .then(response => {
        const sclName = name + '.ssd';

        const sclElement = response.querySelectorAll('SCL').item(0);
        const sclDocument = document.implementation.createDocument(
          '',
          '',
          null
        );
        sclDocument.getRootNode().appendChild(sclElement.cloneNode(true));

        this.dispatchEvent(newOpenDocEvent(sclDocument, sclName));
      })
      .catch(reason => createLogEvent(this, reason));

    this.dispatchEvent(newWizardEvent());
  }

  render(): TemplateResult {
    return html`
      <filtered-list>
        <mwc-list-item
          @click=${() =>
            this.dispatchEvent(
              newPendingStateEvent(this.processCimFile('cim-eq-hoorn-v3'))
            )}
        >
          cim-eq-hoorn-v3
        </mwc-list-item>
        <mwc-list-item
          @click=${() =>
            this.dispatchEvent(
              newPendingStateEvent(this.processCimFile('cim-eq-makkum'))
            )}
        >
          cim-eq-makkum
        </mwc-list-item>
        <mwc-list-item
          @click=${() =>
            this.dispatchEvent(
              newPendingStateEvent(
                this.processCimFile('cim-eq-winselingseweg-voorbeeld')
              )
            )}
        >
          cim-eq-winselingseweg-voorbeeld
        </mwc-list-item>
        <mwc-list-item
          @click=${() =>
            this.dispatchEvent(
              newPendingStateEvent(this.processCimFile('EQ-entsoe-voorbeeld'))
            )}
        >
          EQ-entsoe-voorbeeld
        </mwc-list-item>
      </filtered-list>
    `;
  }
}
