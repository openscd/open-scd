import {CompasSettings} from "../compas/CompasSettingsElement.js";

export function CompasUserInfoService() {

  function getCompasSettings() {
    return CompasSettings().compasSettings;
  }

  return {
    getCompasUserInfo(): Promise<Document> {
      const userInfoUrl = getCompasSettings().sclDataServiceUrl + '/common/v1/userinfo';
      return fetch(userInfoUrl)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    }
  }
}
