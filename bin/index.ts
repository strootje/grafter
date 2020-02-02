#!/usr/bin/env ts-node

import { resolve } from 'path';
import * as Yargs from 'yargs';
import { Grafter } from '../lib';
import { ArgsHelper } from '../lib/helpers/ArgsHelper';

const setup = (builder: Yargs.Argv) => builder
	.option('profile', { type: 'string', default: 'stable' })
	.option('merge', { type: 'boolean', default: false })
	.positional('target', { type: 'string', default: resolve('.', 'dist') })
	.positional('source', { type: 'string', default: resolve('.') })
	.check(ArgsHelper.CheckForValidProfile);

Yargs.command('build [target] [source]', 'Build the pack', setup, ArgsHelper.Coerce(args => {
	const grafter = new Grafter({
		source: args.source,
		target: args.target,
		merge: args.merge
	});

	return grafter.BuildAsync();
}));

Yargs.command('serve [target] [source]', 'Builds the pack and watch for changes', setup, ArgsHelper.Coerce(args => {
	const grafter = new Grafter({
		source: args.source,
		target: args.target,
		merge: args.merge
	});

	return grafter.ServeAsync();
}));

Yargs.command('pack [target] [source]', 'Builds the pack and creates an archive', setup, ArgsHelper.Coerce(args => {
	const grafter = new Grafter({
		source: args.source,
		target: args.target,
		merge: args.merge
	});

	return grafter.PackAsync();
}));

Yargs.parse();
