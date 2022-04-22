function bytes2hex(bytes) {
	return Array.prototype.map.call(bytes,
		byte => ('0' + byte.toString(16)).slice(-2)).join('');
}

export function respond(body) {
	if (body.errors) {
		return { status: 401, body };
	}

	const json = JSON.stringify(body.user);
	
	// Buffer.from is not available in Cloudflare workers
	// const value = Buffer.from(json).toString('base64');

	let bytes = new TextEncoder().encode(json)
	const value = bytes2hex(bytes)


	return {
		headers: {
			'set-cookie': `jwt=${value}; Path=/; HttpOnly`
		},
		body
	};
}
