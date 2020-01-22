import { debug } from 'debug';
import { sync as FastGlob } from 'fast-glob';
import { resolve } from 'path';
import { Packable } from './domain/Packable';
import { Targetable } from './domain/Targetable';
import { PackFactory } from './factories/PackFactory';
import { CacheHelper } from './helpers/CacheHelper';

export interface GraftOpts {
	sourceFolder: string;
	target: Targetable;
}

const logger = debug('graft:lib:Graft');
export class Graft {
	protected readonly sourceFolder: string;
	protected readonly target: Targetable;

	constructor(opts: GraftOpts) {
		this.sourceFolder = opts.sourceFolder;
		this.target = opts.target;
	}

	public async BuildAsync(): Promise<void> {
		console.log(this.Packs);
	}

	public async ServeAsync(): Promise<void> {
	}

	public async PackAsync(): Promise<void> {
	}

	private get Packs(): Packable[] {
		return CacheHelper.Get(`packs`, () => {
			const folder = resolve(this.sourceFolder);
			logger('searching for packs in `%s`', folder);

			const packFolders = FastGlob(['**/assets', '**/data'], {
				cwd: folder,
				onlyDirectories: true,
				ignore: ['**/dist', '**/node_modules']
			});

			const packs: Packable[] = [];
			for (const key in packFolders) {
				const packFolder = packFolders[key];
				const packFolderPath = resolve(this.sourceFolder, packFolder);

				const pack = PackFactory.Create(packFolderPath);
				logger('searching for packs in `%s` - found %s', folder, pack.Name);
				packs.push(pack);
			}

			return packs;
		});
	}
}
