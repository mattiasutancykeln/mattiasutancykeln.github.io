# Content folder structure

- **Research:** `research/[slug]/` — put `figure.png` and optional `paper.pdf` (or whatever filenames you set in `src/content/research.js`).
- **Lectures:** `lecture/[slug]/` — put your PDF (e.g. `compendium.pdf`). The site shows a first-page preview when possible.

## If the PDF first-page preview doesn’t render

You can pre-render the first page as a PNG and use that instead, or as a fallback.

**ImageMagick (command line):**

```bash
# First page only; output same size as needed for the card
magick "path/to/lecture.pdf[0]" page1.png
```

- `[0]` means “first page”.
- Run from the lecture folder, e.g.:
  `cd public/content/lecture/optimised-learning-imo`
  `magick "compendium.pdf[0]" page1.png`
- Then in `src/content/lectures.js` you could point that entry to an image instead of (or in addition to) the PDF, if you later add an optional `figure` for lectures.
