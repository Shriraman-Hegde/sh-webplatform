import type { Preview } from "@storybook/web-components";
import { bootstrapWebkit } from "../src/bootstrap.js";
import { defaultIconLibrary } from "../src/boot-icons.js";
import {
  WEBKIT_MODES,
  WEBKIT_THEMES,
  type WebkitMode,
  type WebkitMotion,
  type WebkitTheme,
} from "../src/theme/index.js";
import "../src/themes/themes.css";

bootstrapWebkit({
  theme: "default",
  mode: "day",
  motion: "system",
  icons: defaultIconLibrary,
});

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      description: "webkit look theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: WEBKIT_THEMES.map((value) => ({ value, title: value })),
        dynamicTitle: true,
      },
    },
    mode: {
      description: "day / night mode",
      toolbar: {
        title: "Mode",
        icon: "mirror",
        items: WEBKIT_MODES.map((value) => ({ value, title: value })),
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
    mode: "day",
    motion: "system",
  },
  decorators: [
    (story, context) => {
      bootstrapWebkit({
        theme: context.globals.theme as WebkitTheme,
        mode: context.globals.mode as WebkitMode,
        motion: context.globals.motion as WebkitMotion,
        icons: defaultIconLibrary,
      });
      return story();
    },
  ],
  parameters: {
    viewMode: "docs",
    layout: "padded",
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
    options: {
      storySort: {
        order: ["Form", "Layout", "Composite", ["Overview", "*"]],
      },
    },
    docs: {
      toc: true,
      canvas: {
        sourceState: "hidden",
      },
    },
  },
};

export default preview;
