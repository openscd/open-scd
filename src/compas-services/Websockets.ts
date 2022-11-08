import { newPendingStateEvent } from '../foundation.js';
import { APPLICATION_ERROR, createLogEvent, extractErrorMessage, parseXml, processErrorMessage } from './foundation.js';

export function Websockets(element: Element, serviceName: string) {
  let websocket: WebSocket | undefined;

  function sleep(sleepTime: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, sleepTime));
  }

  async function waitUntilExecuted(): Promise<void> {
    while (websocket !== undefined) {
      await sleep(250);
    }
  }

  return {
    execute(
      url: string,
      request: string,
      onMessageCallback: (doc: Document) => void,
      onCloseCallback?: () => void
    ) {
      websocket = new WebSocket(url);

      websocket.onopen = () => {
        websocket?.send(request);
      };

      websocket.onmessage = evt => {
        parseXml(evt.data)
          .then(doc => {
            if (doc.documentElement.localName === 'ErrorResponse') {
              const message = extractErrorMessage(doc);
              createLogEvent(element, {type: APPLICATION_ERROR, message});
            } else {
              onMessageCallback(doc);
            }
            websocket?.close();
          })
          .catch(reason => {
            createLogEvent(element, reason);
            websocket?.close();
          });
      };

      websocket.onerror = () => {
        createLogEvent(element, {
          message: `Websocket Error in service "${serviceName}"`,
          type: 'Error',
        });
        websocket?.close();
      };

      websocket.onclose = () => {
        websocket = undefined;
        if (onCloseCallback) {
          onCloseCallback();
        }
      };

      element.dispatchEvent(newPendingStateEvent(waitUntilExecuted()));
    },
  };
}
