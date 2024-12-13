import { TemplateResult } from 'lit-element';

export type Plugin = {
  name: string;
  src: string;
  icon?: string;
  default?: boolean;
  kind: PluginKind;
  requireDoc?: boolean;
  position?: MenuPosition;
  installed: boolean;
  official?: boolean;
  content?: () => TemplateResult;
};

export type InstalledOfficialPlugin = {
  src: string;
  official: true;
  installed: boolean;
};


export type PluginKind = 'editor' | 'menu' | 'validator';
export const menuPosition = ['top', 'middle', 'bottom'] as const;
export type MenuPosition = (typeof menuPosition)[number];

