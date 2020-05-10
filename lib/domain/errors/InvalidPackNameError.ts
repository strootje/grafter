export class InvalidPackNameError extends Error {
	constructor(folder: string) {
		super(`unsupported pack_name: '${folder}'`);
	}
}
