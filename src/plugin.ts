const resolved: Set<string> = new Set();

export async function plugin(src: string, tagName: string): Promise<void> {
  if (!resolved.has(tagName)) {
    const mod = await import(src);
    customElements.define(tagName, mod.default);
    resolved.add(tagName);
  }
  return;
}
