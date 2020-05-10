import { ListOfFiles, Pack } from './Pack';

export interface ResourceFiles {
	models: ListOfFiles<string>
}

export class ResourcePack extends Pack {
	protected Validate(): boolean {
		return true;
	}
}
