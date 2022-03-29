import {createLogEvent} from "../compas-services/foundation.js";
import {CompasSclValidatorService} from "../compas-services/CompasValidatorService.js";

function processNsdocFile(id: string, nsdocId: string, checksum: string) {
  console.info(`Found NSDoc File '${nsdocId}' with ID '${id}'.`);
}

export async function loadNsdocFiles(): Promise<void> {
  await CompasSclValidatorService().listNsdocFiles()
    .then(response => {
      Array.from(response.querySelectorAll("NsdocFile") ?? [])
        .forEach(element => {
          const id = element.querySelector('Id')!.textContent ?? '';
          const nsdocId = element.querySelector('NsdocId')!.textContent ?? '';
          const checksum = element.querySelector('Checksum')!.textContent ?? '';
          processNsdocFile(id, nsdocId, checksum);
        });
    })
    .catch(reason => {
      createLogEvent(reason);
    });
}
