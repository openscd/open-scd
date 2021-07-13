import {
  LitElement,
  html,
  TemplateResult,
  property,
  customElement,
} from 'lit-element';

import { isPublic } from './foundation.js';

import './zeroline/substation-editor.js';

function unreferencedIeds(doc: XMLDocument): Element[] {
  const ieds = Array.from(doc.querySelectorAll(':root > IED'));

  const unreferencedIeds: Element[] = [];

  ieds.forEach(ied => {
    const iedName = ied.getAttribute('name')!;
    if (
      Array.from(doc.querySelectorAll('LNode'))
        .filter(isPublic)
        .filter(lnode => lnode.getAttribute('iedName') === iedName).length === 0
    )
      unreferencedIeds.push(ied);
  });

  return unreferencedIeds;
}

/** [[`Zeroline`]] pane for displaying `Substation` and/or `IED` sections. */
@customElement('zeroline-pane')
export class ZerolinePane extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  showieds = false;

  renderIedContainer(): TemplateResult {
    return html`<div id="iedcontainer">
      ${unreferencedIeds(this.doc).map(
        ied => html`<ied-editor .element=${ied}></ied-editor>`
      )}
    </div>`;
  }

  render(): TemplateResult {
    return html`
      <section tabindex="0">
        ${this.showieds ? this.renderIedContainer() : html``}
        ${Array.from(this.doc.querySelectorAll('Substation') ?? [])
          .filter(isPublic)
          .map(
            substation =>
              html`<substation-editor
                .element=${substation}
                .readonly=${this.readonly}
                .showieds=${this.showieds}
              ></substation-editor>`
          )}
      </section>
    `;
  }
}
