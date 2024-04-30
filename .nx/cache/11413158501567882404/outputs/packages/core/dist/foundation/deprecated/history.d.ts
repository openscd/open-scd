import { EditorAction } from './editor';
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
    action: EditorAction;
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
export declare function newLogEvent(detail: LogDetail, eventInitDict?: CustomEventInit<LogDetail>): LogEvent;
export declare function newIssueEvent(detail: IssueDetail, eventInitDict?: CustomEventInit<IssueDetail>): IssueEvent;
declare global {
    interface ElementEventMap {
        ['log']: LogEvent;
        ['issue']: IssueEvent;
    }
}
export {};
