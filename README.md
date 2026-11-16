# Minimal portfolio (Next.js)

A calm, minimal portfolio for an independent developer, designer or consultant. It exports to plain static files, deploys to GitHub Pages (custom domain or `/repository/` path) and works with no backend at all. Connecting a [Jamstacks](https://jamstacks.net) website adds a hosted project‑enquiry form to the Contact page.

The included person (**Jane Doe**), the **Acme** clients and employers, and the three projects (**Tidepool**, **Ledgerline**, **Acme Transit Timetables**) are deliberately generic placeholders — fictitious, not a real person or company. Replace them with your own.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Introduction, selected work, short about, contact invitation |
| `/work/` | Every project with image, summary, discipline and year |
| `/work/{slug}/` | A case study per project: overview, role, problem, approach, visuals, result, lessons, next project |
| `/about/` | Biography, strengths, tools, way of working, experience, links |
| `/contact/` | Email (always available) plus the hosted enquiry form when connected |
| any other URL | A helpful 404 with links back to the work |

## Quick start

Requires Node.js 24 or newer.

```sh
npm ci            # install exact locked dependencies
npm run dev       # http://localhost:3000 with live reload
npm test          # configuration, content and contract tests
npm run typecheck
npm run build     # static export to out/
npm start         # serve out/ locally at http://localhost:3000/
```

No account, API key or network service is needed to run or build the portfolio. Stop the dev server before running the static preview on the same port, or use `npm start -- --port 3200`. For another development port, use `npm run dev -- --port 3200`.

## Make it yours

Edit these files — every page reads from them, so there are no duplicated strings to hunt down:

| File | What to change |
| --- | --- |
| [content/profile.ts](content/profile.ts) | Name, role, introduction, biography, public email, availability, strengths, skills, approach, experience, social links |
| [content/projects.ts](content/projects.ts) | Your projects. Each record becomes a card and a case study at `/work/{slug}/` |
| `public/images/` | Project images. Reference them in `projects.ts` as `/images/...` with their real width and height |
| `public/og.png` | 1200×630 social preview image |
| `app/icon.svg` | Browser tab icon |
| [app/globals.css](app/globals.css) | Colours, fonts and spacing are tokens at the top of the file |
| [site.config.json](site.config.json) | Site name/description and public deployment settings (see below) |

Notes:

- Add or remove project records to fit your work. Keep at least one project and use `featured: true` for projects you want on the home page.
- Social links with an empty `url` are hidden, so nothing ships as a dead link. Project `links` are optional; omit them rather than adding placeholders.
- The email in `profile.ts` is shown publicly. Use an address you're happy to publish. It is unrelated to where Jamstacks sends form notifications (that's a private setting in the Jamstacks portal).
- Don't present invented testimonials, client logos or metrics as fact. Write about what you actually did.
- Text is rendered as plain text, never HTML.

## Appearance

The header uses `DarkModeToggle` from the published `jamstacks` React package. The root layout supplies `ThemeProvider` and the early `ThemeScript`, so a saved preference applies before the first paint and stays consistent across navigation and tabs. No component stylesheet is needed; the template's page palette and form fallbacks remain in `app/globals.css`.

The default follows the device. Switching saves an explicit light/dark choice in this origin's `color-scheme` localStorage key. To follow the device again, remove that key and reload. Without JavaScript, the page still follows the device using its media-query palette.

## Configuration

`site.config.json` holds public deployment settings only. Jamstacks may rewrite this file when it sets up a repository for you; it never touches `content/`.

```json
{
  "name": "Jane Doe — Portfolio",
  "description": "Independent developer and designer. Selected work and project enquiries.",
  "domain": "",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

Build-time environment variables override the file (blank values keep the file's value). See [.env.example](.env.example).

| Purpose | Local/build variable | GitHub Actions repository variable |
| --- | --- | --- |
| Public Jamstacks website ID | `JAMSTACKS_SITE` | `JAMSTACKS_SITE` |
| Component CDN base | `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | `JAMSTACKS_CDN_URL` |
| Display/canonical domain (hostname only) | `NEXT_PUBLIC_SITE_DOMAIN` | `SITE_DOMAIN` |
| Project-path prefix, e.g. `/my-portfolio` | `PAGES_BASE_PATH` | set automatically from `actions/configure-pages` |
| Absolute site URL for canonical links/sitemap | `PAGES_BASE_URL` | set automatically from `actions/configure-pages` |

Every value here is **public** and ends up in the built files. Never put GitHub tokens, publishing keys or private email addresses in config or `.env` files. The public site ID identifies your website; it grants no administrative access.

Validation happens at build time ([lib/config.mjs](lib/config.mjs)): the site ID must be a single path-safe segment, the CDN must be HTTPS (path prefixes like `https://example.org/_cdn` are fine), the domain must be a bare hostname, and the base path must be a plain URL path. A `localhost` CDN is rejected unless you opt in with `JAMSTACKS_ALLOW_LOCAL_CDN=1`, and is always rejected in GitHub Actions so a public site can never depend on your machine.

GitHub may report an HTTP `PAGES_BASE_URL` while a new custom domain's HTTPS certificate is provisioning. The build accepts that URL and emits HTTPS canonical, social and sitemap URLs, so the first deployment can complete.

When neither `PAGES_BASE_URL` nor a domain is known, canonical links and social images are omitted and `sitemap.xml` is empty, rather than guessing an origin.

## Contact and Jamstacks

**Without Jamstacks** (default): the Contact page shows your email with a copy button and a short "what to include" list. No Jamstacks script is requested anywhere.

**With Jamstacks**: create a website in the Jamstacks portal, configure the support form's copy (for example heading "Tell me about your project", name/email/message labels, button text and a success message) and theme, and **publish** it. Then set `JAMSTACKS_SITE` (and `JAMSTACKS_CDN_URL` if you're not using `https://cdn.jamstacks.net`) and rebuild. The Contact page then renders:

```html
<jamstacks-support-form data-jamstacks-component="support-form" data-jamstacks-site="site_…"></jamstacks-support-form>
<!-- plus, after hydration, one script: {cdn}/sites/{siteId}/embed.js -->
```

How it behaves:

- The hosted component renders inside the tag (in its own shadow root) and owns validation, spam protection, submission and the success/error messages. This template never submits messages, never registers the element itself and never shows a success message of its own.
- Your email stays visible next to the form at all times. If the script can't load, a short message offers the email instead; if the form is slow to appear, a gentle note does the same. With JavaScript disabled, the page points to email.
- Form text and theme changes you publish in the portal appear after a reload (allow for the CDN cache interval) — no rebuild needed. Changing your profile, projects or the site ID does need a rebuild.
- The form only supports name, email and message today. Don't promise budget fields, attachments or booking in your page copy.
- Only the Contact page loads the Jamstacks script.

**Why Contact uses full page loads:** the current shared runtime finds the form's host when its script runs and stops watching for new hosts after ten seconds; it has no public "remount" API. Links to and from Contact therefore do an ordinary full page load (all other links use fast client-side navigation), so the form appears reliably however long a visitor browses first and however many times they return. This is handled by [components/site-link.tsx](components/site-link.tsx).

**Styling:** the page maps its design tokens to the shared `--jamstacks-*` CSS variables (font, colours, border, radius, control height, spacing and `--jamstacks-form-max-width`) at the top of [app/globals.css](app/globals.css). A theme you publish in the portal overrides these on the component itself. Don't style the component's internals; they're owned by the runtime.

**Content Security Policy:** none is set by this template. If you add one, allow scripts from your Jamstacks CDN origin (e.g. `https://cdn.jamstacks.net`), the spam-check provider used by the form (`https://challenges.cloudflare.com` for scripts and frames), and `connect-src` to the API origin your published form uses. Avoid wildcards and `unsafe-eval`.

## Deploy to GitHub Pages

The workflow at [.github/workflows/pages.yml](.github/workflows/pages.yml) tests, type-checks, builds and deploys on every push to `main`, validates pull requests without deploying, and can be run manually.

1. Push this repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Optional: **Settings → Secrets and variables → Actions → Variables**: add `JAMSTACKS_SITE`, `JAMSTACKS_CDN_URL`, `SITE_DOMAIN`. These are *variables*, not secrets — they're public.
4. Push to `main` or run the workflow from the Actions tab.

The site works at `https://<owner>.github.io/<repository>/`; the workflow reads the correct path prefix from GitHub, so links and images work without changes. To preview a project-path build locally:

```sh
PAGES_BASE_PATH=/portfolio-preview npm run build
node scripts/serve.mjs --base /portfolio-preview   # http://localhost:3000/portfolio-preview/
```

**Custom domain:** set it in **Settings → Pages → Custom domain** and create the DNS records GitHub shows you. Setting `SITE_DOMAIN` alone does not configure a domain; it only informs canonical URLs. Test the default `github.io` address first — DNS isn't needed for that.

**Jamstacks provisioning:** if Jamstacks created this repository for you, it already enabled Pages, set the repository variables and started the first run. Its runs appear as `Jamstacks <operation id>` (the workflow's optional `provisioning_id` input). Keep the workflow's file path, inputs and run name if you edit it.

## Local Jamstacks development

For working against a locally running Jamstacks service (portal at `https://localhost:5001`, assets at `https://localhost:5001/_cdn`):

```sh
JAMSTACKS_SITE=site_… \
NEXT_PUBLIC_JAMSTACKS_CDN_URL=https://localhost:5001/_cdn \
JAMSTACKS_ALLOW_LOCAL_CDN=1 npm run dev
```

This website uses Next.js's default port 3000. A local Jamstacks checkout runs its internal frontend on port 3100 behind the portal/API at `https://localhost:5001`. Trust the local development certificate in your browser and register `http://localhost:3000` as an allowed origin for the website in the portal; the service refuses submissions from origins it doesn't know.

## Project structure

```
app/                  routes, metadata, sitemap/robots, global styles
components/           header, footer, project list, Jamstacks host/loader
content/              profile.ts and projects.ts — your content
lib/config.mjs        build-time public config resolution and validation
lib/paths.ts          base-path-aware links and asset URLs
lib/embed-status.ts   observable states of the hosted form
types/jamstacks.d.ts  typed JSX for <jamstacks-support-form>
public/               images and social preview
scripts/serve.mjs     static preview server (with base path support)
tests/                node:test suites
site.config.json      public deployment settings (provisioner-compatible)
jamstacks.json  Jamstacks gallery manifest
```

## Before publishing your website

- Replace Jane Doe, the sample email, Acme references, project stories, images and social links with your own details.
- Update the site title/description, icon and social preview image. Set the correct public domain or Pages URL for canonical links.
- Run `npm test`, `npm run typecheck`, `npm run build` and a project-path build when using a repository URL.
- Check the pages on phone and desktop, keyboard navigation, links and Contact fallback.
- If you connect Jamstacks, publish the form in the portal and verify a real test message reaches the website inbox. A successful build does not verify message delivery.

`AGENTS.md` gives coding assistants the same portable architecture and editing guidance.
