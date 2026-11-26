# @sh-webplatform/discovery

UI **component** and **entity** discovery for department modules.

Modules publish a descriptor (via the `sh-module-base` Helm library chart ConfigMap, or local fixtures). This service aggregates them and serves:

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Liveness |
| GET | `/discovery/modules` | Module descriptors |
| GET | `/discovery/entities` | Entity → route templates |
| GET | `/discovery/entities/:type` | Single entity |
| GET | `/discovery/components` | Discoverable UI components |

## Local

```bash
pnpm --filter @sh-webplatform/discovery build
pnpm --filter @sh-webplatform/discovery start
# → http://127.0.0.1:8787/discovery/components
```

Fixtures under `fixtures/` prove the API without a cluster. Cluster mode will list ConfigMaps labeled `sh-webplatform.io/discovery=module` (see `src/sources/configmap-contract.ts`).

**Not in webkit:** demo routes and `wk-entity-ref` stay out of `@sh-webplatform/webkit`; clients will call this service later.
