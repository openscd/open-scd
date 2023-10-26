import { LitElement } from 'lit';
import { LitElementConstructor } from '../foundation.js';
import { targetLocales } from '../locales.js';
export declare type Plugin = {
    name: string;
    translations?: Record<typeof targetLocales[number], string>;
    src: string;
    icon: string;
    requireDoc?: boolean;
    active?: boolean;
};
export declare type PluginSet = {
    menu: Plugin[];
    editor: Plugin[];
};
/** @returns a valid customElement tagName containing the URI hash. */
export declare function pluginTag(uri: string): string;
export interface PluginMixin {
    loadedPlugins: Map<string, Plugin>;
    plugins: Partial<PluginSet>;
}
declare type ReturnConstructor = new (...args: any[]) => LitElement & PluginMixin;
export declare function Plugging<TBase extends LitElementConstructor>(Base: TBase): TBase & ReturnConstructor;
export {};
