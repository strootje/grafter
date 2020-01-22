import { debug } from 'debug';
import { Arguments } from 'yargs';
import { Profile } from '../domain/minecraft/Profile';
import { Targetable } from '../domain/Targetable';
import { TargetFactory } from '../factories/TargetFactory';
import { MinecraftHelper } from './MinecraftHelper';

export interface CommandArgs {
	profile: string;
	target: string;
	source: string;
}

export interface CoercedCommandArgs {
	profile: Profile;
	target: Targetable;
	source: string;
}

export type HandlecommandArgsPredicate = (args: CommandArgs) => Promise<void>;
export type HandleCoercedCommandArgsPredicate = (args: CoercedCommandArgs) => Promise<void>;

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
				logger('checking for valid profile - done (profile: %s', profile);
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

	public static Coerce(predicate: HandleCoercedCommandArgsPredicate): HandlecommandArgsPredicate {
		return (args: CommandArgs) => {
			const target = TargetFactory.Create(args.target, args.profile);
			
			return predicate({
				profile: target.Profile,
				target: target,
				source: args.source
			});
		}
	}
}
