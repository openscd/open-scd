import {
  html,
  css,
  property,
  query,
  TemplateResult,
  LitElement,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { Dialog } from '@material/mwc-dialog';

export default class SclHistoryPlugin extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  @query('#historyLog') historyLog!: Dialog;

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

  get sclHistory(): Element[] {
    if (this.doc) {
      return Array.from(
        this.doc.querySelectorAll(':root > Header > History > Hitem')
      );
    }
    return [];
  }

  async run(): Promise<void> {
    this.historyLog.open = true;
  }

  renderSclHistoryEntry(element: Element): TemplateResult {
    const message = this.createMessage(
      element.getAttribute('who'),
      element.getAttribute('why')
    );
    const title = element.getAttribute('what');
    return html` <abbr title="${title}">
      <mwc-list-item class="sclHistory" ?twoline=${!!message}>
        <span>
          <tt>${element.getAttribute('when')}</tt>
          ${title}</span
        >
        <span slot="secondary">${message}</span>
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
      return html`<mwc-list-item disabled>
        <span>${translate('history.noEntries')}</span>
      </mwc-list-item>`;
  }

  render(): TemplateResult {
    return html` <mwc-dialog
      id="historyLog"
      heading="${translate('history.name')}"
    >
      <mwc-list id="historyLogContent" wrapFocus
        >${this.renderSclHistory()}</mwc-list
      >
      <mwc-button slot="secondaryAction" dialogaction="close"
        >${translate('close')}</mwc-button
      >
    </mwc-dialog>`;
  }

  static styles = css`
    .sclHistory {
      display: flex;
    }
    #historyLog {
      --mdc-dialog-min-width: 92vw;
    }
    abbr {
      text-decoration: none;
    }
  `;
}
