export type ComponentAttribute = {
  name: string;
  description: string;
};

export type ComponentDoc = {
  tag: string;
  summary: string;
  example: string;
  attributes: ComponentAttribute[];
  events: string[];
};

export const componentCatalog: ComponentDoc[] = [
  {
    tag: "wk-button",
    summary: "Action button with variant, size, optional icon, and hover motion.",
    example: `<wk-button variant="primary" icon="check">Save</wk-button>`,
    attributes: [
      { name: "variant", description: "primary | secondary | ghost" },
      { name: "size", description: "sm | md | lg" },
      { name: "icon", description: "Icon name" },
      { name: "icon-position", description: "start | end" },
      { name: "icon-only", description: "Icon without a label" },
      { name: "disabled", description: "Disables the button" },
      { name: "animated", description: "Hover motion. Honors data-motion" },
    ],
    events: [],
  },
  {
    tag: "wk-text-field",
    summary: "Single-line text field.",
    example: `<wk-text-field label="Title" name="title"></wk-text-field>`,
    attributes: [
      { name: "label", description: "Field label" },
      { name: "name", description: "Form name" },
      { name: "value", description: "Current value" },
      { name: "placeholder", description: "Placeholder" },
      { name: "leading-icon", description: "Icon before the text" },
      { name: "trailing-icon", description: "Icon after the text" },
      { name: "size", description: "sm | md | lg" },
      { name: "disabled", description: "Disables the field" },
      { name: "error", description: "Error state" },
    ],
    events: ["wk-input"],
  },
  {
    tag: "wk-textarea",
    summary: "Multi-line field. Set rich for the toolbar editor.",
    example: `<wk-textarea label="Notes" name="notes"></wk-textarea>`,
    attributes: [
      { name: "label", description: "Field label" },
      { name: "name", description: "Form name" },
      { name: "value", description: "Current value" },
      { name: "rows", description: "Row count" },
      { name: "rich", description: "Opt-in rich text" },
      { name: "show-icons", description: "Toolbar icons when rich" },
      { name: "disabled", description: "Disables the field" },
      { name: "error", description: "Error state" },
    ],
    events: ["wk-input", "wk-change"],
  },
  {
    tag: "wk-select",
    summary: "Listbox select. Options may include an icon. placement chooses the side. hoist escapes overflow.",
    example: `<wk-select label="Team" placement="bottom" hoist></wk-select>`,
    attributes: [
      { name: "label", description: "Field label" },
      { name: "name", description: "Form name" },
      { name: "value", description: "Selected value" },
      { name: "options", description: "Property: { value, label, icon? }[]" },
      { name: "placement", description: "bottom | top | start | end" },
      { name: "hoist", description: "Paint the menu on the top layer" },
      { name: "leading-icon", description: "Icon in the closed field" },
      { name: "disabled", description: "Disables the field" },
    ],
    events: ["wk-change"],
  },
  {
    tag: "wk-checkbox",
    summary: "Checkbox with a label.",
    example: `<wk-checkbox label="Urgent" name="urgent"></wk-checkbox>`,
    attributes: [
      { name: "label", description: "Label" },
      { name: "name", description: "Form name" },
      { name: "checked", description: "Checked state" },
      { name: "disabled", description: "Disables the box" },
    ],
    events: ["wk-change"],
  },
  {
    tag: "wk-switch",
    summary: "On or off switch.",
    example: `<wk-switch label="Email" name="email" checked></wk-switch>`,
    attributes: [
      { name: "label", description: "Label" },
      { name: "name", description: "Form name" },
      { name: "checked", description: "On state" },
      { name: "disabled", description: "Disables the switch" },
    ],
    events: ["wk-change"],
  },
  {
    tag: "wk-radio-group",
    summary: "Single-choice group.",
    example: `<wk-radio-group label="Priority" name="priority"></wk-radio-group>`,
    attributes: [
      { name: "label", description: "Group label" },
      { name: "name", description: "Form name" },
      { name: "value", description: "Selected value" },
      { name: "options", description: "Property: { value, label }[]" },
      { name: "disabled", description: "Disables the group" },
    ],
    events: ["wk-change"],
  },
  {
    tag: "wk-pagination",
    summary: "Page controls. page starts at 1.",
    example: `<wk-pagination page="1" pages="8"></wk-pagination>`,
    attributes: [
      { name: "page", description: "Current page, from 1" },
      { name: "pages", description: "Total pages" },
    ],
    events: ["wk-change"],
  },
  {
    tag: "wk-drawer",
    summary: "Side panel. Closes from the backdrop, Escape, or the close button.",
    example: `<wk-drawer heading="Record" placement="end" open>Details</wk-drawer>`,
    attributes: [
      { name: "open", description: "Show the panel" },
      { name: "heading", description: "Panel heading" },
      { name: "placement", description: "end | start" },
    ],
    events: ["wk-close"],
  },
  {
    tag: "wk-menu",
    summary: "Action menu. Put buttons in the default slot. wk-select detail is { value }.",
    example: `<wk-menu label="Actions"><button type="button" value="edit">Edit</button></wk-menu>`,
    attributes: [
      { name: "label", description: "Trigger label" },
      { name: "open", description: "Menu is open" },
    ],
    events: ["wk-select"],
  },
  {
    tag: "wk-toast",
    summary: "Short notice. duration is milliseconds; 0 stays until dismissed.",
    example: `<wk-toast open tone="success" duration="4000">Saved</wk-toast>`,
    attributes: [
      { name: "open", description: "Show the notice" },
      { name: "tone", description: "info | success | warning | danger" },
      { name: "duration", description: "Milliseconds before dismiss. 0 stays" },
    ],
    events: ["wk-close"],
  },
  {
    tag: "wk-avatar",
    summary: "Person mark. Initials come from label until src is an image.",
    example: `<wk-avatar label="Ada Lovelace" size="md"></wk-avatar>`,
    attributes: [
      { name: "label", description: "Name for the label and initials" },
      { name: "src", description: "Image URL" },
      { name: "size", description: "sm | md | lg" },
    ],
    events: [],
  },
  {
    tag: "wk-empty",
    summary: "Empty state. Body is the default slot. Actions go in the actions slot.",
    example: `<wk-empty heading="No records" icon="search"><p>Try another filter.</p></wk-empty>`,
    attributes: [
      { name: "heading", description: "Heading" },
      { name: "icon", description: "Icon name" },
    ],
    events: [],
  },
  {
    tag: "wk-page-shell",
    summary: "Page frame with a title and subtitle. Content is the default slot.",
    example: `<wk-page-shell page-title="Records" subtitle="Open items"></wk-page-shell>`,
    attributes: [
      { name: "page-title", description: "Page title" },
      { name: "subtitle", description: "Subtitle" },
    ],
    events: [],
  },
  {
    tag: "wk-card",
    summary: "Surface card. Heading plus default slot.",
    example: `<wk-card heading="Request">Body</wk-card>`,
    attributes: [{ name: "heading", description: "Card heading" }],
    events: [],
  },
  {
    tag: "wk-dialog",
    summary: "Modal dialog. Actions go in the actions slot.",
    example: `<wk-dialog heading="Confirm" open>Save this record?</wk-dialog>`,
    attributes: [
      { name: "open", description: "Show the dialog" },
      { name: "heading", description: "Dialog heading" },
    ],
    events: ["wk-close"],
  },
  {
    tag: "wk-alert",
    summary: "Inline alert.",
    example: `<wk-alert tone="info" heading="Note" show-icon>Nothing linked yet.</wk-alert>`,
    attributes: [
      { name: "tone", description: "info | success | warning | danger" },
      { name: "heading", description: "Heading" },
      { name: "icon", description: "Optional icon name" },
      { name: "show-icon", description: "Show the tone icon" },
      { name: "size", description: "sm | md | lg" },
    ],
    events: [],
  },
  {
    tag: "wk-data-table",
    summary: "Simple table. columns and rows are properties, not attributes.",
    example: `<wk-data-table caption="Records"></wk-data-table>`,
    attributes: [
      { name: "caption", description: "Table caption" },
      { name: "columns", description: "Property: { key, label }[]" },
      { name: "rows", description: "Property: record[]" },
    ],
    events: [],
  },
  {
    tag: "wk-tabs",
    summary: "Tabs. tabs is a property { id, label, icon? }[]. Panel content is supplied by the host.",
    example: `<wk-tabs active="links"></wk-tabs>`,
    attributes: [
      { name: "tabs", description: "Property: { id, label, icon? }[]" },
      { name: "active", description: "Active tab id" },
    ],
    events: ["wk-change"],
  },
  {
    tag: "wk-accordion",
    summary: "Accordion. items is { id, title, icon? }[].",
    example: `<wk-accordion multiple></wk-accordion>`,
    attributes: [
      { name: "items", description: "Property: { id, title, icon? }[]" },
      { name: "openIds", description: "Property: string[]" },
      { name: "multiple", description: "Allow several panels open" },
    ],
    events: ["wk-change"],
  },
  {
    tag: "wk-icon",
    summary: "Named glyph. Pass the icon library through bootstrapWebkit.",
    example: `<wk-icon name="calendar" label="Calendar"></wk-icon>`,
    attributes: [
      { name: "name", description: "Icon name" },
      { name: "label", description: "Accessible label. Omit to hide it from assistive tech" },
      { name: "size", description: "sm | md | lg" },
    ],
    events: [],
  },
];

export const themeGuide = {
  looks: ["default", "warm", "slate", "forest"],
  modes: ["day", "night"],
  motion: ["system", "on", "off"],
  setup: `import "@sh-webplatform/webkit/themes.css";
import { bootstrapWebkit, defaultIconLibrary } from "@sh-webplatform/webkit";

bootstrapWebkit({
  theme: "default",
  mode: "day",
  motion: "system",
  icons: defaultIconLibrary,
});`,
  notes:
    "Put data-theme, data-mode, and data-motion on the document element. themes.css holds color tokens. Component CSS is adopted inside each shadow root. data-motion=off sets --wk-motion to 0.",
};
