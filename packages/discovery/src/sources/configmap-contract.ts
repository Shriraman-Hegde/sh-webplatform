/**
 * Contract for Approach A (labeled ConfigMaps).
 * The discovery service (cluster mode) will list ConfigMaps with this label
 * and read descriptor JSON from the named data key.
 */
export const DISCOVERY_CONFIGMAP_LABEL = "sh-webplatform.io/discovery";
export const DISCOVERY_CONFIGMAP_LABEL_VALUE = "module";
export const DISCOVERY_CONFIGMAP_DATA_KEY = "descriptor.json";
