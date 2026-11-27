import { MCPServer } from "mcp-use";
import { z } from "zod";
import { webkitIconNames } from "../webkit/src/boot-icons.js";
import { componentCatalog, themeGuide } from "../webkit/src/catalog.js";

const server = new MCPServer({
  name: "webkit",
  title: "webkit",
  version: "0.1.0",
  description:
    "Look up wk-* components, icons, and theme setup while building an application.",
});

const attributeSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const componentSchema = z.object({
  tag: z.string(),
  summary: z.string(),
  example: z.string(),
  attributes: z.array(attributeSchema),
  events: z.array(z.string()),
});

server.tool(
  {
    name: "list-components",
    description: "List wk-* elements an application can use.",
    inputSchema: z.object({}),
    outputSchema: z.object({
      components: z.array(
        z.object({
          tag: z.string(),
          summary: z.string(),
        }),
      ),
    }),
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async () => {
    const components = componentCatalog.map(({ tag, summary }) => ({
      tag,
      summary,
    }));
    return {
      content: [
        {
          type: "text",
          text: components.map((item) => `${item.tag}: ${item.summary}`).join("\n"),
        },
      ],
      structuredContent: { components },
    };
  },
);

server.tool(
  {
    name: "get-component",
    description:
      "Return attributes, events, and an HTML example for one wk-* element.",
    inputSchema: z.object({
      tag: z
        .string()
        .describe("Element tag, for example wk-button or wk-drawer"),
    }),
    outputSchema: componentSchema,
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async ({ tag }) => {
    const found = componentCatalog.find((item) => item.tag === tag);
    if (!found) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `No component named ${tag}. Call list-components for the tags that exist.`,
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `${found.tag}\n${found.summary}\n\n${found.example}`,
        },
      ],
      structuredContent: found,
    };
  },
);

server.tool(
  {
    name: "list-icons",
    description:
      "List icon names the kit can render, including app glyphs such as calendar, mail, and lock.",
    inputSchema: z.object({}),
    outputSchema: z.object({ icons: z.array(z.string()) }),
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async () => ({
    content: [{ type: "text", text: webkitIconNames.join(", ") }],
    structuredContent: { icons: [...webkitIconNames] },
  }),
);

server.tool(
  {
    name: "get-theme",
    description:
      "Return how an app sets look, day or night, motion, and the icon library.",
    inputSchema: z.object({}),
    outputSchema: z.object({
      looks: z.array(z.string()),
      modes: z.array(z.string()),
      motion: z.array(z.string()),
      setup: z.string(),
      notes: z.string(),
    }),
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  async () => ({
    content: [{ type: "text", text: `${themeGuide.notes}\n\n${themeGuide.setup}` }],
    structuredContent: themeGuide,
  }),
);

export default server;
