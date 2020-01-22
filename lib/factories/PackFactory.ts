import { sep } from 'path';
import { InvalidPackNameError } from '../domain/errors/InvalidPackNameError';
import { InvalidPackTypeError } from '../domain/errors/InvalidPackTypeError';
import { Packable, PackType } from '../domain/Packable';
import { PackAssets } from '../domain/PackAssets';
import { PackData } from '../domain/PackData';

export class PackFactory {
	private static readonly test: string[] = ['src', 'dist'];

	public static Create(folder: string): Packable {
		const [packName, packType] = this.ParsePackNameAndType(folder);

		switch(packType) {
			default: throw new InvalidPackTypeError(packType);
			case 'assets': return new PackAssets(packName, folder);
			case 'data': return new PackData(packName, folder);
		}
	}

	private static ParsePackNameAndType(folder: string): [string, PackType] {
		const parts = folder.split(sep).join('/').split('/').reverse();

		const packType = parts.shift() as PackType;
		
		while (parts.length > 0) {
			const packName = parts.shift() as string;

			if (this.test.indexOf(packName) < 0) {
				return [packName, packType];
			}
		}

		throw new InvalidPackNameError(folder);
	}
}
