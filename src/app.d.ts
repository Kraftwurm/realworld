// src/app.d.ts
declare namespace App {
	interface Locals {}

	interface Platform {
		env: {
			COUNTER: DurableObjectNamespace;
		};
		context: {
			waitUntil(promise: Promise<any>): void;
		}
	}

	interface Session {}

	interface Stuff {}
}