import { resolve } from 'path';
import { World } from './minecraft/World';
import { Target } from './Target';

export class WorldTarget extends Target {
	constructor(
		world: World
	) {
		super(world.Profile, resolve(world.Profile.Folder, 'resourcepacks'), resolve(world.Folder, 'datapacks'));
	}
}
