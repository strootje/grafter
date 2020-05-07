import { Changeable } from '../../Changeable';
import { SourceAttributes } from '../../Sourceable';

export interface LootTableJson {
	values: string[];
}

export class LootTable extends Changeable {
	protected ParseMatter(data: SourceAttributes): void {
		this.logger('data: %o', data);
	}
}
