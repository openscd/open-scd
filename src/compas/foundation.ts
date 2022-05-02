import {get} from "lit-translate";

import {newLogEvent, newOpenDocEvent} from "../foundation.js";
import {OpenSCD} from "../open-scd.js";

const FILE_EXTENSION_LENGTH = 3;

export function getTypeFromDocName(docName: string): string {
  if (docName.lastIndexOf(".") == docName.length - (FILE_EXTENSION_LENGTH + 1)) {
    return docName.substring(docName.lastIndexOf(".") + 1).toUpperCase();
  }
  throw new Error(get('compas.error.type'));
}

export function stripExtensionFromName(docName: string): string {
  let name = docName;
  // Check if the name includes a file extension, if the case remove it.
  if (name.length > FILE_EXTENSION_LENGTH &&
       name.lastIndexOf(".") == name.length - (FILE_EXTENSION_LENGTH + 1)) {
    name = name.substring(0, name.lastIndexOf("."));
  }
  return name
}

export function getOpenScdElement(): OpenSCD | null {
  return <OpenSCD>document.querySelector('open-scd');
}

export function dispatchEventOnOpenScd(event: Event): void {
  const openScd = getOpenScdElement();
  if (openScd !== null) {
    openScd.dispatchEvent(event);
  }
}

export function updateDocumentInOpenSCD(doc: Document, docName?: string): void {
  const id = (doc.querySelectorAll(':root > Header') ?? []).item(0)?.getAttribute('id') ?? '';

  if (!docName) {
    const version = (doc.querySelectorAll(':root > Header') ?? []).item(0)?.getAttribute('version') ?? '';
    const name = (doc.querySelectorAll(':root > Private[type="compas_scl"] > SclName') ?? []).item(0)?.textContent ?? '';
    const type = (doc.querySelectorAll(':root > Private[type="compas_scl"] > SclFileType') ?? []).item(0)?.textContent ?? '';

    docName = name;
    if (docName === '') {
      docName = id;
    }
    docName += '-' + version + '.' + type?.toLowerCase();
  }

  dispatchEventOnOpenScd(newLogEvent({kind: 'reset'}));
  dispatchEventOnOpenScd(newOpenDocEvent(doc, docName, {detail: {docId: id}}));
}
