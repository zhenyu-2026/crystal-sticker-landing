# Design: Split crystal-sticker and UV printer overseas sites

**Date:** 2026-10-21  
**Status:** Draft for user review  
**Owner ask:** Separate sticker and printer presence so equipment buyers are not diluted by a dual-offer landing.

## Goal

Two focused English static sites for overseas lead gen:

1. **Crystal UV stickers** — shops / creators / wholesale labels only.  
2. **UV Sticker Printers** — China manufacturer B2B equipment only.

Same inquiry contacts and channel attribution on both. No public unit prices on either site.

## Decisions already confirmed

| Decision | Choice |
|----------|--------|
| Split strategy | Two GitHub repos + two GitHub Pages sites |
| Sticker site after slim | Printer content **fully removed** (no footer cross-link in v1) |
| Printer public name | Temporary **UV Sticker Printers** (not TaoTech sales channels) |
| Contacts | WhatsApp `+86 13824755368` (`wa.me/8613824755368`); email `zxtoy2000@gmail.com` |
| Attribution | `?src=` / `utm_source` → WhatsApp/email `via:` tag |
| Images | Reuse authorized TaoTech/Taituo product photos; user replaces unsuitable shots later |

## Architecture

```
zhenyu-2026/crystal-sticker-landing   →  stickers only (existing Pages URL kept)
zhenyu-2026/uv-sticker-printers       →  printers only (new repo + Pages)
```

Expected live URLs after Pages enablement:

- Stickers: `https://zhenyu-2026.github.io/crystal-sticker-landing/`
- Printers: `https://zhenyu-2026.github.io/uv-sticker-printers/`

Each site is a small static landing: `index.html`, `styles.css`, `config.js`, `main.js`, `assets/`, `robots.txt`, `sitemap.xml`. Lead CTAs stay client-side (WhatsApp deep link + mailto), same pattern as today’s sticker site.

No shared monorepo, no SSR, no public price list, no review/rating schema that implies fake social proof.

## Phase 1 — Slim sticker site

**Repo:** `https://github.com/zhenyu-2026/crystal-sticker-landing`  
**Branch workflow:** feature branch → push; open/merge PR via user-approved path if cloud agent cannot open PR as collaborator.

### Remove

- Hero / H1 dual wording about printers  
- Entire UV / UV-DTF printer section(s) and related cards  
- B2B “equipment / distributors buying machines” path as a primary offer  
- Meta title, description, Open Graph, Twitter, and JSON-LD fields that mention printers or dual offer  
- Any printer-only images if they no longer serve sticker storytelling  

### Keep

- Crystal UV sticker story, uses, finish options, indicative specs table  
- Sample WhatsApp CTA and sticker B2B inquiry form / mailto flow  
- `config.js` contacts; `main.js` `via:` / `?src=` attribution  
- Mobile layout; working-hours note (UTC+8)  
- Canonical trailing-slash homepage URL for this repo’s Pages path  

### SEO after slim

- **Title / description:** custom crystal UV stickers + China manufacturer / B2B export (no printer keywords)  
- **JSON-LD:** `Organization` + `WebSite` + sticker `Product` only — no `offers`, no `aggregateRating`  
- Refresh `sitemap.xml` `lastmod` when content ships  

### Success criteria (Phase 1)

- Live (or `main`) homepage has a single product story: stickers  
- View-source checklist: no printer/UV-DTF machine sell copy in title, description, body H2s, or JSON-LD  
- WhatsApp still carries `via:website` (or `via:<src>`)  

## Phase 2 — New printer manufacturer site

**Repo (suggested):** `zhenyu-2026/uv-sticker-printers` (public for Pages)  
**Public name:** UV Sticker Printers · China Manufacturer · B2B Export  

### Content (v1)

- Hero: in-house UV / UV-DTF sticker printer manufacturing  
- Why us: design + assembly in China facility; training / spare parts / configuration on inquiry  
- Product lines (indicative, no prices): roll-to-roll UV-DTF; print + laminate workflows; compact all-in-one  
- Manufacturing scale note (facility assembles/tests before export; many sites run crystal-label production — **as proof of use of the machines, not a sticker shop CTA**)  
- B2B inquiry only (MOQ / lead time / FOB confirmed per quote)  
- Contact block with same WhatsApp + email + attribution  

### Explicitly out of scope (v1)

- Selling finished crystal stickers on this domain  
- Sticker sample gallery as primary content  
- Public price list, MOQ numbers, or fake review schema  
- Custom domain (later)  
- Social account creation (later, separate ask)  

### SEO (v1)

- Manufacturer-oriented title/description  
- Canonical to Pages URL with trailing slash  
- `robots.txt` + single-URL `sitemap.xml`  
- JSON-LD: `Organization`, `WebSite`, optional printer `Product` nodes without `offers` / `aggregateRating`  
- Absolute OG image under this site’s `/assets/`  

### Success criteria (Phase 2)

- New repo exists; Pages serves English manufacturer landing  
- No sticker-order primary CTAs; inquiry is equipment/B2B  
- Attribution works the same way as sticker site  

## Cross-site policy (v1)

- **No** footer or hero cross-link from sticker site → printer site in Phase 1 (user chose full removal)  
- Phase 2 may optionally add a single low-emphasis line on the printer site only (“machines used for crystal label production”) without linking to the sticker shop CTA wall  
- Revisit mutual light links after both are live, if desired  

## Implementation order

1. User approves this spec  
2. Implementation plan (writing-plans)  
3. Cloud agent: Phase 1 slim on `crystal-sticker-landing` → merge to `main` when approved  
4. Cloud agent: Phase 2 scaffold `uv-sticker-printers` (or create repo then implement) → enable Pages → merge  
5. User verifies both live URLs and WhatsApp `via:` tags  

## Non-goals

- Replacing TaoTech/titanjet sales-team channels  
- Mass outbound messaging  
- Paid ads setup  
- Own domain / email DNS in this design  

## Open items (non-blocking for v1)

- Final English brand rename away from temporary “UV Sticker Printers”  
- Which exact asset files ship on the printer site (pick from authorized set during build)  
- Whether GitHub Pages project site vs custom domain later  
