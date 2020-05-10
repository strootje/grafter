import { CommandModule } from 'yargs';
import { TargetFactory } from '../../lib/infra/factories/TargetFactory';
import { GenerateHelper } from '../../lib/infra/helpers/GenerateHelper';
import { CreateEventSpinnerAsync } from '../../lib/infra/wrappers/OraChalkWrapper';
import { HandleCommandAsync } from '../../lib/infra/wrappers/YargsWrapper';

interface GenerateArgs {
	profile: string;
	target: string;
}

export const GenerateCmd: CommandModule<{}, GenerateArgs> = {
	command: 'generate [target]',

	builder: args => args.help()
		.option('profile', {
			type: 'string',
			default: 'stable'
		})
		.positional('target', {
			type: 'string',
			default: `${process.cwd()}/types/minecraft`
		}),

	handler: HandleCommandAsync('build', ({ args }) => CreateEventSpinnerAsync(async writeLine => {
		const target = TargetFactory.Create(args.target, args.profile);
		writeLine('using jar: %s', target.Profile.JarPath);

		const generator = await GenerateHelper.CreateAsync(target, args.target);
		await generator.GenerateNameFilesAsync((name, count) => writeLine('found %s items for %s', count, name));
		await generator.GenerateBuilderFilesAsync(name => writeLine('builder %s generated', name));
		await generator.GenerateIndexFileAsync(() => writeLine('generating index file'));
		writeLine('finished, see %s', args.target);
	}))
};
