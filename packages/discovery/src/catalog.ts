import type {
  DiscoveredComponent,
  DiscoveredEntity,
  ModuleDescriptor,
} from "./schema.js";

export class DiscoveryCatalog {
  #modules = new Map<string, ModuleDescriptor>();

  replaceAll(descriptors: readonly ModuleDescriptor[]): void {
    this.#modules.clear();
    for (const descriptor of descriptors) {
      this.upsert(descriptor);
    }
  }

  upsert(descriptor: ModuleDescriptor): void {
    const key = descriptor.module.trim().toLowerCase();
    if (!key) {
      return;
    }
    this.#modules.set(key, {
      ...descriptor,
      module: key,
      entities: descriptor.entities.map((e) => ({
        ...e,
        type: e.type.trim().toLowerCase(),
      })),
    });
  }

  clear(): void {
    this.#modules.clear();
  }

  listModules(): ModuleDescriptor[] {
    return [...this.#modules.values()].sort((a, b) =>
      a.module.localeCompare(b.module),
    );
  }

  listEntities(): DiscoveredEntity[] {
    const out: DiscoveredEntity[] = [];
    for (const mod of this.listModules()) {
      for (const entity of mod.entities) {
        out.push({
          ...entity,
          module: mod.module,
          routePrefix: mod.routePrefix,
        });
      }
    }
    return out.sort((a, b) => a.type.localeCompare(b.type));
  }

  listComponents(): DiscoveredComponent[] {
    const out: DiscoveredComponent[] = [];
    for (const mod of this.listModules()) {
      for (const component of mod.components) {
        out.push({
          ...component,
          module: mod.module,
          routePrefix: mod.routePrefix,
        });
      }
    }
    return out.sort((a, b) => a.tag.localeCompare(b.tag));
  }

  resolveEntity(type: string): DiscoveredEntity | undefined {
    const key = type.trim().toLowerCase();
    return this.listEntities().find((e) => e.type === key);
  }
}
