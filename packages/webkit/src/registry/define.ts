/**
 * Define a custom element once (host-owned registry).
 * Safe for repeated imports / HMR / dual entry paths.
 */
export function defineElement(
  tagName: string,
  ctor: CustomElementConstructor,
): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ctor);
  }
}

export function isDefined(tagName: string): boolean {
  return Boolean(customElements.get(tagName));
}
