import { ListOfFiles, Pack } from './Pack';

export interface ResourceFiles {
	models: ListOfFiles<string>
}

export class ResourcePack extends Pack {
	protected ReceiveFileAdd(): void {
	}

	protected ReceiveFileDelete(): void {
	}

	protected Validate(): boolean {
		return true;
	}
}
