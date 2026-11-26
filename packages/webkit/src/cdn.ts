import "lit";
import "./index.js";
import { DEMO_ENTITY_ROUTES } from "./registry/demo-routes.js";
import { configureRegistry } from "./registry/index.js";
import { applyTheme } from "./theme/index.js";

configureRegistry([...DEMO_ENTITY_ROUTES]);
applyTheme("default");
