export type ManifestJsonPackFormat = 5;
export interface ManifestV5JsonPack {
	pack_format: ManifestJsonPackFormat;
	description: string;
}

export interface ManifestJson {
	pack: ManifestV5JsonPack;
}
