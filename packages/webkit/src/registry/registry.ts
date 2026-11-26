export type EntityRoute = {
  /** Entity type key, e.g. `collateral`. */
  entity: string;
  /** Path template with `{id}` placeholder, e.g. `/collateral/{id}`. */
  routeTemplate: string;
  /** Human label for the entity type (optional). */
  label?: string;
};

export type ResolveResult = {
  href: string;
  label: string;
  entity: string;
  id: string;
};

const routes = new Map<string, EntityRoute>();

export function configureRegistry(entries: readonly EntityRoute[]): void {
  routes.clear();
  for (const entry of entries) {
    const key = entry.entity.trim().toLowerCase();
    if (!key || !entry.routeTemplate.includes("{id}")) {
      continue;
    }
    routes.set(key, {
      entity: key,
      routeTemplate: entry.routeTemplate,
      label: entry.label,
    });
  }
}

export function clearRegistry(): void {
  routes.clear();
}

export function resolveEntity(
  entity: string | null | undefined,
  id: string | null | undefined,
): ResolveResult | undefined {
  const key = (entity ?? "").trim().toLowerCase();
  const refId = (id ?? "").trim();
  if (!key || !refId) {
    return undefined;
  }
  const entry = routes.get(key);
  if (!entry) {
    return undefined;
  }
  return {
    entity: key,
    id: refId,
    href: entry.routeTemplate.replaceAll("{id}", encodeURIComponent(refId)),
    label: entry.label ?? key,
  };
}

export function listRegisteredEntities(): string[] {
  return [...routes.keys()].sort();
}
