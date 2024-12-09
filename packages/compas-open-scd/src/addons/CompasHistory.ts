import {
  html,
  TemplateResult,
  customElement,
} from 'lit-element';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-snackbar';

import '@openscd/open-scd/src/filtered-list.js';

import {
  IssueDetail,
} from '@openscd/core/foundation/deprecated/history.js';

import { HistoryUIDetail, OscdHistory } from '@openscd/open-scd/src/addons/History.js';
import { wizards } from '@openscd/plugins/src/wizards/wizard-library';
import { newWizardEvent, SCLTag } from '@openscd/open-scd/src/foundation';
import { nothing } from 'lit-html';

export enum HistoryUIKind {
  log = 'log',
  history = 'history',
  diagnostic = 'diagnostic',
}

export type HistoryUIEvent = CustomEvent<HistoryUIDetail>;

export function newHistoryUIEvent(
  show: boolean,
  kind: HistoryUIKind,
  eventInitDict?: CustomEventInit<Partial<HistoryUIDetail>>
): HistoryUIEvent {
  return new CustomEvent<HistoryUIDetail>('history-dialog-ui', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: {
      show,
      kind,
      ...eventInitDict?.detail,
    },
  });
}

export interface EmptyIssuesDetail {
  pluginSrc: string;
}

export type EmptyIssuesEvent = CustomEvent<EmptyIssuesDetail>;

export function newEmptyIssuesEvent(
  pluginSrc: string,
  eventInitDict?: CustomEventInit<Partial<EmptyIssuesDetail>>
): EmptyIssuesEvent {
  return new CustomEvent<EmptyIssuesDetail>('empty-issues', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { pluginSrc, ...eventInitDict?.detail },
  });
}

export function newUndoEvent(): CustomEvent {
  return new CustomEvent('undo', { bubbles: true, composed: true });
}

export function newRedoEvent(): CustomEvent {
  return new CustomEvent('redo', { bubbles: true, composed: true });
}

@customElement('compas-history')
export class CompasHistory extends OscdHistory {
  private openEditWizard(element: Element | undefined): void {
    if (element) {
      const wizard = wizards[<SCLTag>element.tagName]?.edit(element);
      if (wizard) this.dispatchEvent(newWizardEvent(wizard));
    }
  }

  private hasEditWizard(element: Element | undefined): boolean {
    if (element) {
      return !!wizards[<SCLTag>element.tagName]?.edit(element);
    }
    return false;
  }

  protected renderIssueEntry(issue: IssueDetail): TemplateResult {
    return html` <abbr title="${issue.title + '\n' + issue.message}">
      <mwc-list-item
        ?twoline=${!!issue.message}
        ?hasMeta=${this.hasEditWizard(issue.element)}
      >
        <span> ${issue.title}</span>
        <span slot="secondary">${issue.message}</span>
        ${this.hasEditWizard(issue.element)
            ? html` <span slot="meta">
                <mwc-icon-button
                  icon="edit"
                  @click=${() => this.openEditWizard(issue.element)}
                ></mwc-icon-button>
              </span>`
            : nothing}
      </mwc-list-item>
    </abbr
    >`;
  }
}

declare global {
  interface ElementEventMap {
    'history-dialog-ui': CustomEvent<HistoryUIDetail>;
    'empty-issues': CustomEvent<EmptyIssuesDetail>;
  }
}
