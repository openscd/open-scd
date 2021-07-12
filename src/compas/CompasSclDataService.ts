import {ChangeSet} from "./CompasChangeSet.js";
import {CompasSettings} from "./CompasSettingsElement.js";

export const SDS_NAMESPACE = 'https://www.lfenergy.org/compas/SclDataService';

export interface CreateRequestBody {
  sclName: string,
  doc: Document
}

export interface UpdateRequestBody {
  changeSet: ChangeSet,
  doc: Document
}

export function CompasSclDataService() {

  function getCompasSettings() {
    return CompasSettings().compasSettings;
  }

  return {
    listSclTypes(): Promise<Document> {
      return fetch(getCompasSettings().sclDataServiceUrl + '/common/v1/type/list')
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
      return fetch(getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/list')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    },

    listVersions(type: string, id: string): Promise<Document> {
      return fetch(getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id + "/versions")
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    },

    getSclDocument(type: string, id: string): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id + '/scl';
      return fetch(sclUrl)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    },

    getSclDocumentVersion(type: string, id: string, version: string): Promise<Document> {
      const sclUrl = getCompasSettings().sclDataServiceUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id + '/' + version + '/scl';
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
                    ${new XMLSerializer().serializeToString(body.doc.documentElement)}
               </sds:UpdateRequest>`
      })
    }
  }
}
