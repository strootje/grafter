import { debug, Debugger } from 'debug';
import { join } from 'path';
import { ChangeTracker } from '../helpers/ChangeTracker';
import { Sourceable, SourceAttributes } from './Sourceable';
import { Trackable } from './Trackable';

export type FileType = 'functions' | 'tags';

const logger = debug('graft:domain:Changeable');
export abstract class Changeable extends Trackable {
	protected readonly logger: Debugger;

	public constructor(
		protected readonly source: Sourceable,
		protected readonly tracker: ChangeTracker,
		private readonly namespace: string,
		private readonly type: FileType,
		private readonly filename: string
	) {
		super();
		this.logger = logger.extend(filename);
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

	public Update(): void {
		this.logger('updating');
		const { data } = this.source.Read();
		this.ParseMatter(data);
	}

	public Remove(): void {
		this.logger('removing');
	}

	protected abstract ParseMatter(data: SourceAttributes): void;
}
