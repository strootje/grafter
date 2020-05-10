import { ListOfFiles, Pack } from './Pack';

export interface DataFiles {
	functions: ListOfFiles<string>;
}

export class DataPack extends Pack {
	protected Validate(): boolean {
		return true;
	}
}
