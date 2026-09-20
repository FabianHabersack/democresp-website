# DEMOCRESP

**Political responsibility, contested.**

[Visit the project website →](https://democresp.eu/)

DEMOCRESP is a five-year European Research Council (ERC) Starting Grant project led by [Fabian Habersack](https://www.fabianhabersack.com/). It investigates how political elites claim and contest responsibility, how citizens interpret and evaluate these claims, and what this means for democratic trust, legitimacy and political behaviour.

The project connects comparative analysis of political discourse with focus groups, panel surveys, experiments and elite interviews. Its conceptual framework examines four dimensions of responsibility: **policy, institutional, moral and temporal**.

This repository contains the source code for the project's public website. The website introduces the research programme and team and will share publications, data, tools and other outputs as they become available.

## Funding

Funded by the European Union (ERC, DEMOCRESP, Grant No. **101302718**).

Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Research Council Executive Agency. Neither the European Union nor the granting authority can be held responsible for them.

## Website source

The website is built with HTML, CSS and a small amount of JavaScript, and is hosted on GitHub Pages at **[democresp.eu](https://democresp.eu/)**. Fonts and visual assets are served locally. The site includes responsive layouts, keyboard navigation and reduced-motion support, without analytics or tracking cookies.

| Location | Contents |
| --- | --- |
| `docs/index.html` | Project overview, research programme, team, outputs and contact |
| `docs/styles.css` | Layout, typography and visual design |
| `docs/site.js` | Navigation and interaction enhancements |
| `docs/site-information.html` | Publisher and privacy information |
| `docs/assets/` | Logos, fonts and icons |

GitHub Pages publishes the `docs/` directory from the `main` branch. The website requires no production build step.

## Local development

With Node.js 22.12 or later:

```sh
npm ci
npm run dev
```

Vite provides the local development server. To check local links, assets, JavaScript syntax and the custom-domain configuration, run:

```sh
npm run build
```

This command validates the static website without generating or overwriting site files.

## Licence and credits

Website code is available under the [MIT licence](LICENSE). Project, EU and ERC logos remain the property of their respective owners and are excluded from that licence.

- **Typography:** Manrope and Newsreader, distributed under the SIL Open Font License. Licence texts are included in [`docs/assets/fonts/`](docs/assets/fonts/).
- **Icons:** Adapted from [Lucide](https://lucide.dev/), with the [upstream licence](docs/assets/icons/LICENSE.txt) included in the repository.
