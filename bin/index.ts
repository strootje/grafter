#!/usr/bin/env node

import { resolve } from 'path';
import * as Yargs from 'yargs';
import { Graft } from '../lib';
import { ArgsHelper } from '../lib/helpers/ArgsHelper';

const setup = (builder: Yargs.Argv) => builder
	.option('profile', { type: 'string', default: 'stable' })
	.positional('target', { type: 'string', default: resolve('.', 'dist') })
	.positional('source', { type: 'string', default: resolve('.') })
	.check(ArgsHelper.CheckForValidProfile);

Yargs.command('build [target] [source]', 'Build the pack', setup, ArgsHelper.Coerce(args => {
	const graft = new Graft({
		rootFolder: args.source,
		target: args.target
	});

	return graft.BuildAsync();
}));

Yargs.command('serve [target] [source]', 'Builds the pack and watch for changes', setup, ArgsHelper.Coerce(args => {
	const graft = new Graft({
		rootFolder: args.source,
		target: args.target
	});

	return graft.ServeAsync();
}));

Yargs.command('pack [target] [source]', 'Builds the pack and creates an archive', setup, ArgsHelper.Coerce(args => {
	const graft = new Graft({
		rootFolder: args.source,
		target: args.target
	});

	return graft.PackAsync();
}));

Yargs.parse();
