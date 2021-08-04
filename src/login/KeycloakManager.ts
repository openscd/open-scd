import Keycloak from 'keycloak-js';

const keycloakInstance = Keycloak({
    url: 'http://localhost:8089/auth/',
    realm: 'compas',
    clientId: 'openscd'
});

export default keycloakInstance;