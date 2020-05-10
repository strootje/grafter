import { ProfilesJsonProfileType } from '../../../types/ProfilesJson';
import { MinecraftHelper } from '../../infra/helpers/MinecraftHelper';
import { World } from './World';

export class Profile {
	constructor(
		private readonly name: string,
		private readonly type: ProfilesJsonProfileType,
		private readonly folder: string,
		private readonly jarPath: string
	) {
	}

	public get Name(): string {
		if (this.type === 'latest-release') {
			return 'stable';
		} else if (this.type === 'latest-snapshot') {
			return 'snapshot';
		} else {
			return this.name;
		}
	}

	public get Folder(): string {
		return this.folder;
	}

	public get JarPath(): string {
		return this.jarPath
	}

	public get Worlds(): World[] {
		return MinecraftHelper.GetWorldsForProfile(this);
	}
}
