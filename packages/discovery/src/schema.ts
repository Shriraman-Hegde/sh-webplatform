/** Module descriptor published via Helm ConfigMap / local fixtures. */
export type ModuleDescriptor = {
  /** Owning module / Helm release name. */
  module: string;
  /** Ingress path prefix owned by this module. */
  routePrefix: string;
  /** Entity types this module owns. */
  entities: EntityDescriptor[];
  /** UI components this module exposes for discovery. */
  components: ComponentDescriptor[];
  /** Roles required to use links/components from this module. */
  roles?: string[];
};

export type EntityDescriptor = {
  type: string;
  routeTemplate: string;
  label?: string;
};

export type ComponentDescriptor = {
  /** Custom element tag or export id. */
  tag: string;
  /** Semver or package version string. */
  version: string;
  /** How consumers should treat it (e.g. summary, form, page). */
  kind: string;
  label?: string;
};

export type DiscoveredEntity = EntityDescriptor & {
  module: string;
  routePrefix: string;
};

export type DiscoveredComponent = ComponentDescriptor & {
  module: string;
  routePrefix: string;
};

export function isModuleDescriptor(value: unknown): value is ModuleDescriptor {
  if (!value || typeof value !== "object") {
    return false;
  }
  const v = value as Record<string, unknown>;
  return (
    typeof v.module === "string" &&
    typeof v.routePrefix === "string" &&
    Array.isArray(v.entities) &&
    Array.isArray(v.components)
  );
}
