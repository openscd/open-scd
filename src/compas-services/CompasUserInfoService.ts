import {CompasSettings} from "../compas/CompasSettings.js";
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
    },

    ping(): Promise<string> {
      const pingUrl = getCompasSettings().sclDataServiceUrl + '/q/health/ready';
      return fetch(pingUrl)
        .catch(handleError)
        .then(handleResponse);
    }
  }
}
