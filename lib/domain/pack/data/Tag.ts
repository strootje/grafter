import { Changeable } from '../../Changeable';
import { SourceAttributes } from '../../Sourceable';

export interface TagJson {
	values: string[];
}

export class Tag extends Changeable {
	protected ParseMatter(data: SourceAttributes): void {
		this.logger('data: %o', data);
	}
}
