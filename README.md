Nestora

A real estate website I built to see how far plain HTML, CSS and JavaScript can go. It has seven pages, a light and airy "frosted glass" design, and features that actually work: search and filters, saved homes, a quick-view pop-up, tour booking, mortgage tools, and even a page where you can list your own home with your own photos.

Live demo

Nestora home page

Add a screenshot of the home page at assets/screenshot.png and it will show up here.

Why I made it

Most portfolio projects are static pages that only look good. I wanted one that behaves like a real product: a visitor can find a home, save it, check what it would cost per month, book a tour, and get in touch with an agent, all without leaving the site.

What you can do
Search and filter homes for sale or rent by city, type, bedrooms and price, and sort the results
Quick view pop-up on every card: photo gallery, facts, a live monthly payment (change the down payment), and a tour form
Full property pages with a gallery, key facts, features, neighbourhood scores and similar homes
Save homes with the heart. They are remembered and collected on the Saved page
Mortgage calculator and a "what can I afford?" tool that links to homes in your budget
Book a tour, send a message or ask for a valuation. Forms really send: to your email through Formspree, or into a built-in demo inbox
List a home: upload up to 4 photos, add details, and your listing appears in search with its own page
Call or WhatsApp the agent straight from any home
Works well on phones, tablets and desktops, with a sticky "Call / Book a tour" bar on mobile
Pages
Page	What it is
index.html	Home: search, featured homes, cities, how it works, reviews, free valuation
properties.html	All homes with filters and sorting
property.html?id=1	One home in full detail
saved.html	Homes you saved
calculator.html	Mortgage and affordability tools
list.html	Add your own home with photos
about.html	The story and the agents
contact.html	Contact form, details and FAQ
enquiries.html	Demo inbox for everything sent through the forms
Built with
HTML5: semantic pages, <dialog> for the pop-up, <details> for the FAQ
CSS3: custom properties, Grid, Flexbox, backdrop-filter for the glass effect, split into small files
JavaScript (ES6): no frameworks, no libraries. localStorage for saved homes, listings and enquiries, and the Canvas API to shrink uploaded photos
Manrope and Playfair Display from Google Fonts
Project structure
*.html              one file per page (the header and footer are added by js/layout.js)
css/                variables · base · layout · components · pages · responsive
js/
  data.js           all the content: homes, agents, reviews, FAQs, settings
  utils.js          helpers, mortgage formula, saved homes
  art.js            built-in illustrations used until you add photos
  cards.js          card and details HTML, the quick-view pop-up
  layout.js         shared header, footer and icons
  main.js           shared behaviour: clicks, saving, forms, toast
  sections.js       fills the data-render blocks
  properties.js · property.js · saved.js · calculator.js · list.js · enquiries.js
assets/images/      put your photos here
Run it
bash
git clone https://github.com/venex2265/nestora.git
cd nestora

Then open index.html in your browser, or use the VS Code Live Server extension.

To put it online, push the repo to GitHub and turn on Settings → Pages (branch main, folder / (root)).

Make it yours
Change the homes, agents or reviews: edit js/data.js
Use real photos for the built-in homes: follow assets/images/README.txt, then set USE_PHOTOS = true in js/data.js
Get form messages by email: create a free form at formspree.io and paste its URL into FORM_ENDPOINT in js/data.js. Until then, messages are saved in the visitor's browser and shown on enquiries.html
Good to know

There is no backend. Saved homes, listings you add and demo enquiries live in the browser (localStorage), so they stay on that device. All homes, agents and reviews in the demo are made up.

Ideas for later
A real backend so listings and enquiries are shared between visitors
A map view of the homes
Compare two homes side by side
Arabic and right-to-left support
Built with Claude

I made this project together with Claude, Anthropic's AI assistant. I described the idea, the look and the features, Claude wrote the code, and we improved it step by step. I reviewed, tested and customised the result, and I learned a lot from reading it.

License

Free to use and learn from. If it helps you, a star on the repo is always appreciated.

Open `index.html` in a browser, or use the VS Code Live Server extension. To publish, turn on GitHub Pages (Settings → Pages → `main` branch, `/ (root)`).

## Built with Claude

I made this together with [Claude](https://claude.ai), Anthropic's AI assistant: I described the idea and the look, Claude wrote the code, and I reviewed and tested it.
