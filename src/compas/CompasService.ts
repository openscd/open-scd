import {ChangeSet} from "./CompasChangeSet.js";

const baseUrl = 'http://localhost:9090/compas-scl-data-service';

export function listSclTypes(): Promise<Document> {
  return fetch(baseUrl + '/common/v1/type/list')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export function listScls(type: string): Promise<Document> {
  return fetch(baseUrl + '/scl/v1/' + type?.toUpperCase() + '/list')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export function getSclDocument(type: string, id: string): Promise<Document> {
  const sclUrl = baseUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id + '/scl';
  return fetch(sclUrl)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export interface CreateRequestBody {
  sclName: string,
  doc: Document
}
export function addSclDocument(type: string, body: CreateRequestBody): Promise<Document> {
  const sclUrl = baseUrl + '/scl/v1/' + type?.toUpperCase();
  return fetch(sclUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: `<?xml version="1.0" encoding="UTF-8"?>
             <CreateRequest>
                 <Name>${body.sclName}</Name>
                 ${new XMLSerializer().serializeToString(body.doc.documentElement)}
             </CreateRequest>`
    })
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export interface UpdateRequestBody {
  changeSet: ChangeSet,
  doc: Document
}
export function updateSclDocument(type: string, id: string, body: UpdateRequestBody): Promise<Response> {
  const sclUrl = baseUrl + '/scl/v1/' + type?.toUpperCase() + '/' + id;
  return fetch(sclUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: `<?xml version="1.0" encoding="UTF-8"?>
             <UpdateRequest>
                  <ChangeSet>${body.changeSet}</ChangeSet>
                  ${new XMLSerializer().serializeToString(body.doc.documentElement)}
             </UpdateRequest>`
  })
}

