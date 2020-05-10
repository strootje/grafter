import * as Yargs from 'yargs';
import { BuildCmd } from './cmds/BuildCmd';
import { GenerateCmd } from './cmds/GenerateCmd';
import { PackCmd } from './cmds/PackCmd';
import { ServeCmd } from './cmds/ServeCmd';

export const argv = Yargs
	.scriptName('grafter')
	.command(GenerateCmd)
	.command(BuildCmd)
	.command(ServeCmd)
	.command(PackCmd)
	.demandCommand()
	.help().argv;
