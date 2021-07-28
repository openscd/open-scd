import {css, customElement, html, LitElement, property, TemplateResult} from 'lit-element';
import {get, translate} from 'lit-translate';

import {newWizardEvent, Wizard, WizardInput} from '../foundation.js';
import {OpenSCD} from "../open-scd.js";
import {TextFieldBase} from "@material/mwc-textfield/mwc-textfield-base";

// import Keycloak from "keycloak-connect";
// import session from "express-session";

@customElement('keycloak-login')
export class KeycloakLoginElement extends LitElement {
  login(): boolean {
    console.log('Login');
    console.log(this.getUsernameField().value);
    console.log(this.getPasswordField().value);

    // let kcConfig = {
    //   "realm": "compas",
    //   "auth-server-url": "http://localhost:8089/auth/",
    //   "ssl-required": "external",
    //   "resource": "open-scd",
    //   "verify-token-audience": true,
    //   "credentials": {
    //     "secret": "ae172d6e-4caf-4239-997a-4f0c661cad75"
    //   },
    //   "use-resource-role-mappings": true,
    //   "confidential-port": 0,
    //   "policy-enforcer": {}
    // };

    // let memoryStore = new session.MemoryStore();
    // let keycloak = new Keycloak({ store: memoryStore }, kcConfig);
    
    return true;
  }

  getUsernameField(): TextFieldBase {
    return <TextFieldBase>this.shadowRoot!.querySelector('mwc-textfield[id="username"]');
  }

  getPasswordField(): TextFieldBase {
    return <TextFieldBase>this.shadowRoot!.querySelector('mwc-textfield[id="password"]');
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
    const compasSettingsElement = <KeycloakLoginElement>wizard.shadowRoot!.querySelector('keycloak-login')
    if (compasSettingsElement.login()) {
      compasSettingsElement.close();
    }
    return [];
  };
}

export function keycloakLoginWizard(): Wizard {
  return [
    {
      title: get('compas.login.name'),
      primary: {
        icon: 'login',
        label: get('login'),
        action: loginAction(),
      },
      content: [
        html`<keycloak-login></keycloak-login>`,
      ],
    },
  ];
}
