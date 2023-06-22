import { html, query, state, property, TemplateResult } from 'lit-element';

import { Mixin } from '../foundation.js';
import { EditingElement } from '../Editing.js';

import { CompasUserInfoService } from '../compas-services/CompasUserInfoService.js';

import './CompasSessionExpiringDialog.js';
import './CompasSessionExpiredDialog.js';

import { CompasSessionExpiringDialogElement } from './CompasSessionExpiringDialog.js';
import { CompasSessionExpiredDialogElement } from './CompasSessionExpiredDialog.js';

import { loadNsdocFiles } from './CompasNsdoc.js';
import { retrieveUserInfo } from './CompasUserInfo.js';

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

/** Mixin that add CoMPAS Expire Dialogs and User Info to OpenSCD */
export type CompasingElement = Mixin<typeof Compasing>;

/**
 * @typeParam TBase - a type extending `LitElement`
 * @returns `Base` with Dialogs and User Info from CoMPAS.
 */
export function Compasing<TBase extends new (...args: any[]) => EditingElement>(
  Base: TBase
) {
  class CompasingElement extends Base {
    @state()
    private expiringSessionWarning: number = 10 * 60 * 1000;
    @state()
    private expiredSessionMessage: number = 15 * 60 * 1000;

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

    constructor(...args: any[]) {
      super(...args);

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
      return html`
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
        ${super.render()}
      `;
    }
  }

  return CompasingElement;
}

declare global {
  interface ElementEventMap {
    ['set-session-timeouts']: SetSessionTimeoutsEvent;
  }
}
