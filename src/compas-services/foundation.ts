import {get} from "lit-translate";

import {OpenSCD} from "../open-scd.js";
import {newLogEvent} from "../foundation.js";

export function handleResponse(response: Response): Promise<string> {
  if (!response.ok) {
    let type = 'ApplicationError';
    if (response.status === 404) {
      type = 'NotFoundError';
    } else if (response.status >= 500)
    {
      type = 'ServerError';
    }
    return Promise.reject({type: type, status: response.status, message: response.statusText});
  }
  return Promise.resolve(response.text());
}

export function parseXml(textContent: string): Promise<Document> {
  return Promise.resolve(new DOMParser().parseFromString(textContent, 'application/xml'));
}

export function handleError(error: Error): Promise<never> {
  return Promise.reject({type: 'ServerError', message: error.message});
}

export function createLogEvent(reason: any): void {
  let message = reason.message;
  if (reason.status) {
    message += " (" + reason.status + ")";
  }

  const openScd = <OpenSCD>document.querySelector('open-scd');
  openScd.dispatchEvent(
    newLogEvent({
      kind: 'error',
      title: get('compas.error.server'),
      message: get('compas.error.serverDetails', {type: reason.type, message: message})
    }));
}
