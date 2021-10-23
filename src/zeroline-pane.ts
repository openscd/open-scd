import {
  LitElement,
  html,
  TemplateResult,
  property,
  customElement,
  css,
  query,
} from 'lit-element';
import { translate } from 'lit-translate';

import { isPublic, newWizardEvent } from './foundation.js';
import { getAttachedIeds, shouldShowFunctions } from './zeroline/foundation.js';

import './zeroline/substation-editor.js';
import './zeroline/ied-editor.js';
import './zeroline/function-editor.js';
import './zeroline/subfunction-editor.js';

import { Settings } from './Setting.js';
import { wizards } from './wizards/wizard-library.js';
import { communicationMappingWizard } from './wizards/commmap-wizards.js';
import { IconButton } from '@material/mwc-icon-button';
import { IconButtonToggle } from '@material/mwc-icon-button-toggle';
import { selectGseControlWizard } from './wizards/gsecontrol.js';
import { gooseIcon } from './icons.js';

function shouldShowIEDs(): boolean {
  return localStorage.getItem('showieds') === 'on';
}

function setShowIEDs(value: Settings['showieds']) {
  localStorage.setItem('showieds', value);
}

function setShowFunctions(value: 'on' | 'off') {
  localStorage.setItem('showfunctions', value);
}

/** [[`Zeroline`]] pane for displaying `Substation` and/or `IED` sections. */
@customElement('zeroline-pane')
export class ZerolinePane extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Boolean })
  readonly = false;

  @property({ attribute: false })
  getAttachedIeds?: (element: Element) => Element[] = () => [];

  @query('#commmap') commmap!: IconButton;
  @query('#showieds') showieds!: IconButtonToggle;
  @query('#gsecontrol') gsecontrol!: IconButton;
  @query('#createsubstation') createsubstation!: IconButton;

  openCommunicationMapping(): void {
    const wizard = communicationMappingWizard(this.doc);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
  openCreateSubstationWizard(): void {
    const wizard = wizards['Substation'].create(this.doc.documentElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  openGseControlSelection(): void {
    const wizard = selectGseControlWizard(this.doc.documentElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  toggleShowIEDs(): void {
    if (shouldShowIEDs()) setShowIEDs('off');
    else setShowIEDs('on');
    this.requestUpdate();
  }

  toggleShowFunctions(): void {
    if (shouldShowFunctions()) setShowFunctions('off');
    else setShowFunctions('on');
    this.requestUpdate();
  }

  renderIedContainer(): TemplateResult {
    this.getAttachedIeds = shouldShowIEDs()
      ? getAttachedIeds(this.doc)
      : () => [];
    const ieds = this.getAttachedIeds?.(this.doc.documentElement) ?? [];

    return ieds.length
      ? html`<div id="iedcontainer">
          ${ieds.map(ied => html`<ied-editor .element=${ied}></ied-editor>`)}
        </div>`
      : html``;
  }

  render(): TemplateResult {
    return html` <h1>
        <nav>
          <abbr title="${translate('add')}">
            <mwc-icon-button
              id="createsubstation"
              icon="playlist_add"
              @click=${() => this.openCreateSubstationWizard()}
            ></mwc-icon-button>
          </abbr>
        </nav>
        <nav>
          <abbr title="${translate('zeroline.showieds')}">
            <mwc-icon-button-toggle
              ?on=${shouldShowIEDs()}
              @click=${() => this.toggleShowIEDs()}
              id="showieds"
              onIcon="developer_board"
              offIcon="developer_board_off"
            ></mwc-icon-button-toggle>
          </abbr>
          <abbr title="${translate('zeroline.showfunctions')}">
            <mwc-icon-button-toggle
              ?on=${shouldShowFunctions()}
              @click=${() => this.toggleShowFunctions()}
              id="showfunctions"
              onIcon="layers"
              offIcon="layers_clear"
            ></mwc-icon-button-toggle>
          </abbr>
          <abbr title="${translate('zeroline.commmap')}">
            <mwc-icon-button
              id="commmap"
              icon="link"
              @click=${() => this.openCommunicationMapping()}
            ></mwc-icon-button>
          </abbr>
          <abbr title="${translate('zeroline.gsecontrol')}"
            ><mwc-icon-button
              id="gsecontrol"
              @click="${() => this.openGseControlSelection()}"
              >${gooseIcon}</mwc-icon-button
            ></abbr
          >
        </nav>
      </h1>
      ${this.renderIedContainer()}
      ${this.doc?.querySelector(':root > Substation')
        ? html`<section tabindex="0">
            ${Array.from(this.doc.querySelectorAll('Substation') ?? [])
              .filter(isPublic)
              .map(
                substation =>
                  html`<substation-editor
                    .element=${substation}
                    .getAttachedIeds=${this.getAttachedIeds}
                    ?readonly=${this.readonly}
                  ></substation-editor>`
              )}
          </section>`
        : html`<h1>
            <span style="color: var(--base1)"
              >${translate('substation.missing')}</span
            >
          </h1>`}`;
  }

  static styles = css`
    h1,
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

    h1 > nav,
    h1 > abbr > mwc-icon-button {
      float: right;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    #iedcontainer {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }
  `;
}
