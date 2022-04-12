import { CompasSettings } from "../compas/CompasSettings.js";
import {
  createLogEvent,
  handleError,
  handleResponse,
  parseXml
} from "./foundation.js";

export const SVS_NAMESPACE = 'https://www.lfenergy.org/compas/SclValidatorService/v1';

export function CompasSclValidatorService() {
  function getCompasSettings() {
    return CompasSettings().compasSettings;
  }

  function getWebsocketPort(): string {
    if (document.location.port === "") {
      return (document.location.protocol == "http:" ? "80" : "443")
    }
    return document.location.port;
  }

  function getWebsocketUri(): string {
    const sclValidatorServiceUrl = getCompasSettings().sclValidatorServiceUrl;
    if (sclValidatorServiceUrl.startsWith("ws://") || sclValidatorServiceUrl.startsWith("wss://")) {
      return sclValidatorServiceUrl + (sclValidatorServiceUrl.endsWith("/") ? "" : "/");
    }
    if (sclValidatorServiceUrl.startsWith("http://") || sclValidatorServiceUrl.startsWith("https://")) {
      return sclValidatorServiceUrl.replace("http://", "ws://").replace("https://", "wss://")
        + (sclValidatorServiceUrl.endsWith("/") ? "" : "/");
    }

    return (document.location.protocol == "http:" ? "ws://" : "wss://")
      + document.location.hostname  + ":" + getWebsocketPort()
      + sclValidatorServiceUrl + (sclValidatorServiceUrl.endsWith("/") ? "" : "/");
  }

  function createRequest(doc: Document): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
            <svs:SclValidateRequest xmlns:svs="${SVS_NAMESPACE}">
              <svs:SclData><![CDATA[${new XMLSerializer().serializeToString(doc.documentElement)}]]></svs:SclData>
            </svs:SclValidateRequest>`;
  }

  return {
    useWebsocket(): boolean {
      return getCompasSettings().useWebsockets === 'on';
    },

    validateSCLUsingRest(type: string, doc: Document): Promise<Document> {
      const svsUrl = getCompasSettings().sclValidatorServiceUrl + '/validate/v1/' + type;
      return fetch(svsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: createRequest(doc)
      }).catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    validateSCLUsingWebsockets(type: string, doc: Document, callback: (doc: Document) => void) {
      const websocket = new WebSocket(getWebsocketUri() + 'validate-ws/v1/' + type);

      websocket.onopen = () => {
        websocket.send(createRequest(doc));
      };

      websocket.onmessage = (evt) => {
        parseXml(evt.data)
          .then(doc => {
            callback(doc);
            websocket.close();
          })
          .catch(reason => {
            createLogEvent(reason);
            websocket.close();
          });
      };

      websocket.onerror = () => {
        createLogEvent(
          { message: 'Websocket Error',
            type: 'Error'})
        websocket.close();
      };
    },

    listNsdocFiles(): Promise<Document> {
      const svsUrl = getCompasSettings().sclValidatorServiceUrl + '/nsdoc/v1';
      return fetch(svsUrl).catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    getNsdocFile(id: string): Promise<string> {
      const svsUrl = getCompasSettings().sclValidatorServiceUrl + '/nsdoc/v1/' + id;
      return fetch(svsUrl).catch(handleError)
        .then(handleResponse);
    },
  }
}
