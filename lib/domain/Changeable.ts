import { debug, Debugger } from 'debug';
import { join } from 'path';
import { MergeHelper } from '../helpers/MergeHelper';
import { Sourceable, SourceAttributes } from './Sourceable';
import { Trackable } from './Trackable';

export type FileType = 'functions' | 'tags';

export interface ListOfSources {
	[key: string]: Sourceable;
}

const logger = debug('graft:domain:Changeable');
export abstract class Changeable extends Trackable {
	protected readonly logger: Debugger;
	protected readonly mergables: ListOfSources;

	public constructor(
		private readonly source: Sourceable,
		private readonly namespace: string,
		private readonly type: FileType,
		private readonly filename: string
	) {
		super();
		this.logger = logger.extend(filename);
		this.mergables = {};
	}

	public get Namespace(): string {
		return this.namespace;
	}

	public get Type(): FileType {
		return this.type;
	}

	public get Filename(): string {
		return this.filename;
	}

	public get Filepath(): string {
		return join(this.Namespace, this.Type, this.Filename);
	}

	public get Basename(): string {
		return this.Filename.split('.')[0];
	}

	public get HasSources(): boolean {
		return Object.keys(this.mergables).length > 0;
	}

	public AddSource(filepath: string, source: Sourceable): void {
		this.RemoveSource(filepath);
		this.mergables[filepath] = source;
	}

	public RemoveSource(filepath: string): void {
		delete this.mergables[filepath];
	}

	public Update(): void {
		this.logger('updating');

		const { data, content } = this.source.Read();
		this.logger('orig content -->> %o', content);
		this.ParseMatter(data);

		const merged = Object.values(this.mergables)
			.map(source => source.Read().content)
			.reduce(MergeHelper.CreateReducer(this.source.TargetPath), content);

		this.logger('writing content `%s`', merged);
		this.source.Write(merged);
	}

	public Remove(): void {
		this.logger('removing');

		this.source.Remove();
	}

	protected abstract ParseMatter(data: SourceAttributes): void;
}
