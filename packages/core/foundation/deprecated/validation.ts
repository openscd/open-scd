/** Represents a request for validation. */
export type ValidateEvent = CustomEvent<void>;
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
  