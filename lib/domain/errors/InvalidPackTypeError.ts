import { PackType } from '../Packable';

export class InvalidPackTypeError extends Error {
	constructor(type: PackType) {
		super(`unsupported pack_type: '${type}'`);
	}
}
