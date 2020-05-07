import { CommandModule } from 'yargs';
import { BaseArgs, HandlePackCommandAsync, ParseBaseArgs } from './BaseCmd';

export const PackCmd: CommandModule<{}, BaseArgs> = {
	command: 'pack [target] [source]',
	builder: args => ParseBaseArgs(args),
	handler: HandlePackCommandAsync('pack', 'archive', ({ writeLine, pack }) => new Promise(done => {
		writeLine('found %s', pack.Name);
		pack.on('ready', () => pack.close().finally(done));
	}))
};
