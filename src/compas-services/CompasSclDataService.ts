import {CompasSettings} from "../compas/CompasSettingsElement.js";
import {ChangeSet} from "../compas/CompasChangeSet.js";

export const SDS_NAMESPACE = 'https://www.lfenergy.org/compas/SclDataService/v1';

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
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
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
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    },

    listVersions(type: string, id: string): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id + "/versions";
      return fetch(sclUrl)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    },

    getSclDocument(type: string, id: string): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id;
      return fetch(sclUrl)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    },

    getSclDocumentVersion(type: string, id: string, version: string): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id + '/' + version;
      return fetch(sclUrl)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
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
      })
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    },

    updateSclDocument(type: string, id: string, body: UpdateRequestBody): Promise<Response> {
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
      })
    }
  }
}
