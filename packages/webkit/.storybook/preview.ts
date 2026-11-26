import type { Preview } from "@storybook/web-components";
import { applyTheme, type WebkitTheme } from "../src/theme";
import "../src/themes/themes.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "webkit theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "finance", title: "finance" },
          { value: "manufacturing", title: "manufacturing" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "finance",
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
