import "lit";
import "./index.js";
import { bootstrapWebkit } from "./bootstrap.js";

/** CDN boot: theme + day mode — icons are optional; host may call bootstrapWebkit again with icons. */
bootstrapWebkit({ theme: "default", mode: "day", motion: "system" });
