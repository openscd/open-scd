import {
  css,
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import { newWizardEvent, SCLTag, tags } from './foundation.js';

import { emptyWizard, wizards } from './wizards/wizard-library.js';

import { Menu } from '@material/mwc-menu';
import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';

/**
 * A responsive container for nested elements with header and
 * create new child functionality.
 */
@customElement('editor-container')
export class EditorContainer extends LitElement {
  /** The visualized `Element`. */
  @property()
  element: Element | null = null;
  /**Overwrites default header text*/
  @property({ type: String })
  header = '';
  /** Sets the header type h1, h2 or h3 */
  @property({ type: String })
  level: 'high' | 'mid' | 'low' = 'mid';
  /** Sets the focused header color */
  @property({ type: String })
  theme: 'primary' | 'secondary' = 'primary';
  /** Whether different background color shall be used */
  @property({ type: Boolean })
  contrasted = false;
  /** Wether outline shall be permanent */
  @property({ type: Boolean })
  highlighted = false;
  /** Whether the container does not have margins*/
  @property({ type: Boolean })
  nomargin = false;

  @internalProperty()
  get childTags(): SCLTag[] {
    if (!this.element) return [];

    return tags[<SCLTag>this.element.tagName].children.filter(
      child => wizards[child].create !== emptyWizard
    );
  }
  @internalProperty()
  get defaultHeader(): string {
    const name = this.element?.getAttribute('name') ?? '';
    const desc = this.element?.getAttribute('desc');

    return `${name}${desc ? ` - ${desc}` : ''}`;
  }

  @query('mwc-icon-button[icon="playlist_add"]') addIcon?: IconButton;
  @query('#menu') addMenu!: Menu;
  @query('#header') headerContainer!: HTMLElement;
  @query('#morevert > mwc-icon-button') moreVert?: IconButton;
  @query('.container') container!: HTMLElement;

  private openCreateWizard(tagName: string): void {
    const wizard = wizards[<SCLTag>tagName].create(this.element!);

    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  async firstUpdated(): Promise<void> {
    await super.updateComplete;
    if (this.addMenu) this.addMenu.anchor = this.headerContainer;
  }

  private renderAddButtons(): TemplateResult[] {
    return this.childTags.map(
      child =>
        html`<mwc-list-item graphic="icon" value="${child}"
          ><span>${child}</span
          ><mwc-icon slot="graphic">playlist_add</mwc-icon></mwc-list-item
        >`
    );
  }

  private styleFabButtonTransform(): TemplateResult[] {
    let transform = 0;
    return Array.from(this.children).map((child, i) => {
      if (child.tagName === 'MWC-FAB')
        return html`#morevert:focus-within >
        ::slotted(mwc-fab:nth-child(${i + 1})) { transform: translate(0,
        ${++transform * 48}px); }`;
      return html``;
    });
  }

  private renderHeaderBody(): TemplateResult {
    return html`${this.childTags.length
        ? html`<mwc-icon-button
              icon="playlist_add"
              @click=${() => (this.addMenu.open = true)}
            ></mwc-icon-button>
            <mwc-menu
              id="menu"
              corner="TOP_RIGHT"
              menuCorner="END"
              @selected=${(e: Event) => {
                const tagName = (<ListItem>(<Menu>e.target).selected).value;
                this.openCreateWizard(tagName);
              }}
              >${this.renderAddButtons()}
            </mwc-menu>`
        : html``}
      ${Array.from(this.children).some(child => child.tagName === 'MWC-FAB')
        ? html`<div id="morevert">
            <mwc-icon-button icon="more_vert"></mwc-icon-button>
            <slot name="morevert"></slot>
          </div>`
        : html``}<style>
        ${this.childTags.length
          ? html`::slotted(mwc-fab) {right: 48px;}`
          : html`::slotted(mwc-fab) {right: 0px;}`}
          ${this.styleFabButtonTransform()}</style
      ><slot name="header"></slot>`;
  }

  private renderLevel1(): TemplateResult {
    return html`<h1>
      ${this.header !== '' ? this.header : this.defaultHeader}
      ${this.renderHeaderBody()}
    </h1>`;
  }

  private renderLevel2(): TemplateResult {
    return html`<h2>
      ${this.header !== '' ? this.header : this.defaultHeader}
      ${this.renderHeaderBody()}
    </h2>`;
  }

  private renderLevel3(): TemplateResult {
    return html`<h3>
      ${this.header !== '' ? this.header : this.defaultHeader}
      ${this.renderHeaderBody()}
    </h3>`;
  }

  private renderHeader(): TemplateResult {
    return html`<div id="header">
      ${this.level === 'high'
        ? this.renderLevel1()
        : this.level === 'mid'
        ? this.renderLevel2()
        : this.renderLevel3()}
    </div>`;
  }

  render(): TemplateResult {
    return html`<section
      class="container ${this.theme} ${this.highlighted
        ? 'highlighted'
        : ''} ${this.contrasted ? 'contrasted' : ''} ${this.nomargin
        ? 'nomargin'
        : ''}"
      tabindex="0"
    >
      ${this.renderHeader()}
      <slot name="container"></slot>
    </section>`;
  }

  static styles = css`
    :host(.moving) section {
      opacity: 0.3;
    }

    .container {
      background-color: var(--mdc-theme-surface);
      transition: all 200ms linear;
      outline-style: solid;
      margin: 8px 12px 16px;
      padding: 0.02px; /*Dirty hack to force outline around content with margin*/
      outline-width: 0px;
      opacity: 1;
    }

    .container.primary {
      outline-color: var(--mdc-theme-primary);
    }

    .container.secondary {
      outline-color: var(--mdc-theme-secondary);
    }

    .highlighted {
      outline-width: 2px;
    }

    .contrasted {
      background-color: var(--mdc-theme-on-primary);
    }

    .nomargin {
      margin: 0px;
    }

    .container:focus {
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    }

    .container:focus-within {
      outline-width: 2px;
      transition: all 250ms linear;
    }

    .container:focus-within h1,
    .container:focus-within h2,
    .container:focus-within h3 {
      color: var(--mdc-theme-surface);
      transition: background-color 200ms linear;
    }

    .container.primary:focus-within h1,
    .container.primary:focus-within h2,
    .container.primary:focus-within h3 {
      background-color: var(--mdc-theme-primary);
    }

    .container.secondary:focus-within h1,
    .container.secondary:focus-within h2,
    .container.secondary:focus-within h3 {
      background-color: var(--mdc-theme-secondary);
    }

    h1,
    h2,
    h3 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    h1 > ::slotted(mwc-icon-button),
    h2 > ::slotted(mwc-icon-button),
    h3 > ::slotted(mwc-icon-button),
    h1 > ::slotted(abbr),
    h2 > ::slotted(abbr),
    h3 > ::slotted(abbr) {
      float: right;
    }

    h1 > mwc-icon-button,
    h2 > mwc-icon-button,
    h3 > mwc-icon-button {
      float: right;
    }

    #morevert {
      float: right;
    }

    #header {
      position: relative;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    ::slotted(mwc-fab) {
      color: var(--mdc-theme-on-surface);
      opacity: 0;
      position: absolute;
      pointer-events: none;
      z-index: 1;
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 200ms linear;
    }

    #morevert:focus-within > ::slotted(mwc-fab) {
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 250ms linear;
      pointer-events: auto;
      opacity: 1;
    }
  `;
}
