import { createServer } from "node:http";
import { Readable } from "node:stream";

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

async function loadServerEntry() {
  try {
    return await import(new URL("../dist/server/server.js", import.meta.url).href);
  } catch (error) {
    throw new Error("Cannot load built server bundle. Run `npm run build` first.", {
      cause: error,
    });
  }
}

function toHeaderObject(headers) {
  return Object.fromEntries(headers.entries());
}

function toFetchHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers).flatMap(([key, value]) => {
      if (value === undefined) return [];
      return [[key, Array.isArray(value) ? value.join(", ") : value]];
    }),
  );
}

const { default: serverEntry } = await loadServerEntry();

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? `${host}:${port}`}`);
    const method = request.method ?? "GET";
    const hasBody = method !== "GET" && method !== "HEAD";
    const fetchRequest = new Request(url, {
      method,
      headers: toFetchHeaders(request.headers),
      body: hasBody ? Readable.toWeb(request) : undefined,
      duplex: hasBody ? "half" : undefined,
    });

    const fetchResponse = await serverEntry.fetch(fetchRequest, undefined, undefined);

    response.writeHead(fetchResponse.status, toHeaderObject(fetchResponse.headers));
    if (!fetchResponse.body) {
      response.end();
      return;
    }

    const buffer = Buffer.from(await fetchResponse.arrayBuffer());
    response.end(buffer);
  } catch (error) {
    response.statusCode = 500;
    response.setHeader("content-type", "text/plain; charset=utf-8");
    response.end(error instanceof Error ? `${error.name}: ${error.message}` : "Internal Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
