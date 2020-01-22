export class InvalidPackVersionError extends Error {
	constructor(version: number) {
		super(`unsupported pack_format: '${version}'`);
	}
}
