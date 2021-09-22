import {CompasSettings} from "../compas/CompasSettingsElement.js";
import {handleError, handleResponse, parseXml} from "./foundation.js";

export function CompasUserInfoService() {

  function getCompasSettings() {
    return CompasSettings().compasSettings;
  }

  return {
    getCompasUserInfo(): Promise<Document> {
      const userInfoUrl = getCompasSettings().sclDataServiceUrl + '/common/v1/userinfo';
      return fetch(userInfoUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    }
  }
}
