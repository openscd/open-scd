import { TemplateResult } from 'lit-element';
import { Plugin as CorePlugin } from "@openscd/core"

export type Plugin = CorePlugin & {
  official?: boolean;
  active: boolean;
  content?: () => TemplateResult;
};

export type PluginConfig = PluginConfigNotMenu | PluginConfigMenu

export type PluginConfigNotMenu = Omit<Plugin, "position" | "active"> & {
  kind: 'editor' | 'validator';
}

export type PluginConfigMenu = Omit<Plugin, "active"> & {
  kind: 'menu';
  position: MenuPosition;
}

export type InstalledOfficialPlugin = Plugin & {
  src: string;
  official: true;
  installed: boolean;
};

export type PluginKind = 'editor' | 'menu' | 'validator';
export const menuPosition = ['top', 'middle', 'bottom'] as const;
export type MenuPosition = (typeof menuPosition)[number];

