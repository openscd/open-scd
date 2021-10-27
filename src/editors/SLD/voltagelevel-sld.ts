import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import { getChildElementsByTagName } from '../../foundation.js';
import { getPosition, SldElement } from './foundation.js';

function isBusBar(bay: Element): boolean {
  return (
    bay.children.length === 1 && bay.children[0].tagName === 'ConnectivityNode'
  );
}

@customElement('voltagelevel-sld')
export class SubstationSld extends LitElement {
  @property()
  element!: Element;
  @property()
  @property()
  get busbars(): SldElement[] {
    return getChildElementsByTagName(this.element, 'Bay')
      .filter(bay => isBusBar(bay))
      .map(bay => {
        const [x, y] = getPosition(bay);
        return { element: bay, pos: { x, y } };
      });
  }

  @property()
  get feeders(): SldElement[] {
    return getChildElementsByTagName(this.element, 'Bay')
      .filter(bay => !isBusBar(bay))
      .map(bay => {
        const [x, y] = getPosition(bay);
        return { element: bay, pos: { x, y } };
      });
  }

  render(): TemplateResult {
    return html`<section class="container">
      <div class="container bay"></div>
      <div
        class="container"
        style="grid-template-rows: repeat(${this.busbars.length},50px);"
      >
        ${this.busbars.map(busbar => html`<busbar-sld .busBarName=${busbar.element.getAttribute('name')}></busbar-sld>`)}
      </div>
      <div class="container bay">
        ${this.feeders.map(
          feeder => html`<bay-sld .element=${feeder.element} downer></bay-sld>`
        )}
      </div>
    </section>`;
  }

  static styles = css`
    .container {
      display: grid;
      grip-gap: 50px;
      padding: 50px;
    }

    .container:hover {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .container:focus-within {
      outline: 2px solid var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .container.bay {
      display: flex;
    }
  `;
}
