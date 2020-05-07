import { Profile } from './minecraft/Profile';
import { Target } from './Target';

export class FolderTarget extends Target {
	constructor(
		profile: Profile,
		folder: string
	) {
		super(profile, folder, folder)
	}
}
