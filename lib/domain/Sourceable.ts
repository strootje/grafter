import { Packable } from './Packable';
import { Writeable } from './Writeable';

export abstract class Sourceable {
	private readonly targets: Writeable[];

	constructor(
		protected readonly pack: Packable
	) {
		this.targets = [];
	}

	public Pipe(target: Writeable): void {
		this.targets.push(target);
	}

	public async HandleFilesAsync(): Promise<void> {
		console.log(this.pack);
	}
}
