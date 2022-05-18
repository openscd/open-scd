export function getCdcValue(daiElement: Element): string | null {
  const lnElement = daiElement.closest('LN0, LN');
  const doiElement = daiElement.closest('DOI');
  if (lnElement && doiElement) {
    const lnType = lnElement.getAttribute('lnType');
    const doName = doiElement.getAttribute('name');

    const doElement = daiElement.ownerDocument.querySelector(`LNodeType[id="${lnType}"] > DO[name="${doName}"]`)
    if (doElement) {
      const doType = doElement.getAttribute('type');
      const doTypeElement = daiElement.ownerDocument.querySelector(`DOType[id="${doType}"]`)
      return (doTypeElement ? doTypeElement.getAttribute('cdc') : null);
    }
  }
  return null;
}

  /**
 * Enumeration stating the current view of the 104 plugin.
 */
export enum View {
  VALUES,
  NETWORK
}

export const VIEW_EVENT_NAME = 'view-change-104-plugin';

// Objects needed to register and fire the change of a view within the Communication 104 Plugin
export interface ViewDetail {
  view: View;
}
export type ViewEvent = CustomEvent<ViewDetail>;
export function newViewEvent(
  view: View,
  eventInitDict?: CustomEventInit<ViewDetail>
): ViewEvent {
  return new CustomEvent<ViewDetail>(VIEW_EVENT_NAME, {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { view, ...eventInitDict?.detail },
  });
}

declare global {
  interface ElementEventMap {
    [VIEW_EVENT_NAME]: ViewEvent;
  }
}
