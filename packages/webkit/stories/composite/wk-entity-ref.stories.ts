import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { configureRegistry } from "../../src/registry/index.js";
import { DEMO_ENTITY_ROUTES } from "../../src/registry/demo-routes.js";
import "../../src/components/composite/wk-entity-ref/index.js";

configureRegistry([...DEMO_ENTITY_ROUTES]);

const meta: Meta = {
  title: "Composite/Entity Ref",
  component: "wk-entity-ref",
};

export default meta;
type Story = StoryObj;

export const Resolved: Story = {
  render: () =>
    html`<div style="padding: 1.5rem">
      <wk-entity-ref entity="collateral" entity-id="COL-77"></wk-entity-ref>
    </div>`,
};

export const Unresolved: Story = {
  render: () =>
    html`<div style="padding: 1.5rem">
      <wk-entity-ref entity="risk" entity-id="R-9"></wk-entity-ref>
    </div>`,
};

export const Restricted: Story = {
  render: () =>
    html`<div style="padding: 1.5rem">
      <wk-entity-ref
        entity="facility"
        entity-id="FAC-1001"
        ?allowed=${false}
      ></wk-entity-ref>
    </div>`,
};
