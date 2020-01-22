#!/usr/bin/env ts-node

// import { ArgsHelper } from '../lib/helpers/ArgsHelper';
import { resolve } from 'path';
import * as Yargs from 'yargs';
import { ArgsHelper } from '../lib/helpers/ArgsHelper';
import { MinecraftHelper } from '../lib/helpers/MinecraftHelper';

const setup = (builder: Yargs.Argv) => builder
	.option('profile', { type: 'string', default: 'stable' })
	.positional('target', { type: 'string', default: resolve('.', 'dist') })
	.positional('source', { type: 'string', default: resolve('.') })
	.check(ArgsHelper.CheckForValidProfile);

Yargs.command('build [target] [source]', 'Build the pack', setup, args => {
	console.log(args, MinecraftHelper.Worlds);
});

Yargs.command('serve [target] [source]', 'Builds the pack and watch for changes', setup, _args => {
});

Yargs.command('pack [target] [source]', 'Builds the pack and creates an archive', setup, _args => {
});

Yargs.parse();
