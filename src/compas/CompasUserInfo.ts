import { newUserInfoEvent } from '../foundation.js';

import { CompasUserInfoService } from '../compas-services/CompasUserInfoService.js';
import { createLogEvent } from '../compas-services/foundation.js';

import { newSetSessionTimeoutsEvent } from './Compasing.js';

export async function retrieveUserInfo(element: Element): Promise<void> {
  await CompasUserInfoService()
    .getCompasUserInfo()
    .then(response => {
      const name = response.querySelectorAll('Name').item(0)?.textContent;
      if (name !== null) {
        element.dispatchEvent(newUserInfoEvent(name));
      }

      const sessionWarning =
        response.querySelectorAll('SessionWarning').item(0)?.textContent ??
        '15';
      const sessionExpires =
        response.querySelectorAll('SessionExpires').item(0)?.textContent ??
        '10';
      element.dispatchEvent(
        newSetSessionTimeoutsEvent(
          parseInt(sessionWarning),
          parseInt(sessionExpires)
        )
      );
    })
    .catch(reason => {
      createLogEvent(element, reason);
      element.dispatchEvent(newSetSessionTimeoutsEvent(10, 15));
    });
}
