import { LitElement, TemplateResult } from 'lit';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-drawer';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';
import type { Dialog } from '@material/mwc-dialog';
import type { Drawer } from '@material/mwc-drawer';
import { allLocales } from './locales.js';
import { Plugin } from './mixins/Plugging.js';
export { Plugging } from './mixins/Plugging.js';
export { Editing } from './mixins/Editing.js';
declare type Control = {
    icon: string;
    getName: () => string;
    isDisabled: () => boolean;
    action?: () => unknown;
};
declare type RenderedPlugin = Control & {
    tagName: string;
};
declare type LocaleTag = typeof allLocales[number];
declare type PropertyType = string | boolean | number | object;
declare const OpenSCD_base: typeof LitElement & (new (...args: any[]) => LitElement & import("./mixins/Editing.js").EditingMixin) & (new (...args: any[]) => LitElement & import("./mixins/Plugging.js").PluginMixin);
/**
 *
 * @description Outer Shell for OpenSCD.
 *
 * @cssprop --oscd-theme-primary Primary color for OpenSCD
 * @cssprop --oscd-theme-app-bar-primary Primary color for OpenSCD appbar
 *
 * @tag open-scd
 */
export declare class OpenSCD extends OpenSCD_base {
    #private;
    logUI: Dialog;
    menuUI: Drawer;
    get locale(): LocaleTag;
    set locale(tag: LocaleTag);
    private editorIndex;
    get editor(): string;
    private controls;
    get menu(): Required<Control>[];
    get editors(): RenderedPlugin[];
    private hotkeys;
    private handleKeyPress;
    constructor();
    private renderLogEntry;
    private renderHistory;
    protected pluginProperties(_plugin: Plugin): {
        [key: string]: PropertyType;
    };
    render(): TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'open-scd': OpenSCD;
    }
}
