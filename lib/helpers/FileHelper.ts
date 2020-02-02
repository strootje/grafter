import { debug } from 'debug';
import { join, sep } from 'path';
import { PackType } from '../domain/Packable';
import { CacheHelper } from './CacheHelper';
import { JarHelper } from './JarHelper';

export type FileType = 'advancements' | 'functions' | 'loot_tables' | 'macros' | 'recipes' | 'tags';
export type FileExtension = 'mcfunction' | 'json';

export interface FileMeta {
	Namespace: string;
	Type: FileType;
	Name: string;
	Extension: FileExtension;
	IsFunction: boolean;
}

const logger = debug('grafter:helpers:File');
export class FileHelper {
	public static readonly ContentCacheKey = 'file-content';

	public static GetContentAsync(sourcetype: PackType, sourcepath: string, jarpath: string): Promise<string> {
		return CacheHelper.Scoped(sourcepath, this.ContentCacheKey, async () => {
			const {
				Type,
				Name,
				Extension,
				IsFunction
			} = this.GetMetadata(sourcepath);

			if (IsFunction) {
				const mcSourcepath = join(sourcetype, 'minecraft', Type, `${Name}.${Extension}`);
				logger('checking ++ %s', mcSourcepath);
				const jarFileContent = await JarHelper.GetStringAsync(jarpath, mcSourcepath);
				return jarFileContent;
			} else {
				return '';
			}
		});
	}

	public static GetMetadata(sourcepath: string): FileMeta {
		return CacheHelper.Scoped(sourcepath, 'file-meta', () => {
			const [namespace, typeAsStr, ...nameAsParts] = sourcepath.split(sep).join('/').split('/');
			const type = typeAsStr as FileType;

			const [ext, ...nameAsPartsWithoutExt] = nameAsParts.join('/').split('.').reverse();
			const name = nameAsPartsWithoutExt.join('.');
			const isFunction = ext === 'ts';

			return {
				Namespace: namespace,
				Type: type,
				Name: name,
				Extension: this.GetExtension(type),
				IsFunction: isFunction
			};
		});
	}

	private static GetExtension(type: FileType): FileExtension {
		if (type === 'functions') {
			return 'mcfunction';
		}

		else {
			return 'json';
		}
	}
}
