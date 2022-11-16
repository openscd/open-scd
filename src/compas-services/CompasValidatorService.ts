import { CompasSettings } from '../compas/CompasSettings.js';
import { Websockets } from './Websockets.js';
import {
  getWebsocketUri,
  handleError,
  handleResponse,
  parseXml,
} from './foundation.js';

export const SVS_NAMESPACE =
  'https://www.lfenergy.org/compas/SclValidatorService/v1';

export function CompasSclValidatorService() {
  function getSclValidatorServiceUrl(): string {
    return CompasSettings().compasSettings.sclValidatorServiceUrl;
  }

  function createRequest(doc: Document): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
            <svs:SclValidateRequest xmlns:svs="${SVS_NAMESPACE}">
              <svs:SclData><![CDATA[${new XMLSerializer().serializeToString(
                doc.documentElement
              )}]]></svs:SclData>
            </svs:SclValidateRequest>`;
  }

  return {
    useWebsocket(): boolean {
      return CompasSettings().useWebsockets();
    },

    validateSCLUsingRest(type: string, doc: Document): Promise<Document> {
      const svsUrl = getSclValidatorServiceUrl() + '/validate/v1/' + type;
      return fetch(svsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: createRequest(doc),
      })
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    validateSCLUsingWebsockets(
      element: Element,
      type: string,
      doc: Document,
      callback: (response: Document) => void,
      onCloseCallback: () => void
    ) {
      Websockets(element, 'CompasValidatorService').execute(
        getWebsocketUri(getSclValidatorServiceUrl()) +
          '/validate-ws/v1/' +
          type,
        createRequest(doc),
        callback,
        onCloseCallback
      );
    },

    listNsdocFiles(): Promise<Document> {
      const svsUrl = getSclValidatorServiceUrl() + '/nsdoc/v1';
      return fetch(svsUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    getNsdocFile(id: string): Promise<Document> {
      const svsUrl = getSclValidatorServiceUrl() + '/nsdoc/v1/' + id;
      return fetch(svsUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },
  };
}
