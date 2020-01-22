import { Profile } from './minecraft/Profile';
import { Manifest } from './pack/Manifest';
import { Targetable, TargetBuilder } from './Targetable';
import { TargetArchive } from './TargetArchive';

export class TargetFolder extends Targetable {
	constructor(
		profile: Profile,
		folder: string
	) {
		super(profile, folder)
	}

	public ToArchive(): TargetArchive {
		return new TargetArchive(this.Profile, this.Folder)
	}

	public CreateAsync(manifest: Manifest, predicate: (builder: TargetBuilder) => Promise<void>): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
