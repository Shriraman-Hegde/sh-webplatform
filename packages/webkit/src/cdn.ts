import { iconRegistry } from "@sh-webplatform/icons";
import "lit";
import "./index.js";
import { bootstrapWebkit } from "./bootstrap.js";

bootstrapWebkit({ theme: "default", icons: iconRegistry });
