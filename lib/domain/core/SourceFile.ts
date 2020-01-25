import { GrayMatterFile, read as GrayMatter } from 'gray-matter';
import { resolve } from 'path';
import { Sourceable } from '../Sourceable';

export class SourceFile extends Sourceable {
	private get SourcePath(): string {
		return resolve(this.pack.Folder, this.path);
	}

	public Read(): GrayMatterFile<string> {
		return GrayMatter(this.SourcePath);
	}
}
