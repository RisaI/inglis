import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// https://github.com/sveltejs/svelte-preprocess
	preprocess: preprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
