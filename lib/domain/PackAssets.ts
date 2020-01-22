import { Packable } from './Packable';

export class PackAssets extends Packable {
	constructor(name: string, folder: string) {
		super(name, 'assets', folder);
	}
}
