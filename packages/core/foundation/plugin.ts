import { targetLocales } from '../locales.js';

export type Plugin = {
  name: string;
  translations?: Record<(typeof targetLocales)[number], string>;
  src: string;
  icon: string;
  requireDoc?: boolean;
  active?: boolean;
  position: ('top' | 'middle' | 'bottom') | number;
};
export type PluginSet = { menu: Plugin[]; editor: Plugin[] };
