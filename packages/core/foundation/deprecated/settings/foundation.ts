export interface SettingsUIDetail {
  show: boolean;
}

export type SettingsUIEvent = CustomEvent<SettingsUIDetail>;

/**
 * @deprecated
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
