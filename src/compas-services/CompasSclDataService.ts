import { formatXml } from '../file.js';

import { CompasSettings } from '../compas/CompasSettings.js';
import {
  extractSclFromResponse, getWebsocketUri,
  handleError,
  handleResponse,
  parseXml
} from './foundation.js';
import { Websockets } from './Websockets.js';

export const SDS_NAMESPACE =
  'https://www.lfenergy.org/compas/SclDataService/v1';

export enum ChangeSet {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  PATCH = 'PATCH',
}

export interface CreateRequestBody {
  sclName: string;
  comment: string | null;
  doc: Document;
}

export interface UpdateRequestBody {
  changeSet: ChangeSet;
  comment: string | null;
  doc: Document;
}

export function CompasSclDataService() {
  function getSclDataServiceUrl(): string {
    return CompasSettings().compasSettings.sclDataServiceUrl;
  }

  return {
    useWebsocket(): boolean {
      return CompasSettings().useWebsockets();
    },

    listSclTypes(): Promise<Document> {
      const sclUrl =
        getSclDataServiceUrl() + '/common/v1/type/list';
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    listSclTypesAndOrder(): Promise<Element[]> {
      return this.listSclTypes().then(xmlResponse => {
        return Array.from(xmlResponse.querySelectorAll('*|Type') ?? []).sort(
          (type1, type2) => {
            const description1 =
              type1
                .getElementsByTagNameNS(SDS_NAMESPACE, 'Description')!
                .item(0)!.textContent ?? '';
            const description2 =
              type2
                .getElementsByTagNameNS(SDS_NAMESPACE, 'Description')!
                .item(0)!.textContent ?? '';
            return description1.localeCompare(description2);
          }
        );
      });
    },

    listScls(type: string): Promise<Document> {
      const sclUrl =
        getSclDataServiceUrl() + '/scl/v1/' + type + '/list';
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    listVersions(type: string, id: string): Promise<Document> {
      const sclUrl =
        getSclDataServiceUrl() +
        '/scl/v1/' +
        type +
        '/' +
        id +
        '/versions';
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    getSclDocumentUsingRest(
      type: string,
      id: string
    ): Promise<Document> {
      const sclUrl =
        getSclDataServiceUrl() + '/scl/v1/' + type + '/' + id;
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml)
        .then(extractSclFromResponse);
    },

    getSclDocumentUsingWebsockets(
      element: Element,
      type: string,
      id: string,
      callback: (scl: Document) => void,
    ) {
      const request =
        `<?xml version="1.0" encoding="UTF-8"?>
         <sds:GetWsRequest xmlns:sds="${SDS_NAMESPACE}">
           <sds:Id>${id}</sds:Id>
         </sds:GetWsRequest>`;

      const sclUrl = getSclDataServiceUrl() + '/scl-ws/v1/' + type + '/get';
      Websockets(element, 'CompasSclDataService').execute(
        getWebsocketUri(sclUrl),
        request,
        async (response: Document) => {
          const scl = await extractSclFromResponse(response);
          callback(scl);
        }
      );
    },

    getSclDocumentVersionUsingRest(
      type: string,
      id: string,
      version: string
    ): Promise<Document> {
      const sclUrl =
        getSclDataServiceUrl() +
        '/scl/v1/' +
        type +
        '/' +
        id +
        '/' +
        version;
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml)
        .then(extractSclFromResponse);
    },

    getSclDocumentVersionUsingWebsockets(
      element: Element,
      type: string,
      id: string,
      version: string,
      callback: (scl: Document) => void,
    ) {
      const request =
        `<?xml version="1.0" encoding="UTF-8"?>
         <sds:GetVersionWsRequest xmlns:sds="${SDS_NAMESPACE}">
           <sds:Id>${id}</sds:Id>
           <sds:Version>${version}</sds:Version>
         </sds:GetVersionWsRequest>`;

      const sclUrl = getSclDataServiceUrl() + '/scl-ws/v1/' + type + '/get-version';
      Websockets(element, 'CompasSclDataService').execute(
        getWebsocketUri(sclUrl),
        request,
        async (response: Document) => {
          const scl = await extractSclFromResponse(response);
          callback(scl);
        }
      );
    },

    deleteSclDocumentVersion(
      type: string,
      id: string,
      version: string
    ): Promise<string> {
      const sclUrl =
        getSclDataServiceUrl() +
        '/scl/v1/' +
        type +
        '/' +
        id +
        '/' +
        version;
      return fetch(sclUrl, { method: 'DELETE' })
        .catch(handleError)
        .then(handleResponse);
    },

    deleteSclDocument(type: string, id: string): Promise<string> {
      const sclUrl =
        getSclDataServiceUrl() + '/scl/v1/' + type + '/' + id;
      return fetch(sclUrl, { method: 'DELETE' })
        .catch(handleError)
        .then(handleResponse);
    },

    addSclDocumentUsingRest(type: string, body: CreateRequestBody): Promise<Document> {
      const request =
        `<?xml version="1.0" encoding="UTF-8"?>
         <sds:CreateRequest xmlns:sds="${SDS_NAMESPACE}">
            <sds:Name>${body.sclName}</sds:Name>
            <sds:Comment>${body.comment ?? ''}</sds:Comment>
            <sds:SclData><![CDATA[${formatXml(
               new XMLSerializer().serializeToString(
                 body.doc.documentElement))}]]></sds:SclData>
         </sds:CreateRequest>`;

      const sclUrl = getSclDataServiceUrl() + '/scl/v1/' + type;
      return fetch(sclUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: request,
      })
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml)
        .then(extractSclFromResponse);
    },

    addSclDocumentUsingWebsockets(
      element: Element,
      type: string,
      body: CreateRequestBody,
      callback: (scl: Document) => void,
    ) {
      const request =
        `<?xml version="1.0" encoding="UTF-8"?>
         <sds:CreateWsRequest xmlns:sds="${SDS_NAMESPACE}">
           <sds:Name>${body.sclName}</sds:Name>
           <sds:Comment>${body.comment ?? ''}</sds:Comment>
           <sds:SclData><![CDATA[${formatXml(
             new XMLSerializer().serializeToString(
               body.doc.documentElement))}]]></sds:SclData>
         </sds:CreateWsRequest>`;

      const sclUrl = getSclDataServiceUrl() + '/scl-ws/v1/' + type + '/create';
      Websockets(element, 'CompasSclDataService').execute(
        getWebsocketUri(sclUrl),
        request,
        async (response: Document) => {
          const scl = await extractSclFromResponse(response);
          callback(scl);
        }
      );
    },

    updateSclDocumentUsingRest(
      type: string,
      id: string,
      body: UpdateRequestBody
    ): Promise<Document> {
      const request =
        `<?xml version="1.0" encoding="UTF-8"?>
         <sds:UpdateRequest xmlns:sds="${SDS_NAMESPACE}">
           <sds:ChangeSet>${body.changeSet}</sds:ChangeSet>
           <sds:Comment>${body.comment ?? ''}</sds:Comment>
           <sds:SclData><![CDATA[${formatXml(
             new XMLSerializer().serializeToString(
               body.doc.documentElement))}]]></sds:SclData>
         </sds:UpdateRequest>`;

      const sclUrl =
        getSclDataServiceUrl() + '/scl/v1/' + type + '/' + id;
      return fetch(sclUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: request,
      })
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml)
        .then(extractSclFromResponse);
    },

    updateSclDocumentUsingWebsockets(
      element: Element,
      type: string,
      id: string,
      body: UpdateRequestBody,
      callback: (scl: Document) => void,
    ) {
      const request =
        `<?xml version="1.0" encoding="UTF-8"?>
         <sds:UpdateWsRequest xmlns:sds="${SDS_NAMESPACE}">
           <sds:Id>${id}</sds:Id>
           <sds:ChangeSet>${body.changeSet}</sds:ChangeSet>
           <sds:Comment>${body.comment ?? ''}</sds:Comment>
           <sds:SclData><![CDATA[${formatXml(
          new XMLSerializer().serializeToString(
            body.doc.documentElement))}]]></sds:SclData>
         </sds:UpdateWsRequest>`

      const sclUrl = getSclDataServiceUrl() + '/scl-ws/v1/' + type + '/update';
      Websockets(element, 'CompasSclDataService').execute(
        getWebsocketUri(sclUrl),
        request,
        async (response: Document) => {
          const scl = await extractSclFromResponse(response);
          callback(scl);
        }
      );
    },
  };
}
