import { get } from 'lit-translate';

import { newLogEvent, newOpenDocEvent } from '../foundation.js';

const FILE_EXTENSION_LENGTH = 3;

export function getTypeFromDocName(docName: string): string {
  if (
    docName.lastIndexOf('.') ==
    docName.length - (FILE_EXTENSION_LENGTH + 1)
  ) {
    return docName.substring(docName.lastIndexOf('.') + 1).toUpperCase();
  }
  throw new Error(get('compas.error.type'));
}

export function stripExtensionFromName(docName: string): string {
  let name = docName;
  // Check if the name includes a file extension, if the case remove it.
  if (
    name.length > FILE_EXTENSION_LENGTH &&
    name.lastIndexOf('.') == name.length - (FILE_EXTENSION_LENGTH + 1)
  ) {
    name = name.substring(0, name.lastIndexOf('.'));
  }
  return name;
}

export function updateDocumentInOpenSCD(
  element: Element,
  doc: Document,
  docName?: string
): void {
  const id =
    (doc.querySelectorAll(':root > Header') ?? [])
      .item(0)
      ?.getAttribute('id') ?? '';

  if (!docName) {
    const version =
      (doc.querySelectorAll(':root > Header') ?? [])
        .item(0)
        ?.getAttribute('version') ?? '';
    const name =
      (
        doc.querySelectorAll(':root > Private[type="compas_scl"] > SclName') ??
        []
      ).item(0)?.textContent ?? '';
    const type =
      (
        doc.querySelectorAll(
          ':root > Private[type="compas_scl"] > SclFileType'
        ) ?? []
      ).item(0)?.textContent ?? '';

    docName = name;
    if (docName === '') {
      docName = id;
    }
    docName += '-' + version + '.' + type?.toLowerCase();
  }

  element.dispatchEvent(newLogEvent({ kind: 'reset' }));
  element.dispatchEvent(
    newOpenDocEvent(doc, docName, { detail: { docId: id } })
  );
}

export function compareVersions(
  leftVersion: string,
  rightVersion: string
): number {
  // Function to compare parts of the version.
  function comparePart(leftPart: string, rightPart: string): number {
    // First make convert them to number and check if the strings are numbers.
    const leftNumber = parseInt(leftPart);
    const rightNumber = parseInt(rightPart);
    if (isNaN(leftNumber) || isNaN(rightNumber)) {
      return 0;
    }
    // Now compare the two numbers.
    return leftNumber < rightNumber ? -1 : leftNumber > rightNumber ? 1 : 0;
  }

  // If the strings are the same, just return 0, because they are the same.
  if (leftVersion.localeCompare(rightVersion) == 0) {
    return 0;
  }

  // Split the version into parts.
  const leftParts = leftVersion.split('.');
  const rightParts = rightVersion.split('.');

  // Version should exist out of 3 parts, major, minor, patch
  if (leftParts.length != 3 && rightParts.length != 3) {
    return 0;
  }

  // Now first compare the major version, if they are the same repeat for minor version and patch version.
  let result = comparePart(leftParts[0], rightParts[0]);
  if (result === 0) {
    result = comparePart(leftParts[1], rightParts[1]);
    if (result === 0) {
      result = comparePart(leftParts[2], rightParts[2]);
    }
  }
  return result;
}