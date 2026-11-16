# Working on this website

This is a customer-owned Next.js portfolio. Read [README.md](README.md) for setup,
content editing, deployment and the optional Jamstacks contact form.

## Working preferences

- Work in this repository on its current branch unless asked otherwise.
- Preserve existing changes. Leave edits uncommitted; push or deploy only when requested.
- Adapt the website to its owner's requested content and features. Replace sample names,
  projects, images and links with the owner's real details; the fictional examples are starting content.

## Structure and content

- `content/profile.ts` owns the profile, public email and social links.
- `content/projects.ts` owns project cards and statically generated case studies. Owners
  can add or remove projects; keep slugs unique and URL-safe.
- `public/` holds local images and downloadable assets. Keep image dimensions and alt text accurate.
- `app/globals.css` owns the design tokens. Preserve readable typography, responsive layouts,
  visible keyboard focus, semantic headings and reduced-motion support.
- Keep content separate from `site.config.json`: Jamstacks may rewrite deployment fields there.

## Static architecture

- Production is a static export in `out/`. Preserve static-export compatibility; no
  request-time rendering, API routes, Server Actions, database or production Next.js server.
- Use local content for pages and ordinary client code for browser-only interactions.
- Preserve both custom-domain root URLs and arbitrary GitHub Pages repository paths.
  Use the shared path helpers for links, images and metadata.
- Read relevant installed Next.js guides in `node_modules/next/dist/docs/` before
  changing framework behavior. Keep dependencies modest and the npm lockfile reproducible.

## Optional Jamstacks form

- Keep the integration documented in README.md. The host is `<jamstacks-support-form>`
  with `data-jamstacks-component="support-form"` and `data-jamstacks-site` attributes.
- `JAMSTACKS_SITE` is a public website ID. Load one configured CDN bootstrap at
  `/sites/{publicSiteId}/embed.js`; no ID means no script request and a useful email fallback.
- The shared runtime owns form rendering, validation, spam protection and submission.
  Do not copy it, register a replacement element, intercept submission or simulate success.
- Preserve the documented full-document Contact navigation until a supported remount
  contract is available. Keep the email fallback usable during outages.
- Style through supported `--jamstacks-*` CSS variables; do not reach into shadow-root internals.
- Configuration and build-time environment values are public. Never put credentials,
  publishing keys or private notification recipients in them. Remote builds must not depend on localhost.
- Preserve `.github/workflows/pages.yml`, its optional `provisioning_id` input and correlated
  run name when changing the workflow. Pull requests validate without deploying.

## Commands and checks

```sh
npm ci
npm run dev       # http://localhost:3000
npm test
npm run typecheck
npm run build     # static export
PAGES_BASE_PATH=/portfolio-preview npm run build
```

`npm start` previews the export on port 3000; stop the dev server first, or use
`npm start -- --port 3200`. Browser-check affected routes and root/project-path
assets when changing layout, navigation or deployment behavior. Report local
checks separately from any actual GitHub deployment or accepted contact submission.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Template publishing assets

- `jamstacks/` contains optional source-template metadata, gallery captures and their checks.
- Read `jamstacks/config.json`; capture evidence is `jamstacks/screenshots.json` and JPEGs stay directly inside `jamstacks/`.
- Run `node --test jamstacks/config.test.mjs` only when maintaining a source template.
- Customer websites can remove this entire folder. Normal tests, website code, builds and the Pages workflow must not import it.
- Keep `site.config.json`, embed integration and the Pages workflow outside the optional folder.
