export class ToManyResultsError extends Error {
	constructor(name: string, count: number) {
		super(`got to many results from '${name}', only need '${count}'`);
	}
}
