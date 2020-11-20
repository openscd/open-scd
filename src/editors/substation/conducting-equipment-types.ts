import { TemplateResult } from 'lit-html';

import {
  disconnectorIcon,
  circuitBreakerIcon,
  currentTransformerIcon,
  voltageTransformerIcon,
} from '../../icons.js';

export const typeIcons: Partial<Record<string, TemplateResult>> = {
  CBR: circuitBreakerIcon,
  DIS: disconnectorIcon,
  CTR: currentTransformerIcon,
  VTR: voltageTransformerIcon,
};

export const typeNames: Partial<Record<string, string>> = {
  CBR: 'Circuit Breaker',
  DIS: 'Disconnector',
  CTR: 'Current Transformer',
  VTR: 'Voltage Transformer',
  GEN: 'Genarator',
  CAP: 'Capacitor Bank',
  REA: 'Reactor',
  CON: 'Coverter',
  MOT: 'Motor',
  FAN: 'Fan',
  PMP: 'Pump',
  EFN: 'Earth Fault Neutralizer',
  PSH: 'Power Shunt',
  AXN: 'Auxiliary Network',
  BAT: 'Battery',
  BSH: 'Bushing',
  CAB: 'Power Cable',
  GIL: 'Gas Insulates Line',
  LIN: 'Pwer Overhead Line',
  RES: 'Neutral Resistor',
  RRC: 'Rotating REactive Component',
  SAR: 'Surge Arrester',
  SCR: 'Semiconductor controlled rectifier',
  SMC: 'Synchronous Machine',
  TCF: 'Thyristor controlled frequency converter',
  TCR: 'Thyristor controlled reactive component',
  IFL: 'Infeeding line',
};
