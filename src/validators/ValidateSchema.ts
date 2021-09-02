import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';

import { newIssueEvent, newLogEvent } from '../foundation.js';

import {
  getSchema,
  isLoadSchemaResult,
  isValidationError,
  isValidationResult,
  ValidationResult,
  Validator,
  WorkerMessage,
} from '../schemas.js';

const validators: Partial<Record<string, Validator>> = {};

export default class ValidateSchema extends LitElement {
  @property()
  doc!: XMLDocument;

  @property()
  docName!: string;

  @property()
  pluginId!: string;

  private async getValidator(
    xsd: string,
    xsdName: string,
    statusNumber: number
  ): Promise<Validator> {
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

    return new Promise((resolve, reject) => {
      worker.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
        if (isLoadSchemaResult(e.data)) {
          if (e.data.loaded) resolve(validate);
          else reject(get('validator.schema.loadEror', { name: e.data.file }));
        } else if (isValidationError(e.data)) {
          const parts = e.data.message.split(': ', 2);
          const description = parts[1] ? parts[1] : parts[0];
          const qualifiedTag = parts[1] ? ' (' + parts[0] + ')' : '';
          document.querySelector('open-scd')!.dispatchEvent(
            newIssueEvent({
              title: description,
              validatorId: this.pluginId,
              statusNumber,
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
          document.querySelector('open-scd')!.dispatchEvent(
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

  async validate(statusNumber: number): Promise<void> {
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
      'SCL' + version + revision + release + '.xsd',
      statusNumber
    ).then(validator =>
      validator(new XMLSerializer().serializeToString(this.doc), fileName)
    );

    if (!result.valid) {
      document.querySelector('open-scd')!.dispatchEvent(
        newLogEvent({
          kind: 'warning',
          title: get('validator.schema.invalid', { name: result.file }),
        })
      );
      throw new Error(get('validator.schema.invalid', { name: result.file }));
    }

    document.querySelector('open-scd')!.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get('validator.schema.valid', { name: result.file }),
      })
    );
    document.querySelector('open-scd')!.dispatchEvent(
      newIssueEvent({
        validatorId: this.pluginId,
        statusNumber,
        title: get('validator.schema.valid', { name: result.file }),
      })
    );
  }
}
