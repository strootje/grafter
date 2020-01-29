import { join } from 'path';
import { Changeable } from '../../Changeable';
import { SourceAttributes } from '../../Sourceable';

export class Function extends Changeable {
	private tag: string | null;

	protected ParseMatter(data: SourceAttributes): void {
		this.ParseTag(data);
	}

	protected ParseContent(content: string): string {
		const lines = content.replace('\r', '').split('\n');

		lines.forEach(line => {
			if (line.indexOf('#if ') >= 0) {

			}
		});

		return lines.join('\n');
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
			const funcname = this.Filename.split('.')[0];

			const tagvalue = JSON.stringify({
				values: [`${this.Namespace}:${funcname}`]
			});

			this.Changed$.next({ filepath: tagpath, source: this.Filepath, value: tagvalue });
			this.tag = data.tag;
		} else {
			if (this.tag) {
				this.Removed$.next({ filepath: tagpath, source: this.Filepath });
				this.tag = null;
			}
		}
	}
}
