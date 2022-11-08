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

  function createCreateRequest(
    sclName: string,
    comment: string | null,
    doc: Document
  ): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
               <sds:CreateRequest xmlns:sds="${SDS_NAMESPACE}">
                   <sds:Name>${sclName}</sds:Name>
                   <sds:Comment>${comment ?? ''}</sds:Comment>
                   <sds:SclData><![CDATA[${formatXml(
                     new XMLSerializer().serializeToString(
                       doc.documentElement))}]]></sds:SclData>
               </sds:CreateRequest>`;
  }

  function createUpdateRequest(
    changeSet: ChangeSet,
    comment: string | null,
    doc: Document
  ): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
               <sds:UpdateRequest xmlns:sds="${SDS_NAMESPACE}">
                   <sds:ChangeSet>${changeSet}</sds:ChangeSet>
                   <sds:Comment>${comment ?? ''}</sds:Comment>
                   <sds:SclData><![CDATA[${formatXml(
                     new XMLSerializer().serializeToString(
                       doc.documentElement))}]]></sds:SclData>
               </sds:UpdateRequest>`;
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

    getSclDocument(type: string, id: string): Promise<Document> {
      const sclUrl =
        getSclDataServiceUrl() + '/scl/v1/' + type + '/' + id;
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml)
        .then(extractSclFromResponse);
    },

    getSclDocumentVersion(
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
      const sclUrl = getSclDataServiceUrl() + '/scl/v1/' + type;
      return fetch(sclUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: createCreateRequest(body.sclName, body.comment, body.doc),
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
      const sclUrl = getSclDataServiceUrl() + '/scl-ws/v1/' + type + '/create';
      Websockets(element, 'CompasSclDataService').execute(
        getWebsocketUri(sclUrl),
        createCreateRequest(body.sclName, body.comment, body.doc),
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
      const sclUrl =
        getSclDataServiceUrl() + '/scl/v1/' + type + '/' + id;
      return fetch(sclUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: createUpdateRequest(body.changeSet, body.comment, body.doc),
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
      const sclUrl = getSclDataServiceUrl() + '/scl-ws/v1/' + type + '/update/' + id;
      Websockets(element, 'CompasSclDataService').execute(
        getWebsocketUri(sclUrl),
        createUpdateRequest(body.changeSet, body.comment, body.doc),
        async (response: Document) => {
          const scl = await extractSclFromResponse(response);
          callback(scl);
        }
      );
    },
  };
}
