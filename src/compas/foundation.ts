import { get } from 'lit-translate';

import { newLogEvent, newOpenDocEvent } from '../foundation.js';
import {
  COMPAS_SCL_PRIVATE_TYPE,
  getCompasSclFileType,
  getCompasSclName,
  getPrivate,
} from './private.js';

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

export function buildDocName(sclElement: Element): string {
  const headerElement = sclElement.querySelector(':scope > Header');
  const privateElement = getPrivate(sclElement, COMPAS_SCL_PRIVATE_TYPE);

  const version = headerElement?.getAttribute('version') ?? '';
  const name = getCompasSclName(privateElement)?.textContent ?? '';
  const type = getCompasSclFileType(privateElement)?.textContent ?? 'SCD';

  let docName = name;
  if (docName === '') {
    docName = headerElement?.getAttribute('id') ?? '';
  }
  docName += '-' + version + '.' + type?.toLowerCase();
  return docName;
}

export function updateDocumentInOpenSCD(
  element: Element,
  doc: Document,
  docName?: string
): void {
  const headerElement = doc.querySelector(':root > Header');
  const id = headerElement?.getAttribute('id') ?? '';

  element.dispatchEvent(newLogEvent({ kind: 'reset' }));
  element.dispatchEvent(
    newOpenDocEvent(
      doc,
      docName ? docName : buildDocName(doc.documentElement),
      { detail: { docId: id } }
    )
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

/** Represents user information from a backend. */
export interface UserInfoDetail {
  name: string;
}
export type UserInfoEvent = CustomEvent<UserInfoDetail>;
export function newUserInfoEvent(
  name: string,
  eventInitDict?: CustomEventInit<Partial<UserInfoDetail>>
): UserInfoEvent {
  return new CustomEvent<UserInfoDetail>('userinfo', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { name, ...eventInitDict?.detail },
  });
}
declare global {
  interface ElementEventMap {
    ['userinfo']: UserInfoEvent;
  }
}
