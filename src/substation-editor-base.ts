import {
  LitElement,
  html,
  TemplateResult,
  internalProperty,
} from 'lit-element';

export class SubstationEditorBase extends LitElement {
  @internalProperty()
  docs: NodeList = document.createDocumentFragment().childNodes;

  render(): TemplateResult {
    return html`<div>
      <tt @click=${() => console.log(this.docs)}
        >${Array.from(this.docs).map(d =>
          new XMLSerializer().serializeToString(d)
        )}</tt
      >
    </div>`;
  }
}
