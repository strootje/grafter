import { Writeable, WriteableBuilderPredicate } from './Writeable';

export class WriteToArchive extends Writeable {
	public CreateAsync(_predicate: WriteableBuilderPredicate): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
