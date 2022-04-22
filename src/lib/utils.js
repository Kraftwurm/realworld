export function post(endpoint, data) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

function bytes2hex(bytes) {
	return Array.prototype.map.call(bytes,
		byte => ('0' + byte.toString(16)).slice(-2)).join('');
}

export function bufferFromCF(value) {
	let bytes = new TextEncoder().encode(value)
	return bytes2hex(bytes)
}
