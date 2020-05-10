import { sync as FastGlob } from 'fast-glob';
import { resolve } from 'path';
import { Profile } from '../../domain/minecraft/Profile';
import { Pack } from '../../domain/Pack';
import { PackFactory } from '../factories/PackFactory';
import { CreateLogger } from '../wrappers/DebugChalkWrapper';
import { CacheHelper } from './CacheHelper';
const logger = CreateLogger('helpers:PackHelper');

export interface HandlePackCallback {
	(pack: Pack): Promise<void>
}

export class PackHelper {
	public static async HandlePacksAsync(profile: Profile, source: string, callback: HandlePackCallback): Promise<void> {
		const promises = this.GetPacks(profile, source).map(callback);
		await Promise.all(promises);
	}

	private static GetPacks(profile: Profile, source: string): Pack[] {
		return CacheHelper.Get(`packs`, () => {
			const folder = resolve(source);
			logger('searching for packs in `%s`', folder);

			const packFolders = FastGlob(['**/assets', '**/data'], {
				cwd: folder,
				onlyDirectories: true,
				ignore: ['**/dist', '**/grafter', '**/node_modules']
			});

			const packs = packFolders.map(packFolder => {
				const packFolderPath = resolve(source, packFolder);

				const pack = PackFactory.Create(profile, packFolderPath);
				logger('searching for packs in `%s` - found', packFolderPath);
				return pack;
			});

			return packs;
		});
	}
}
