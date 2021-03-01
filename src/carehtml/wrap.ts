import transform from './transform.js';

type HTMLTag<T> = (strings: TemplateStringsArray, ...values: unknown[]) => T;

export default function wrap<T>(html: HTMLTag<T>): HTMLTag<T> {
  return (strings, ...values) =>
    // eslint-disable-next-line prefer-spread
    html.apply(
      null,
      <[strings: TemplateStringsArray, ...values: unknown[]]>(
        transform(strings, values)
      )
    );
}
