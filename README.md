# Proyektong AHON — Website

Featuring the Operational Realities of Barangay Colgante's First Responders.

## Upload ALL of these to GitHub (keep the folder structure exactly)

```
ahon-website/
├── index.html          ← Home
├── about.html          ← About
├── stories.html        ← Stories (Showcase + Stories banner + 15 cards)
├── donate.html         ← Donate
├── feedback.html       ← Feedback (live Google Form)
├── stories/            ← the 15 responder pages (kapitan.html, gloria.html, …)
├── css/style.css       ← all the design/styling
├── js/script.js        ← cards, Before/During/After buttons, menu, Google Form
└── images/             ← put your photos here (see list below)
```

## Turning it on (GitHub Pages)
1. Create a new repository → **Add file → Upload files** → drag in everything *inside* `ahon-website/` (the files and the `stories`, `css`, `js`, `images` folders).
2. **Settings → Pages → Branch: main / root → Save**.
3. Your site will be at `https://<your-username>.github.io/<repo-name>/`.

## Images
All photos are included. To swap one, upload a new file with the same name.
**Card photos:** upload a photo into `images/cards/` named after the person's story page
(kapitan, gloria, roger, angelito, roberto, reynaldo, renato, lorence, ramilo, edwin, paligui, armando, munar, romeo, maximo) + `.jpg`,
e.g. `images/cards/gloria.jpg`. Cards without a photo keep the placeholder.

## Things to edit
- **Google Form:** already linked (`GOOGLE_FORM_URL` in `js/script.js`).
- **Card names / roles / order:** the `RESPONDERS` list at the top of `js/script.js`.
- **Story text:** open the matching file in `stories/`.
