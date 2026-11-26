{{- define "sh-module-base.name" -}}
{{- default .Chart.Name .Values.module.name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "sh-module-base.discoveryLabels" -}}
{{ .Values.discovery.labelKey }}: {{ .Values.discovery.labelValue | quote }}
app.kubernetes.io/name: {{ include "sh-module-base.name" . | quote }}
app.kubernetes.io/part-of: sh-webplatform
{{- end -}}

{{- define "sh-module-base.descriptor" -}}
{
  "module": {{ required "module.name is required" .Values.module.name | quote }},
  "routePrefix": {{ required "module.routePrefix is required" .Values.module.routePrefix | quote }},
  "roles": {{ .Values.module.roles | default list | toJson }},
  "entities": {{ .Values.module.entities | default list | toJson }},
  "components": {{ .Values.module.components | default list | toJson }}
}
{{- end -}}

{{- define "sh-module-base.discoveryConfigMap" -}}
{{- if .Values.discovery.enabled }}
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ include "sh-module-base.name" . }}-discovery
  labels:
    {{- include "sh-module-base.discoveryLabels" . | nindent 4 }}
data:
  {{ .Values.discovery.dataKey }}: |
    {{- include "sh-module-base.descriptor" . | nindent 4 }}
{{- end }}
{{- end -}}
