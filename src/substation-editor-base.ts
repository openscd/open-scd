import {
  LitElement,
  html,
  TemplateResult,
  internalProperty,
} from 'lit-element';

export class SubstationEditorBase extends LitElement {
  @internalProperty()
  doc: Element | null = null;

  render(): TemplateResult {
    return html`<div>
      <tt @click=${() => console.log(this.doc)}
        >${this.doc
          ? new XMLSerializer().serializeToString(this.doc)
          : null}</tt
      >
    </div>`;
  }
}
