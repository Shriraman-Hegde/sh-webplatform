#!/usr/bin/env node
import { execute } from "./execute.ts";

process.exitCode = execute(process.argv.slice(2));
