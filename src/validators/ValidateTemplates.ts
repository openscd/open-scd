import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';
import {
  LogDetail,
  LogDetailBase,
  newIssueEvent,
  newLogEvent,
} from '../foundation.js';
import { validateChildren } from './templates/foundation.js';

type ValidationResult = LogDetailBase | LogDetail;

function dispatch(detail: ValidationResult, validatorId: string): void {
  const kind = (<LogDetail>detail).kind;
  const title = (<LogDetailBase>detail).title;
  const message = (<LogDetailBase>detail).message;

  if (kind)
    document
      .querySelector('open-scd')
      ?.dispatchEvent(newLogEvent(<LogDetail>detail));
  else
    document.querySelector('open-scd')?.dispatchEvent(
      newIssueEvent({
        validatorId,
        title,
        message,
      })
    );
}

export default class ValidateTemplates extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property()
  docName!: string;

  @property()
  pluginId!: string;

  async validate(): Promise<void> {
    const promises: Promise<void>[] = [];

    const [version, revision, release] = [
      this.doc.documentElement.getAttribute('version') ?? '',
      this.doc.documentElement.getAttribute('revision') ?? '',
      this.doc.documentElement.getAttribute('release') ?? '',
    ];

    if (version === '2003' || revision === 'A' || Number(release) < 3) {
      document.querySelector('open-scd')?.dispatchEvent(
        newIssueEvent({
          validatorId: this.pluginId,
          title: get('diag.missingnsd'),
          message: '',
        })
      );
      return;
    }

    const data = this.doc.querySelector('DataTypeTemplates');
    if (!data) return;

    const issuesTemaplte = await validateChildren(data);
    if (issuesTemaplte.length === 0)
      issuesTemaplte.push({
        title: get('diag.zeroissues'),
      });

    issuesTemaplte.forEach(error => dispatch(error, this.pluginId));
  }
}
