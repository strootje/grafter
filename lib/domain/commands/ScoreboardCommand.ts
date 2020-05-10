import { Command } from "../Command";

export class ScoreboardCommand extends Command {
	constructor(
		private readonly args: string[]
	) {
		super('scoreboard');
	}

	public get Args(): string[] { return this.args; }
}
