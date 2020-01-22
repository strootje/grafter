import { World } from './minecraft/World';
import { TargetFolder } from './TargetFolder';

export class TargetWorld extends TargetFolder {
	constructor(
		world: World,
		folder: string
	) {
		super(world.Profile, folder);
	}
}
