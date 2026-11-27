import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/form/wk-button/index.js";
import { componentDocs } from "../_helpers.js";

const meta: Meta = {
  title: "Guides/Shadow DOM",
  component: "wk-button",
  tags: ["autodocs"],
  parameters: componentDocs(
    "Each wk-* element keeps its CSS in a shadow root. A page rule that names the inner button does not apply. --wk-* tokens inherit in, and ::part() styles only the named hook.",
  ),
};

export default meta;
type Story = StoryObj;

export const Boundary: Story = {
  render: () => html`
    <style>
      .try-pierce wk-button button {
        background: #b42318;
        border-radius: 0;
      }
      wk-button.token {
        --wk-accent: #7c3aed;
      }
      wk-button.shaped::part(control) {
        border-radius: 999px;
      }
    </style>
    <div style="display:grid;gap:1.25rem;max-width:36rem">
      <section class="try-pierce">
        <p style="margin:0 0 0.5rem">
          Page CSS sets the inner button to red. The shadow root blocks that rule, so the button keeps the accent fill.
        </p>
        <wk-button>Blocked</wk-button>
      </section>
      <section>
        <p style="margin:0 0 0.5rem">
          Setting --wk-accent on the element changes the fill, because custom properties inherit into the shadow tree.
        </p>
        <wk-button class="token">Token</wk-button>
      </section>
      <section>
        <p style="margin:0 0 0.5rem">
          wk-button::part(control) changes the radius. The rest of the button stays the kit's.
        </p>
        <wk-button class="shaped">Part</wk-button>
      </section>
    </div>
  `,
};
