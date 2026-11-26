import type { Preview } from "@storybook/web-components";
import { DEMO_ENTITY_ROUTES } from "../src/registry/demo-routes.js";
import { configureRegistry } from "../src/registry/index.js";
import { applyTheme, type WebkitTheme } from "../src/theme/index.js";
import "../src/themes/themes.css";

configureRegistry([...DEMO_ENTITY_ROUTES]);


const preview: Preview = {
  globalTypes: {
    theme: {
      description: "webkit theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "default", title: "default" },
          { value: "warm", title: "warm" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "default",
  },
  decorators: [
    (story, context) => {
      applyTheme(context.globals.theme as WebkitTheme);
      return story();
    },
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default preview;
