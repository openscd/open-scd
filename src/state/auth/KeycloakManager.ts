import Keycloak from 'keycloak-js';

const keycloakInstance = Keycloak({
    url: 'http://localhost:8089/auth/',
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