import type { Preview } from "@storybook/web-components";
import { bootstrapWebkit } from "../src/bootstrap.js";
import type { WebkitTheme } from "../src/theme/index.js";
import "../src/themes/themes.css";

bootstrapWebkit({ theme: "default" });

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
      bootstrapWebkit({ theme: context.globals.theme as WebkitTheme });
      return story();
    },
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default preview;
