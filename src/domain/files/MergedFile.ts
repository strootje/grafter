import { MergeHelper } from '../../infra/helpers/MergeHelper';
import { InvalidFileTypeError } from '../errors';
import { File } from '../File';

export interface ListOfFiles {
	[source: string]: File;
}

export class MergedFile extends File {
	private files: ListOfFiles;

	constructor(source: string, file: File) {
		super(file.Namespace, file.Type, file.Name);
		this.files = {};
		this.AddSource(source, file);
	}

	public get Length(): number { return Object.keys(this.files).length; }
	public get IsEmpty(): boolean { return this.Length <= 0; }

	public ContainsSource(source: string): boolean {
		return !!this.files[source];
	}

	public AddSource(source: string, file: File): void {
		if (!(file.Type === this.Type)) {
			throw new InvalidFileTypeError(file.Type);
		}

		this.files[source] = file;
	}

	public DeleteSource(source: string): boolean {
		delete this.files[source];
		return this.IsEmpty;
	}

	public get Content(): string {
		return Object.values(this.files)
			.sort((p1, p2) => p1.Weight - p2.Weight)
			.reduce(MergeHelper.CreateReducer(this.Type), '');
	}

	public get SubFiles(): File[] { return []; }
}
