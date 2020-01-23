import { writeFile } from 'fs';
import * as Mkdirp from 'mkdirp';
import { resolve } from 'path';
import { Writeable, WriteableBuilder, WriteableBuilderPredicate } from '../Writeable';

export class WriteToFolder extends Writeable implements WriteableBuilder {
	public CreateAsync(predicate: WriteableBuilderPredicate): Promise<void> {
		return new Promise((done, fatal) => {
			const basepath = resolve(this.pack.Type === 'assets' ? this.target.FolderAssets : this.target.FolderData, this.pack.Name);
			const typedpath = resolve(basepath, this.pack.Type);

			Mkdirp(typedpath, err => {
				if (err) {
					fatal(err);
					return;
				}

				const manifestpath = resolve(basepath, 'pack.mcmeta');
				writeFile(manifestpath, JSON.stringify(this.pack.Manifest), err => {
					if (err) {
						fatal(err);
						return;
					}

					done(predicate(this));
				});
			});
		});
	}

	public AddAsync(_path: string, _content: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	public RemoveAsync(_path: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
