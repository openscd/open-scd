import Keycloak from 'keycloak-js';
import { CompasSettings } from '../../compas/CompasSettingsElement.js';

const keycloakInstance = Keycloak({
    url: CompasSettings().compasSettings.keycloakAuthUrl,
    realm: 'compas',
    clientId: 'openscd'
});
keycloakInstance.init({}).then((authenticated) => {
  if (authenticated) {
    console.log("logged in as '" + keycloakInstance.subject + "'.");
  } else {
    console.log("Not logged in, first login to CoMPAS");
  }
});

export function login() {
  keycloakInstance.login();
}

export function getJwtToken() {
    return keycloakInstance.token;
}
