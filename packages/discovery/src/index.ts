export { DiscoveryCatalog } from "./catalog.js";
export { createDiscoveryServer } from "./server.js";
export { loadDescriptorsFromDir } from "./sources/file-source.js";
export {
  DISCOVERY_CONFIGMAP_DATA_KEY,
  DISCOVERY_CONFIGMAP_LABEL,
  DISCOVERY_CONFIGMAP_LABEL_VALUE,
} from "./sources/configmap-contract.js";
export {
  isModuleDescriptor,
  type ComponentDescriptor,
  type DiscoveredComponent,
  type DiscoveredEntity,
  type EntityDescriptor,
  type ModuleDescriptor,
} from "./schema.js";
