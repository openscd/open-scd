import { Insert, Remove, Update } from '@openscd/open-scd-core';
/** @returns action to update max clients in ReportControl element */
export declare function updateMaxClients(reportControl: Element, max: string | null): Remove | Update | Insert | null;
