const baseUrl = 'http://localhost:9090/compas-scl-data-service';

export function listSclTypes(): Promise<Document> {
  return fetch(baseUrl + '/common/v1/type/list')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export function listScls(code: string): Promise<Document> {
  return fetch(baseUrl + '/scl/v1/' + code + '/list')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}

export function getSclDocument(code: string, id: string): Promise<Document> {
  const sclUrl = baseUrl + '/scl/v1/' + code + '/' + id + '/scl';
  return fetch(sclUrl)
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'))
}
