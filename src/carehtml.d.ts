declare module 'carehtml' {
  import { TemplateResult } from 'lit-html';

  type TemplateFunction = (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => TemplateResult;
  function wrap(original: TemplateFunction): TemplateFunction;

  export = wrap;
}
