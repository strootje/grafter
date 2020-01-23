import { sep } from 'path';
import { PackAssets } from '../domain/core/PackAssets';
import { PackData } from '../domain/core/PackData';
import { InvalidPackNameError } from '../domain/errors/InvalidPackNameError';
import { InvalidPackTypeError } from '../domain/errors/InvalidPackTypeError';
import { Packable, PackType } from '../domain/Packable';

export class PackFactory {
	private static readonly ignored: string[] = ['src', 'dist'];

	public static Create(folder: string): Packable {
		const [packName, packType] = this.ParsePackNameAndType(folder);

		switch (packType) {
			case 'assets': return new PackAssets(packName, folder);
			case 'data': return new PackData(packName, folder);
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
