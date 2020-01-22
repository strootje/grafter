import { resolve } from 'path';
import { InvalidProfileError } from '../domain/errors/InvalidProfileError';
import { Targetable } from '../domain/Targetable';
import { TargetFolder } from '../domain/TargetFolder';
import { TargetWorld } from '../domain/TargetWorld';
import { MinecraftHelper } from '../helpers/MinecraftHelper';

export class TargetFactory {
	public static Create(basefolder: string, profileName: string): Targetable {
		try {
			const world = MinecraftHelper.GetWorldByTarget(basefolder);
			return new TargetWorld(world);
		} catch {
			const targetfolder = resolve(basefolder);
			const profile = MinecraftHelper.Profiles.find(p => p.Name == profileName);

			if (!profile) {
				throw new InvalidProfileError(profileName);
			}

			return new TargetFolder(profile, targetfolder);
		}
	}
}
