import {
  css,
  customElement,
  html,
  LitElement,
  state,
  TemplateResult,
} from 'lit-element';
import { FullElementPathEvent } from './foundation.js';

@customElement('element-path')
export class ElementPath extends LitElement {

  @state()
  elementNames: string[] = [];

  constructor() {
    super();

    const parentSection = this.closest('section');
    if (parentSection) {
      parentSection.addEventListener('full-element-path', (event: FullElementPathEvent) => {
        this.elementNames = event.detail.elementNames;
      });
    }
  }

  render(): TemplateResult {
    return html`
      <h3>${this.elementNames.join(' / ')}</h3>
    `;
  }

  static styles = css`
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
    }`;
}
