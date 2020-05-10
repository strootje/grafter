import { FileType } from '../File';

export class InvalidFileTypeError extends Error {
	constructor(type: FileType) {
		super(`unsupported file_type: '${type}'`);
	}
}
