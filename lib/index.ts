import { debug } from 'debug';
import { sync as FastGlob } from 'fast-glob';
import { resolve } from 'path';
import { ReadContinues } from './domain/core/ReadContinues';
import { ReadOnce } from './domain/core/ReadOnce';
import { WriteToArchive } from './domain/core/WriteToArchive';
import { WriteToFolder } from './domain/core/WriteToFolder';
import { Packable } from './domain/Packable';
import { Targetable } from './domain/Targetable';
import { PackFactory } from './factories/PackFactory';
import { CacheHelper } from './helpers/CacheHelper';

export interface GrafterOpts {
	rootFolder: string;
	target: Targetable;
}

type HandlePackPredicate = (pack: Packable) => Promise<void>;

const logger = debug('grafter:lib:Grafter');
export class Grafter {
	protected readonly rootFolder: string;
	protected readonly target: Targetable;

	constructor(opts: GrafterOpts) {
		this.rootFolder = opts.rootFolder;
		this.target = opts.target;
	}

	public BuildAsync(): Promise<void> {
		logger('building packs');

		return this.HandlePackAsync(pack => {
			const reader = new ReadOnce(pack);
			const writer = new WriteToFolder(this.target, pack);
			reader.pipe(writer);

			return reader.ProcessFilesAsync();
		});
	}

	public ServeAsync(): Promise<void> {
		logger('serving packs');

		return this.HandlePackAsync(pack => {
			const reader = new ReadContinues(pack);
			const writer = new WriteToFolder(this.target, pack);
			reader.pipe(writer);

			return reader.ProcessFilesAsync();
		});
	}

	public PackAsync(): Promise<void> {
		logger('packing packs');

		return this.HandlePackAsync(pack => {
			const reader = new ReadOnce(pack);
			const writer = new WriteToArchive(this.target, pack);
			reader.pipe(writer);

			return reader.ProcessFilesAsync();
		});
	}

	private async HandlePackAsync(predicate: HandlePackPredicate): Promise<void> {
		const tasks = this.Packs.map(predicate);
		await Promise.all(tasks);
	}

	private get Packs(): Packable[] {
		return CacheHelper.Get(`packs`, () => {
			const folder = resolve(this.rootFolder);
			logger('searching for packs in `%s`', folder);

			const packFolders = FastGlob(['**/assets', '**/data'], {
				cwd: folder,
				onlyDirectories: true,
				ignore: ['**/dist', '**/grafter', '**/node_modules']
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
