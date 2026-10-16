# The Event Studio — Coastal Social

A separate, responsive HTML website concept. This direction uses deep navy, coral and warm ivory, with Outfit headings and DM Sans body text. Eleven original generated images appear in eleven distinct page placements. The refined layout adds a layered hero detail photograph, larger type, varied service layouts and an asymmetric inspiration collage.

## Open the website

Open `index.html` from the extracted ZIP. No build, package installation, account, API key or internet connection is required. Keep the `assets` folder beside `index.html`.

The Site source stores the deployable files under `dist/`; the download ZIP puts those files at its top level, inside `event-studio-coastal-social/`.

## Included interactions

- Responsive navigation and occasion shortcuts.
- Inspiration filters and an accessible native-dialog image viewer with previous/next, arrow keys and Escape.
- Native FAQ disclosures.
- Validated enquiry preview, optional date/guests/location/budget details, text-file download and reset.
- Optional endpoint delivery with error handling and a 20-second timeout.

## Enquiry delivery

This is a concept. By default, the enquiry form previews details locally and does **not** send or retain them. Set `data-endpoint` on `#enquiryForm` in `index.html` to an approved HTTPS form handler to enable POST delivery. The handler must accept multipart FormData, permit the website origin if cross-origin, validate inputs, handle consent and abuse prevention, and return a non-error HTTP status only after delivery succeeds. Confirm the live handler before using the site for real enquiries. Replace the concept notice and consent text with accurate business information when launching.

## Customise

- Copy, sections and form configuration: `index.html`.
- Base styling: `assets/css/coastal.css`.
- Refined composition, readable type and motion: `assets/css/refinements.css`.
- Menu, gallery and form behaviour: `assets/js/coastal.js`.
- Photography and image manifest: `assets/images/`.
- Self-hosted fonts and SIL Open Font Licenses: `assets/fonts/`.

Images retain their original aspect ratios; masters use lossless WebP at native resolution. Responsive derivatives use 320, 480, 768, 1024 and 1280 pixels where smaller than the native master. Derivatives are never enlarged or cropped. High-quality WebP compression is checked against each resized reference at a minimum of 40 dB PSNR, with lossless fallback. Native lossless masters remain unchanged and are used in the gallery viewer. PSNR is a numerical compression check, not a substitute for browser visual review. No photo is used twice on the page. The gallery viewer reopens the selected master and limits its display according to native dimensions and device pixel density. Extremely high-density or zoomed displays can exceed the available source detail; these assets are not advertised as 4K.

## Verification

Checked JavaScript syntax; HTML structure, unique IDs, anchor targets, local asset references, responsive image metadata, eleven unique photo hashes and lossless master pixel equality. An event harness checked navigation, gallery filtering and viewer navigation, focus return, local form preview, safe text output, download and reset. This is not a browser rendering test. An interactive browser was not available in this environment, so desktop/mobile visual browser review remains necessary.

All photography is AI-generated and illustrative. It does not depict a verified business team, actual client event, portfolio, venue booking, or testimonial. This concept contains no fabricated contact details, reviews or prices.

## Refined edition

Hero copy is shorter and paired with an original table-detail inset. Wedding and corporate services use larger split layouts, followed by two complementary service cards. The gallery groups full, uncropped images in an asymmetric composition. Captions, forms and supporting text use larger, higher-contrast type. Subtle reveal and hover transitions respect reduced-motion preferences; content remains visible without JavaScript.

## Performance and form edition

Copy and section spacing are tighter. Optional event questions are grouped inside a native disclosure to keep the first form view short. Budget is optional and expresses the visitor’s own total budget, not a service price. The downloadable summary includes all entered optional details.

Image widths are supplied through `srcset` and `sizes`, so the browser can choose for the viewport and pixel density. Images below the opening section are lazy-loaded with low fetch priority; the main hero has high priority. The site uses no third-party scripts or runtime requests in preview mode.

Live delivery and a verified Selected Events portfolio remain unconfigured because no actual handler or event details were supplied. Browser visual testing is still unverified: the supported browser capability was unavailable.

Measured asset changes: Outfit and DM Sans font downloads total 165,260 bytes in WOFF format, versus 351,048 bytes in the original TTF files (52.9% smaller). Across eleven photographs, the 768px derivatives total 6,340,312 bytes, versus 19,937,428 bytes for the native masters (68.2% smaller). Actual transfer depends on viewport, density and browser selection. These are file-size measurements, not browser timing or Lighthouse scores.

## Final consistency pass

Supporting text, labels, placeholders and inline accents have stronger contrast against their section backgrounds. Primary touch controls have at least a 44-pixel target. The two large service photographs are capped at 768 CSS pixels on tablet layouts. Gallery image loading and error states prevent the previous image appearing under the next caption.

Enquiry previews can be edited without clearing the entered details. Selecting another service after preview reopens the editor and preserves the visitor’s details. Whitespace-only name and ideas are rejected. The mobile navigation closes on an outside click. These flows passed an event harness; they have not been rendered in an interactive browser.
