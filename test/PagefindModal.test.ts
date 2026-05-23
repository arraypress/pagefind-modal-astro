import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import PagefindModalRaw from '../src/PagefindModal.astro';
import type { PagefindModalProps } from '../src/types';

const PagefindModal = PagefindModalRaw as Parameters<AstroContainer['renderToString']>[0];

let container: AstroContainer;

beforeAll(async () => {
	container = await AstroContainer.create();
});

async function render(props: PagefindModalProps = {}): Promise<string> {
	return container.renderToString(PagefindModal, {
		props: props as unknown as Record<string, unknown>,
	});
}

function getAttr(html: string, name: string): string | null {
	const valued = new RegExp(`\\s${name}="([^"]*)"`).exec(html);
	if (valued) return valued[1];
	return null;
}

describe('<PagefindModal>', () => {
	it('renders a <dialog> with the default id', async () => {
		const html = await render();
		expect(html).toContain('<dialog');
		expect(getAttr(html, 'id')).toBe('pf-search-modal');
	});

	it('honours a custom id', async () => {
		const html = await render({ id: 'my-search' });
		expect(html).toMatch(/id="my-search"/);
	});

	it('input has aria-controls pointing at the results id', async () => {
		const html = await render({ id: 'my-search' });
		expect(html).toContain('aria-controls="my-search-results"');
	});

	it('uses default strings', async () => {
		const html = await render();
		expect(html).toContain('Search…');
		expect(html).toContain('Start typing to search.');
	});

	it('honours custom strings', async () => {
		const html = await render({ strings: { placeholder: 'Find tracks', idleHint: 'Try a name' } });
		expect(html).toContain('Find tracks');
		expect(html).toContain('Try a name');
	});

	it('passes PF_PATH through to the inline script', async () => {
		const html = await render({ pagefindPath: '/custom/pagefind.js' });
		expect(html).toMatch(/PF_PATH\s*=\s*"\/custom\/pagefind\.js"/);
	});

	it('passes maxResults through as PF_MAX_RESULTS', async () => {
		const html = await render({ maxResults: 24 });
		expect(html).toMatch(/PF_MAX_RESULTS\s*=\s*24/);
	});

	it('passes excerptLength through as PF_EXCERPT_LENGTH', async () => {
		const html = await render({ excerptLength: 40 });
		expect(html).toMatch(/PF_EXCERPT_LENGTH\s*=\s*40/);
	});

	it('passes debounceMs through as PF_DEBOUNCE_MS', async () => {
		const html = await render({ debounceMs: 300 });
		expect(html).toMatch(/PF_DEBOUNCE_MS\s*=\s*300/);
	});

	it('renders the input, results listbox, and close button', async () => {
		const html = await render();
		expect(html).toMatch(/data-pf-input/);
		expect(html).toMatch(/data-pf-results/);
		expect(html).toMatch(/data-search-close/);
	});

	it('serialises section rules as PF_SECTIONS', async () => {
		const html = await render({
			sections: [
				{ prefix: '/foo/', key: 'foo', label: 'Foo', order: 1 },
				{ prefix: '', key: 'rest', label: 'Other', order: 2 },
			],
		});
		expect(html).toContain('PF_SECTIONS');
		expect(html).toContain('"key":"foo"');
		expect(html).toContain('"key":"rest"');
	});

	it('input carries aria-autocomplete="list" for combobox semantics', async () => {
		const html = await render();
		expect(html).toContain('aria-autocomplete="list"');
	});

	it('listbox role on the results container', async () => {
		const html = await render();
		expect(html).toMatch(/role="listbox"/);
	});
});
