import { resolve } from 'path';
import { Profile } from '../domain/minecraft/Profile';
import { Packable } from '../domain/Packable';
import { Targetable } from '../domain/Targetable';
import { TargetFolder } from '../domain/TargetFolder';
import { TargetWorld } from '../domain/TargetWorld';
import { MinecraftHelper } from '../helpers/MinecraftHelper';

export class TargetFactory {
	public static Create(basefolder: string, profile: Profile, pack: Packable): Targetable {
		try {
			const world = MinecraftHelper.GetWorldByTarget(basefolder);
			const worldfolder = pack.Type === 'assets'
				? resolve(world.Profile.Folder, 'resourcepacks', pack.Name)
				: resolve(world.Folder, 'datapacks', pack.Name);

			return new TargetWorld(world, worldfolder);
		} catch {
			const targetfolder = resolve(basefolder, pack.Name);
			return new TargetFolder(profile, targetfolder);
		}
	}
}
