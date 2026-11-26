# sh-module-base

Helm **library** chart for department MFEs. Each module chart depends on this chart and emits a labeled ConfigMap that the discovery service aggregates.

## Usage

```yaml
# Chart.yaml
dependencies:
  - name: sh-module-base
    version: 0.1.0
    repository: "file://../sh-module-base"
```

```yaml
# templates/discovery.yaml
{{- include "sh-module-base.discoveryConfigMap" . }}
```

```yaml
# values.yaml
module:
  name: collateral
  routePrefix: /collateral
  roles: [collateral.read]
  entities:
    - type: collateral
      routeTemplate: /collateral/{id}
      label: Collateral
  components:
    - tag: col-summary
      version: 0.1.0
      kind: summary
      label: Collateral summary
```

Label contract (matches `@sh-webplatform/discovery`):

- `sh-webplatform.io/discovery=module`
- data key: `descriptor.json`
