import { Profile } from './minecraft/Profile';
import { Manifest } from './pack/Manifest';

type TargetCreatorPredicate = (builder: TargetBuilder) => Promise<void>;

export interface TargetCreator {
	CreateAsync(manifest: Manifest, predicate: TargetCreatorPredicate): Promise<void>;
}

export interface TargetBuilder {
	AddOrUpdateAsync(): Promise<void>;
	RemoveAsync(): Promise<void>;
}

export abstract class Targetable implements TargetCreator {
	constructor(
		private readonly profile: Profile,
		private readonly folder: string
	) {
	}

	public abstract CreateAsync(manifest: Manifest, predicate: TargetCreatorPredicate): Promise<void>;

	public get Profile(): Profile {
		return this.profile;
	}

	public get Folder(): string {
		return this.folder;
	}
}
