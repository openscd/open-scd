import {
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  css,
} from 'lit-element';

import '@material/mwc-list';
import '@material/mwc-menu';
import type { Menu } from '@material/mwc-menu';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-icon';

import { Plugin } from '../../plugin.js';

@customElement('oscd-menu-tabs')
export class OscdMenuTabs extends LitElement {
  @property({ type: Array }) editors: Plugin[] = [];
  _activeEditor: Plugin | undefined;
  @property({ type: Object }) get activeEditor() {
    return this._activeEditor;
  }
  set activeEditor(editor: Plugin | undefined) {
    this._activeEditor = editor;
    const editorIndex = this.editors.findIndex(
      e => e.name === editor?.name && e.src === editor?.src
    );
    this.activeTabIndex = editorIndex > -1 ? editorIndex : 0;
    this.requestUpdate();
  }

  @state() private activeTabIndex = 0;
  @state() private visibleTabs: Plugin[] = [];
  @state() private hiddenTabs: Plugin[] = [];
  @query('.app-bar-container') private appBarContainer!: HTMLElement;
  @query('mwc-menu') private overflowMenu!: Menu;

  firstUpdated() {
    this.#calculateVisibleTabs();
    window.addEventListener('resize', this.#calculateVisibleTabs);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.#calculateVisibleTabs);
    super.disconnectedCallback();
  }

  #calculateVisibleTabs = async () => {
    await this.updateComplete;

    const visibleTabs: Plugin[] = [];
    const hiddenTabs: Plugin[] = [];
    let totalWidth = 0;

    const measurer = document.createElement('div');
    Object.assign(measurer.style, {
      position: 'absolute',
      visibility: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      padding: '0 20 px',
    });
    document.body.appendChild(measurer);

    try {
      for (let i = 0; i < this.editors.length; i++) {
        measurer.textContent = this.editors[i].name;
        const approximateWidthOtherThanText = 112;
        const buttonWidth =
          measurer.offsetWidth + approximateWidthOtherThanText;

        var availableWidth = this.appBarContainer.offsetWidth;
        const isMenuButtonVisible = this.hiddenTabs.length > 0;
        if (isMenuButtonVisible) {
          availableWidth -= 48;
        }
        if (totalWidth + buttonWidth <= availableWidth) {
          totalWidth += buttonWidth;
          visibleTabs.push(this.editors[i]);
        } else {
          hiddenTabs.push(this.editors[i]);
        }
      }

      this.visibleTabs = visibleTabs;
      this.hiddenTabs = hiddenTabs;
    } finally {
      document.body.removeChild(measurer);
    }
  };

  render() {
    if (this.activeEditor === undefined && this.editors.length > 0) {
      this.#activateTab(0);
    }

    return html`
      <div class="app-bar-container">
        ${this.visibleTabs.map(
          (editor, index) => html`
            <mwc-button
              label=${editor.name}
              icon=${editor.icon}
              ?active=${this.activeTabIndex === index}
              @click=${() => this.#activateTab(index)}
            ></mwc-button>
          `
        )}
        ${this.hiddenTabs.length > 0
          ? html`
              <mwc-icon-button
                icon="more_vert"
                @click=${() => this.overflowMenu.show()}
              ></mwc-icon-button>

              <mwc-menu>
                ${this.hiddenTabs.map(
                  (editor, index) => html`
                    <mwc-list-item
                      graphic="icon"
                      @click=${() =>
                        this.#activateTab(this.visibleTabs.length + index)}
                    >
                      <span>${editor.name}</span>
                      <mwc-icon slot="graphic">${editor.icon}</mwc-icon>
                    </mwc-list-item>
                  `
                )}
              </mwc-menu>
            `
          : ''}
      </div>
    `;
  }

  #activateTab(index: number) {
    this.activeTabIndex = index;
    this._activeEditor = this.editors[index];
    this.dispatchEvent(
      new CustomEvent(TabActivatedEventKey, {
        detail: { editor: this.editors[index] },
        composed: true,
        bubbles: true,
      })
    );
  }

  static styles = css`
    .app-bar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
      background-color: var(--mdc-theme-primary, #6200ee);
      position: relative;
    }

    mwc-button {
      --mdc-theme-on-primary: #174b46;
      --mdc-theme-primary: var(--mdc-theme-on-primary);
      --mdc-shape-small: 0px;
      white-space: nowrap;
      margin: 0 10px;
    }

    mwc-button[active] {
      background: #42a99f;
      --mdc-theme-on-primary: white;
    }

    mwc-icon-button {
      color: #174b46;
    }

    mwc-menu {
      position: absolute;
      left: 0;
      top: 100%;
    }
  `;
}

export const TabActivatedEventKey = 'oscd-editor-tab-activated';
export type TabActivatedEvent = CustomEvent<TabActivatedEventDetail>;
export type TabActivatedEventDetail = { editor: Plugin };
