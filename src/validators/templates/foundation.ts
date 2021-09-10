import { LogDetailBase } from '../../foundation.js';
import { dOValidator } from './dosdo.js';
import { dOTypeValidator } from './dotype.js';
import { lNodeTypeValidator } from './lnodetype.js';

export const iec6185074 = fetch('public/xml/IEC_61850-7-4_2007B3.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

export const iec6185073 = fetch('public/xml/IEC_61850-7-3_2007B3.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

const iec6185072 = fetch('public/xml/IEC_61850-7-2_2007B3.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

export const iec6185081 = fetch('public/xml/IEC_61850-8-1_2003A2.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

export const serviceCDCs = [
  'SPC',
  'DPC',
  'INC',
  'ENC',
  'BSC',
  'ISC',
  'APC',
  'BAC',
];

type ValidationFunction = (e: Element, r?: Element) => Promise<LogDetailBase[]>;

export const tagValidator: Record<string, ValidationFunction[]> = {
  DOType: [dOTypeValidator],
  LNodeType: [lNodeTypeValidator],
  DO: [dOValidator],
};
