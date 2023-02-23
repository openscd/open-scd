import { get } from 'lit-translate';
import { newLogEvent } from '../foundation.js';

export const NOT_FOUND_ERROR = 'NotFoundError';
export const APPLICATION_ERROR = 'ApplicationError';
export const SERVER_ERROR = 'ServerError';

export const COMMONS_NAMESPACE = 'https://www.lfenergy.org/compas/commons/v1';

export async function handleResponse(response: Response): Promise<string> {
  if (!response.ok) {
    let type = APPLICATION_ERROR;
    if (response.status === 404) {
      type = NOT_FOUND_ERROR;
    } else if (response.status >= 500) {
      type = SERVER_ERROR;
    }
    return Promise.reject({
      type: type,
      status: response.status,
      message: await processErrorMessage(response),
    });
  }
  return Promise.resolve(response.text());
}

export async function processErrorMessage(response: Response): Promise<string> {
  const body = await response.text();
  const doc = await parseXml(body);
  const errorMessage = extractErrorMessage(doc);

  // Default we will return the status text from the response.
  return errorMessage ?? response.statusText;
}

export function extractErrorMessage(doc: Document): string | undefined {
  const messages = Array.from(
    doc.querySelectorAll('ErrorResponse > ErrorMessage') ?? []
  );
  // But if there are messages found in the body, we will process these and replace the status text with that.
  if (messages.length > 0) {
    let errorMessage = '';
    messages.forEach((errorMessageElement, index) => {
      const code = errorMessageElement
        .getElementsByTagNameNS(COMMONS_NAMESPACE, 'Code')!
        .item(0)!.textContent;
      const message = errorMessageElement
        .getElementsByTagNameNS(COMMONS_NAMESPACE, 'Message')!
        .item(0)!.textContent;

      if (index > 0) {
        errorMessage += ', ';
      }

      errorMessage += message;
      if (code) {
        errorMessage += ' (' + code + ')';
      }
    });
    return errorMessage;
  }
  return undefined;
}

export function parseXml(textContent: string): Promise<Document> {
  return Promise.resolve(
    new DOMParser().parseFromString(textContent, 'application/xml')
  );
}

export function extractSclFromResponse(response: Document): Promise<Document> {
  // Extract the SCL Result from the Response and create a new Document from it.
  const sclData =
    response.querySelectorAll('SclData').item(0).textContent ?? '';
  const sclDocument = new DOMParser().parseFromString(
    sclData,
    'application/xml'
  );
  return Promise.resolve(sclDocument);
}

export function handleError(error: Error): Promise<never> {
  return Promise.reject({ type: SERVER_ERROR, message: error.message });
}

export function createLogEvent(element: Element, reason: any): void {
  let message = reason.message;
  if (reason.status) {
    message += ' (' + reason.status + ')';
  }

  if (element) {
    element.dispatchEvent(
      newLogEvent({
        kind: 'error',
        title: get('compas.error.server'),
        message: get('compas.error.serverDetails', {
          type: reason.type,
          message: message,
        }),
      })
    );
  }
}

export function getWebsocketUri(settingsUrl: string): string {
  if (settingsUrl.startsWith('http://') || settingsUrl.startsWith('https://')) {
    return settingsUrl
      .replace('http://', 'ws://')
      .replace('https://', 'wss://');
  }

  return (
    (document.location.protocol == 'http:' ? 'ws://' : 'wss://') +
    document.location.hostname +
    ':' +
    getWebsocketPort() +
    settingsUrl
  );
}

export function getWebsocketPort(): string {
  if (document.location.port === '') {
    return document.location.protocol == 'http:' ? '80' : '443';
  }
  return document.location.port;
}
