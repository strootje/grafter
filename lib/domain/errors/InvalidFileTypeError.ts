import { FileType } from '../Changeable';

export class InvalidFileTypeError extends Error {
	constructor(type: FileType) {
		super(`unsupported file_type: '${type}'`);
	}
}
