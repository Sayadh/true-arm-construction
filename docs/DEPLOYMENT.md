# Deployment

The site is fully static. Production runs on **Cloudflare Workers (Static Assets)** and deploys
automatically from GitHub. The other options below are documented alternatives.

## Current production setup (Cloudflare Workers Builds)

| Setting | Value |
|---|---|
| Repository | `Sayadh/true-arm-construction`, branch `main` |
| Worker name | `true-arm-construction` |
| Build command | `npm run generate` |
| Deploy command | `npx wrangler deploy` (reads `wrangler.jsonc`) |
| Assets directory | `.output/public` |
| Trailing slashes | `html_handling: "drop-trailing-slash"` (`/about/` → `/about`) |
| Unknown URLs | `not_found_handling: "404-page"` (custom `404.html`, status 404) |
| Redirects | `public/_redirects` (301s for old service URLs) |
| Domains | `truearmconstruction.com` (custom domain), `www` → apex via a Cloudflare redirect rule (301, query string kept) |
| HTTPS | SSL/TLS → Edge Certificates → **Always Use HTTPS** on (free). Do not buy Advanced Certificate Manager. |
| Indexing | Builds of `main` are production automatically (`WORKERS_CI_BRANCH=main`); other branches are noindex. `NUXT_PUBLIC_SITE_ENV` is ignored on Cloudflare (delete it from the dashboard to avoid confusion) |

**Deploy = `git push` to `main`.** Watch the build under Workers & Pages → `true-arm-construction`
→ Deployments. A failed build leaves the previous version live.

Environment variables (Settings → Variables and secrets → build): only needed to override
defaults, e.g. `NUXT_PUBLIC_FORM_ENDPOINT`, analytics IDs. All are public by nature.

Why `preset: 'static'` matters: Cloudflare CI is auto-detected by Nitro, which would otherwise
build a server Worker and fail with `entry-point file at "index.mjs" was not found`.

### Manual deploy (rarely needed)

```bash
NUXT_PUBLIC_SITE_ENV=production npm run generate
npx wrangler deploy
```

## Building for any other host

```bash
npm ci
NUXT_PUBLIC_SITE_ENV=production \
NUXT_PUBLIC_SITE_URL=https://truearmconstruction.com \
NUXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/XXXXXXX \
npm run generate
npm run check:links
```

(Or put the same values in `.env` before running `npm run generate`.)
Requires Node.js 20.19+ (22 LTS recommended) on the build machine only.

Output structure: each route is a folder with `index.html` (e.g. `about/index.html`), plus `404.html`, `sitemap.xml`, `robots.txt`, `_nuxt/` assets.

## 2a. Static shared hosting / cPanel (e.g. HayHost)

1. Upload the **contents** of `.output/public/` into `public_html/` (File Manager or FTP/SFTP).
2. Add `public_html/.htaccess` (Apache):

```apache
ErrorDocument 404 /404.html
Options -MultiViews
DirectorySlash On

<IfModule mod_rewrite.c>
  RewriteEngine On
  # Force HTTPS and non-www
  RewriteCond %{HTTPS} off [OR]
  RewriteCond %{HTTP_HOST} ^www\. [NC]
  RewriteRule ^ https://truearmconstruction.com%{REQUEST_URI} [L,R=301]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

3. Enable SSL (Let's Encrypt / AutoSSL) in cPanel.

## 2b. Cloudflare Pages

Superseded by Cloudflare Workers (above). If ever needed: build command `npm run generate`, output directory `.output/public`, `NODE_VERSION=22`.

## 2c. Nginx (DigitalOcean, DreamHost VPS, any Linux server)

Build locally or in CI, then sync:

```bash
rsync -avz --delete .output/public/ user@SERVER:/var/www/truearmconstruction/
```

`/etc/nginx/sites-available/truearmconstruction`:

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name truearmconstruction.com www.truearmconstruction.com;
  return 301 https://truearmconstruction.com$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name truearmconstruction.com;

  ssl_certificate     /etc/letsencrypt/live/truearmconstruction.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/truearmconstruction.com/privkey.pem;

  root /var/www/truearmconstruction;
  index index.html;

  # /about and /about/ both serve about/index.html
  location / {
    try_files $uri $uri/index.html $uri.html =404;
  }

  error_page 404 /404.html;

  location /_nuxt/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
    try_files $uri =404;
  }
  location /_ipx/ {
    add_header Cache-Control "public, max-age=2592000";
    try_files $uri =404;
  }
  location ~* \.(?:png|jpg|jpeg|webp|svg|ico|woff2)$ {
    add_header Cache-Control "public, max-age=2592000";
  }

  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml application/xml text/plain;

  add_header X-Content-Type-Options nosniff;
  add_header Referrer-Policy strict-origin-when-cross-origin;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/truearmconstruction /etc/nginx/sites-enabled/
sudo certbot --nginx -d truearmconstruction.com -d www.truearmconstruction.com
sudo nginx -t && sudo systemctl reload nginx
```

No PM2/Node process is needed: Nginx only serves files.

## 3. After the first production deploy

- [ ] `https://truearmconstruction.com/robots.txt` shows `Allow: /` and the sitemap URL
- [ ] View source on any page: `<meta name="robots" content="index, follow…">`
- [ ] Submit `https://truearmconstruction.com/sitemap.xml` in Google Search Console
- [ ] Send a real test request through `/free-estimate` and confirm it arrives
- [ ] Test the site at https://search.google.com/test/rich-results and https://pagespeed.web.dev
