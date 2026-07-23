import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Ashutosh Mittal — Builder · Operator<\/title>/i);
  assert.match(html, /data-kernel="build"/);
  assert.match(html, /I ship systems\./);
  assert.match(html, /I run the ship\./);
  assert.match(html, /RSN One/);
  assert.match(html, /METAVEO Automation/);
  assert.match(html, /Start a Project/);
  assert.match(html, /Hire Me/);
  assert.match(html, /Book a Consultation/);
  assert.match(html, /How can[^<]*<br\s*\/>I help you\?/i);
  assert.match(html, /Partnership/);
  assert.match(html, /CONTINUE BY EMAIL/);
  assert.match(html, /resume-tech\.pdf/);
  assert.match(html, /resume-management\.pdf/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /role="switch"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the portfolio assets and removes the disposable preview", async () => {
  const [page, layout, packageJson, techResume, managementResume] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/resume-tech.pdf", import.meta.url)),
    access(new URL("../public/resume-management.pdf", import.meta.url)),
  ]);

  assert.match(page, /aria-checked=\{kernel === "run"\}/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /ashutosh-mittal-736445287/);
  assert.match(page, /github\.com\/MittalAshutosh/);
  assert.match(layout, /"@type": "Person"/);
  assert.match(layout, /am\.kernel\.v1/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  assert.equal(techResume, undefined);
  assert.equal(managementResume, undefined);
  assert.ok(root);
});
