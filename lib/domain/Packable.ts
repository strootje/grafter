import { Manifest } from './pack/Manifest';

export type PackType = 'assets' | 'data';

export abstract class Packable {
	protected readonly manifest: Manifest;

	constructor(
		private readonly name: string,
		private readonly type: PackType,
		private readonly folder: string
	) {
		this.manifest = new Manifest(5, this.name);
	}

	public get Name(): string {
		return this.name;
	}

	public get Type(): PackType {
		return this.type;
	}

	public get Folder(): string {
		return this.folder;
	}
}
