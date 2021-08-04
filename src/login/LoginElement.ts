import {css, customElement, html, LitElement, property, TemplateResult} from 'lit-element';
import {get, translate} from 'lit-translate';

import {newWizardEvent, Wizard, WizardInput} from '../foundation.js';
import {OpenSCD} from "../open-scd.js";
import {TextFieldBase} from "@material/mwc-textfield/mwc-textfield-base";

import keycloakInstance from './KeycloakManager.js';

@customElement('openscd-login')
export class LoginElement extends LitElement {

  login() {
    keycloakInstance.init({onLoad: 'login-required'}).then(authenticated => {
        keycloakInstance.loadUserInfo().then(userInfo => {
          console.log("Logged in as '" + userInfo.preferred_username + "'")
        });
    });

    return true;
  }

  close(): void {
    // Close the Save Dialog.
    const openScd = <OpenSCD>document.querySelector('open-scd');
    openScd.dispatchEvent(newWizardEvent());
  }

  render(): TemplateResult {
    return html`
      <mwc-textfield dialogInitialFocus id="username"
                     label="${translate('compas.login.username')}" required>
      </mwc-textfield>
      <mwc-textfield dialogInitialFocus id="password" type="password"
                     label="${translate('compas.login.password')}" required>
      </mwc-textfield>`;
  }

  static styles = css`
    :host {
      width: 20vw;
    }

    mwc-textfield {
      margin: 10px;
      width: 100%;
    }
  `
}

export function loginAction() {
  return function (inputs: WizardInput[], wizard: Element) {
    const compasSettingsElement = <LoginElement>wizard.shadowRoot!.querySelector('openscd-login')
    if (compasSettingsElement.login()) {
      compasSettingsElement.close();
    }
    return [];
  };
}

export function loginWizard(): Wizard {
  return [
    {
      title: get('compas.login.name'),
      primary: {
        icon: 'login',
        label: get('login'),
        action: loginAction(),
      },
      content: [
        html`<openscd-login></openscd-login>`,
      ],
    },
  ];
}
