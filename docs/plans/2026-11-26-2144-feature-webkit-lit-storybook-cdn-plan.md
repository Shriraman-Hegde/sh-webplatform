---
title: webkit Lit shared UI library — first Storybook and CDN publish
date: 2026-11-26
type: feature
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-brainstorm
execution: code
---

## Goal Capsule

**Objective:** A small core can publish a versioned Lit component library that department apps install from npm or load from a CDN, with theme switching proven the same way on a published workshop site and a sample consumer.

**Means:** Demo-page product — components exist to compose one synthetic Storybook.js demo app page (“Workbench”); thin mix of form and layout primitives; multi-theme from day one on Storybook and the sample consumer.

**Product authority:** This plan owns **webkit** only (shared Lit library + Storybook + publish + sample consumer). Cross-module navigation, discovery/Helm deploy kit, platform shell/IAM, entity-ref, and JSON forms are surrounding work, not active scope.

**Open blockers:** None. Theme count and demo-page content are settled in Planning Contract KTD5–KTD6.

## Product Contract

### Summary

Ship **webkit**: a Lit-based shared UI library developed in [Storybook.js](https://storybook.js.org/), bundled for versioned **npm and CDN** artifacts, proven by a live Storybook site and a sample consumer that installs those artifacts and renders the same synthetic demo page with theme switching. Cross-department ERP navigation and deploy discovery come later and consume this library.

### Problem Frame

The ERP spans industries and departments. Teams rebuild the same UI pieces when workflows cross-reference each other. A shared component platform is the first substrate. Navigation registries, discovery services, and JSON page definitions do not remove rebuild pain until teams can import a stable, versioned UI library. This plan delivers that library first.

### Key Decisions

- **webkit first; navigation and deploy later** (session-settled: user-directed — chosen over owning discovery/Helm or entity-ref in this brainstorm: build components → Storybook/Rollup/CDN, then use them for areas 2–3). Governs R1–R8.
- **entity-ref out of v1 priority** (session-settled: user-directed — chosen over including entity-ref in first publish).
- **Thin mix of form + layout primitives** (session-settled: user-directed — chosen over form-only or layout-only: enough for one synthetic demo page). Governs R2, R3.
- **Synthetic Storybook demo page as proof** (session-settled: user-directed — chosen over a real department ERP page). Governs R3, AE1.
- **Success = Storybook site + sample consumer** (session-settled: user-directed — chosen over Storybook-only or consumer-only). Governs R6, R7, SC1–SC2.
- **npm + CDN same versioned artifacts** (session-settled: user-directed — chosen over a single load path). Governs R5, R6.
- **Small core ownership until a platform team exists** (session-settled: user-directed — chosen over day-one multi-team contributions). Governs R8.
- **Multi-theme day one on Storybook and sample consumer** (session-settled: user-directed — chosen over one shared look, token-hooks-only, or Storybook-only themes). Governs R4, AE2.
- **Demo-page product (approach B)** (session-settled: user-directed — chosen over primitives catalog or starter-kit platform). Governs R2, R3.
- **No intentional cut of first-publish scope** (session-settled: user-directed — chosen over shrinking the publish bar: full commitment to Storybook + consumer + multi-theme).

### How This Work Fits Together

<!-- ce-section: work-relationships -->

This plan covers **webkit** (Lit library, Storybook.js, Rollup/Babel publish, CDN + npm, sample consumer). The broader ERP UI platform understanding below is contextual, not a committed roadmap.

- **Later: Cross-module navigation** (entity-ref + discovery registry)
  - Depends on: webkit components and publish loop from this plan
  - Enables: deep-links across department MFEs without rebuilding forms
  - Still to decide: discovery mechanism (ConfigMap vs module manifests vs CRD) from prior notes in `requirement.md`
- **Later: Deploy kit** (base Helm library chart + module descriptors)
  - Depends on: stable webkit consumption story; feeds discovery when navigation ships
  - Can proceed independently of: first webkit CDN publish once the library exists
- **Later: Platform shell** (ingress path routing + shared IAM/SSO across MFEs)
  - Shares: eventual consumers of webkit
  - Can proceed independently of: this plan’s Storybook/CDN loop
- **Deferred product ideas:** JSON-defined forms/pages (may sit on the same entity-ref/registry contracts later)

### Actors

- **Core owner** — you / a small set: designs, implements, publishes, and versions webkit until a platform team exists.
- **Sample consumer** — a separate install target used only to prove npm/CDN consumption and theme switching; not a production department MFE.
- **Future department app teams** — out of scope as contributors for v1; they become consumers after this loop works.

### Requirements

**Library product**

- R1. webkit is a Lit custom-element library that department apps can consume without forking component source.
- R2. The first component set is a thin mix of form primitives and layout/chrome primitives, sized only to compose the synthetic demo page (demo-page product, not an open catalog).
- R3. Storybook.js hosts a synthetic demo app page that composes those components; that page is the proof surface, not a real ERP department screen.
- R4. At least two industry/brand themes ship in v1; the same theme switch works in Storybook and in the sample consumer on that demo page.

**Publish and consume**

- R5. Each release produces matching versioned artifacts for npm install and CDN load (same version identity).
- R6. A published Storybook site for a release is reachable and shows the demo page with theme switching.
- R7. A sample consumer outside the library package installs a published version (npm and/or CDN as documented) and renders the demo page with theme switching.
- R8. Until a platform team exists, only the small core publishes releases; contribution workflow for other teams is not required in v1.

### Key Flows

**F1. Core owner publishes a release**

1. Develop and review components and the synthetic demo page in Storybook.js.
2. Cut a versioned release that updates npm and CDN artifacts together.
3. Confirm Storybook for that version loads the demo page and themes.
4. Confirm the sample consumer can install that version and match Storybook’s theme behavior on the demo page.

**F2. Sample consumer proves adoption**

1. Point the sample consumer at a published version.
2. Render the synthetic demo page.
3. Switch themes and see the same visual language as Storybook for that version.

### Acceptance Examples

- AE1. When the core owner finishes the first publish, a cold reader can open the Storybook URL for that version, see the synthetic demo page, and switch themes without local library source. Covers R3, R4, R6.
- AE2. When the sample consumer installs the same version, it renders the same demo page composition and theme switch without copying component source into the consumer repo. Covers R5, R7, R4.
- AE3. When a component is not needed by the synthetic demo page, it is not required in the first publish set. Covers R2.

### Success Criteria

- SC1. Storybook for the published version loads and demonstrates theme switching on the synthetic demo page (R6).
- SC2. Sample consumer installs that version and demonstrates the same (R7).
- SC3. npm and CDN artifacts for a release share one version identity (R5).

### Scope Boundaries

**In scope**

- Lit webkit library, Storybook.js workshop, synthetic demo page, thin form+layout set, multi-theme, Rollup/Babel/minify publish pipeline as the means to npm+CDN, sample consumer proof harness.

**Deferred for later**

- entity-ref and cross-module navigation
- UI element discovery service and base Helm library chart
- Platform shell ingress + IAM/SSO across MFEs
- JSON-defined forms and pages
- Real department ERP pages as first consumers
- Multi-team contribution model / platform team handoff process
- Starter-kit clone template for department apps

**Outside this product's identity (for this plan)**

- Replacing ERP backend modules or IAM products
- Embedding remote MFE components inside other MFEs as the primary cross-ref model (prior notes favored route-level MFEs later)

### Dependencies / Assumptions

- A1. Repo starts with LICENSE + `requirement.md` only; no existing Lit/Storybook pipeline to extend (verified 2026-11-26).
- A2. “Storybook” means [Storybook.js](https://storybook.js.org/).
- A3. Later MFEs will consume webkit; Zustand and per-app state stay at the app layer for this plan.
- A4. Theme count stays small enough for v1 (planning picks exact themes; product requires more than one).
- A5. Headlamp remains an ops viewer, not the release mechanism; Azure Pipelines + Helm appear in later deploy work, not as blockers for this library publish.

### Outstanding Questions

**Resolve Before Planning:** none.

**Deferred to Planning:** resolved in Planning Contract KTDs below (component list, themes, package/CDN layout, Storybook host, Babel/decorators, consumer layout).

### Sources / Research

- Dialogue and prior notes: `requirement.md` (ERP cross-reference pain; approach C for later MFEs; JSON deferred; discovery A/B/C still open for later work).
- Grounding dossier: empty-repo scan under session scratch (repo had only LICENSE + `requirement.md` at planning time).

### Product Contract preservation

restructured, no scope change: Outstanding Questions deferred items → Planning Contract KTDs; Product R/A/F/AE IDs unchanged.

## Planning Contract

### Key Technical Decisions

- KTD1. **pnpm workspace monorepo** — `packages/webkit` (library + Storybook) and `packages/sample-consumer` (proof harness). One repo, two packages; sample consumer never vendors component source. Rationale: small-core ownership, shared CI, workspace link for local proof before publish. Governs U1–U6.
- KTD2. **Package name `@sh-webplatform/webkit`** — matches repo identity; scoped npm publish. Governs U1, U5.
- KTD3. **Rollup + Babel + minify for library artifacts; Storybook Vite builder for workshop** — publishable ESM for npm plus a **required** minified CDN entry. Externalize `lit` as a `peerDependency` on the npm ESM build; **bundle `lit` into the CDN entry** for single-script use. Components use Lit `static properties` (no experimental decorators) so Storybook Vite and Rollup/Babel share one reliable reactive API. Babel transpiles TypeScript for Rollup. Governs U1, U5, U6.
- KTD4. **Same version identity via npm + jsDelivr (or unpkg) CDN URLs** — publish once to npm; CDN consumers load `https://cdn.jsdelivr.net/npm/@sh-webplatform/webkit@<version>/…` for the CDN entry. Custom origin CDN can replace jsDelivr later without changing the version contract (R5). Governs U5, U6.
- KTD5. **Themes `finance` and `manufacturing`** — two CSS custom-property themes applied via `data-theme` on `:root` / host; theme switcher sets the attribute. Governs U2, U3, U6.
- KTD6. **Synthetic demo = “Workbench” page** — page shell + card + form (text field, select, checkbox, primary/secondary button) + simple data table + empty/loading/error banners. Components only as needed for this page (R2). Governs U3, U4.
- KTD7. **Storybook static site on GitHub Pages** for the published Storybook URL (R6); separate from the npm/CDN package URL. For this repo (`Shriraman-Hegde/sh-webplatform`), set Storybook builder `base` to `/sh-webplatform/` so project Pages assets resolve. Governs U5.
- KTD8. **Sample consumer proves workspace, pack/npm, and CDN paths** — Vite app for workspace + `pnpm pack`/npm install; a separate static `cdn-proof.html` (import map + theme switcher + Workbench) for CDN proof without Vite bundling webkit. Governs U6.

### Technical Design

Greenfield monorepo. `packages/webkit` exports Lit custom elements and theme CSS. Public API is the custom element tag set plus documented CSS custom properties. Storybook stories cover each primitive and one composed Workbench story with theme toolbar. Rollup emits `dist/` ESM (lit external) and a minified CDN entry (lit bundled). `packages/sample-consumer` is a Vite app for workspace/npm proof plus `cdn-proof.html` for import-map CDN proof; both host the theme switcher.

### Assumptions

- A6. npm publish access for `@sh-webplatform` (or org rename) will be available before the first public release; until then, `pnpm pack` + local/tarball install proves the consumer path.
- A7. jsDelivr mirroring npm is acceptable as the v1 CDN; a private CDN is out of this plan’s infra scope.
- A8. Two themes are enough to satisfy R4; more industries wait until real consumers exist.

### System-Wide Impact

- New repo toolchain: Node, pnpm, Storybook, Rollup, Babel, TypeScript, Lit.
- No existing app code to migrate.
- Later MFEs will depend on the published package name and theme attribute contract.

### Implementation Units

### U1. Monorepo scaffold and toolchain

**Goal:** Installable workspace with TypeScript, Lit, Rollup, Babel, and Storybook stubs.

**Scope:** Root `package.json` / `pnpm-workspace.yaml`, `packages/webkit` package skeleton, tsconfig, Babel + Rollup config stubs, Storybook init under webkit, basic lint/format scripts. No real components yet.

**Files:** `package.json`, `pnpm-workspace.yaml`, `packages/webkit/package.json`, `packages/webkit/tsconfig.json`, `packages/webkit/babel.config.*`, `packages/webkit/rollup.config.*`, `packages/webkit/.storybook/*`, `.gitignore`, `README.md` (install/build pointers).

**Test scenarios:**
- Happy path: `pnpm install` succeeds; `pnpm --filter @sh-webplatform/webkit build` runs Rollup with empty/stub entry and exits 0.
- Happy path: Storybook loads one stub decorated Lit custom element (proves Babel decorator path via Vite).
- Happy path: `build-storybook` dry-run succeeds with `base` `/sh-webplatform/`.

**Verify:** Install + stub build + Storybook loads stub element + Storybook static build green.

**Depends on:** none.

---

### U2. Theme tokens and switcher contract

**Goal:** `finance` and `manufacturing` themes via CSS custom properties; documented `data-theme` switch.

**Scope:** Token CSS files, theme application helper/docs, Storybook theme toolbar wiring. No full Workbench yet.

**Files:** `packages/webkit/src/themes/*`, `packages/webkit/src/theme.ts` (or equivalent), Storybook preview theme decorator.

**Test scenarios:**
- Happy path: setting `data-theme="finance"` vs `manufacturing` changes token-backed colors in a Storybook story.
- Edge: missing/unknown theme falls back to a documented default without crashing.

**Verify:** Storybook story shows both themes; unit test for fallback if present.

**Depends on:** U1.

**Covers:** R4.

---

### U3. Thin component set for Workbench

**Goal:** Form + layout primitives required by the Workbench page only.

**Scope:** Custom elements for button, text-field, select, checkbox, page-shell, card, data-table (simple), status-banner (empty/loading/error). Styles consume theme tokens. No entity-ref.

**Files:** `packages/webkit/src/components/*`, barrel `packages/webkit/src/index.ts`, per-component Storybook stories.

**Test scenarios:**
- Happy path: each component renders with accessible name/role basics in unit/dom tests.
- Happy path: components reflect theme tokens when `data-theme` changes.
- Edge: disabled/error states for form controls as applicable.

**Verify:** Component unit tests + Storybook stories for each primitive.

**Depends on:** U2.

**Covers:** R2.

---

### U4. Workbench synthetic demo page

**Goal:** Composed Storybook demo page using only U3 components.

**Scope:** Workbench composition (layout + form + table + banners); primary Storybook story “Demo / Workbench” with theme switch.

**Files:** `packages/webkit/src/demo/workbench.*`, Storybook story composing Workbench.

**Test scenarios:**
- Happy path: Workbench story renders form + table + banners without console errors.
- Happy path: theme switch updates Workbench chrome and controls.
- Edge: loading and empty banner variants visible via story controls or args.

**Verify:** Storybook interaction/smoke on Workbench story.

**Depends on:** U3.

**Covers:** R3, AE3.

---

### U5. Publish pipeline (npm + CDN identity + Storybook host)

**Goal:** Versioned artifacts for npm; CDN URLs that resolve the same version; Storybook static deploy.

**Scope:** Rollup outputs (ESM with lit external + minified CDN entry with lit bundled), package `exports`/`files`/`peerDependencies`, version bump script, publish docs (jsDelivr URL + import-map example), GitHub Actions for `build-storybook` → Pages (`base` `/sh-webplatform/`) and npm publish (manual approval ok).

**Files:** `packages/webkit/rollup.config.*` (finalize), `packages/webkit/package.json` exports, `.github/workflows/*`, `docs/publishing.md` or README section.

**Test scenarios:**
- Happy path: `pnpm pack` produces a tarball whose contents match documented exports.
- Happy path: Storybook static build exits 0 with asset paths under `/sh-webplatform/`.
- Edge: version in package.json matches the version string documented for CDN URLs.
- Edge: CDN entry runs in a bare page without a separate lit import; ESM build requires lit as peer.

**Verify:** Local pack + Storybook static build; CI workflow files present; publishing docs include Pages URL and jsDelivr pattern.

**Depends on:** U4.

**Covers:** R5, R6, AE1, SC1, SC3.

---

### U6. Sample consumer proof harness

**Goal:** App outside the library package that renders Workbench with theme switch via workspace and published install paths.

**Scope:** `packages/sample-consumer` Vite app importing `@sh-webplatform/webkit`, theme switcher UI, static `cdn-proof.html` (import map + Workbench + theme switch), README steps for workspace vs `pnpm pack`/npm vs CDN.

**Files:** `packages/sample-consumer/*` (including `cdn-proof.html`), root workspace membership, consumer README.

**Test scenarios:**
- Happy path: with workspace dependency, Vite consumer renders Workbench and switches themes.
- Happy path: after `pnpm pack` + install from tarball (or documented npm version), Vite consumer still renders Workbench.
- Edge: `cdn-proof.html` loads Workbench from the documented CDN URL without bundling webkit into the consumer tree.

**Verify:** Consumer smoke test / Playwright or Vitest browser smoke for Vite app; open `cdn-proof.html` for CDN path; README proof checklist.

**Depends on:** U5 (publish shape); can stub against workspace earlier but release proof needs U5.

**Covers:** R1, R7, AE2, SC2.

## Verification Contract

- `pnpm install`
- `pnpm --filter @sh-webplatform/webkit test` (component/unit)
- `pnpm --filter @sh-webplatform/webkit build` (Rollup)
- `pnpm --filter @sh-webplatform/webkit build-storybook`
- `pnpm --filter sample-consumer test` (or smoke) and `pnpm --filter sample-consumer build`
- Manual/CI: open Storybook Workbench + theme switch; open sample consumer + theme switch
- Release: version bump → publish/pack → consumer install of that version → jsDelivr URL resolves same version

## Definition of Done

- All U1–U6 verify criteria pass.
- R1–R8 and SC1–SC3 are demonstrable from Storybook + sample consumer against one versioned release (tarball acceptable before npm credentials exist; A6).
- Product Contract scope exclusions remain: no entity-ref, discovery, Helm chart, or JSON forms in this delivery.
- README documents install (npm + CDN), theme switch (`data-theme`), and ownership (small core publishes).
