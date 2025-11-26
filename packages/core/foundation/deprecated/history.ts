import { EditV2 } from '../edit.js';

type InfoEntryKind = 'info' | 'warning' | 'error';

export type LogEntryType = 'info' | 'warning' | 'error' | 'action' | 'reset';

/** The basic information contained in each [[`LogEntry`]]. */
export interface LogDetailBase {
  title: string;
  message?: string;
}
/** The [[`LogEntry`]] for a committed [[`EditorAction`]]. */
export interface CommitDetail extends LogDetailBase {
  kind: 'action';
}
/** A [[`LogEntry`]] for notifying the user. */
export interface InfoDetail extends LogDetailBase {
  kind: InfoEntryKind;
  cause?: LogEntry;
}

export interface ResetDetail {
  kind: 'reset';
}

export type LogDetail = InfoDetail | CommitDetail | ResetDetail;
export type LogEvent = CustomEvent<LogDetail>;

export interface IssueDetail extends LogDetailBase {
  validatorId: string;
  element?: Element;
}
export type IssueEvent = CustomEvent<IssueDetail>;

/** [[`LogEntry`]]s are timestamped upon being committed to the `history`. */
interface Timestamped {
  time: Date | null;
}

export type CommitEntry = Timestamped & CommitDetail;
export type InfoEntry = Timestamped & InfoDetail;

export type LogEntry = InfoEntry | CommitEntry;


export function newLogEvent(
  detail: LogDetail,
  eventInitDict?: CustomEventInit<LogDetail>
): LogEvent {
  return new CustomEvent<LogDetail>('log', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { ...detail, ...eventInitDict?.detail },
  });
}

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
      ['log']: LogEvent;
      ['issue']: IssueEvent;
    }
  }
  