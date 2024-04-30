export type Language = 'en' | 'de';
export type Settings = {
    language: Language;
    theme: 'light' | 'dark';
    mode: 'safe' | 'pro';
    showieds: 'on' | 'off';
    'IEC 61850-7-2': string | undefined;
    'IEC 61850-7-3': string | undefined;
    'IEC 61850-7-4': string | undefined;
    'IEC 61850-8-1': string | undefined;
};
export type NsdVersion = {
    version: string | undefined;
    revision: string | undefined;
    release: string | undefined;
};
export type NsdVersions = {
    'IEC 61850-7-2': NsdVersion;
    'IEC 61850-7-3': NsdVersion;
    'IEC 61850-7-4': NsdVersion;
    'IEC 61850-8-1': NsdVersion;
};
/** Represents a document to be opened. */
export interface LoadNsdocDetail {
    nsdoc: string;
    filename: string;
}
export type LoadNsdocEvent = CustomEvent<LoadNsdocDetail>;
export declare function newLoadNsdocEvent(nsdoc: string, filename: string): LoadNsdocEvent;
export interface SettingsUIDetail {
    show: boolean;
}
export type SettingsUIEvent = CustomEvent<SettingsUIDetail>;
export declare function newSettingsUIEvent(show: boolean, eventInitDict?: CustomEventInit<Partial<SettingsUIDetail>>): SettingsUIEvent;
declare global {
    interface ElementEventMap {
        ['oscd-settings']: SettingsUIEvent;
    }
}
