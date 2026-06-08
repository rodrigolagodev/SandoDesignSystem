# Deployment

The Sando docs site is published to **https://sando.rlago.com** via **Cloudflare Pages**.

Cloudflare builds and deploys on every push to `master`. The build runs in Cloudflare's CI; the GitHub Actions workflow only validates PRs (`.github/workflows/pr.yml`).

## Cloudflare Pages — initial setup

These steps need to be done once in the Cloudflare dashboard.

### 1. Create the Pages project

- Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
- Authorize the `rodrigolagodev/SandoDesignSystem` repository
- Project name: `sando-design-system` (or any slug — only used for `*.pages.dev` preview URLs)

### 2. Build configuration

Cloudflare deploys via Wrangler (Workers + Static Assets). The `wrangler.jsonc` lives in `apps/docs/` because Wrangler refuses to run from the pnpm workspace root.

| Setting           | Value                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| Production branch | `master`                                                                                           |
| Framework preset  | None                                                                                               |
| Build command     | `pnpm install --frozen-lockfile && pnpm tokens:build && pnpm components:build && pnpm docs:build`  |
| Deploy command    | `cd apps/docs && npx wrangler deploy`                                                              |
| Root directory    | _(leave empty)_                                                                                    |

Environment variables (Production + Preview):

| Variable          | Value     |
| ----------------- | --------- |
| `NODE_VERSION`    | `20`      |
| `PNPM_VERSION`    | `8.15.0`  |

### 3. Custom domain

- Project → **Custom domains** → **Set up a custom domain** → `sando.rlago.com`
- Since `rlago.com` already lives on Cloudflare, the CNAME is added automatically and the SSL cert is provisioned within a few minutes.

### 4. (Optional) Disable GitHub Pages

Once the Cloudflare deploy is verified at `sando.rlago.com`, disable GitHub Pages in repo Settings → Pages → Source → **None**.

## What's in the repo

- `apps/docs/public/_redirects` — legacy `/storybook/*` and `/docs/*` paths from the GH Pages era redirect to the root.
- `apps/docs/public/_headers` — cache + security headers (immutable cache for hashed assets, no-cache for HTML).
- Storybook base path is `/` (`apps/docs/.storybook/main.js`), so the site serves from the root of `sando.rlago.com`.

## Preview deployments

Every PR gets an auto-generated preview URL at `https://<commit-hash>.<project>.pages.dev` — surfaced as a Cloudflare bot comment on the PR.

## Rollback

Project → **Deployments** → pick a previous successful deploy → **Rollback to this deployment**.
