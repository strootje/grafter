import { Profile } from '../minecraft/Profile';
import { Targetable } from '../Targetable';

export class TargetFolder extends Targetable {
	constructor(
		profile: Profile,
		folder: string
	) {
		super(profile, folder, folder)
	}
}
