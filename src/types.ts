/**
 * @module @arraypress/pagefind-modal-astro/types
 */

/**
 * Section grouping rule. Each rule has:
 *
 *   - `prefix`: a URL path prefix to match (`'/products/'`, `'/blog/'`)
 *   - `key`:    stable group id, used in the rendered DOM
 *   - `label`:  human-readable section heading
 *   - `order`:  sort order (lower = earlier in the result list)
 *
 * The runtime tries each rule in array order and uses the first match.
 * The last entry typically catches everything else with an empty
 * prefix (`''`) — see `DEFAULT_SECTIONS`.
 */
export interface SearchSection {
	prefix: string;
	key: string;
	label: string;
	order: number;
}

/** Useful default for storefronts that have products + blog + news. */
export const DEFAULT_SECTIONS: SearchSection[] = [
	{ prefix: '/products/', key: 'products', label: 'Products', order: 1 },
	{ prefix: '/blog/',     key: 'posts',    label: 'Posts',    order: 2 },
	{ prefix: '/news',      key: 'news',     label: 'News',     order: 3 },
	{ prefix: '',           key: 'pages',    label: 'Pages',    order: 9 },
];

/** i18n strings rendered by the modal. */
export interface PagefindModalStrings {
	/** Aria-label on `<dialog>` and the search `<input>`. */
	ariaLabel?: string;
	/** Input placeholder text. */
	placeholder?: string;
	/** Idle hint shown before the user types anything. */
	idleHint?: string;
	/** Hint shown while a query is in flight. */
	loadingHint?: string;
	/** Hint shown when a search returns no hits. */
	noResults?: string;
	/** Hint shown when Pagefind's JS bundle can't load (dev mode). */
	unavailable?: string;
	/** Hint shown when Pagefind itself throws an error during search. */
	error?: string;
	/** Aria-label for the Close button (Esc shortcut still works). */
	closeLabel?: string;
	/** Footer keyboard-hint copy. */
	navHint?: string;
	openHint?: string;
	closeHint?: string;
}

export const DEFAULT_STRINGS: Required<PagefindModalStrings> = {
	ariaLabel:   'Search',
	placeholder: 'Search…',
	idleHint:    'Start typing to search.',
	loadingHint: 'Searching…',
	noResults:   'No results.',
	unavailable: 'Search isn’t available in dev. Run a production build first.',
	error:       'Something went wrong while searching.',
	closeLabel:  'Close search',
	navHint:     'Navigate',
	openHint:    'Open',
	closeHint:   'Close',
};

/** Props for `<PagefindModal>`. */
export interface PagefindModalProps {
	/** Dialog DOM id. Default: `'pf-search-modal'`. Override to mount
	 *  multiple modals on one page (rare). */
	id?: string;
	/** URL of Pagefind's headless JS bundle. Default:
	 *  `/pagefind/pagefind.js`. */
	pagefindPath?: string;
	/** Section grouping rules. Default: `DEFAULT_SECTIONS`. */
	sections?: SearchSection[];
	/** i18n strings. Merged onto `DEFAULT_STRINGS`. */
	strings?: PagefindModalStrings;
	/** How many top hits to hydrate per query. Default: `12`. */
	maxResults?: number;
	/** Pagefind excerpt length (passed to `options({ excerptLength })`).
	 *  Default: `25`. */
	excerptLength?: number;
	/** Debounce on input → search in ms. Default: `120`. */
	debounceMs?: number;
	/** Extra classes on the `<dialog>`. */
	class?: string;
}
