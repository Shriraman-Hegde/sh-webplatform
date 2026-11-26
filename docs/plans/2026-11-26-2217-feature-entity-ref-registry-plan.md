---
title: entity-ref + static registry
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-brainstorm
status: implementation-ready
---

# entity-ref + static registry

## Goal Capsule

Add `<wk-entity-ref>` and a pluggable entity→route registry so cross-module links are declarative, discovery-ready, and proven in Storybook/Workbench — without JSON forms or Helm yet.

## Product Contract

- **In:** Lit `wk-entity-ref` (entity + id → resolved href); static in-memory registry API (`register` / `resolve` / `clear`); degrade to disabled text when unresolved; Storybook story + Workbench usage; unit tests under `tests/`.
- **Out:** JSON form renderer; live Kubernetes discovery service; Helm base chart (next wave); IAM enforcement beyond a simple optional `allowed` flag.
- **Success:** Storybook shows resolved links and disabled unresolved refs; Workbench linked IDs use entity-ref; Rollup build + vitest green.

## Key technical decisions

- Registry lives in `src/registry/` as a singleton with `configureRegistry(entries)` for apps/tests.
- Route templates use `{id}` placeholder (`/collateral/{id}`).
- Component under `src/components/composite/wk-entity-ref/` per STRUCTURE.md.
- Discovery later swaps the resolver; API stays `resolve(entity) → { routeTemplate, label? } | undefined`.

## Implementation units

1. **Registry module** — types, configure/resolve/clear, unit tests.
2. **wk-entity-ref** — properties `entity`, `entity-id` (or `ref-id`), optional `label`/`allowed`; renders `<a>` or muted span; story + unit test.
3. **Workbench + docs** — replace plain table IDs with entity-refs; README/STRUCTURE note; sample demo registry seed.
