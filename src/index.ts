import * as Yargs from 'yargs';
import { BuildCmd } from './cmds/BuildCmd';
import { PackCmd } from './cmds/PackCmd';
import { ServeCmd } from './cmds/ServeCmd';

export const argv = Yargs
	.scriptName('grafter')
	.command(BuildCmd)
	.command(ServeCmd)
	.command(PackCmd)
	.demandCommand()
	.help().argv;
