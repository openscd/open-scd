import { css, html, LitElement, query, TemplateResult } from 'lit-element';

import {
  newLogEvent,
  newOpenDocEvent,
  newPendingStateEvent,
} from '../foundation.js';
import { stripExtensionFromName } from '../compas/foundation.js';

import {
  CimData,
  CompasCimMappingService,
} from '../compas-services/CompasCimMappingService.js';
import { createLogEvent } from '../compas-services/foundation.js';

export default class OpenProjectPlugin extends LitElement {
  @query('#cim-mapping-input') pluginFileUI!: HTMLInputElement;

  async convertCimFile(event: Event): Promise<void> {
    const files = (<HTMLInputElement | null>event.target)?.files ?? false;
    if (!files) return;

    const cimData: CimData[] = [];
    for (const file of Array.from(files)) {
      const text = await file.text();
      const cimName = file.name;
      const cimDocument = new DOMParser().parseFromString(
        text,
        'application/xml'
      );

      cimData.push({ name: cimName, doc: cimDocument });
    }

    await CompasCimMappingService()
      .map({ cimData: cimData })
      .then(response => {
        // We will use the first filename as the basis of the new filename.
        const sclName = stripExtensionFromName(cimData[0].name) + '.ssd';

        // Copy the SCL Result from the Response and create a new Document from it.
        const sclElement = response.querySelectorAll('SCL').item(0);
        const sclDocument = document.implementation.createDocument(
          '',
          '',
          null
        );
        sclDocument.getRootNode().appendChild(sclElement.cloneNode(true));

        this.dispatchEvent(newLogEvent({ kind: 'reset' }));
        this.dispatchEvent(newOpenDocEvent(sclDocument, sclName));
      })
      .catch(reason => createLogEvent(this, reason));
    this.pluginFileUI.onchange = null;
  }

  async run(): Promise<void> {
    this.pluginFileUI.click();
  }

  render(): TemplateResult {
    return html`<input
      @click=${(event: MouseEvent) =>
        ((<HTMLInputElement>event.target).value = '')}
      @change=${(event: MouseEvent) =>
        this.dispatchEvent(newPendingStateEvent(this.convertCimFile(event)))}
      id="cim-mapping-input"
      accept=".xml"
      type="file"
      multiple
    /> `;
  }

  static styles = css`
    input {
      width: 0;
      height: 0;
      opacity: 0;
    }
  `;
}
