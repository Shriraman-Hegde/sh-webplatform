import { css, unsafeCSS, type CSSResult } from "lit";

const cache = new Map<string, CSSResult>();

/** Turn authored CSS (imported as text) into one shared Lit stylesheet. */
export function cssText(source: string): CSSResult {
  let result = cache.get(source);
  if (!result) {
    result = css`${unsafeCSS(source)}`;
    cache.set(source, result);
  }
  return result;
}
