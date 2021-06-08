const baseUrl = 'http://localhost:9090/compas-scl-data-service';

export function listSclTypes(): Promise<Document> {
  return fetch(baseUrl + '/common/v1/type/list')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export function listScls(type: string): Promise<Document> {
  return fetch(baseUrl + '/scl/v1/' + type + '/list')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export function getSclDocument(type: string, id: string): Promise<Document> {
  const sclUrl = baseUrl + '/scl/v1/' + type + '/' + id + '/scl';
  return fetch(sclUrl)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export function addSclDocument(type: string, sclName: string, doc: Document): Promise<Document> {
  const sclUrl = baseUrl + '/scl/v1/' + type;
  return fetch(sclUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: `<?xml version="1.0" encoding="UTF-8"?>
             <CreateRequest>
               <Name>${sclName}</Name>
               ${new XMLSerializer().serializeToString(doc.documentElement)}
             </CreateRequest>`
    })
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export function updateSclDocument(type: string, id: string, changeSet: string, doc: Document): Promise<Response> {
  const sclUrl = baseUrl + '/scl/v1/' + type + '/' + id;
  return fetch(sclUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/xml'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: `<?xml version="1.0" encoding="UTF-8"?>
             <UpdateRequest>
                <ChangeSet>${changeSet}</ChangeSet>
                ${new XMLSerializer().serializeToString(doc.documentElement)}
             </UpdateRequest>`
  })
}

