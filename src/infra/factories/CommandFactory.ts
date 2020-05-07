import { Command } from '../../domain/Command';
import { DebugCommand, GenericCommand, SayCommand } from '../../domain/commands';

export class CommandFactory {
	public static Parse(line: string): Command {
		const parts = line.split(' ');

		const name = parts.shift() as string;
		switch (name) {
			case 'debug': return new DebugCommand(parts);
			case 'say': return new SayCommand(parts);
			default: return new GenericCommand(name, parts);
		}
	}

	public static ParseAll(lines: string[]): Command[] {
		lines = lines.filter(p => p != '' && !p.startsWith('#'));
		return lines.map(p => this.Parse(p));
	}
}
