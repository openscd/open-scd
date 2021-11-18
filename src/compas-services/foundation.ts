import {get} from "lit-translate";

import {OpenSCD} from "../open-scd.js";
import {newLogEvent} from "../foundation.js";

export const NOT_FOUND_ERROR = 'NotFoundError';
export const APPLICATION_ERROR = 'ApplicationError';
export const SERVER_ERROR = 'ServerError';

export const COMMONS_NAMESPACE = 'https://www.lfenergy.org/compas/commons/v1';

export function getOpenScdElement(): OpenSCD {
  return <OpenSCD>document.querySelector('open-scd');
}

export async function handleResponse(response: Response): Promise<string> {
  if (!response.ok) {
    let type = APPLICATION_ERROR;
    if (response.status === 404) {
      type = NOT_FOUND_ERROR;
    } else if (response.status >= 500) {
      type = SERVER_ERROR;
    }
    return Promise.reject({type: type, status: response.status, message: await processErrorMessage(response)});
  }
  return Promise.resolve(response.text());
}

export async function processErrorMessage(response: Response): Promise<string> {
  // default we will return the status text from the response.
  let errorMessage = response.statusText;

  const body = await response.text();
  const doc = await parseXml(body);
  const messages = Array.from(doc.querySelectorAll('ErrorResponse > ErrorMessage') ?? []);
  // But if there are messages found in the body, we will process these and replace the status text with that.
  if (messages.length > 0) {
    errorMessage = '';
    messages.forEach((errorMessageElement, index) => {
      const code = errorMessageElement.getElementsByTagNameNS(COMMONS_NAMESPACE, "Code")!.item(0)!.textContent;
      const message = errorMessageElement.getElementsByTagNameNS(COMMONS_NAMESPACE, "Message")!.item(0)!.textContent;

      if (index > 0) {
        errorMessage += ', ';
      }

      errorMessage += message;
      if (code) {
        errorMessage += ' (' + code + ')';
      }
    })
  }

  return errorMessage;
}

export function parseXml(textContent: string): Promise<Document> {
  return Promise.resolve(new DOMParser().parseFromString(textContent, 'application/xml'));
}

export function extractSclFromResponse(response: Document): Promise<Document> {
  // Extract the SCL Result from the Response and create a new Document from it.
  const sclData = response.querySelectorAll("SclData").item(0).textContent ?? '';
  const sclDocument = new DOMParser().parseFromString(sclData, 'application/xml');
  return Promise.resolve(sclDocument);
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
