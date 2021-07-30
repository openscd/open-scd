import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { newWizardEvent } from '../foundation.js';
import { createClientLnWizard } from '../wizards/clientln.js';

import { Fab } from '@material/mwc-fab';

/** [[`SubstationEditor`]] subeditor for a `ConductingEquipment` element. */
@customElement('ied-editor')
export class IedEditor extends LitElement {
  @property({ type: Element })
  element!: Element;

  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }

  @query('#connectreport') connectReport!: Fab;

  openCommunicationMapping(): void {
    const sendingIeds = Array.from(
      this.element.closest('SCL')?.querySelectorAll('IED') ?? []
    );
    const wizard = createClientLnWizard(sendingIeds, this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  render(): TemplateResult {
    return html`
      <div id="container" tabindex="0">
        <mwc-icon class="icon">developer_board</mwc-icon>
        <mwc-fab
          id="connectreport"
          mini
          class="menu-item right"
          @click="${() => this.openCommunicationMapping()}"
          icon="add_link"
        ></mwc-fab>
      </div>
      <h4>${this.name}</h4>
    `;
  }

  static styles = css`
    #container {
      color: var(--mdc-theme-on-surface);
      width: 50px;
      height: 50px;
      margin: auto;
      position: relative;
      transition: all 200ms linear;
      user-select: none;
    }

    #container:focus {
      outline: none;
    }

    .icon {
      color: var(--mdc-theme-on-surface);
      --mdc-icon-size: 50px;
      transition: transform 150ms linear, box-shadow 200ms linear;
      outline-color: var(--mdc-theme-primary);
      outline-style: solid;
      outline-width: 0px;
    }

    #container > .icon {
      color: var(--mdc-theme-on-surface);
      width: 50px;
      height: 50px;
      transition: transform 150ms linear, box-shadow 200ms linear;
      outline-color: var(--mdc-theme-primary);
      outline-style: solid;
      outline-width: 0px;
    }

    #container:focus > .icon {
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
    }

    #container:hover > .icon {
      outline: 2px dashed var(--mdc-theme-primary);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    #container:focus-within > .icon {
      outline: 2px solid var(--mdc-theme-primary);
      background: var(--mdc-theme-on-primary);
      transform: scale(0.8);
      transition: transform 200ms linear, box-shadow 250ms linear;
    }

    .menu-item {
      color: var(--mdc-theme-on-surface);
      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 200ms linear;
      position: absolute;
      top: 2px;
      left: 2px;
      pointer-events: none;
      z-index: 1;
      opacity: 0;
    }

    #container:focus-within > .menu-item {
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
        opacity 250ms linear;
      pointer-events: auto;
      opacity: 1;
    }

    #container:focus-within > .menu-item.up {
      transform: translate(0px, -60px);
    }

    #container:focus-within > .menu-item.down {
      transform: translate(0px, 60px);
    }

    #container:focus-within > .menu-item.right {
      transform: translate(60px, 0px);
    }

    #container:focus-within > .menu-item.left {
      transform: translate(-60px, 0px);
    }

    h4 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      opacity: 1;
      transition: opacity 200ms linear;
      text-align: center;
      direction: rtl;
    }

    :host(.moving) #container,
    :host(.moving) h4 {
      opacity: 0.3;
    }
  `;
}
