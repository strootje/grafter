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
import { ChangeTracker } from './helpers/ChangeTracker';

export interface GrafterOpts {
	source: string;
	target: Targetable;
	merge: boolean;
}

type HandlePackPredicate = (pack: Packable) => Promise<void>;

const logger = debug('grafter:lib:Grafter');
export class Grafter {
	protected readonly merge: boolean;
	protected readonly source: string;
	protected readonly target: Targetable;

	constructor(opts: GrafterOpts) {
		this.merge = opts.merge;
		this.source = opts.source;
		this.target = opts.target;
	}

	public BuildAsync(): Promise<void> {
		logger('building packs');

		return this.HandlePackAsync(pack => {
			const tracker = new ChangeTracker(pack, this.target);
			const writer = new WriteToFolder(pack, this.target);
			tracker.AddWriter(writer);

			const reader = new ReadOnce(pack);
			return tracker.ListenAsync(reader);
		});
	}

	public ServeAsync(): Promise<void> {
		logger('serving packs');

		return this.HandlePackAsync(pack => {
			const tracker = new ChangeTracker(pack, this.target);
			const writer = new WriteToFolder(pack, this.target);
			tracker.AddWriter(writer);

			const reader = new ReadContinues(pack);
			return tracker.ListenAsync(reader);
		});
	}

	public PackAsync(): Promise<void> {
		logger('packing packs');

		return this.HandlePackAsync(pack => {
			const tracker = new ChangeTracker(pack, this.target);
			const writer = new WriteToArchive(pack, this.target);
			tracker.AddWriter(writer);

			const reader = new ReadOnce(pack);
			return tracker.ListenAsync(reader);
		});
	}

	private async HandlePackAsync(predicate: HandlePackPredicate): Promise<void> {
		const tasks = this.Packs.map(predicate);
		await Promise.all(tasks);
	}

	private get Packs(): Packable[] {
		return CacheHelper.Get(`packs`, () => {
			const folder = resolve(this.source);
			logger('searching for packs in `%s`', folder);

			const packFolders = FastGlob(['**/assets', '**/data'], {
				cwd: folder,
				onlyDirectories: true,
				ignore: ['**/dist', '**/grafter', '**/minecraft', '**/node_modules']
			});

			const packs = packFolders.map(packFolder => {
				const packFolderPath = resolve(this.source, packFolder);

				const pack = PackFactory.Create(packFolderPath);
				logger('searching for packs in `%s` - found', packFolderPath);
				return pack;
			});

			return packs;
		});
	}
}
