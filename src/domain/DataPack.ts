import { FileFactory } from '../infra/factories/FileFactory';
import { ListOfFiles, Pack } from './Pack';

export interface DataFiles {
	functions: ListOfFiles<string>;
}

export class DataPack extends Pack {
	protected ReceiveFileAdd(filename: string): void {
		const file = FileFactory.CreateFromFile(this.Folder, filename);

		this.OutputFileAdd(filename, file);
		file.SubFiles.forEach(file => this.OutputFileAdd(filename, file));
	}

	protected ReceiveFileDelete(filename: string): void {
		this.OutputFileDelete(filename);
	}

	protected Validate(): boolean {
		return true;
	}
}
