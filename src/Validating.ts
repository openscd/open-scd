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

const validators: Partial<Record<string, Validator>> = {};

export type ValidatingElement = Mixin<typeof Validating>;

export function Validating<TBase extends LitElementConstructor>(Base: TBase) {
  class ValidatingElement extends Base {
    async validate(
      doc: XMLDocument,
      {
        version = '2007',
        revision = 'B',
        release = '1',
        xmlName = 'untitled.scd',
      } = {}
    ): Promise<ValidationResult> {
      const validator = await this.getValidator(
        getSchema(version, revision, release),
        'SCL' + version + revision + release + '.xsd'
      );
      const xmlString = new XMLSerializer().serializeToString(doc);
      return validator(xmlString, xmlName);
    }

    private async getValidator(
      xsd: string,
      xsdName: string
    ): Promise<Validator> {
      if (!window.Worker) throw new Error('Workers not supported!');
      if (validators[xsdName]) return validators[xsdName]!;

      const worker = new Worker('public/js/worker.js');

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
            else reject('Could not load schema ' + e.data.file);
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
          } else if (isValidationResult(e.data)) {
            this.dispatchEvent(
              newLogEvent({
                title:
                  e.data.file + (e.data.valid ? ' is valid.' : ' is invalid.'),
                kind: e.data.valid ? 'info' : 'warning',
              })
            );
          } else {
            this.dispatchEvent(
              newLogEvent({
                title: 'Fatal validation error',
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
