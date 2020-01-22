import { debug } from 'debug';
import { Arguments } from 'yargs';
import { MinecraftHelper } from './MinecraftHelper';

export interface CommandArgs {
	profile?: string;
	target: string;
	source: string;
}

const logger = debug('graft:helpers:Args');
export class ArgsHelper {
	public static CheckForValidProfile(args: Arguments<CommandArgs>): boolean {
		logger('checking for valid profile');

		try {
			const world = MinecraftHelper.GetWorldByTarget(args.target);
			logger('checking for valid profile - done (world: %s)', world.Profile.Name);
		} catch {
			if (!args.profile) {
				return false;
			}

			if (args.profile === 'stable') {
				const profile = MinecraftHelper.GetJarPath('latest-release', args.profile);
				logger('checkinf for valid profile - done (profile: %s', profile);
			} else if (args.profile === 'snapshot') {
				const profile = MinecraftHelper.GetJarPath('latest-snapshot', args.profile);
				logger('checkinf for valid profile - done (profile: %s', profile);
			} else {
				const profile = MinecraftHelper.GetJarPathByVersion(args.profile);
				logger('checkinf for valid profile - done (profile: %s', profile);
			}
		}

		return true;
	}
}
