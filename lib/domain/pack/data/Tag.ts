import { Mergeable, Watchable } from '../../Watchable';

export interface TagJson {
	values: string[];
}

export class Tag extends Watchable implements Mergeable<TagJson> {
	public get Content(): TagJson {
		return { values: [] };
	}

	MergeWith(_json: TagJson): void {
		throw new Error("Method not implemented.");
	}
}
