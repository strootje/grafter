import { debug } from 'debug';
import { resolve } from 'path';
import { TargetFolder } from '../domain/core/TargetFolder';
import { TargetWorld } from '../domain/core/TargetWorld';
import { InvalidProfileError } from '../domain/errors/InvalidProfileError';
import { Targetable } from '../domain/Targetable';
import { MinecraftHelper } from '../helpers/MinecraftHelper';

const logger = debug('grafter:factories:Target');
export class TargetFactory {
	public static Create(basefolder: string, profileName: string): Targetable {
		try {
			const world = MinecraftHelper.GetWorldByTarget(basefolder);
			logger('creating world target - %o', world);

			return new TargetWorld(world);
		} catch {
			const targetfolder = resolve(basefolder);
			const profile = MinecraftHelper.Profiles.find(p => p.Name == profileName);

			if (!profile) {
				throw new InvalidProfileError(profileName);
			}

			logger('creating folder target - %o', profile);

			return new TargetFolder(profile, targetfolder);
		}
	}
}
