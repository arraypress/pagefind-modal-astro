# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] — Unreleased

### Initial Release

- `<PagefindModal>` — headless replacement for Pagefind's built-in
  `<pagefind-modal>` Component UI. Native `<dialog>` so the browser
  handles focus trap, Esc-to-close, and backdrop hit-testing.
- Lazy-loads `/pagefind/pagefind.js` on first open + first
  keystroke. Dev mode shows the configurable `unavailable` hint.
- Delegated triggers — any `[data-search-open]` element opens the
  modal; `[data-search-close]` closes it.
- Keyboard: ⌘K / Ctrl+K toggles, ↑/↓ navigate results, Enter
  opens, Esc closes. Focus restoration to the trigger element on
  close.
- Configurable section grouping by URL prefix. `DEFAULT_SECTIONS`
  covers products / blog / news / pages out of the box.
- Reads Pagefind `meta`: `title`, `image`, `category`, `price`,
  `artist`, `summary` — anything missing is silently omitted.
- Stale-query guard — results from older keystrokes are discarded
  if the user has typed further by the time they resolve.
- Re-binds cleanly on Astro view transitions via dataset marker.
- All structural strings i18n-able via the `strings` prop.
- Ships **zero styles** — exposes `.pf-modal*` / `.pf-result*` /
  `.pf-group*` class hooks only.

13 tests passing under Astro's experimental_AstroContainer.

Zero runtime dependencies (Pagefind itself is loaded from
your site, not bundled).
