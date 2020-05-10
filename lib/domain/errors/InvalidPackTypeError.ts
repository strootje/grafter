import { PackType } from '../Pack';

export class InvalidPackTypeError extends Error {
	constructor(type: PackType) {
		super(`unsupported pack_type: '${type}'`);
	}
}
