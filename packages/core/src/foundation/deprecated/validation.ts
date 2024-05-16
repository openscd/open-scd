/** 
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * Represents a request for validation. 
 */
export type ValidateEvent = CustomEvent<void>;

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export function newValidateEvent(
  eventInitDict?: CustomEventInit<void>
): ValidateEvent {
  return new CustomEvent<void>('validate', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
  });
}


declare global {
    interface ElementEventMap {
      ['validate']: ValidateEvent;
    }
  }
  