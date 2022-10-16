import adapter from '@sveltejs/adapter-static';
import autoprefixer from 'autoprefixer';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: null
		})
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		sveltePreprocess({
			postcss: {
				plugins: [autoprefixer],
			},
		}),
		mdsvex({
			extensions: ['.md']
		}),
	],
};

export default config;
