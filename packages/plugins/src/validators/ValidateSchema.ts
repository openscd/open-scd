import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';

import {
  newIssueEvent,
  newLogEvent,
} from '@openscd/core/foundation/deprecated/history.js';

import {
  getSchema,
  isLoadSchemaResult,
  isValidationError,
  isValidationResult,
  ValidationResult,
  Validator,
  WorkerMessage,
} from '@openscd/open-scd/src/schemas.js';

const validators: Partial<Record<string, Validator>> = {};

export default class ValidateSchema extends LitElement {
  @property()
  doc!: XMLDocument;

  @property()
  docName!: string;

  @property()
  pluginId!: string;

  private async getValidator(xsd: string, xsdName: string): Promise<Validator> {
    if (!window.Worker) throw new Error(get('validator.schema.fatal'));
    if (validators[xsdName]) return validators[xsdName]!;

    const worker: Worker = new Worker('public/js/worker.js');

    async function validate(
      xml: string,
      xmlName: string
    ): Promise<ValidationResult> {
      return new Promise(resolve => {
        worker.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
          if (isValidationResult(e.data) && e.data.file === xmlName)
            resolve(e.data);
        });
        worker.postMessage({ content: xml, name: xmlName });
      });
    }

    validators[xsdName] = validate;

    return new Promise((resolve, reject) => {
      worker.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
        if (isLoadSchemaResult(e.data)) {
          if (e.data.loaded) resolve(validate);
          else reject(get('validator.schema.loadEror', { name: e.data.file }));
        } else if (isValidationError(e.data)) {
          const parts = e.data.message.split(': ', 2);
          const description = parts[1] ? parts[1] : parts[0];
          const qualifiedTag = parts[1] ? ' (' + parts[0] + ')' : '';
          this.dispatchEvent(
            newIssueEvent({
              title: description,
              validatorId: this.pluginId,
              message:
                e.data.file +
                ':' +
                e.data.line +
                ' ' +
                e.data.node +
                ' ' +
                e.data.part +
                qualifiedTag,
            })
          );
        } else if (!isValidationResult(e.data)) {
          this.dispatchEvent(
            newLogEvent({
              title: get('validator.schema.fatal'),
              kind: 'error',
              message: e.data,
            })
          );
        }
      });
      worker.postMessage({ content: xsd, name: xsdName });
    });
  }

  async validate(): Promise<void> {
    const fileName = this.docName;
    let version = '2007';
    let revision = 'B';
    let release = '1';

    if (this.doc.documentElement)
      [version, revision, release] = [
        this.doc.documentElement.getAttribute('version') ?? '',
        this.doc.documentElement.getAttribute('revision') ?? '',
        this.doc.documentElement.getAttribute('release') ?? '',
      ];
    const result = await this.getValidator(
      getSchema(version, revision, release),
      'SCL' + version + revision + release + '.xsd'
    ).then(validator =>
      validator(new XMLSerializer().serializeToString(this.doc), fileName)
    );

    if (!result.valid) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'warning',
          title: get('validator.schema.invalid', { name: result.file }),
        })
      );
      return;
    }

    this.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get('validator.schema.valid', { name: result.file }),
      })
    );
    this.dispatchEvent(
      newIssueEvent({
        validatorId: this.pluginId,
        title: get('validator.schema.valid', { name: result.file }),
      })
    );
  }
}
