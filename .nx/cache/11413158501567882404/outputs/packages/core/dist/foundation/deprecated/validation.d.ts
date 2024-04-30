/** Represents a request for validation. */
export type ValidateEvent = CustomEvent<void>;
export declare function newValidateEvent(eventInitDict?: CustomEventInit<void>): ValidateEvent;
declare global {
    interface ElementEventMap {
        ['validate']: ValidateEvent;
    }
}
