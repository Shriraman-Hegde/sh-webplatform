import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { componentCatalog, themeGuide, type ComponentDoc } from "../../webkit/src/catalog.ts";
import { iconNames, iconSource } from "./icons.ts";

export type Io = {
  stdout: (text: string) => void;
  stderr: (text: string) => void;
};

const version = JSON.parse(
  readFileSync(fileURLToPath(new URL("../package.json", import.meta.url)), "utf8"),
).version as string;

const rootHelp = `wk — look up webkit components, icons, and theme setup

Usage:
  wk <command> <subcommand> [options]
  wk --help
  wk --version

Commands:
  component    List elements, or show one tag
  icon         List icon names, or show one name
  theme        Show look, mode, motion, and bootstrap setup

Run wk <command> --help for that command.

Examples:
  wk component list
  wk component get wk-drawer
  wk icon list
  wk theme show
`;

const componentHelp = `Usage:
  wk component list [--json]
  wk component get <tag> [--json]
  wk component example <tag>

Options:
  --json    Print JSON
  --help    Show this help

Examples:
  wk component list
  wk component get wk-drawer
  wk component get wk-button --json
  wk component example wk-pagination
`;

const iconHelp = `Usage:
  wk icon list [--json]
  wk icon get <name> [--json]

Options:
  --json    Print JSON
  --help    Show this help

Examples:
  wk icon list
  wk icon get calendar
  wk icon get check --json
`;

const themeHelp = `Usage:
  wk theme show [--json]

Options:
  --json    Print JSON
  --help    Show this help

Examples:
  wk theme show
  wk theme show --json
`;

type Flags = { json: boolean; help: boolean; version: boolean };

function parseArgv(argv: string[]): { positionals: string[]; flags: Flags; unknown?: string } {
  const positionals: string[] = [];
  const flags: Flags = { json: false, help: false, version: false };
  for (const arg of argv) {
    if (arg === "--json") flags.json = true;
    else if (arg === "--help" || arg === "-h") flags.help = true;
    else if (arg === "--version" || arg === "-v") flags.version = true;
    else if (arg.startsWith("-")) return { positionals, flags, unknown: arg };
    else positionals.push(arg);
  }
  return { positionals, flags };
}

function fail(io: Io, message: string, example: string): number {
  io.stderr(`Error: ${message}\n  ${example}\n`);
  return 1;
}

function printJson(io: Io, value: unknown): number {
  io.stdout(`${JSON.stringify(value, null, 2)}\n`);
  return 0;
}

function padRows(rows: Array<[string, string]>): string {
  const width = rows.reduce((max, [name]) => Math.max(max, name.length), 0);
  return rows.map(([name, detail]) => `${name.padEnd(width)}  ${detail}`).join("\n");
}

function findComponent(tag: string): ComponentDoc | undefined {
  return componentCatalog.find((item) => item.tag === tag);
}

function componentList(io: Io, json: boolean): number {
  const components = componentCatalog.map(({ tag, summary }) => ({ tag, summary }));
  if (json) return printJson(io, { components });
  io.stdout(`${padRows(components.map((item) => [item.tag, item.summary]))}\n`);
  return 0;
}

function componentGet(io: Io, tag: string | undefined, json: boolean): number {
  if (!tag) {
    return fail(io, "Missing component tag.", "wk component get <tag>\n  wk component list");
  }
  const found = findComponent(tag);
  if (!found) {
    return fail(io, `No component named ${tag}.`, "wk component get <tag>\n  wk component list");
  }
  if (json) return printJson(io, found);
  const attributes =
    found.attributes.length === 0
      ? "  (none)"
      : padRows(found.attributes.map((item) => [item.name, item.description]))
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n");
  const events = found.events.length === 0 ? "  (none)" : found.events.map((name) => `  ${name}`).join("\n");
  io.stdout(
    `${found.tag}\n${found.summary}\n\nexample:\n${found.example}\n\nattributes:\n${attributes}\n\nevents:\n${events}\n`,
  );
  return 0;
}

function componentExample(io: Io, tag: string | undefined): number {
  if (!tag) {
    return fail(io, "Missing component tag.", "wk component example <tag>\n  wk component list");
  }
  const found = findComponent(tag);
  if (!found) {
    return fail(io, `No component named ${tag}.`, "wk component example <tag>\n  wk component list");
  }
  io.stdout(`${found.example}\n`);
  return 0;
}

function iconList(io: Io, json: boolean): number {
  if (json) return printJson(io, { icons: [...iconNames] });
  io.stdout(`${iconNames.join("\n")}\n`);
  return 0;
}

function iconGet(io: Io, name: string | undefined, json: boolean): number {
  if (!name) {
    return fail(io, "Missing icon name.", "wk icon get <name>\n  wk icon list");
  }
  const source = iconSource(name);
  if (!source) {
    return fail(io, `No icon named ${name}.`, "wk icon get <name>\n  wk icon list");
  }
  const example = `<wk-icon name="${name}"></wk-icon>`;
  if (json) return printJson(io, { name, source, example });
  io.stdout(`name: ${name}\nsource: ${source}\nexample: ${example}\n`);
  return 0;
}

function themeShow(io: Io, json: boolean): number {
  if (json) return printJson(io, themeGuide);
  io.stdout(
    `looks: ${themeGuide.looks.join(", ")}\nmodes: ${themeGuide.modes.join(", ")}\nmotion: ${themeGuide.motion.join(", ")}\n\n${themeGuide.setup}\n\n${themeGuide.notes}\n`,
  );
  return 0;
}

function dispatch(io: Io, command: string | undefined, rest: string[], json: boolean): number {
  if (command === "component") {
    const [sub, tag] = rest;
    if (sub === "list") return componentList(io, json);
    if (sub === "get") return componentGet(io, tag, json);
    if (sub === "example") return componentExample(io, tag);
    return fail(io, "Missing component subcommand.", "wk component list\n  wk component --help");
  }
  if (command === "icon") {
    const [sub, name] = rest;
    if (sub === "list") return iconList(io, json);
    if (sub === "get") return iconGet(io, name, json);
    return fail(io, "Missing icon subcommand.", "wk icon list\n  wk icon --help");
  }
  if (command === "theme") {
    const [sub] = rest;
    if (sub === "show") return themeShow(io, json);
    return fail(io, "Missing theme subcommand.", "wk theme show\n  wk theme --help");
  }
  return fail(
    io,
    command ? `Unknown command ${command}.` : "Missing command.",
    "wk component list\n  wk --help",
  );
}

export function execute(argv: string[], io: Io = {
  stdout: (text) => process.stdout.write(text),
  stderr: (text) => process.stderr.write(text),
}): number {
  const parsed = parseArgv(argv);
  if (parsed.unknown) {
    return fail(io, `Unknown option ${parsed.unknown}.`, "wk --help");
  }
  if (parsed.flags.version && parsed.positionals.length === 0) {
    io.stdout(`${version}\n`);
    return 0;
  }
  const [command, ...rest] = parsed.positionals;
  if (parsed.flags.help && !command) {
    io.stdout(rootHelp);
    return 0;
  }
  if (parsed.flags.help && command === "component") {
    io.stdout(componentHelp);
    return 0;
  }
  if (parsed.flags.help && command === "icon") {
    io.stdout(iconHelp);
    return 0;
  }
  if (parsed.flags.help && command === "theme") {
    io.stdout(themeHelp);
    return 0;
  }
  if (parsed.flags.help) {
    return fail(io, `Unknown command ${command}.`, "wk --help");
  }
  try {
    return dispatch(io, command, rest, parsed.flags.json);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return fail(io, message, "wk --help");
  }
}
