//import netlify from '@sveltejs/adapter-netlify';
//import vercel from '@sveltejs/adapter-vercel';
import adapter from '@sveltejs/adapter-cloudflare';

export default {
	kit: {
		adapter: adapter()
	}
};
