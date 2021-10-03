import { IconButton } from '@material/mwc-icon-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Menu } from '@material/mwc-menu';
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { newWizardEvent, Wizard } from './foundation.js';

@customElement('editor-container')
export class EditorContainer extends LitElement {
  @property({ type: String })
  header = '';
  @property({ type: Array })
  addOptions: string[] = [];
  @property({ type: String })
  level: 'high' | 'mid' | 'low' = 'mid';
  @property({ type: String })
  colorTheme: 'primary' | 'secondary' = 'primary';
  @property({ type: Boolean })
  contrasted = false;
  @property({ type: Boolean })
  highlighted = false;
  @property({ type: Boolean })
  marginless = false;

  @property()
  addElementAction: (tagName: string) => Wizard | undefined = () => {
    return undefined;
  };

  @query('mwc-icon-button[icon="playlist_add"]') addIcon?: IconButton;
  @query('#menu') addMenu!: Menu;
  @query('#header') headerContainer!: HTMLElement;
  @query('#more') moreVert?: IconButton;

  renderAddButtons(): TemplateResult[] {
    return this.addOptions.map(
      child =>
        html`<mwc-list-item graphic="icon" value="${child}"
          ><span>${child}</span
          ><mwc-icon slot="graphic">playlist_add</mwc-icon></mwc-list-item
        >`
    );
  }

  styleFabButtonTransform(): TemplateResult[] {
    let transform = 0;
    return Array.from(this.children).map((child, i) => {
      if (child.tagName === 'MWC-FAB')
        return html`#more:focus-within ~ ::slotted(mwc-fab:nth-child(${i + 1}))
        { transform: translate(0, ${++transform * 48}px); }`;
      return html``;
    });
  }

  renderHeaderBody(): TemplateResult {
    return html`${this.addOptions.length
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
                const wizard = this.addElementAction(tagName);
                if (wizard) this.dispatchEvent(newWizardEvent(wizard));
              }}
              >${this.renderAddButtons()}
            </mwc-menu>`
        : html``}
      ${Array.from(this.children).some(child => child.tagName === 'MWC-FAB')
        ? html`<mwc-icon-button id="more" icon="more_vert"></mwc-icon-button>`
        : html``}<slot name="header"
        ><style>

          ${this.addOptions.length
            ? html`::slotted(mwc-fab) {right: 48px;}`
            : html`::slotted(mwc-fab) {right: 0px;}`}
            ${this.styleFabButtonTransform()}
        </style></slot
      >`;
  }

  renderLevel1(): TemplateResult {
    return html`<h1>${this.header} ${this.renderHeaderBody()}</h1>`;
  }

  renderLevel2(): TemplateResult {
    return html`<h2>${this.header} ${this.renderHeaderBody()}</h2>`;
  }

  renderLevel3(): TemplateResult {
    return html`<h3>${this.header} ${this.renderHeaderBody()}</h3>`;
  }

  renderHeader(): TemplateResult {
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
      class="container ${this.colorTheme} ${this.highlighted
        ? 'highlighted'
        : ''} ${this.contrasted ? 'contrasted' : ''} ${this.marginless
        ? 'marginless'
        : ''}"
      tabindex="0"
    >
      ${this.renderHeader()}
      <slot name="container"></slot>
    </section>`;
  }

  async firstUpdated(): Promise<void> {
    await super.updateComplete;
    if (this.addMenu) this.addMenu.anchor = this.headerContainer;
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

    .marginless {
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

    #more:focus-within ~ ::slotted(mwc-fab) {
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 250ms linear;
      pointer-events: auto;
      opacity: 1;
    }
  `;
}
