import {css, customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {translate, translateUnsafeHTML} from "lit-translate";
import {Dialog} from "@material/mwc-dialog";

import {saveDocumentToFile} from "../file.js";
import {getOpenScdElement} from "./foundation.js";

import {CompasUserInfoService} from "../compas-services/CompasUserInfoService.js";
import {newUserInfoEvent} from "../foundation";
import {createLogEvent} from "../compas-services/foundation";

@customElement('compas-session-expiring-dialog')
export class CompasSessionExpiringDialogElement extends LitElement {
  @property({ type: Number })
  expiringSessionWarning: number = 10 * 60 * 1000;
  @property({ type: Number })
  expiredSessionMessage: number = 15 * 60 * 1000;

  private expiringSessionWarningTimer: NodeJS.Timeout | null = null;

  static getElement(): CompasSessionExpiringDialogElement {
    return (<CompasSessionExpiringDialogElement>getOpenScdElement()
      .shadowRoot!.querySelector('compas-session-expiring-dialog'));
  }

  resetTimer(): void {
    if (this.expiringSessionWarningTimer) {
      clearTimeout(this.expiringSessionWarningTimer);
    }
    this.expiringSessionWarningTimer = setTimeout(showExpiringSessionWarning, this.expiringSessionWarning);
  }

  private getDialog(): Dialog {
    return <Dialog>this.shadowRoot!.querySelector('mwc-dialog[id="compasSessionExpiringDialog"]');
  }

  show(): void {
    const expiringDialog = this.getDialog();
    if (expiringDialog && !expiringDialog.open) {
      expiringDialog.show();
    }
  }

  close(): void {
    const expiringDialog = this.getDialog();
    if (expiringDialog && expiringDialog.open) {
      expiringDialog.close();
    }
  }

  render(): TemplateResult {
    return html`
      <mwc-dialog id="compasSessionExpiringDialog"
                  heading="${translate('compas.session.headingExpiring')}"
                  scrimClickAction="">
        <div>${translateUnsafeHTML('compas.session.explainExpiring',
          {timeTillExpire: ((this.expiredSessionMessage - this.expiringSessionWarning) / 60 / 1000),
           expiringSessionWarning: (this.expiringSessionWarning / 60 / 1000)})}</div>
        <mwc-button slot="primaryAction" dialogAction="close">
          ${translate('compas.session.continue')}
        </mwc-button>
      </mwc-dialog>
    `;
  }

  static styles = css`
    #compasSessionExpiringDialog {
      --mdc-dialog-max-width: 800px;
    }
  `
}

@customElement('compas-session-expired-dialog')
export class CompasSessionExpiredDialogElement extends LitElement {
  @property({ type: Document })
  doc: XMLDocument | null = null;
  @property({ type: String })
  docName = '';
  @property({ type: Number })
  expiredSessionMessage: number = 15 * 60 * 1000;

  private expiredSessionMessageTimer: NodeJS.Timeout | null = null;

  static getElement(): CompasSessionExpiredDialogElement {
    return (<CompasSessionExpiredDialogElement>getOpenScdElement()
      .shadowRoot!.querySelector('compas-session-expired-dialog'));
  }

  resetTimer(): void {
    if (this.expiredSessionMessageTimer) {
      clearTimeout(this.expiredSessionMessageTimer);
    }
    this.expiredSessionMessageTimer = setTimeout(showExpiredSessionMessage, this.expiredSessionMessage);
  }

  private getDialog(): Dialog {
    return <Dialog>this.shadowRoot!.querySelector('mwc-dialog[id="compasSessionExpiredDialog"]');
  }

  show(): void {
    const expiringDialog = this.getDialog();
    if (expiringDialog && !expiringDialog.open) {
      expiringDialog.show();
    }
  }

  close(): void {
    const expiringDialog = this.getDialog();
    if (expiringDialog && expiringDialog.open) {
      expiringDialog.close();
    }
  }

  save(): void {
    saveDocumentToFile(this.doc, this.docName);
  }

  render(): TemplateResult {
    const expiredSessionMessage = (this.expiredSessionMessage / 60  / 1000);
    return html`
      <mwc-dialog id="compasSessionExpiredDialog"
                  heading="${translate('compas.session.headingExpired')}"
                  scrimClickAction=""
                  escapeKeyAction=""">
        <div>${(this.doc == null) ?
                  translateUnsafeHTML('compas.session.explainExpiredWithoutProject',
                                        {expiredSessionMessage: expiredSessionMessage}) :
                  translateUnsafeHTML('compas.session.explainExpiredWithProject',
                                        {expiredSessionMessage: expiredSessionMessage}) }
        </div>
        ${(this.doc != null) ?
             html `<mwc-button slot="primaryAction"
                               @click=${() => this.save()}
                               ?disabled=${this.doc == null}>
                     ${translate('compas.session.saveProject')}
                   </mwc-button>` :
             html `` }
      </mwc-dialog>
    `;
  }

  static styles = css`
    #compasSessionExpiredDialog {
      --mdc-dialog-max-width: 1024px;
    }
  `
}

export function renderCompasSessionDialogs(doc: Document | null, docName: string): TemplateResult {
  return html `
    <compas-session-expiring-dialog></compas-session-expiring-dialog>
    <compas-session-expired-dialog .doc="${doc}" .docName="${docName}"></compas-session-expired-dialog>
  `;
}

let pingTimer: NodeJS.Timeout | null = null;

function resetKeepAlivePing() {
  // Set timer on null, so next time the ping will be executed again if the user interacts with OpenSCD.
  pingTimer = null;
}

function schedulePing() {
  if (pingTimer === null) {
    // Every minute we will send a Ping to the CoMPAS Services while the user is still active.
    // This to keep the connection alive so long the user is working.
    CompasUserInfoService().ping().finally(() => console.debug('Ping executed.'))
    pingTimer = setTimeout(resetKeepAlivePing, (60 * 1000));
  }
}

function showExpiringSessionWarning() {
  CompasSessionExpiringDialogElement.getElement().show();
}

function showExpiredSessionMessage() {
  CompasSessionExpiringDialogElement.getElement().close();
  CompasSessionExpiredDialogElement.getElement().show();
  unregisterEvents();
}

export function resetTimer(): void {
  CompasSessionExpiringDialogElement.getElement().resetTimer();
  CompasSessionExpiredDialogElement.getElement().resetTimer();
  schedulePing();
}

function unregisterEvents() {
  window.removeEventListener('click', resetTimer);
  window.removeEventListener('keydown', resetTimer);
}

function registerEvents() {
  window.addEventListener('click', resetTimer);
  window.addEventListener('keydown', resetTimer);
}

export function setSessionTimeouts(sessionWarning: number, sessionExpires: number): void {
  const expiringSessionWarning = sessionWarning * 60 * 1000;
  const expiredSessionMessage = sessionExpires * 60 * 1000;

  CompasSessionExpiringDialogElement.getElement().expiringSessionWarning = expiringSessionWarning;
  CompasSessionExpiringDialogElement.getElement().expiredSessionMessage = expiredSessionMessage;
  CompasSessionExpiredDialogElement.getElement().expiredSessionMessage = expiredSessionMessage;
  resetTimer();
  registerEvents();
}

export async function retrieveUserInfo(): Promise<void> {
  await CompasUserInfoService().getCompasUserInfo()
    .then(response => {
      const name = response.querySelectorAll("Name").item(0)?.textContent;
      if (name != null) {
        getOpenScdElement().dispatchEvent(newUserInfoEvent(name));
      }

      const sessionWarning = response.querySelectorAll("SessionWarning").item(0)?.textContent??"15";
      const sessionExpires = response.querySelectorAll("SessionExpires").item(0)?.textContent??"10";
      setSessionTimeouts(parseInt(sessionWarning), parseInt(sessionExpires));
    })
    .catch(reason => {
      createLogEvent(reason);
      setSessionTimeouts(10, 15);
    });
}
retrieveUserInfo();
