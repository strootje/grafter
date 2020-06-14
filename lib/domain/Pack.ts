import { FSWatcher, watch as Chokidar, WatchOptions } from 'chokidar';
import { EventEmitter } from 'events';
import { FileFactory } from '../infra/factories/FileFactory';
import { JarHelper } from '../infra/helpers/JarHelper';
import { File } from './File';
import { MergedFile } from './files';
import { Profile } from './minecraft/Profile';
import { Manifest } from './pack/Manifest';

export interface ListOfFiles<T> {
	[name: string]: Readonly<T>;
}

export type PackType = 'assets' | 'data';

export interface FileEvent {
	filename: string;
	file: File;
}

export abstract class Pack extends EventEmitter {
	protected readonly files: MergedFile[];
	private readonly manifest: Manifest;
	private readonly watcher: FSWatcher;
	private isReady: boolean = false;

	constructor(
		private readonly type: PackType,
		private readonly name: string,
		private readonly profile: Profile,
		private readonly folder: string,
		opts: WatchOptions
	) {
		super();

		this.files = [];
		this.manifest = new Manifest(5, this.Name);
		this.watcher = Chokidar('**/*', {
			...opts, cwd: folder
		});

		this.watcher.on('error', err => this.emit('error', err));
		this.watcher.on('ready', () => {
			this.isReady = true;
			this.TryValidate();
			this.emit('ready');
		});

		this.watcher.on('add', async (filename: string) => {
			await this.HandleFileAddedAsync(filename);
			this.TryValidate();
		});

		this.watcher.on('unlink', async (filename: string) => {
			await this.HandleFileDeletedAsync(filename);
			this.TryValidate();
		});

		this.watcher.on('change', async filename => {
			await this.HandleFileDeletedAsync(filename);
			await this.HandleFileAddedAsync(filename);
			this.TryValidate();
		});
	}

	public get Type(): PackType { return this.type; }
	public get Name(): string { return this.name; }
	public get Folder(): string { return this.folder; }
	public get Manifest(): Manifest { return this.manifest; }

	public on(event: 'ready', listener: () => void): this;
	public on(event: 'error', listener: (error: Error) => void): this;
	public on(event: 'update', listener: (args: FileEvent) => void): this;
	public on(event: 'delete', listener: (args: Omit<FileEvent, 'file'>) => void): this;
	public on(event: string, listener: (args?: any) => void): this {
		return super.on(event, listener);
	}

	public emit(event: 'ready'): boolean;
	public emit(event: 'error', args: Error): boolean;
	public emit(event: 'update', args: FileEvent): boolean;
	public emit(event: 'delete', args: Omit<FileEvent, 'file'>): boolean;
	public emit(event: string, args?: any): boolean {
		return super.emit(event, args);
	}

	public close(): Promise<void> {
		return this.watcher.close();
	}

	protected abstract Validate(): boolean;
	private TryValidate(): void {
		if (this.isReady && !this.Validate()) {
			this.emit('error', new Error('validation error'));
		}
	}

	private async HandleFileAddedAsync(filename: string): Promise<void> {
		const jarHelper = await JarHelper.CreateAsync(this.type, this.profile);
		try {
			const files = await FileFactory.CreateFromFileAsync(jarHelper, this.Folder, filename);

			for (const file of files) {
				this.OutputFileAdd(filename, file);
			}
		} catch (err) {
			this.emit('error', new Error(`failed to parse ${filename}\n${err.message}`));
		}
	}

	private HandleFileDeletedAsync(filename: string): Promise<void> {
		this.OutputFileDelete(filename);
		return Promise.resolve();
	}

	protected OutputFileAdd(filename: string, file: File): void {
		let merged = this.files.find(p => p.Type === file.Type && p.Filename === file.Filename);

		if (!merged) {
			merged = new MergedFile(filename, file);
			this.files.push(merged);
		} else {
			merged.AddSource(filename, file);
		}

		this.emit('update', { filename, file: merged });
	}

	protected OutputFileDelete(filename: string): void {
		this.files.forEach(p => {
			if (p.ContainsSource(filename)) {
				if (p.DeleteSource(filename)) {
					this.emit('delete', { filename: p.Filename });
				} else {
					this.emit('update', { filename: p.Filename, file: p });
				}
			}
		});
	}
}
