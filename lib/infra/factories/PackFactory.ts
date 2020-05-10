import { WatchOptions } from 'chokidar';
import { sep } from 'path';
import { DataPack } from '../../domain/DataPack';
import { InvalidPackNameError, InvalidPackTypeError } from '../../domain/errors';
import { Profile } from '../../domain/minecraft/Profile';
import { Pack, PackType } from '../../domain/Pack';
import { ResourcePack } from '../../domain/ResourcePack';

export class PackFactory {
	private static readonly ignored: string[] = ['src', 'dist'];

	public static Create(profile: Profile, folder: string): Pack {
		const [packName, packType] = this.ParsePackNameAndType(folder);

		const opts: WatchOptions = {
		};

		switch (packType) {
			case 'assets': return new ResourcePack(packType, packName, profile, folder, opts);
			case 'data': return new DataPack(packType, packName, profile, folder, opts);
			default: throw new InvalidPackTypeError(packType);
		}
	}

	private static ParsePackNameAndType(folder: string): [string, PackType] {
		const parts = folder.split(sep).join('/').split('/').reverse();

		const packType = parts.shift() as PackType;

		while (parts.length > 0) {
			const packName = parts.shift() as string;

			if (this.ignored.indexOf(packName) < 0) {
				return [packName, packType];
			}
		}

		throw new InvalidPackNameError(folder);
	}
}
