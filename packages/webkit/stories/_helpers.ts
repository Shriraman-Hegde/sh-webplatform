import type { ArgTypes } from "@storybook/web-components";

/** Docs blurb + HTML usage fence for the component page. */
export function componentDocs(summary: string, usage: string): {
  docs: {
    description: { component: string };
    source: { type: "dynamic" };
  };
} {
  return {
    docs: {
      description: {
        component: `${summary.trim()}

### Usage
\`\`\`html
${usage.trim()}
\`\`\``,
      },
      source: { type: "dynamic" },
    },
  };
}

/** Attribute row helpers matching SC WebKit-style docs tables. */
export function attr(
  description: string,
  options?: {
    control?: ArgTypes[string]["control"];
    options?: string[];
    defaultValue?: string;
    type?: string;
  },
): ArgTypes[string] {
  return {
    description,
    control: options?.control ?? "text",
    options: options?.options,
    table: {
      type: { summary: options?.type ?? "string" },
      defaultValue: options?.defaultValue
        ? { summary: options.defaultValue }
        : undefined,
    },
  };
}

export const sizeArg = attr("Control size: sm | md | lg.", {
  control: "select",
  options: ["sm", "md", "lg"],
  defaultValue: "md",
  type: '"sm" | "md" | "lg"',
});

export const disabledArg = attr("Disables the control.", {
  control: "boolean",
  defaultValue: "false",
  type: "boolean",
});
