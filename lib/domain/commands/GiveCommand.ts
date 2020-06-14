import { ItemIdTyping } from "../../../dist/lib/types/minecraft/Names";
import { Command } from "../Command";

export class GiveCommand extends Command {
	constructor(
		private readonly player: string,
		private readonly item: ItemIdTyping,
		private readonly nbt: {},
		private readonly args: string[]
	) {
		super('give');
	}

	public get Args(): string[] { return [this.player, `${this.item}${JSON.stringify(this.nbt)}`, ...this.args]; }
}
