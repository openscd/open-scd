import Keycloak from 'keycloak-js';
import { CompasSettings } from '../../compas/CompasSettingsElement';

const keycloakInstance = Keycloak({
    url: CompasSettings().compasSettings.keycloakAuthUrl,
    realm: 'compas',
    clientId: 'openscd'
});

export function login() {
    keycloakInstance.init({onLoad: 'login-required'}).then(() => {
        console.log("Logged in as '" + keycloakInstance.subject + "'");
    });
}

export function getJwtToken() {
    return keycloakInstance.token;
}