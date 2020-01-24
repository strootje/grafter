import { debug } from 'debug';
import { sync as FastGlob } from 'fast-glob';
import { resolve } from 'path';
import { SourceReader } from './domain/core/SourceReader';
import { SourceWatcher } from './domain/core/SourceWatcher';
import { WriteToArchive } from './domain/core/WriteToArchive';
import { WriteToFolder } from './domain/core/WriteToFolder';
import { Packable } from './domain/Packable';
import { Targetable } from './domain/Targetable';
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

	public BuildAsync(): Promise<void> {
		logger('building packs');

		return this.HandlePackAsync(pack => {
			const source = new SourceReader(pack);
			const writer = new WriteToFolder(this.target, pack);
			source.pipe(writer);

			return source.ProcessFilesAsync();
		});
	}

	public ServeAsync(): Promise<void> {
		logger('serving packs');

		return this.HandlePackAsync(pack => {
			const source = new SourceWatcher(pack);
			const writer = new WriteToFolder(this.target, pack);
			source.pipe(writer);

			return source.ProcessFilesAsync();
		});
	}

	public PackAsync(): Promise<void> {
		logger('packing packs');

		return this.HandlePackAsync(pack => {
			const source = new SourceReader(pack);
			const writer = new WriteToArchive(this.target, pack);
			source.pipe(writer);

			return source.ProcessFilesAsync();
		});
	}

	private HandlePackAsync(predicate: HandlePackPredicate): Promise<void> {
		const tasks = this.Packs.map(predicate);
		return Promise.all(tasks).then(() => { });
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

			const packs = packFolders.map(packFolder => {
				const packFolderPath = resolve(this.rootFolder, packFolder);

				const pack = PackFactory.Create(packFolderPath);
				logger('searching for packs in `%s` - found', packFolderPath);
				return pack;
			});

			return packs;
		});
	}
}
