import { FileType } from '../Watchable';

export class InvalidFileTypeError extends Error {
	constructor(type: FileType) {
		super(`unsupported file_type: '${type}'`);
	}
}
