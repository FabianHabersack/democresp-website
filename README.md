# DEMOCRESP

The website for DEMOCRESP, the ERC Starting Grant project led by Fabian Habersack at the University of Innsbruck. Intended domain: **democresp.eu**.

[View the complete desktop preview](.github/website-preview.jpg)

## Publish on GitHub Pages

The complete website is in `docs/`. There is no production build step and no external runtime dependency.

1. In this repository, open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**, then **main** and **/docs**. Save.
3. Under **Custom domain**, enter **democresp.eu** and save. The repository already includes `docs/CNAME`.
4. At your domain registrar, set the following DNS records. Register the domain first if you do not already own it.

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | FabianHabersack.github.io |

5. When GitHub completes the DNS and certificate checks, enable **Enforce HTTPS**. DNS propagation and certificate issuance can take time.

GitHub recommends verifying domain ownership in account settings before attaching the custom domain. Add the domain to the Pages settings before pointing DNS at GitHub. Do not add wildcard DNS records.

Official instructions: [publishing from a branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [custom domains and DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

To preview on the default GitHub Pages URL before connecting the domain, temporarily remove `docs/CNAME` and clear the custom domain in Pages settings. Relative asset links support the repository subpath. Canonical URLs, the sitemap and the 404 return link target the intended final domain.

## Edit the website

- **Text, people and outputs:** `docs/index.html`.
- **Colours, typography and layout:** `docs/styles.css`; core colours are declared at the top.
- **Mobile menu and active navigation:** `docs/site.js`.
- **Contact and privacy information:** `docs/site-information.html`.
- **Logos and self-hosted fonts:** `docs/assets/`.

Edit the HTML directly in GitHub, commit to `main`, and GitHub Pages will republish once enabled. The site works without JavaScript; JavaScript enhances mobile navigation and section highlighting. Native disclosure elements provide the framework and country-list interactions.

## Local preview

Use Node.js 22.12+ or 24+:

```sh
npm ci
npm run dev
```

Vite is used only for local development. You can also open `docs/index.html` directly in a browser. To verify local links, assets and JavaScript syntax:

```sh
npm run build
```

This command validates the authored static site; it does not generate or overwrite files. GitHub Pages does not need to run it.

## Content and publication notes

The scientific text follows the supplied **Description of Action dated 16 September 2026**. It corrects the preliminary Stitch draft in two important respects: the framework has **policy, institutional, moral and temporal** dimensions; the DoA schedules **60 months, Q2 2027–Q1 2032**. The current site presents April 2027 as planned, not as an already completed launch. Confirm this date if grant preparation has since changed it.

The 20-country figure describes the comparative design, not identical coverage by every dataset. The three-wave panel covers Austria, Germany, Poland, Spain and the UK. The site does not announce completed research, named appointments, open vacancies or data releases that have not been supplied. Publications and data are clearly marked as planned outputs.

The DoA, its CV and detailed budget, the Stitch files and the INCONEX website are **not published in this repository**. All public-facing text and layout have been authored for DEMOCRESP. The PI's contact and profile link were checked against [his academic homepage](https://www.fabianhabersack.com/). The ORCID comes from the supplied DoA.

The `site-information.html` page describes this site's technical behaviour. Before the final public launch, confirm any institution-specific publisher, imprint and privacy wording with the university; it should reflect the final hosting and operating arrangements.

## Design

The design uses a cobalt-and-mint relationship diagram, offset panels, large editorial typography, and four distinct framework colours. It is responsive, supports keyboard navigation and reduced motion, and loads its assets locally. There are no analytics, cookies, sign-up forms or external font requests. The tentative project logo is used modestly in the footer alongside the EU and ERC funding acknowledgement.

## Rights

Site code is covered by the repository's existing MIT licence. Supplied logos retain their respective ownership and are excluded from that software licence. Manrope and Newsreader are distributed under the SIL Open Font License; their licence texts are included with the font files. Font sources: [Google Fonts / Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) and [Google Fonts / Newsreader](https://github.com/google/fonts/tree/main/ofl/newsreader).
