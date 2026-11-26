---
title: UI component discovery service
artifact_contract: ce-unified-plan/v1
product_contract_source: settled-session
status: implementation-ready
---

# UI component discovery service

## Goal Capsule

Ship a discovery service (+ Helm module base chart) that aggregates what each deployed module exposes (entities + UI components), so webkit consumers resolve cross-refs from the cluster — **not** from demo routes baked into webkit.

## Product Contract

- **In:** `packages/discovery` HTTP service; descriptor schema; file/fixture source for local proof; K8s ConfigMap source stub/contract; `charts/sh-module-base` Helm library chart emitting labeled discovery ConfigMaps; GET `/discovery/entities` and `/discovery/components`.
- **Out:** `wk-entity-ref` in webkit; demo route seeds inside `@sh-webplatform/webkit`; JSON form renderer; full K8s watch controller RBAC deploy (document contract; file source proves API).
- **Success:** Fixture descriptors serve discovery JSON; Helm chart templates a ConfigMap matching that schema; webkit remains free of registry demo data.

## Settled decisions

- Discovery before entity-ref (entity-ref will call discovery later).
- Approach A: labeled ConfigMaps from a shared Helm library chart.
- No industry/demo routes published inside webkit.
