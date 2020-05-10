import { CommandModule } from 'yargs';
import { BaseArgs, HandlePackCommandAsync, ParseBaseArgs } from './BaseCmd';

export const ServeCmd: CommandModule<{}, BaseArgs> = {
	command: 'serve [target] [source]',
	builder: args => ParseBaseArgs(args),
	handler: HandlePackCommandAsync('serve', 'folder', ({ writeLine, pack }) => new Promise(() => {
		writeLine('found %s', pack.Name);
	}))
};
