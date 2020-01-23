import { resolve } from 'path';
import { World } from '../minecraft/World';
import { Targetable } from '../Targetable';

export class TargetWorld extends Targetable {
	constructor(
		world: World
	) {
		super(world.Profile, resolve(world.Profile.Folder, 'resourcepacks'), resolve(world.Folder, 'datapacks'));
	}
}
