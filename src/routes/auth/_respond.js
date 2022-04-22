import bufferFromCF from '$lib/utils'

export function respond(body) {
	if (body.errors) {
		return { status: 401, body };
	}

	const json = JSON.stringify(body.user);
	
	// Buffer.from is not available in Cloudflare workers
	// const value = Buffer.from(json).toString('base64');

	const value = bufferFromCF(json)

	return {
		headers: {
			'set-cookie': `jwt=${value}; Path=/; HttpOnly`
		},
		body
	};
}

function bytes2hex(bytes) {
	return Array.prototype.map.call(bytes,
		byte => ('0' + byte.toString(16)).slice(-2)).join('');
}

export function bufferFromCF(value) {
	let bytes = new TextEncoder().encode(value)
	return bytes2hex(bytes)
}
