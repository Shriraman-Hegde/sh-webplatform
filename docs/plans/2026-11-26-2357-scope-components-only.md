---
title: Scope — components only
status: active
---

# Scope change: components only

MFE architecture (route-level modules, entity-ref, UI discovery service, Helm base chart) is **paused**.

Active work is `@sh-webplatform/webkit` under open-wc (Web Test Runner, building-rollup, Storybook), plus `@sh-webplatform/webkit-cli` and `webkit-mcp`. Both lookup tools read `packages/webkit/src/catalog.ts`. The element list, field contract, and shadow-root rules are in `packages/webkit/STRUCTURE.md`.

The first publish was a thin form and layout set for Workbench. The kit has since added the rest of the form fields, navigation, overlays, and `wk-data-grid` (sort, filter, column manager). `wk-data-table` stays the static table.

Closed as out of scope for now: PR #2 (discovery / Helm), entity-ref, and the JSON form renderer.
