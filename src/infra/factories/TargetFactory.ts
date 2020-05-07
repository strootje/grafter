import { debug } from 'debug';
import { resolve } from 'path';
import { InvalidProfileError } from '../../domain/errors';
import { FolderTarget } from '../../domain/FolderTarget';
import { Target } from '../../domain/Target';
import { WorldTarget } from '../../domain/WorldTarget';
import { MinecraftHelper } from '../helpers/MinecraftHelper';

const logger = debug('grafter:factories:Target');
export class TargetFactory {
	public static Create(basefolder: string, profileName: string): Target {
		try {
			const world = MinecraftHelper.GetWorldByTarget(basefolder);
			logger('creating world target - %o', world);

			return new WorldTarget(world);
		} catch {
			const targetfolder = resolve(basefolder);
			const profile = MinecraftHelper.Profiles.find(p => p.Name == profileName);

			if (!profile) {
				throw new InvalidProfileError(profileName);
			}

			logger('creating folder target - %o', profile);

			return new FolderTarget(profile, targetfolder);
		}
	}
}
