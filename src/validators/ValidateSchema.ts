import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';

import { newLogEvent } from '../foundation.js';

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
  validated: Promise<ValidationResult> = Promise.resolve({
    file: 'untitled.scd',
    valid: true,
    code: 0,
  });

  private async getValidator(xsd: string, xsdName: string): Promise<Validator> {
    if (!window.Worker) throw new Error(get('validating.fatal'));
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
          else reject(get('validating.loadEror', { name: e.data.file }));
        } else if (isValidationError(e.data)) {
          const parts = e.data.message.split(': ', 2);
          const description = parts[1] ? parts[1] : parts[0];
          const qualifiedTag = parts[1] ? ' (' + parts[0] + ')' : '';
          document.querySelector('open-scd')!.dispatchEvent(
            newLogEvent({
              title: description,
              kind: e.data.level > 1 ? 'error' : 'warning',
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
              title: get('validating.fatal'),
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
    this.validated = this.getValidator(
      getSchema(version, revision, release),
      'SCL' + version + revision + release + '.xsd'
    ).then(validator =>
      validator(new XMLSerializer().serializeToString(this.doc), fileName)
    );
    if (!(await this.validated).valid) {
      document.querySelector('open-scd')!.dispatchEvent(
        newLogEvent({
          kind: 'warning',
          title: get('validating.invalid', { name: fileName }),
        })
      );
      throw new Error(get('validating.invalid', { name: fileName }));
    }

    document.querySelector('open-scd')!.dispatchEvent(
      newLogEvent({
        kind: 'info',
        title: get('validating.valid', { name: fileName }),
      })
    );
    return;
  }
}
