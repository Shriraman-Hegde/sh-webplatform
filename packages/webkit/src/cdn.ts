import "lit";
import "./index.js";
import { bootstrapWebkit } from "./bootstrap.js";

/** CDN boot: theme only — icons are optional; host may call bootstrapWebkit again with icons. */
bootstrapWebkit({ theme: "default", motion: "system" });
