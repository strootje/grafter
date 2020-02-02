import { Profile } from './minecraft/Profile';

export abstract class Targetable {
	constructor(
		private readonly name: string,
		private readonly profile: Profile,
		private readonly folderAssets: string,
		private readonly folderData: string
	) {
	}

	public get Name(): string {
		return this.name;
	}

	public get Profile(): Profile {
		return this.profile;
	}

	public get FolderAssets(): string {
		return this.folderAssets;
	}

	public get FolderData(): string {
		return this.folderData;
	}
}
