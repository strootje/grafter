import { red } from 'chalk';
import { Argv } from 'yargs';
import { Pack } from '../../lib/domain/Pack';
import { Target } from '../../lib/domain/Target';
import { WriterBuilder, WriterType } from '../../lib/domain/Writer';
import { TargetFactory } from '../../lib/infra/factories/TargetFactory';
import { WriterFactory } from '../../lib/infra/factories/WriterFactory';
import { PackHelper } from '../../lib/infra/helpers/PackHelper';
import { DebugChalkLogger } from '../../lib/infra/wrappers/DebugChalkWrapper';
import { CreateEventSpinnerAsync } from '../../lib/infra/wrappers/OraChalkWrapper';
import { CommandHandler, CommandHandlerCallback, CommandHandlerCallbackParams, HandleCommandAsync } from '../../lib/infra/wrappers/YargsWrapper';

export interface BaseArgs {
	profile: string;
	target: string;
	source: string;
}

export function ParseBaseArgs(args: Argv<{}>): Argv<BaseArgs> {
	return args.help()
		.option('profile', {
			type: 'string',
			default: 'stable'
		})
		.positional('target', {
			type: 'string',
			default: `${process.cwd()}/dist`
		})
		.positional('source', {
			type: 'string',
			default: `${process.cwd()}/src`
		});
}

export interface PackCommandHandlerCallback extends CommandHandlerCallback<PackCommandHandlerCallbackParams> {
}

export interface PackCommandHandlerCallbackParams extends CommandHandlerCallbackParams<BaseArgs> {
	writeLine: DebugChalkLogger;
	pack: Pack;
	target: Target;
	writer: WriterBuilder;
}

export function HandlePackCommandAsync(namespace: string, output: WriterType, callback: PackCommandHandlerCallback): CommandHandler<BaseArgs> {
	return HandleCommandAsync(namespace, ({ args, logger }) => CreateEventSpinnerAsync(async writeLine => {
		const target = TargetFactory.Create(args.target, args.profile);

		await PackHelper.HandlePacksAsync(target.Profile, args.source, async pack => {
			pack.on('error', err => writeLine(`${red('Error')}: %s`, err.message));

			await WriterFactory.CreateAsync(output, target, pack, async writer => {
				pack.on('update', ({ file }) => {
					writeLine('updating %s:%s/%s', file.Namespace, file.Type, file.Name);
					writer.Add(file.Filename, file.Content);
				});

				pack.on('delete', ({ filename }) => {
					writeLine('deleting %s', filename);
					writer.Delete(filename);
				});

				return callback({ args, logger, writeLine, pack, target, writer });
			});
		});
	}));
}
