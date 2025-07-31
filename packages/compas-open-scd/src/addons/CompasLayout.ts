import {
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';
import { get } from 'lit-translate';

import type { UserInfoEvent } from '../compas/foundation';

import { OscdLayout } from '@openscd/open-scd/src/addons/Layout.js';


@customElement('compas-layout')
export class CompasLayout extends OscdLayout {
  @property({ type: String }) username: string | undefined;

  connectedCallback(): void {
    super.connectedCallback();

    this.onUserInfo = this.onUserInfo.bind(this);
    this.host.addEventListener('userinfo', this.onUserInfo);
  }

  private onUserInfo(event: UserInfoEvent) {
    this.username = event.detail.name;
  }

  protected renderActionItems(): TemplateResult {
    return html`
      ${this.username != undefined
                ? html`<span
                    id="userField"
                    slot="actionItems"
                    style="font-family:Roboto"
                    >${get('userinfo.loggedInAs', {
                      name: this.username,
                    })}</span
                  >`
                : ``}
        ${this.menu.map(this.renderActionItem)}
    `;
  }
}
