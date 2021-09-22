import {get} from "lit-translate";

import {newOpenDocEvent, newUserInfoEvent} from "../foundation.js";
import {OpenSCD} from "../open-scd.js";

import {CompasUserInfoService} from "../compas-services/CompasUserInfoService.js";
import {createLogEvent} from "../compas-services/foundation.js";

const FILE_EXTENSION_LENGTH = 3;

export function getTypeFromDocName(docName: string): string {
  if (docName.lastIndexOf(".") == docName.length - (FILE_EXTENSION_LENGTH + 1)) {
    return docName.substring(docName.lastIndexOf(".") + 1);
  }
  throw new Error(get('compas.error.type'));
}

export function stripExtensionFromName(docName: string): string {
  let name = docName;
  // Check if the name includes a file extension, if the case remove it.
  if (name.lastIndexOf(".") == name.length - (FILE_EXTENSION_LENGTH + 1)) {
    name = name.substring(0, name.lastIndexOf("."));
  }
  return name
}

export function getOpenScdElement(): OpenSCD {
  return <OpenSCD>document.querySelector('open-scd');
}

export function updateDocumentInOpenSCD(doc: Document): void {
  const id = (doc.querySelectorAll(':root > Header') ?? []).item(0).getAttribute('id') ?? '';
  const version = (doc.querySelectorAll(':root > Header') ?? []).item(0).getAttribute('version') ?? '';
  const name = (doc.querySelectorAll(':root > Private[type="compas_scl"] > SclName') ?? []).item(0).textContent ?? '';
  const type = (doc.querySelectorAll(':root > Private[type="compas_scl"] > SclFileType') ?? []).item(0).textContent ?? '';

  let docName = name;
  if (docName === '') {
    docName = id;
  }
  docName += '-' + version + '.' + type?.toLowerCase();

  getOpenScdElement().dispatchEvent(newOpenDocEvent(doc, docName, {detail: {docId: id}}));
}

export async function showOptionalUserInfo(): Promise<void> {
  await CompasUserInfoService().getCompasUserInfo()
    .then(response => {
      const name = response.querySelectorAll("Name").item(0)?.textContent;
      if (name != null)
        getOpenScdElement().dispatchEvent(newUserInfoEvent(name));
    })
    .catch(createLogEvent);
}
showOptionalUserInfo();
