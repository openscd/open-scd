import { html, query, state, property, TemplateResult, customElement, LitElement } from 'lit-element';

import { CompasUserInfoService } from '../compas-services/CompasUserInfoService.js';

import '../compas/CompasSessionExpiringDialog.js';
import '../compas/CompasSessionExpiredDialog.js';

import { CompasSessionExpiringDialogElement } from '../compas/CompasSessionExpiringDialog.js';
import { CompasSessionExpiredDialogElement } from '../compas/CompasSessionExpiredDialog.js';

import { loadNsdocFiles } from '../compas/CompasNsdoc.js';
import { retrieveUserInfo } from '../compas/CompasUserInfo.js';

/** Event to handle the Session Expire Timers value */
export interface SetSessionTimeoutsDetail {
  sessionWarning: number;
  sessionExpires: number;
}
export type SetSessionTimeoutsEvent = CustomEvent<SetSessionTimeoutsDetail>;
export function newSetSessionTimeoutsEvent(
  sessionWarning: number,
  sessionExpires: number,
  eventInitDict?: CustomEventInit<Partial<SetSessionTimeoutsDetail>>
): SetSessionTimeoutsEvent {
  return new CustomEvent<SetSessionTimeoutsDetail>('set-session-timeouts', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { sessionWarning, sessionExpires, ...eventInitDict?.detail },
  });
}

@customElement('compas-session')
export class CompasSession extends LitElement {
    @state()
    private expiringSessionWarning: number = 10 * 60 * 1000;
    @state()
    private expiredSessionMessage: number = 15 * 60 * 1000;

    /** The `XMLDocument` to be edited */
    @property({ attribute: false })
    doc: XMLDocument | null = null;
    /** The name of the current [[`doc`]] */
    @property({ type: String }) docName = '';
    /** Index of the last [[`EditorAction`]] applied. */
    @property({ type: Number })
    editCount = -1;

    @query('compas-session-expiring-dialog')
    private expiringDialogElement!: CompasSessionExpiringDialogElement;

    @query('compas-session-expired-dialog')
    private expiredDialogElement!: CompasSessionExpiredDialogElement;

    private pingTimer: NodeJS.Timeout | null = null;
    private expiredSessionMessageTimer: NodeJS.Timeout | null = null;
    private expiringSessionWarningTimer: NodeJS.Timeout | null = null;

    private resetKeepAlivePing() {
        // Set timer on null, so next time the ping will be executed again if the user interacts with OpenSCD.
        this.pingTimer = null;
    }

    private schedulePing() {
        if (this.pingTimer === null) {
        // Every minute we will send a Ping to the CoMPAS Services while the user is still active.
        // This to keep the connection alive so long the user is working.
        CompasUserInfoService()
            .ping()
            .finally(() => console.debug('Ping executed.'));
        this.pingTimer = setTimeout(this.resetKeepAlivePing, 60 * 1000);
        }
    }

    private resetTimer(): void {
        if (this.expiringSessionWarningTimer) {
        clearTimeout(this.expiringSessionWarningTimer);
        }
        this.expiringSessionWarningTimer = setTimeout(() => {
        this.expiringDialogElement.show();
        }, this.expiringSessionWarning);

        if (this.expiredSessionMessageTimer) {
        clearTimeout(this.expiredSessionMessageTimer);
        }
        this.expiredSessionMessageTimer = setTimeout(() => {
        this.expiringDialogElement.close();
        this.expiredDialogElement.show();
        this.unregisterEvents();
        }, this.expiredSessionMessage);

        this.schedulePing();
    }

    private setSessionTimeouts(event: SetSessionTimeoutsEvent) {
        this.expiringSessionWarning = event.detail.sessionWarning * 60 * 1000;
        this.expiredSessionMessage = event.detail.sessionExpires * 60 * 1000;

        this.resetTimer();
        this.registerEvents();
    }

    private registerEvents() {
        this.addEventListener('click', this.resetTimer);
        this.addEventListener('keydown', this.resetTimer);
    }

    private unregisterEvents() {
        this.removeEventListener('click', this.resetTimer);
        this.removeEventListener('keydown', this.resetTimer);

        if (this.pingTimer) {
        clearTimeout(this.pingTimer);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('set-session-timeouts', this.setSessionTimeouts);

        // Just wait a small moment before starting to fetch all kind of info.
        new Promise(resolve => setTimeout(resolve, 100)).then(() => {
        // When the plugin is loaded we will also start retrieving the User Information and prepare the Timeout Panels.
        retrieveUserInfo(this).finally(() =>
            console.info('User info retrieved from CoMPAS')
        );
        // And we will start loading the Nsdoc Files from the Compas Backend Service.
        loadNsdocFiles(this).finally(() =>
            console.info('Nsdoc Files loaded from CoMPAS')
        );
        });
    }

    render(): TemplateResult {
        return html`<slot></slot>
        <compas-session-expiring-dialog
            .expiringSessionWarning="${this.expiringSessionWarning}"
            .expiredSessionMessage="${this.expiredSessionMessage}"
        >
        </compas-session-expiring-dialog>
        <compas-session-expired-dialog
            .expiredSessionMessage="${this.expiredSessionMessage}"
            .doc="${this.doc}"
            .editCount=${this.editCount}
            .docName="${this.docName}"
        >
        </compas-session-expired-dialog>
        `;
    }
}



declare global {
  interface ElementEventMap {
    ['set-session-timeouts']: SetSessionTimeoutsEvent;
  }
}
