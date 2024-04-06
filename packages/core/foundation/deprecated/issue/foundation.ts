import { LogDetailBase } from '../log/foundation.js';

export interface IssueDetail extends LogDetailBase {
  validatorId: string;
  element?: Element;
}
export type IssueEvent = CustomEvent<IssueDetail>;

/**
 * @deprecated
 */
export function newIssueEvent(
  detail: IssueDetail,
  eventInitDict?: CustomEventInit<IssueDetail>
): IssueEvent {
  return new CustomEvent<IssueDetail>('issue', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { ...detail, ...eventInitDict?.detail },
  });
}

declare global {
  interface ElementEventMap {
    ['issue']: IssueEvent;
  }
}
