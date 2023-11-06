import { handleError } from '../../compas-services/foundation.js';
import { CompasSettings } from '../../compas/CompasSettings.js';

export interface BayTypical {
  id: string;
  accessId: string;
  name: string;
  version: string;
  description: string;
  released: number;
  lockedBy: string;
  lockedOn: number;
  modifiedOn: number;
  smrFile: string;
  contentVersion: string;
  referenceAccessId: string;
}

export interface BTComponent {
  id: number;
  name: string;
  typicalAccessId: string;
  importedOn: number;
  toolName: string;
  toolVersion: string;
  hasIecInformation: number;
  componentGuid: string;
  accessId: string;
  language: string;
  iniVersion: number;
  referenceAccessId: string;
}

export interface ImportedBTComponent {
  id: number;
  type: string;
  contentVersion: string;
  componentAccessId: string;
  accessId: string;
}

export interface ImportedBTComponentData {
  data: string;
}

function getSitipeServiceBaseUrl(): string {
  return CompasSettings().compasSettings.sitipeServiceUrl;
}

export function getAssignedBayTypicals(): Promise<BayTypical[]> {
  return fetch(`${getSitipeServiceBaseUrl()}/v2/baytypicals`)
    .catch(handleError)
    .then(res => res.json());
}

export function getBayTypicalComponents(
  accessId: string
): Promise<BTComponent[]> {
  return fetch(
    `${getSitipeServiceBaseUrl()}/v2/baytypicals/${accessId}/components`
  )
    .catch(handleError)
    .then(res => res.json());
}

export function getImportedBTComponentData(
  id: number
): Promise<ImportedBTComponentData> {
  return fetch(`${getSitipeServiceBaseUrl()}/v2/btcomponents/imported/${id}`)
    .catch(handleError)
    .then(res => res.json());
}

export function getImportedBtComponents(
  accessId: string
): Promise<ImportedBTComponent[]> {
  return fetch(
    `${getSitipeServiceBaseUrl()}/v2/btcomponents/${accessId}/imported`
  )
    .catch(handleError)
    .then(res => res.json());
}
