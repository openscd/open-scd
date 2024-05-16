/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type Language = 'en' | 'de';

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
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

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type NsdVersion = {
  version: string | undefined;
  revision: string | undefined;
  release: string | undefined;
};

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type NsdVersions = {
  'IEC 61850-7-2': NsdVersion;
  'IEC 61850-7-3': NsdVersion;
  'IEC 61850-7-4': NsdVersion;
  'IEC 61850-8-1': NsdVersion;
};

/** 
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * Represents a document to be opened. 
 */
export interface LoadNsdocDetail {
  nsdoc: string;
  filename: string;
}

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type LoadNsdocEvent = CustomEvent<LoadNsdocDetail>;

/**
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * @param nsdoc String
 * @param filename String
 * @returns LoadNsdocEvent {@link LoadNsdocEvent}
 */
export function newLoadNsdocEvent(
  nsdoc: string,
  filename: string
): LoadNsdocEvent {
  return new CustomEvent<LoadNsdocDetail>('load-nsdoc', {
    bubbles: true,
    composed: true,
    detail: { nsdoc, filename },
  });
}

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export interface SettingsUIDetail {
  show: boolean;
}

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type SettingsUIEvent = CustomEvent<SettingsUIDetail>;

/**
 * @since 0.0.1
 * 
 * @deprecated
 * 
 */
export function newSettingsUIEvent(
  show: boolean,
  eventInitDict?: CustomEventInit<Partial<SettingsUIDetail>>
): SettingsUIEvent {
  return new CustomEvent<SettingsUIDetail>('oscd-settings', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: {
      show,
      ...eventInitDict?.detail,
    },
  });
}


declare global {
  interface ElementEventMap {
    ['oscd-settings']: SettingsUIEvent;
  }
}
