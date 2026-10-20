# Split Sticker / Printer Sites Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. On Grok Bot, each coding task is executed by a Cursor **CloudAgent** on the named GitHub repo (no local clone); merge to `main` only after the user approves when automated PR creation fails.

**Goal:** Slim `crystal-sticker-landing` to stickers-only, then ship a separate GitHub Pages manufacturer site `uv-sticker-printers` under the temporary brand **UV Sticker Printers**.

**Architecture:** Two independent static GitHub Pages sites. Shared lead pattern (`config.js` + `main.js` WhatsApp/`via:` attribution). No public prices. Phase 1 does not cross-link to the printer site.

**Tech Stack:** Static HTML/CSS/JS on GitHub Pages; existing `config.js` / `main.js` lead helpers; schema.org JSON-LD without `offers` or `aggregateRating`.

**Spec:** `docs/superpowers/specs/2026-10-21-split-sticker-printer-sites-design.md`

## Global Constraints

- Contacts: WhatsApp `8613824755368`, email `zxtoy2000@gmail.com`
- Attribution: `?src=` / `utm_source` → WhatsApp & mailto `via:` tag; default `via:website`
- No unit prices, MOQ numbers, or fake reviews on either site
- Sticker site v1: **fully remove** printer sell copy and nav (no footer printer link)
- Printer public name: **UV Sticker Printers** (not TaoTech sales channels)
- English copy only on both live sites
- Prefer reusing authorized TaoTech asset files already in sticker `assets/` for the printer site; do not invent new product claims
- Cloud agent: if PR creation fails (`must be a collaborator`), push the branch and report the compare URL; do not invent a PR number

---

## File map

### Repo A — `zhenyu-2026/crystal-sticker-landing` (Phase 1)

| File | Role after slim |
|------|-----------------|
| `index.html` | Stickers-only landing + SEO + JSON-LD (one Product) |
| `config.js` | Brand string → stickers-only; contacts unchanged |
| `main.js` | Unchanged lead attribution (unless IDs removed require cleanup) |
| `styles.css` | Keep; remove unused printer-only rules only if orphaned and trivial |
| `robots.txt` / `sitemap.xml` | Keep; bump `lastmod` |
| `assets/*` | Keep sticker-useful images; printer-only assets may remain unused (do not delete unless clearly unused and user asks) |

### Repo B — `zhenyu-2026/uv-sticker-printers` (Phase 2, new)

| File | Role |
|------|------|
| `index.html` | Manufacturer hero, lines, inquiry, contact, SEO |
| `styles.css` | Visual system adapted from sticker site (manufacturer look) |
| `config.js` | Brand `UV Sticker Printers`; same contacts/attribution |
| `main.js` | Same lead helpers as sticker site |
| `robots.txt` / `sitemap.xml` | Pages URL for this repo |
| `assets/` | Printer / factory images copied from authorized set |
| `README.md` | Pages URL + how to share `?src=` links |
| `.nojekyll` | Empty file for Pages |

---

### Task 1: Slim sticker `index.html` copy + structure

**Repo:** `https://github.com/zhenyu-2026/crystal-sticker-landing`

**Files:**
- Modify: `index.html`
- Modify: `config.js` (brand string only)

**Interfaces:**
- Consumes: existing `window.SITE_CONFIG` keys (`whatsappE164`, `email`, `brand`, `factoryTag`, `defaultSource`)
- Produces: stickers-only DOM; IDs that must still exist for `main.js`: `brandName`, `factoryTag`, `navWhatsApp`, `heroWhatsApp`, `pathWhatsApp`, `contactWhatsApp`, `contactEmail`, `sourceNote`, `inquiryForm`, `formSuccess`. Remove `printerWhatsApp` if present in `main.js` bindings — if `main.js` references it, either keep a hidden no-op or update `main.js` in the same commit to drop that binding.

- [ ] **Step 1: Inventory printer-specific DOM**

Confirm these blocks exist and will be removed or rewritten:
- Nav link `href="#printers"`
- Section `#printers` (entire)
- Hero H1 / lead dual-offer wording
- Why-us card “Self-manufactured printers” → replace with sticker-trust card (e.g. waterproof / custom finishes)
- Paths B2B card “Wholesale stickers or printers” → wholesale stickers only
- Inquiry `<select name="interest">` options that mention printers / bundle
- Footer “Equipment + labels”
- JSON-LD Product node for printers; Organization/WebSite names mentioning printers

- [ ] **Step 2: Apply stickers-only head meta**

Replace title/description/OG/Twitter/site_name with stickers-only wording. Exact targets:

```html
<title>Custom Crystal UV Stickers | China Manufacturer — B2B Export</title>
<meta name="description" content="China factory for custom crystal UV dome / tear-film stickers. Waterproof labels for retail and wholesale — samples and B2B quotes via WhatsApp or inquiry form; no public price list." />
```

Canonical stays:
`https://zhenyu-2026.github.io/crystal-sticker-landing/`

OG image stays sticker applications shot:
`.../assets/crystal-stickers-applications.jpg`

- [ ] **Step 3: Rewrite JSON-LD graph**

Keep `Organization`, `WebSite`, and **one** `Product` (“Custom crystal UV stickers”). Names/descriptions must not mention UV-DTF printers or dual offer. No `offers`, no `aggregateRating`.

- [ ] **Step 4: Rewrite body copy**

- Brand visible text: `Crystal UV Stickers` (match `config.js`)
- H1 example: `Custom crystal UV stickers — factory direct`
- Lead: stickers, finishes, samples, MOQ on inquiry; **no** “we sell printers” pitch
- Why-us: three cards about stickers / factory production of labels / quote-before-pay
- Delete `#printers` section entirely
- Nav: Stickers · Specs or Inquiry · WhatsApp (no Printers)
- Paths: B2C stickers + B2B wholesale stickers only
- Interest select options: stickers wholesale, custom sample, other — **no** printer quote / bundle

- [ ] **Step 5: Align `config.js` brand**

```js
window.SITE_CONFIG = {
  whatsappE164: "8613824755368",
  email: "zxtoy2000@gmail.com",
  brand: "Crystal UV Stickers",
  factoryTag: "Manufacturer · China",
  defaultSource: "website",
};
```

- [ ] **Step 6: Commit**

```bash
git add index.html config.js
git commit -m "feat: slim landing to crystal stickers only"
```

---

### Task 2: Sticker site SEO files + verification

**Repo:** `https://github.com/zhenyu-2026/crystal-sticker-landing`

**Files:**
- Modify: `sitemap.xml` (`lastmod` → implementation date, e.g. `2026-10-21`)
- Optionally touch: `robots.txt` only if sitemap path wrong (should already point at this site)

- [ ] **Step 1: Bump sitemap lastmod**

Keep single `<loc>` with trailing slash for the Pages homepage.

- [ ] **Step 2: Grep verification on the branch**

Run from repo root:

```bash
# Must find zero printer-sell hits in copy/meta (allow image filenames that remain unused)
rg -n -i 'uv-dtf sticker printer|Product line B|#printers|Request printer quote|stickers or printers|Stickers \+ printer|UV / UV-DTF sticker printer' index.html && echo 'FAIL: printer sell copy remains' || echo 'PASS: no banned sell phrases'

rg -n 'application/ld\+json' -A80 index.html | rg -n 'offers|aggregateRating' && echo 'FAIL: forbidden schema' || echo 'PASS: no offers/ratings'

rg -n 'via:|src=|utm_source' main.js config.js index.html
```

Expected: first two PASS; third still shows attribution wiring.

- [ ] **Step 3: Manual DOM checklist**

- One H1; no `#printers`
- WhatsApp buttons still present; form still mailto via `main.js`
- Mobile: nav + hero CTAs usable (open `index.html` or Pages preview)

- [ ] **Step 4: Commit**

```bash
git add sitemap.xml robots.txt
git commit -m "chore: refresh sitemap after stickers-only slim"
```

- [ ] **Step 5: Push + report compare URL**

Push feature branch. If PR tool fails collaborator check, report:
`https://github.com/zhenyu-2026/crystal-sticker-landing/compare/main...<branch>?expand=1`

**Stop for user merge approval before Phase 2 live dependency.** Phase 2 repo creation can proceed in parallel after Task 2 is pushed.

---

### Task 3: Create `uv-sticker-printers` GitHub repo + scaffold

**Repo:** create `https://github.com/zhenyu-2026/uv-sticker-printers` (public)

**Files:**
- Create: `.nojekyll`, `README.md`, `config.js`, `main.js`, `styles.css`, `index.html`, `robots.txt`, `sitemap.xml`, `assets/` (selected images)

**Interfaces:**
- Consumes: same `SITE_CONFIG` shape as sticker site
- Produces: Pages URL `https://zhenyu-2026.github.io/uv-sticker-printers/`

- [ ] **Step 1: Create public empty repo**

```bash
gh repo create zhenyu-2026/uv-sticker-printers --public --description "UV Sticker Printers — China manufacturer B2B landing (GitHub Pages)"
```

If `gh` lacks permission, stop and report; user creates the empty public repo, then continue.

- [ ] **Step 2: Copy lead helpers**

Start `config.js`:

```js
window.SITE_CONFIG = {
  whatsappE164: "8613824755368",
  email: "zxtoy2000@gmail.com",
  brand: "UV Sticker Printers",
  factoryTag: "Manufacturer · China",
  defaultSource: "website",
};
```

Copy `main.js` from sticker repo; keep attribution behavior; bind IDs that exist on the new page (nav/hero/contact WhatsApp, inquiry form). Omit sticker-only IDs.

- [ ] **Step 3: Port `styles.css`**

Reuse layout tokens (nav, hero, cards, buttons, tables) from sticker site. Drop sticker-gallery-specific rules only if unused. Keep mobile-first.

- [ ] **Step 4: Build manufacturer `index.html`**

Required sections:
1. Head: title/description/canonical/OG/Twitter/JSON-LD for **UV Sticker Printers** / equipment B2B
2. Nav: Models · Why us · Inquiry · WhatsApp
3. Hero: in-house UV / UV-DTF manufacturing; CTA WhatsApp + inquiry; no sticker sample shop pitch
4. Why us: design+assembly in China; training/parts; quote before pay
5. Lines: roll-to-roll; print+laminate; all-in-one (indicative, contact to confirm)
6. Manufacturing note: factory floor proof; may mention crystal-label production **as machine use-case**, not a sticker-order CTA
7. B2B inquiry form (interest: printer quote / spare parts / training / other)
8. Contact + `?src=` note
9. Footer: UV Sticker Printers · Made in China

Canonical:
`https://zhenyu-2026.github.io/uv-sticker-printers/`

JSON-LD: Organization + WebSite + optional Product nodes for printer lines — **no** `offers` / `aggregateRating`.

- [ ] **Step 5: Assets**

Copy from sticker repo `assets/` into new `assets/` at least:
- `banner-6head-uv-dtf.jpg`
- `uv-dtf-printer-industrial.jpg`
- `uv-dtf-printer-laminator-system.jpg`
- `banner-60e4-uv-dtf-all-in-one.jpg`
- `factory-printer-assembly-floor.jpg`
- `factory-production-process.jpg`

Use one as OG image (absolute Pages URL).

- [ ] **Step 6: robots + sitemap**

```
User-agent: *
Allow: /

Sitemap: https://zhenyu-2026.github.io/uv-sticker-printers/sitemap.xml
```

Sitemap single `<loc>` with trailing slash; `lastmod` = ship date.

- [ ] **Step 7: README**

Document Pages URL, contact policy (no public prices), and example share link:
`https://zhenyu-2026.github.io/uv-sticker-printers/?src=twitter`

- [ ] **Step 8: Commit + push**

```bash
git add .
git commit -m "feat: initial UV Sticker Printers manufacturer landing"
git push -u origin HEAD
```

- [ ] **Step 9: Enable GitHub Pages**

Settings → Pages → Deploy from branch `main` / root (or document that user must click Enable if API lacks permission). Verify URL returns 200 after build.

- [ ] **Step 10: Grep verification**

```bash
rg -n -i 'whatsapp for samples|custom sticker orders|crystal uv stickers — wholesale' index.html && echo 'FAIL: sticker-shop CTA' || echo 'PASS'
rg -n 'offers|aggregateRating' index.html && echo 'FAIL' || echo 'PASS'
rg -n '8613824755368|zxtoy2000@gmail.com' config.js
```

---

### Task 4: User acceptance checklist (both sites)

- [ ] **Step 1: Sticker live**

Open `https://zhenyu-2026.github.io/crystal-sticker-landing/` after merge/Pages rebuild:
- No printer nav/section
- WhatsApp preview text includes `via:website` or `via:<src>` when using `?src=twitter`

- [ ] **Step 2: Printer live**

Open `https://zhenyu-2026.github.io/uv-sticker-printers/`:
- Manufacturer story only
- Same WhatsApp/email; attribution works

- [ ] **Step 3: Hand back**

Report both live URLs and any Pages enablement step the user still must click.

---

## Self-review notes

- Spec Phase 1 full printer removal → Task 1–2  
- Spec Phase 2 new GitHub Pages manufacturer site → Task 3  
- Contacts, attribution, no prices, JSON-LD rules → Global Constraints + verification greps  
- Cross-link deferred → not in Task 1  
- No TBD placeholders in steps  
