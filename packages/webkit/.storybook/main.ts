import type { StorybookConfig } from "@storybook/web-components-vite";
import { cssTextPlugin } from "../css-text-plugin.mjs";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      base: "/sh-webplatform/",
      plugins: [cssTextPlugin()],
    });
  },
};

export default config;
