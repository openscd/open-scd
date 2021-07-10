import { TemplateResult } from 'lit-html';

import {
  disconnectorIcon,
  circuitBreakerIcon,
  currentTransformerIcon,
  earthSwitchIcon,
  generalConductingEquipmentIcon,
  voltageTransformerIcon,
} from '../../icons.js';

function typeStr(condEq: Element): string {
  return condEq.getAttribute('type') === 'DIS' &&
    condEq.querySelector('Terminal')?.getAttribute('cNodeName') === 'grounded'
    ? 'ERS'
    : condEq.getAttribute('type') ?? '';
}

const typeIcons: Partial<Record<string, TemplateResult>> = {
  CBR: circuitBreakerIcon,
  DIS: disconnectorIcon,
  CTR: currentTransformerIcon,
  VTR: voltageTransformerIcon,
  ERS: earthSwitchIcon,
};

export function typeIcon(condEq: Element): TemplateResult {
  return typeIcons[typeStr(condEq)] ?? generalConductingEquipmentIcon;
}
