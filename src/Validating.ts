import { property } from 'lit-element';
import { get } from 'lit-translate';

import { LitElementConstructor, Mixin, newLogEvent } from './foundation.js';
import {
  getSchema,
  isLoadSchemaResult,
  isValidationError,
  isValidationResult,
  ValidationResult,
  Validator,
  WorkerMessage,
} from './schemas.js';

declare global {
  interface Window {
    __karma__?: Record<string, unknown>;
  } // FIXME: dirty hack to make tests pass, switch test framework to fix!
}

const validators: Partial<Record<string, Validator>> = {};

export type ValidatingElement = Mixin<typeof Validating>;

export function Validating<TBase extends LitElementConstructor>(Base: TBase) {
  class ValidatingElement extends Base {
    @property()
    validated: Promise<ValidationResult> = Promise.resolve({
      file: 'untitled.scd',
      valid: true,
      code: 0,
    });

    async validate(
      doc: XMLDocument,
      {
        version = '2007',
        revision = 'B',
        release = '1',
        fileName = 'untitled.scd',
      } = {}
    ): Promise<string> {
      if (doc.documentElement)
        [version, revision, release] = [
          doc.documentElement.getAttribute('version') ?? '2003',
          doc.documentElement.getAttribute('revision') ?? '',
          doc.documentElement.getAttribute('release') ?? '',
        ];
      this.validated = this.getValidator(
        getSchema(version, revision, release),
        'SCL' + version + revision + release + '.xsd'
      ).then(validator =>
        validator(new XMLSerializer().serializeToString(doc), fileName)
      );
      if (!(await this.validated).valid)
        throw get('validating.invalid', { name: fileName });
      return get('validating.valid', { name: fileName });
    }

    private async getValidator(
      xsd: string,
      xsdName: string
    ): Promise<Validator> {
      if (!window.Worker) throw new Error(get('validating.fatal'));
      if (validators[xsdName]) return validators[xsdName]!;

      const worker: Worker = window.__karma__
        ? new Worker('/base/public/js/worker.js') // FIXME: dirty hack!
        : new Worker('public/js/worker.js');

      async function validate(
        xml: string,
        xmlName: string
      ): Promise<ValidationResult> {
        return new Promise(resolve => {
          worker.addEventListener(
            'message',
            (e: MessageEvent<WorkerMessage>) => {
              if (isValidationResult(e.data) && e.data.file === xmlName)
                resolve(e.data);
            }
          );
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
            this.dispatchEvent(
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
            this.dispatchEvent(
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
  }

  return ValidatingElement;
}
