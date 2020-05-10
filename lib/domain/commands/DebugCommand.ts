import { SayCommand } from './SayCommand';

export class DebugCommand extends SayCommand {
	constructor(args: string[]) {
		super(args);
	}

	public get CommandText(): string {
		return `#${super.CommandText}`;
	}
}
