import { newLoadNsdocEvent } from '../Setting.js';

import { createLogEvent } from '../compas-services/foundation.js';
import { CompasSclValidatorService } from '../compas-services/CompasValidatorService.js';

/**
 * Load a single entry. Use the nsdocId to look in the Local Storage, if already loaded,
 * and if the checksum is the same.
 * If one of them isn't the case use the ID to retrieve the content of the NSDoc File and
 * fire the #newLoadNsdocEvent to add the content to the Local Storage.
 *
 * @param component - The Element on which the event are dispatched.
 * @param id        - A unique id use to retrieve the content of NSDoc File from the SCL Validator Service.
 * @param nsdocId   - The NSDoc ID to be used in the Local Storage.
 * @param filename  - The name of the file, just for logging.
 * @param checksum  - The checksum of the NSDoc File in the SCL Validator Service.
 */
async function processNsdocFile(
  component: Element,
  id: string,
  nsdocId: string,
  filename: string,
  checksum: string
): Promise<void> {
  const checksumKey = nsdocId + '.checksum';
  const checksumStored = localStorage.getItem(checksumKey);
  if (
    localStorage.getItem(nsdocId) === null ||
    checksumStored === null ||
    checksumStored !== checksum
  ) {
    console.info(`Loading NSDoc File '${nsdocId}' with ID '${id}'.`);
    await CompasSclValidatorService()
      .getNsdocFile(id)
      .then(document => {
        const nsdocContent =
          document.querySelectorAll('NsdocFile').item(0).textContent ?? '';
        component.dispatchEvent(newLoadNsdocEvent(nsdocContent, filename));
        localStorage.setItem(checksumKey, checksum);
      })
      .catch(reason => {
        createLogEvent(component, reason);
      });
  } else {
    console.debug(`Loading NSDoc File '${nsdocId}' skipped, already loaded.`);
  }
}

/**
 * Call backend to get the list of available NSDoc Files on the SCL Validator Service.
 * Load each item found using the function #processNsdocFile.
 */
export async function loadNsdocFiles(component: Element): Promise<void> {
  await CompasSclValidatorService()
    .listNsdocFiles()
    .then(response => {
      Array.from(response.querySelectorAll('NsdocFile') ?? []).forEach(
        nsdocFile => {
          const id = nsdocFile.querySelector('Id')!.textContent ?? '';
          const nsdocId = nsdocFile.querySelector('NsdocId')!.textContent ?? '';
          const filename =
            nsdocFile.querySelector('Filename')!.textContent ?? '';
          const checksum =
            nsdocFile.querySelector('Checksum')!.textContent ?? '';
          processNsdocFile(component, id, nsdocId, filename, checksum);
        }
      );
    })
    .catch(reason => {
      createLogEvent(component, reason);
    });
}
