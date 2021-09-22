import {get} from "lit-translate";

import {OpenSCD} from "../open-scd.js";
import {newLogEvent} from "../foundation.js";

export const NOT_FOUND_ERROR = 'NotFoundError';
export const APPLICATION_ERROR = 'ApplicationError';
export const SERVER_ERROR = 'ServerError';

export function getOpenScdElement(): OpenSCD {
  return <OpenSCD>document.querySelector('open-scd');
}

export function handleResponse(response: Response): Promise<string> {
  if (!response.ok) {
    let type = APPLICATION_ERROR;
    if (response.status === 404) {
      type = NOT_FOUND_ERROR;
    } else if (response.status >= 500)
    {
      type = SERVER_ERROR;
    }
    return Promise.reject({type: type, status: response.status, message: response.statusText});
  }
  return Promise.resolve(response.text());
}

export function parseXml(textContent: string): Promise<Document> {
  return Promise.resolve(new DOMParser().parseFromString(textContent, 'application/xml'));
}

export function handleError(error: Error): Promise<never> {
  return Promise.reject({type: SERVER_ERROR, message: error.message});
}

export function createLogEvent(reason: any): void {
  let message = reason.message;
  if (reason.status) {
    message += " (" + reason.status + ")";
  }

  getOpenScdElement().dispatchEvent(
    newLogEvent({
      kind: 'error',
      title: get('compas.error.server'),
      message: get('compas.error.serverDetails', {type: reason.type, message: message})
    }));
}
