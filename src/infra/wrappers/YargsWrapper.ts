import { red } from 'chalk';
import { Arguments } from 'yargs';
import { CreateLogger, DebugChalkLogger } from './DebugChalkWrapper';

export interface CommandHandler<ArgsType extends {}> {
	(args: Arguments<ArgsType>): Promise<void>;
}

export interface CommandHandlerCallback<CallbackParamsType extends {}> {
	(params: CallbackParamsType): Promise<void>;
}

export interface CommandHandlerCallbackParams<ArgsType extends {}> {
	args: Arguments<ArgsType>;
	logger: DebugChalkLogger;
}

export function HandleCommandAsync<ArgsType extends {}>(namespace: string, callbackAsync: CommandHandlerCallback<CommandHandlerCallbackParams<ArgsType>>): CommandHandler<ArgsType> {
	const logger = CreateLogger(`cmds:${namespace}`);

	return async (args: Arguments<ArgsType>): Promise<void> => {
		try {
			logger('command :: %s', 'start');
			await callbackAsync({ args, logger });
			logger('command :: %s', 'finish');
		} catch (err) {
			logger('command :: %s', 'error');

			if (process.env['DEBUG']) {
				throw err;
			}

			console.error(`${red('fatal')}: ${err.message}`);
			return;
		}
	};
}
