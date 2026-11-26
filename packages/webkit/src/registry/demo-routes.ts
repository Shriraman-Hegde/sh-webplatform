import type { EntityRoute } from "./registry.js";

/** Seed routes for Storybook / Workbench demos until discovery lands. */
export const DEMO_ENTITY_ROUTES: readonly EntityRoute[] = [
  {
    entity: "collateral",
    routeTemplate: "/collateral/{id}",
    label: "Collateral",
  },
  {
    entity: "facility",
    routeTemplate: "/facilities/{id}",
    label: "Facility",
  },
  {
    entity: "borrower",
    routeTemplate: "/borrowers/{id}",
    label: "Borrower",
  },
];
