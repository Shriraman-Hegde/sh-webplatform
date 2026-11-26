import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { isModuleDescriptor, type ModuleDescriptor } from "../schema.js";

export async function loadDescriptorsFromDir(
  dir: string,
): Promise<ModuleDescriptor[]> {
  const names = await readdir(dir);
  const jsonFiles = names.filter((n) => n.endsWith(".json")).sort();
  const descriptors: ModuleDescriptor[] = [];

  for (const name of jsonFiles) {
    const raw = await readFile(join(dir, name), "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!isModuleDescriptor(parsed)) {
      throw new Error(`Invalid module descriptor: ${name}`);
    }
    descriptors.push(parsed);
  }

  return descriptors;
}
