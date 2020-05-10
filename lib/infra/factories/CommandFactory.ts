import { Command, CommandName } from '../../domain/Command';
import { DebugCommand, GenericCommand, SayCommand } from '../../domain/commands';
import { ScoreboardCommand } from '../../domain/commands/ScoreboardCommand';

export class CommandFactory {
	public static Parse(line: string): Command {
		const parts = line.split(' ');

		const name = parts.shift();
		switch (name) {
			case 'debug': return new DebugCommand(parts);
			case 'say': return new SayCommand(parts);
			case 'scoreboard': return new ScoreboardCommand(parts);
			default: return new GenericCommand((name as CommandName), parts);
		}
	}

	public static ParseAll(lines: string[]): Command[] {
		lines = lines.filter(p => p != '' && !p.startsWith('#'));
		return lines.map(p => this.Parse(p));
	}
}
