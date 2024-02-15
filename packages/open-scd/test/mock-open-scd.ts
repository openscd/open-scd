import {
  customElement,
  TemplateResult,
  html,
  queryAssignedNodes,
} from 'lit-element';
import { OpenSCD } from '../src/open-scd.js';

@customElement('mock-open-scd')
export class MockOpenSCD extends OpenSCD {
  @queryAssignedNodes()
  _plugins!: Array<HTMLElement>;

  renderHosting(): TemplateResult {
    return html`<slot></slot>`;
  }

  getPlugin<T extends HTMLElement>(name: string): T | undefined {
    return this._plugins.find(
      p => p.tagName.toLowerCase() === name.toLowerCase()
    ) as T | undefined;
  }

  getActivePlugin<T extends HTMLElement>(): T {
    return this._plugins[0]! as T;
  }
}
