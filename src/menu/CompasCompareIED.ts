import { html, TemplateResult } from 'lit-element';

import '../compas/CompasOpen.js';

import { DocRetrievedEvent } from '../compas/CompasOpen.js';

import CompareIEDPlugin from './CompareIED.js';

export default class CompasCompareIEDPlugin extends CompareIEDPlugin {
  /**
   * Overwriting the render function for opening the template project.
   * Now it will also be possible to select the template project from the CoMPAS Data Service.
   *
   * @override
   */
  protected renderSelectTemplateFile(): TemplateResult {
    return html`<compas-open
        @doc-retrieved=${(evt: DocRetrievedEvent) => {
          this.templateDoc = evt.detail.doc;
        }}
      ></compas-open>
      ${this.renderCloseButton()}`;
  }
}
