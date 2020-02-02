import { Sourceable, SourceAttributes } from '../Sourceable';

export class SourceString extends Sourceable<string> {
	public get Attributes(): SourceAttributes {
		return {};
	}

	public get Content(): string {
		return '';
	}
}
