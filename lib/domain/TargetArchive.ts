import { Profile } from './minecraft/Profile';
import { Manifest } from './pack/Manifest';
import { Targetable, TargetBuilder } from './Targetable';

export class TargetArchive extends Targetable {
	public constructor(
		profile: Profile,
		folder: string
	) {
		super(profile, folder)
	}

	public CreateAsync(manifest: Manifest, predicate: (builder: TargetBuilder) => Promise<void>): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
