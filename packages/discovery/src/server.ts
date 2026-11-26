import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import type { DiscoveryCatalog } from "./catalog.js";

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body, null, 2);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(payload);
}

function notFound(res: ServerResponse): void {
  sendJson(res, 404, { error: "not_found" });
}

export function createDiscoveryServer(catalog: DiscoveryCatalog) {
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const url = new URL(req.url ?? "/", "http://localhost");

    if (method !== "GET") {
      sendJson(res, 405, { error: "method_not_allowed" });
      return;
    }

    switch (url.pathname) {
      case "/health":
        sendJson(res, 200, { ok: true });
        return;
      case "/discovery/modules":
        sendJson(res, 200, { modules: catalog.listModules() });
        return;
      case "/discovery/entities":
        sendJson(res, 200, { entities: catalog.listEntities() });
        return;
      case "/discovery/components":
        sendJson(res, 200, { components: catalog.listComponents() });
        return;
      default: {
        if (url.pathname.startsWith("/discovery/entities/")) {
          const type = decodeURIComponent(
            url.pathname.slice("/discovery/entities/".length),
          );
          const entity = catalog.resolveEntity(type);
          if (!entity) {
            notFound(res);
            return;
          }
          sendJson(res, 200, { entity });
          return;
        }
        notFound(res);
      }
    }
  });
}
