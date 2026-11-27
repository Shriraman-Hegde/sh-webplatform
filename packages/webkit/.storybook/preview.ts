import type { Preview } from "@storybook/web-components";
import { bootstrapWebkit } from "../src/bootstrap.js";
import { defaultIconLibrary } from "../src/boot-icons.js";
import type { WebkitMotion, WebkitTheme } from "../src/theme/index.js";
import "../src/themes/themes.css";

bootstrapWebkit({
  theme: "default",
  motion: "system",
  icons: defaultIconLibrary,
});

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
    motion: {
      description: "webkit motion",
      toolbar: {
        title: "Motion",
        icon: "play",
        items: [
          { value: "system", title: "system" },
          { value: "on", title: "on" },
          { value: "off", title: "off" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "default",
    motion: "system",
  },
  decorators: [
    (story, context) => {
      bootstrapWebkit({
        theme: context.globals.theme as WebkitTheme,
        motion: context.globals.motion as WebkitMotion,
        icons: defaultIconLibrary,
      });
      return story();
    },
  ],
  parameters: {
    layout: "padded",
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
};

export default preview;
