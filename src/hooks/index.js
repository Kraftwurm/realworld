import * as cookie from 'cookie';

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	//const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
	const jwt = cookies.jwt && bufferFromCF2(cookies.jwt, 'base64').toString('utf-8');

	event.locals.user = jwt ? JSON.parse(jwt) : null;
	return await resolve(event);
}

export function getSession({ locals }) {
	return {
		user: locals.user && {
			username: locals.user.username,
			email: locals.user.email,
			image: locals.user.image,
			bio: locals.user.bio
		}
	};
}

function bytes2hex2(bytes) {
	return Array.prototype.map.call(bytes,
		byte => ('0' + byte.toString(16)).slice(-2)).join('');
}

function bufferFromCF2(value) {
	let bytes = new TextEncoder().encode(value)
	return bytes2hex2(bytes)
}
