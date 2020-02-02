import { Sourceable, SourceAttributes } from '../Sourceable';

export class SourceJson extends Sourceable<{}> {
	public get Attributes(): SourceAttributes {
		return {};
	}

	public get Content(): {} {
		return {
			test: 1
		};
	}
}
