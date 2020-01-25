import { join } from 'path';
import { Changeable } from '../../Changeable';
import { SourceAttributes } from '../../Sourceable';

export class Function extends Changeable {
	private tag: string | null;

	protected ParseMatter(data: SourceAttributes): void {
		this.ParseTag(data);
	}

	private ParseTag(data: SourceAttributes): void {
		const tag = data.tag || this.tag;
		if (!tag) {
			return;
		}

		const [tagnamespace, tagname] = tag.split(':');
		const tagpath = join(tagnamespace, 'tags', this.Type, `${tagname}.json`);

		if (!!data.tag) {
			this.tag = tag as string;
			this.Changed$.next({ source: this.Filepath, filepath: tagpath });
			this.tag = data.tag;
		} else {
			if (this.tag) {
				this.Removed$.next({ source: this.Filepath, filepath: tagpath });
				this.tag = null;
			}
		}
	}
}
