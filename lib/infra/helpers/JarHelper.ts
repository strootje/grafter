import { basename, dirname, join } from 'path';
import { File, Open as Unzipper } from 'unzipper';
import { FileType } from '../../domain/File';
import { Profile } from '../../domain/minecraft/Profile';
import { PackType } from '../../domain/Pack';

export class JarHelper {
	private constructor(
		private readonly packtype: PackType,
		private readonly files: File[]
	) {
	}

	public static async CreateAsync(packtype: PackType, profile: Profile): Promise<JarHelper> {
		const directory = await Unzipper.file(profile.JarPath);
		return new JarHelper(packtype, directory.files);
	}

	public FindFilesAsync<T extends {}>(filetype: FileType, filename: string): Promise<{ [key: string]: T }> {
		const path = join(this.packtype, 'minecraft', filetype, filename);
		const folder = dirname(path);

		return this.files.filter(p => p.path.startsWith(folder) && basename(p.path).indexOf(basename(filename)) >= 0)
			.map(async p => ({ [p.path]: JSON.parse((await p.buffer()).toString()) as T }))
			.reduce(async (prev, cur) => ({ ...(await prev), ...(await cur) }), Promise.resolve({}));
	}
}
