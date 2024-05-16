import { EditorAction } from './editor';

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
type InfoEntryKind = 'info' | 'warning' | 'error';

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type LogEntryType = 'info' | 'warning' | 'error' | 'action' | 'reset';

/** 
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * The basic information contained in each [[`LogEntry`]]. 
 */
export interface LogDetailBase {
  title: string;
  message?: string;
}

/** 
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * The [[`LogEntry`]] for a committed [[`EditorAction`]]. 
 */
export interface CommitDetail extends LogDetailBase {
  kind: 'action';
  action: EditorAction;
}

/** 
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * A [[`LogEntry`]] for notifying the user. 
 */
export interface InfoDetail extends LogDetailBase {
  kind: InfoEntryKind;
  cause?: LogEntry;
}

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export interface ResetDetail {
  kind: 'reset';
}

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type LogDetail = InfoDetail | CommitDetail | ResetDetail;

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type LogEvent = CustomEvent<LogDetail>;

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export interface IssueDetail extends LogDetailBase {
  validatorId: string;
  element?: Element;
}

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type IssueEvent = CustomEvent<IssueDetail>;

/** 
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * [[`LogEntry`]]s are timestamped upon being committed to the `history`. 
 */
interface Timestamped {
  time: Date | null;
}

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type CommitEntry = Timestamped & CommitDetail;

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type InfoEntry = Timestamped & InfoDetail;

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type LogEntry = InfoEntry | CommitEntry;


/**
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * @param detail {@link LogDetail}
 * @param eventInitDict 
 * @returns LogEvent {@link LogEvent}
 */
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

/**
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * @param detail {@link IssueDetail}
 * @param eventInitDict 
 * @returns IssueEvent {@link IssueEvent}
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
      ['log']: LogEvent;
      ['issue']: IssueEvent;
    }
  }
  