import { Packable } from './Packable';

export class PackData extends Packable {
	constructor(name: string, folder: string) {
		super(name, 'data', folder);
	}
}
