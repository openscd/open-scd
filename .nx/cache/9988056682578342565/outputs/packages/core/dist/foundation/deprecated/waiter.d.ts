/** Represents some work pending completion, upon which `promise` resolves. */
export interface PendingStateDetail {
    promise: Promise<void>;
}
export type PendingStateEvent = CustomEvent<PendingStateDetail>;
/**
 * @deprecated
 */
export declare function newPendingStateEvent(promise: Promise<void>, eventInitDict?: CustomEventInit<Partial<PendingStateDetail>>): PendingStateEvent;
declare global {
    interface ElementEventMap {
        ['pending-state']: PendingStateEvent;
    }
}
