import { targetLocales } from '../locales.js';

export type Plugin = {
  // name defines the name of the plugin
  name: string;
  // src defines the path to the plugins source file
  src: string;
  // kind defines the type of the plugin
  kind: PluginKind;
  // activeByDefault configures if the plugin should be active by default
  // this is will be user when users resets the plugins
  activeByDefault: boolean;
  // icon stores the icon name of the Material Icon
  icon?: string;
  // active shows if the plugin currently is active
  active?: boolean;
  // requireDoc shows if the plugin requires a document to be loaded
  requireDoc?: boolean;
  // position defines the position of menu plugins
  position?: MenuPosition
  translations?: Record<(typeof targetLocales)[number], string>;
};

export type PluginSet = { menu: Plugin[]; editor: Plugin[] };
export type PluginKind = 'editor' | 'menu' | 'validator';
export const menuPosition = ['top', 'middle', 'bottom'] as const;
export type MenuPosition = (typeof menuPosition)[number];

