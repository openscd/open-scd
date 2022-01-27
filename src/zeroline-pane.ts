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

import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';
import { IconButton } from '@material/mwc-icon-button';
import { IconButtonToggle } from '@material/mwc-icon-button-toggle';

import './zeroline/substation-editor.js';
import './zeroline/ied-editor.js';
import { communicationMappingWizard } from './wizards/commmap-wizards.js';
import { gooseIcon, smvIcon, reportIcon } from './icons.js';
import { isPublic, newWizardEvent } from './foundation.js';
import { selectGseControlWizard } from './wizards/gsecontrol.js';
import { wizards } from './wizards/wizard-library.js';
import { getAttachedIeds } from './zeroline/foundation.js';
import { selectSampledValueControlWizard } from './wizards/sampledvaluecontrol.js';
import { Settings } from './Setting.js';
import { selectReportControlWizard } from './wizards/reportcontrol.js';

function shouldShowIEDs(): boolean {
  return localStorage.getItem('showieds') === 'on';
}

function setShowIEDs(value: Settings['showieds']) {
  localStorage.setItem('showieds', value);
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
  @query('#smvcontrol') smvcontrol!: IconButton;
  @query('#reportcontrol') reportcontrol!: IconButton;
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

  openReportControlSelection(): void {
    this.dispatchEvent(
      newWizardEvent(() => selectReportControlWizard(this.doc.documentElement))
    );
  }

  openGseControlSelection(): void {
    this.dispatchEvent(
      newWizardEvent(() => selectGseControlWizard(this.doc.documentElement))
    );
  }

  openSampledValueControlSelection(): void {
    this.dispatchEvent(
      newWizardEvent(() =>
        selectSampledValueControlWizard(this.doc.documentElement)
      )
    );
  }

  toggleShowIEDs(): void {
    if (shouldShowIEDs()) setShowIEDs('off');
    else setShowIEDs('on');
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
          <abbr title="${translate('zeroline.commmap')}">
            <mwc-icon-button
              id="commmap"
              icon="link"
              @click=${() => this.openCommunicationMapping()}
            ></mwc-icon-button>
          </abbr>
          <abbr title="${translate('zeroline.reportcontrol')}"
            ><mwc-icon-button
              id="reportcontrol"
              @click="${() => this.openReportControlSelection()}"
              >${reportIcon}</mwc-icon-button
            ></abbr
          >
          <abbr title="${translate('zeroline.gsecontrol')}"
            ><mwc-icon-button
              id="gsecontrol"
              @click="${() => this.openGseControlSelection()}"
              >${gooseIcon}</mwc-icon-button
            ></abbr
          >
          <abbr title="${translate('zeroline.smvcontrol')}"
            ><mwc-icon-button
              id="smvcontrol"
              @click="${() => this.openSampledValueControlSelection()}"
              >${smvIcon}</mwc-icon-button
            ></abbr
          >
        </nav>
      </h1>
      ${this.renderIedContainer()}
      ${this.doc?.querySelector(':root > Substation')
        ? html`<section>
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
    h1 {
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

    section {
      padding: 8px 12px 16px;
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
      grid-template-columns: repeat(auto-fit, minmax(128px, auto));
    }
  `;
}
