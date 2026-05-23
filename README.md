# @arraypress/pagefind-modal-astro

> Astro search modal — a headless replacement for Pagefind's built-in
> `<pagefind-modal>` Component UI. Native `<dialog>`, grouped results,
> keyboard navigation, ⌘K shortcut, focus restoration.

## Install

```bash
npm install @arraypress/pagefind-modal-astro
```

Plus run [Pagefind](https://pagefind.app/) as a postbuild step so the
search index exists in production:

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist"
  }
}
```

## Use

```astro
---
import { PagefindModal } from '@arraypress/pagefind-modal-astro';
---
<PagefindModal />

<!-- Anywhere on the page — any element with [data-search-open] opens it. -->
<button data-search-open aria-label="Search">
  <svg>…</svg>
</button>
```

Open with the button, ⌘K (macOS) / Ctrl+K (Windows/Linux), or
programmatically via the native `<dialog>` API:

```js
document.getElementById('pf-search-modal').showModal();
```

## Dev mode

Pagefind's JS bundle only exists in production builds
(`dist/pagefind/pagefind.js`). The modal lazy-loads it on first
search — in dev mode the load fails gracefully and the modal shows
the `unavailable` hint. Build the site to test search end-to-end.

## Pagefind meta

The modal reads these `meta` keys per result. Set them on your
source pages via `data-pagefind-meta="key:value"`:

| Meta key   | Rendered as                       |
|------------|-----------------------------------|
| `title`    | Result headline                   |
| `image`    | Thumbnail (falls back to monogram)|
| `category` | Chip above the title              |
| `price`    | Chip above the title              |
| `artist`   | "by …" subline                    |
| `summary`  | Excerpt (preferred over Pagefind's auto-excerpt) |

Anything not set is silently omitted.

## Section grouping

Results group by URL prefix. The default rules:

```ts
import { DEFAULT_SECTIONS } from '@arraypress/pagefind-modal-astro';

DEFAULT_SECTIONS;
// [
//   { prefix: '/products/', key: 'products', label: 'Products', order: 1 },
//   { prefix: '/blog/',     key: 'posts',    label: 'Posts',    order: 2 },
//   { prefix: '/news',      key: 'news',     label: 'News',     order: 3 },
//   { prefix: '',           key: 'pages',    label: 'Pages',    order: 9 },
// ]
```

Override for your routes:

```astro
<PagefindModal sections={[
  { prefix: '/docs/',    key: 'docs',    label: 'Documentation', order: 1 },
  { prefix: '/guides/',  key: 'guides',  label: 'Guides',        order: 2 },
  { prefix: '',          key: 'pages',   label: 'Other',         order: 9 },
]} />
```

Rules try in array order; the first matching prefix wins. The last
entry with `prefix: ''` catches everything else.

## i18n

All structural strings are configurable:

```astro
<PagefindModal strings={{
  ariaLabel:   'Recherche',
  placeholder: 'Chercher…',
  idleHint:    'Tapez pour rechercher.',
  noResults:   'Aucun résultat.',
  closeLabel:  'Fermer la recherche',
  navHint:     'Naviguer',
  openHint:    'Ouvrir',
  closeHint:   'Fermer',
}} />
```

## Keyboard shortcuts

| Key            | Action                            |
|----------------|-----------------------------------|
| ⌘K / Ctrl+K    | Toggle the modal                  |
| Esc            | Close (native `<dialog>`)         |
| ↑ / ↓          | Navigate results                  |
| Enter          | Open the selected result          |

Focus is restored to the trigger element on close.

## Props

| Prop            | Default                  | Description                                       |
|-----------------|--------------------------|---------------------------------------------------|
| `id`            | `'pf-search-modal'`      | Dialog DOM id.                                    |
| `pagefindPath`  | `'/pagefind/pagefind.js'`| Override if you serve Pagefind from a sub-path.   |
| `sections`      | `DEFAULT_SECTIONS`       | URL-prefix grouping rules.                        |
| `strings`       | English                  | i18n overrides.                                   |
| `maxResults`    | `12`                     | How many top hits to hydrate per query.           |
| `excerptLength` | `25`                     | Pagefind `excerptLength` option (words).          |
| `debounceMs`    | `120`                    | Debounce on input → search.                       |
| `class`         | —                        | Extra classes on the `<dialog>`.                  |

## Styling

The component ships **no styles**. Hook against these class names
in your stylesheet:

```
.pf-modal                — <dialog>
.pf-modal__panel
.pf-modal__head, __icon, __input, __kbd, __close
.pf-modal__results, __hint
.pf-modal__foot
.pf-group, .pf-group__heading
.pf-result, .pf-result__thumb (with --placeholder), __body
.pf-result__meta, __chip, __price
.pf-result__title, __artist, __excerpt, __url
.pf-result[aria-selected="true"]   /* keyboard/hover selection */
body.pf-search-open                /* added while modal is open */
```

## License

MIT
