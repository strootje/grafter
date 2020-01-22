import { ManifestJson, ManifestJsonPackFormat } from '../../../types/ManifestJson';

export class Manifest {
	constructor(
		private readonly version: ManifestJsonPackFormat,
		private readonly description: string
	) {
	}

	public get Version(): ManifestJsonPackFormat {
		return this.version;
	}

	public get Description(): string {
		return this.description;
	}

	public toJSON(): ManifestJson {
		return {
			pack: {
				pack_format: 5,
				description: this.Description
			}
		};
	}
}
