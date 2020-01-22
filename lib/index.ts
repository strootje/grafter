import { debug } from 'debug';
import { sync as FastGlob } from 'fast-glob';
import { resolve } from 'path';
import { Packable } from './domain/Packable';
import { SourceReader } from './domain/SourceReader';
import { SourceWatcher } from './domain/SourceWatcher';
import { Targetable } from './domain/Targetable';
import { WriteToArchive } from './domain/WriteToArchive';
import { WriteToFolder } from './domain/WriteToFolder';
import { PackFactory } from './factories/PackFactory';
import { CacheHelper } from './helpers/CacheHelper';

export interface GraftOpts {
	rootFolder: string;
	target: Targetable;
}

type HandlePackPredicate = (pack: Packable) => Promise<void>;

const logger = debug('graft:lib:Graft');
export class Graft {
	protected readonly rootFolder: string;
	protected readonly target: Targetable;

	constructor(opts: GraftOpts) {
		this.rootFolder = opts.rootFolder;
		this.target = opts.target;
	}

	public async BuildAsync(): Promise<void> {
		logger('building packs');

		return this.HandlePackAsync(pack => {
			const writer = new WriteToFolder(this.target, pack);
			const source = new SourceReader(pack, writer);

			return source.ProcessFilesAsync();
		});
	}

	public ServeAsync(): Promise<void> {
		logger('serving packs');

		return this.HandlePackAsync(pack => {
			const writer = new WriteToFolder(this.target, pack);
			const source = new SourceWatcher(pack, writer);

			return source.ProcessFilesAsync();
		});
	}

	public PackAsync(): Promise<void> {
		logger('packing packs');

		return this.HandlePackAsync(pack => {
			const writer = new WriteToArchive(this.target, pack);
			const source = new SourceReader(pack, writer);

			return source.ProcessFilesAsync();
		});
	}

	private HandlePackAsync(predicate: HandlePackPredicate): Promise<void> {
		const tasks: Promise<void>[] = [];
		for (const key in this.Packs) {
			const pack = this.Packs[key];
			tasks.push(predicate(pack));
		}

		return Promise.all(tasks)
			.then(() => logger('-- finished --'));
	}

	private get Packs(): Packable[] {
		return CacheHelper.Get(`packs`, () => {
			const folder = resolve(this.rootFolder);
			logger('searching for packs in `%s`', folder);

			const packFolders = FastGlob(['**/assets', '**/data'], {
				cwd: folder,
				onlyDirectories: true,
				ignore: ['**/dist', '**/graft', '**/node_modules']
			});

			const packs: Packable[] = [];
			for (const key in packFolders) {
				const packFolder = packFolders[key];
				const packFolderPath = resolve(this.rootFolder, packFolder);

				const pack = PackFactory.Create(packFolderPath);
				logger('searching for packs in `%s` - found', packFolderPath);
				packs.push(pack);
			}

			return packs;
		});
	}
}
