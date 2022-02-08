import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import '@material/mwc-icon';
import { nothing } from 'lit-html';

function closestTo<E extends Element>(node: Node, selector: string): E | null {
  const closest =
    node.nodeType === Node.ELEMENT_NODE
      ? (<Element>node).closest<E>(selector)
      : null;

  if (closest) return closest;

  const root = <Document | DocumentFragment>node.getRootNode();

  if (root instanceof ShadowRoot) return closestTo(root.host, selector);

  return null;
}

/**
 * A responsive container rendering actions in a header.
 *
 * The "action" slot may contain up to eight icon buttons.
 * The "icon" slot, if filled overrides the icon property.
 * The default slot will be rendered into the pane body in a single column.
 */
@customElement('action-pane')
export class ActionPane extends LitElement {
  /** caption text, displayed in the header */
  @property({ type: String })
  label?: string;
  /** icon name, displayed unless the "icon" slot is filled */
  @property({ type: String })
  icon?: string;
  /** color header with secondary theme color while focus is within */
  @property({ type: Boolean })
  secondary = false;
  /** highlight pane with dotted outline */
  @property({ type: Boolean })
  highlighted = false;
  /** nesting level, default (closest pane ancestor's level) + 1 */
  @property({ type: Number })
  level = 1;

  async firstUpdated(): Promise<void> {
    this.tabIndex = 0;

    const parentPane = closestTo<ActionPane>(this.parentNode!, 'action-pane');
    if (parentPane) this.level = parentPane.level + 1;

    this.level = Math.floor(this.level);
  }

  private renderHeader(): TemplateResult {
    const content = html`<span
        ><slot name="icon"
          >${this.icon
            ? html`<mwc-icon>${this.icon}</mwc-icon>`
            : nothing}</slot
        ></span
      >
      ${this.label ?? nothing}
      <nav><slot name="action"></slot></nav>`;

    const headingLevel = Math.floor(Math.max(this.level, 1));
    switch (headingLevel) {
      case 1:
        return html`<h1>${content}</h1>`;
      case 2:
        return html`<h2>${content}</h2>`;
      case 3:
        return html`<h3>${content}</h3>`;
      case 4:
        return html`<h4>${content}</h4>`;
      case 5:
        return html`<h5>${content}</h5>`;
      default:
        return html`<h6>${content}</h6>`;
    }
  }

  render(): TemplateResult {
    return html`<section
      class="${classMap({
        secondary: this.secondary,
        highlighted: this.highlighted,
        contrasted: this.level % 2 === 0,
      })}"
    >
      ${this.renderHeader()}
      <div><slot></slot></div>
    </section>`;
  }

  static styles = css`
    :host {
      outline: none;
    }

    :host(:focus-within) section {
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
      outline-width: 4px;
      transition: all 250ms linear;
    }

    section {
      background-color: var(--mdc-theme-surface);
      transition: all 200ms linear;
      outline-style: solid;
      margin: 0px;
      outline-width: 0px;
      outline-color: var(--mdc-theme-primary);
    }

    section.secondary {
      outline-color: var(--mdc-theme-secondary);
    }

    section > div {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 12px 16px;
      clear: right;
    }

    .highlighted {
      outline-style: dotted;
      outline-width: 2px;
    }

    .contrasted {
      background-color: var(--mdc-theme-on-primary);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: clip visible;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 52px;
      padding-left: 0.3em;
    }

    nav {
      float: right;
    }

    mwc-icon {
      vertical-align: middle;
      position: relative;
      top: -0.1em;
      --mdc-icon-size: 1em;
    }
  `;
}
