import { Argv } from 'yargs';
import { Pack } from '../domain/Pack';
import { Target } from '../domain/Target';
import { WriterBuilder, WriterType } from '../domain/Writer';
import { TargetFactory } from '../infra/factories/TargetFactory';
import { WriterFactory } from '../infra/factories/WriterFactory';
import { PackHelper } from '../infra/helpers/PackHelper';
import { DebugChalkLogger } from '../infra/wrappers/DebugChalkWrapper';
import { CreateEventSpinnerAsync } from '../infra/wrappers/OraChalkWrapper';
import { CommandHandler, CommandHandlerCallback, CommandHandlerCallbackParams, HandleCommandAsync } from '../infra/wrappers/YargsWrapper';

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
		await PackHelper.HandlePacksAsync(args.source, async pack => {
			const target = TargetFactory.Create(args.target, args.profile);
			await WriterFactory.CreateAsync(output, target, pack, async writer => {
				pack.on('update', ({ file }) => {
					writeLine('updating %s:%s', file.Namespace, file.Name);
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
