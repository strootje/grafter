export class NotFoundError extends Error {
	constructor(path: string) {
		super(`cannot find path: '${path}'`);
	}
}
