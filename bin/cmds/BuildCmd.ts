import { CommandModule } from 'yargs';
import { BaseArgs, HandlePackCommandAsync, ParseBaseArgs } from './BaseCmd';

export const BuildCmd: CommandModule<{}, BaseArgs> = {
	command: 'build [target] [source]',
	builder: args => ParseBaseArgs(args),
	handler: HandlePackCommandAsync('build', 'folder', ({ writeLine, pack }) => new Promise(done => {
		writeLine('found %s', pack.Name);
		pack.on('ready', () => pack.close().finally(done));
	}))
};
