import { Profile } from './Profile';

export class World {

	constructor(
		private readonly name: string,
		private readonly profile: Profile,
		private readonly folder: string
	) {
	}

	public get Name(): string {
		return this.name;
	}

	public get Profile(): Profile {
		return this.profile;
	}

	public get Folder(): string {
		return this.folder;
	}
}
