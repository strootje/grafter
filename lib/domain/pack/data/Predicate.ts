import { Changeable } from '../../Changeable';
import { SourceAttributes } from '../../Sourceable';

export interface PredicateJson {
	values: string[];
}

export class Predicate extends Changeable {
	protected ParseMatter(data: SourceAttributes): void {
		this.logger('data: %o', data);
	}
}
