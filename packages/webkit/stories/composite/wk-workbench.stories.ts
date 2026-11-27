import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../src/components/composite/wk-workbench/index.js";
import { docs } from "../_helpers.js";

const usage = `
import { bootstrapWebkit } from "@sh-webplatform/webkit";
import { iconRegistry } from "@sh-webplatform/icons";
import "@sh-webplatform/webkit";

bootstrapWebkit({ theme: "default", icons: iconRegistry });
<wk-workbench></wk-workbench>
`.trim();

const meta: Meta = {
  title: "Composite/Workbench",
  component: "wk-workbench",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    ...docs(`Composition demo of form + layout primitives. Use component Overviews for options and Playground for Controls.

### Usage
\`\`\`html
${usage}
\`\`\``),
  },
  render: () => html`<wk-workbench></wk-workbench>`,
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {};
