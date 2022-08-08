import { html, property, query, TemplateResult, LitElement } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon'
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { Dialog } from '@material/mwc-dialog';

import { ifImplemented, SclhistoryEntry } from '../foundation.js';
import { iconColors } from '../icons/icons.js';

export default class History extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @query('#historyLog') historyLog!: Dialog;

  private convertToDate(when: string | null): Date | null {
    const convertedTime = new Date(when ?? '');
    if (!isNaN(convertedTime.getTime())) {
      return convertedTime;
    }
    return null;
  }

  private createMessage(
    who: string | null,
    why: string | null
  ): string | undefined {
    let message = who;
    if (message !== null && why !== null) {
      message += ' : ' + why;
    } else if (why !== null) {
      message = why;
    }
    return message ?? undefined;
  }

  private createSclHistoryEntry(
    who: string | null,
    what: string | null,
    why: string | null,
    when: string | null
  ): SclhistoryEntry {
    return {
      kind: 'sclhistory',
      title: what ?? 'UNDEFINED',
      message: this.createMessage(who, why),
      time: this.convertToDate(when),
    };
  }

  get sclHistory(): SclhistoryEntry[] {
    return Array.from(
      this.doc.querySelectorAll(':root > Header > History > Hitem')
    ).map(historyItem => 
      this.createSclHistoryEntry(
        historyItem.getAttribute('who'),
        historyItem.getAttribute('what'),
        historyItem.getAttribute('why'),
        historyItem.getAttribute('when')
      )
    );
  }

  async run(): Promise<void> {
    this.historyLog.open = true;
  }

  renderSclHistoryEntry(entry: SclhistoryEntry): TemplateResult {
    return html` <abbr title="${entry.title}">
      <mwc-list-item
        class="${entry.kind}"
        graphic="icon"
        ?twoline=${!!entry.message}
      >
        <span>
          <tt>${entry.time?.toLocaleString()}</tt>
          ${entry.title}</span
        >
        <span slot="secondary">${entry.message}</span>
        <mwc-icon
          slot="graphic"
          style="--mdc-theme-text-icon-on-background:var(${ifDefined(
            iconColors[entry.kind]
          )})"
          >history_toggle_off</mwc-icon
        >
      </mwc-list-item></abbr
    >`;
  }

  private renderSclHistory(): TemplateResult[] | TemplateResult {
    if (this.sclHistory.length > 0)
      return this.sclHistory
        .slice()
        .reverse()
        .map(this.renderSclHistoryEntry, this);
    else
      return html`<mwc-list-item disabled graphic="icon">
        <span>${translate('log.placeholder')}</span>
        <mwc-icon slot="graphic">info</mwc-icon>
      </mwc-list-item>`;
  }

  render(): TemplateResult {
    if (!this.doc) return html``;
    return html`${ifImplemented(super.render())}
      <style>
        #historyLogContent {
          --mdc-dialog-min-width: 92vw;
        }
      </style>
      <mwc-dialog id="historyLog" heading="${translate('history.name')}">
        <mwc-list id="historyLogContent" wrapFocus>${this.renderSclHistory()}</mwc-list>
        <mwc-button slot="secondaryAction" dialogaction="close"
          >${translate('close')}</mwc-button
        >
      </mwc-dialog>`;
  }
}
