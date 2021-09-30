import {CompasSettings} from "../compas/CompasSettings.js";
import {handleError, handleResponse, parseXml} from "./foundation.js";

export const SDS_NAMESPACE = 'https://www.lfenergy.org/compas/SclDataService/v1';

export enum ChangeSet {
  MAJOR = "MAJOR",
  MINOR = "MINOR",
  PATCH = "PATCH",
}

export interface CreateRequestBody {
  sclName: string,
  comment: string,
  doc: Document
}

export interface UpdateRequestBody {
  changeSet: ChangeSet,
  comment: string,
  doc: Document
}

export function CompasSclDataService() {

  function getCompasSettings() {
    return CompasSettings().compasSettings;
  }

  return {
    listSclTypes(): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/common/v1/type/list';
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    listSclTypesAndOrder(): Promise<Element[]> {
      return this.listSclTypes()
        .then(xmlResponse => {
          return Array.from(xmlResponse.querySelectorAll('*|Type') ?? [])
            .sort((type1, type2) => {
              const description1 = type1.getElementsByTagNameNS(SDS_NAMESPACE, "Description")!.item(0)!.textContent ?? "";
              const description2 = type2.getElementsByTagNameNS(SDS_NAMESPACE, "Description")!.item(0)!.textContent ?? "";
              return description1.localeCompare(description2)
            });
        })
    },

    listScls(type: string): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/list';
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    listVersions(type: string, id: string): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id + "/versions";
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    getSclDocument(type: string, id: string): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id;
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    getSclDocumentVersion(type: string, id: string, version: string): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id + '/' + version;
      return fetch(sclUrl)
        .catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    deleteSclDocumentVersion(type: string, id: string, version: string): Promise<string> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id + '/' + version;
      return fetch(sclUrl, {method: 'DELETE'})
        .catch(handleError)
        .then(handleResponse);
    },

    deleteSclDocument(type: string, id: string): Promise<string> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id;
      return fetch(sclUrl, {method: 'DELETE'})
        .catch(handleError)
        .then(handleResponse);
    },

    addSclDocument(type: string, body: CreateRequestBody): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase();
      return fetch(sclUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: `<?xml version="1.0" encoding="UTF-8"?>
               <sds:CreateRequest xmlns:sds="${SDS_NAMESPACE}">
                   <sds:Name>${body.sclName}</sds:Name>
                   <sds:Comment>${body.comment}</sds:Comment>
                   ${new XMLSerializer().serializeToString(body.doc.documentElement)}
               </sds:CreateRequest>`
      }).catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    updateSclDocument(type: string, id: string, body: UpdateRequestBody): Promise<string> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id;
      return fetch(sclUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: `<?xml version="1.0" encoding="UTF-8"?>
               <sds:UpdateRequest xmlns:sds="${SDS_NAMESPACE}">
                   <sds:ChangeSet>${body.changeSet}</sds:ChangeSet>
                   <sds:Comment>${body.comment}</sds:Comment>
                   ${new XMLSerializer().serializeToString(body.doc.documentElement)}
               </sds:UpdateRequest>`
      }).catch(handleError)
        .then(handleResponse);
    }
  }
}
