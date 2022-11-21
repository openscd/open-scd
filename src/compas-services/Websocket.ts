import { newPendingStateEvent } from '../foundation.js';
import {
  APPLICATION_ERROR,
  extractErrorMessage,
  parseXml,
  SERVER_ERROR,
} from './foundation.js';

export function websocket(
  element: Element,
  serviceName: string,
  url: string,
  request: string
): Promise<Document> {
  let websocket: WebSocket | undefined;

  function sleep(sleepTime: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, sleepTime));
  }

  async function waitUntilExecuted(): Promise<void> {
    while (websocket !== undefined) {
      await sleep(250);
    }
  }

  return new Promise<Document>((resolve, reject) => {
    websocket = new WebSocket(url);

    websocket.onopen = () => {
      websocket?.send(request);
    };

    websocket.onmessage = evt => {
      parseXml(evt.data)
        .then(doc => {
          if (doc.documentElement.localName === 'ErrorResponse') {
            const message = extractErrorMessage(doc);
            reject({ type: APPLICATION_ERROR, message });
          } else {
            resolve(doc);
          }
          websocket?.close();
        })
        .catch(reason => {
          reject(reason);
          websocket?.close();
        });
    };

    websocket.onerror = () => {
      reject({
        type: SERVER_ERROR,
        message: `Websocket Error in service "${serviceName}"`,
      });
      websocket?.close();
    };
    websocket.onclose = () => {
      websocket = undefined;
    };

    element.dispatchEvent(newPendingStateEvent(waitUntilExecuted()));
  });
}
