import { newPendingStateEvent } from "../foundation.js";
import { dispatchEventOnOpenScd } from "../compas/foundation.js";
import { createLogEvent, parseXml } from "./foundation.js";

export function Websockets(serviceName: string) {
  let websocket: WebSocket | undefined;

  function sleep(sleepTime: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, sleepTime));
  }

  async function waitUntilValidated(): Promise<void> {
    while (websocket !== undefined) {
      await sleep(250);
    }
  }

  return {
    execute(url: string, request: string, callback: (doc: Document) => void) {
      websocket = new WebSocket(url);

      websocket.onopen = () => {
        websocket?.send(request);
      };

      websocket.onmessage = (evt) => {
        parseXml(evt.data)
          .then(doc => {
            callback(doc);
            websocket?.close();
          })
          .catch(reason => {
            createLogEvent(reason);
            websocket?.close();
          });
      };

      websocket.onerror = () => {
        createLogEvent(
          { message: `Websocket Error in service "${serviceName}"`,
            type: 'Error'})
        websocket?.close();
      };

      websocket.onclose = () => {
        websocket = undefined;
      }

      dispatchEventOnOpenScd(newPendingStateEvent(waitUntilValidated()))
    }
  }
}
