export async function plugin(src: string, tagName: string): Promise<void> {
  if (customElements.get(tagName) === undefined) {
    const mod = await import(src);
    customElements.define(tagName, mod.default);
  }
}
