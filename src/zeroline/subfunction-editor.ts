import {
  html,
  LitElement,
  TemplateResult,
  property,
  internalProperty,
  customElement,
  query,
} from 'lit-element';

import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
} from '../foundation.js';
import { wizards } from '../wizards/wizard-library.js';

import { Fab } from '@material/mwc-fab';

@customElement('subfunction-editor')
export class SubFunctionEditor extends LitElement {
  @property()
  element!: Element;
  @internalProperty()
  get header(): string {
    const name = this.element.getAttribute('name');
    const desc = this.element.getAttribute('desc');
    const type = this.element.getAttribute('type');

    return `${name}${desc ? ` - ${desc}` : ''}${type ? ` (${type})` : ''}`;
  }

  @query('mwc-fab[icon="edit"]') editButton!: Fab;
  @query('mwc-fab[icon="delete"]') removeButton!: Fab;

  openEditWizard(): void {
    const wizard = wizards['SubFunction'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  remove(): void {
    this.dispatchEvent(
      newActionEvent({
        old: {
          parent: this.element.parentElement!,
          element: this.element,
          reference: this.element.nextSibling,
        },
      })
    );
  }

  renderSubFunctions(): TemplateResult[] {
    const subfunctions = getChildElementsByTagName(this.element, 'SubFunction');
    return subfunctions.map(
      subfunction =>
        html`<subfunction-editor
          slot="container"
          .element=${subfunction}
        ></subfunction-editor>`
    );
  }

  renderActionButtons(): TemplateResult {
    return html`
      <mwc-fab icon="edit" slot="morevert" @click=${() =>
        this.openEditWizard()}></mwc-fab>
      <mwc-fab icon="delete" slot="morevert" @click=${() =>
        this.remove()}></mwc-fab>
    </abbr> `;
  }

  render(): TemplateResult {
    return html`<editor-container
      .element=${this.element}
      .header=${this.header}
      secondary
      >${this.renderActionButtons()}${this.renderSubFunctions()}</editor-container
    >`;
  }
}
