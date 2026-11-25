# Nestora

A multi-page real estate website with a light, airy glassmorphism design: frosted-glass panels, soft blur and calm colours. It is built to help visitors find a home quickly and to turn visitors into enquiries: quick-view pop-ups, one-tap saving, tour booking, payment estimates and a direct line to a named agent on every home.

**[Live demo](https://venex2265.github.io/nestora/)**

> Add a screenshot at `assets/screenshot.png` and link it here.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Hero search, featured homes, cities, how it works, reviews, free valuation form |
| `properties.html` | Buy / rent switch, search, type, bedrooms, price and sort filters |
| `property.html?id=1` | Full home page: gallery, facts, features, neighbourhood scores, sticky tour booking |
| `saved.html` | Every home you saved with the heart |
| `calculator.html` | Mortgage calculator and "what can I afford?" estimate that links to matching homes |
| `about.html` | Story, numbers and the agents |
| `contact.html` | Contact form, details and FAQ |
| `list.html` | Upload photos and publish your own listing on the site |
| `enquiries.html` | Demo inbox: every form submission sent while in demo mode |

## Highlights

- **Quick view pop-up** on every card: gallery, price, payment estimate (change the down payment live), agent with call and WhatsApp buttons, and a tour form
- Saved homes are remembered in the browser
- Sticky Call / Book a tour bar on phones, floating "Talk to an agent" button on every page
- Fully responsive, keyboard friendly and respects reduced-motion settings
- No frameworks and no build step

## Built with

HTML5 · CSS3 (custom properties, Grid, Flexbox, `backdrop-filter`) · JavaScript (ES6, no libraries) · Manrope and Playfair Display from Google Fonts

## Structure

```
*.html            one file per page (header and footer are added by js/layout.js)
css/              variables · base · layout · components · pages · responsive
js/
  data.js         all content: homes, agents, reviews, FAQs
  utils.js        helpers, mortgage formula, saved homes
  art.js          built-in illustrations used until you add photos
  cards.js        card and details HTML, quick-view pop-up
  layout.js       shared header, footer, icons
  main.js         shared behaviour (clicks, saving, forms, toast)
  sections.js     fills the data-render blocks
  properties.js · property.js · saved.js · calculator.js   page scripts
assets/images/    put your photos here (see the README.txt inside)
```

## Forms that work

Every form (tour, contact, valuation) is sent for real. In **demo mode** (the default) submissions are saved in the visitor's browser and shown on `enquiries.html`. To receive real emails, create a free form at [formspree.io](https://formspree.io) and paste its URL into `FORM_ENDPOINT` in `js/data.js`.

## List a home

`list.html` lets anyone add a listing with up to 4 of their own photos (resized in the browser). It appears in search, on cards and on its own page. There is no server, so listings live in that browser only.

## Add your own photos

Read `assets/images/README.txt`. In short: save photos as `slug-1.jpg`, `slug-2.jpg`, `slug-3.jpg`, then set `USE_PHOTOS = true` in `js/data.js`. To add a home, copy an object in `js/data.js`.

## Run it

Open `index.html` in a browser, or use the VS Code Live Server extension. To publish, turn on GitHub Pages (Settings → Pages → `main` branch, `/ (root)`).

## Built with Claude

I made this together with [Claude](https://claude.ai), Anthropic's AI assistant: I described the idea and the look, Claude wrote the code, and I reviewed and tested it.
