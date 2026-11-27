import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { execute, type Io } from "./execute.ts";

function run(argv: string[]) {
  let stdout = "";
  let stderr = "";
  const io: Io = {
    stdout: (text) => {
      stdout += text;
    },
    stderr: (text) => {
      stderr += text;
    },
  };
  const code = execute(argv, io);
  return { code, stdout, stderr };
}

describe("wk", () => {
  it("prints layered help", () => {
    const root = run(["--help"]);
    assert.equal(root.code, 0);
    assert.match(root.stdout, /Examples:/);
    assert.match(root.stdout, /wk component list/);
    assert.doesNotMatch(root.stdout, /wk component example/);

    const component = run(["component", "--help"]);
    assert.equal(component.code, 0);
    assert.match(component.stdout, /wk component get wk-drawer/);
  });

  it("lists and shows a component", () => {
    const list = run(["component", "list"]);
    assert.equal(list.code, 0);
    assert.match(list.stdout, /wk-drawer/);
    assert.match(list.stdout, /wk-button/);

    const drawer = run(["component", "get", "wk-drawer"]);
    assert.equal(drawer.code, 0);
    assert.match(drawer.stdout, /wk-close/);
    assert.match(drawer.stdout, /placement/);

    const example = run(["component", "example", "wk-button"]);
    assert.equal(example.stdout.trim(), `<wk-button variant="primary" icon="check">Save</wk-button>`);
  });

  it("returns JSON for a component", () => {
    const result = run(["component", "get", "wk-pagination", "--json"]);
    assert.equal(result.code, 0);
    const body = JSON.parse(result.stdout) as { tag: string; events: string[] };
    assert.equal(body.tag, "wk-pagination");
    assert.deepEqual(body.events, ["wk-change"]);
  });

  it("fails with an example when the tag is missing", () => {
    const result = run(["component", "get", "wk-missing"]);
    assert.equal(result.code, 1);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /No component named wk-missing/);
    assert.match(result.stderr, /wk component list/);
  });

  it("lists packaged and app icons", () => {
    const list = run(["icon", "list"]);
    assert.equal(list.code, 0);
    assert.match(list.stdout, /^check$/m);
    assert.match(list.stdout, /^calendar$/m);

    const calendar = run(["icon", "get", "calendar", "--json"]);
    const body = JSON.parse(calendar.stdout) as { source: string; example: string };
    assert.equal(body.source, "app");
    assert.equal(body.example, `<wk-icon name="calendar"></wk-icon>`);

    const check = run(["icon", "get", "check"]);
    assert.match(check.stdout, /source: packaged/);

    const missing = run(["icon", "get", "no-such-icon"]);
    assert.equal(missing.code, 1);
    assert.match(missing.stderr, /wk icon list/);
  });

  it("shows theme setup", () => {
    const result = run(["theme", "show"]);
    assert.equal(result.code, 0);
    assert.match(result.stdout, /forest/);
    assert.match(result.stdout, /bootstrapWebkit/);
    assert.match(result.stdout, /data-motion/);
  });

  it("rejects an unknown command without a prompt", () => {
    const result = run(["deploy"]);
    assert.equal(result.code, 1);
    assert.match(result.stderr, /wk --help/);
    assert.equal(result.stdout, "");
  });
});

describe("wk bin", () => {
  it("runs from node", () => {
    const cli = fileURLToPath(new URL("./cli.ts", import.meta.url));
    const child = spawnSync(process.execPath, [cli, "component", "example", "wk-avatar"], {
      encoding: "utf8",
    });
    assert.equal(child.status, 0);
    assert.match(child.stdout, /wk-avatar/);
  });
});
