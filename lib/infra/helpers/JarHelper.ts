import { join } from 'path';
import { File, Open as Unzipper } from 'unzipper';
import { FileType } from '../../domain/File';
import { Profile } from '../../domain/minecraft/Profile';
import { PackType } from '../../domain/Pack';

export class JarHelpers {
	public static OpenAsync(profile: Profile): Promise<File[]> {
		return Unzipper.file(profile.JarPath).then(p => p.files);
	}

	public static async GetFilesAsync<T extends {}>(profile: Profile, packType: PackType, fileType: FileType, filename: string): Promise<T[]> {
		const path = join(packType, 'minecraft', fileType, filename);
		const files = await this.OpenAsync(profile);

		return files.filter(p => p.path === path)
			.map(async p => (await p.buffer()).toString())
			.map(async p => JSON.parse(await p) as T)
			.reduce(async (prev, cur) => [...(await prev), (await cur)], Promise.resolve([]));
	}
}
