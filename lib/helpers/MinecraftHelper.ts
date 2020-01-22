import { debug } from 'debug';
import { sync as FastGlob } from 'fast-glob';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { SemVer } from 'semver';
import { ProfilesJson, ProfilesJsonProfileType, ProfilesJsonProfileVersion } from '../../types/ProfilesJson';
import { NotFoundError } from '../domain/errors/NotFoundError';
import { ToManyResultsError } from '../domain/errors/ToManyResultsError';
import { Profile } from '../domain/minecraft/Profile';
import { World } from '../domain/minecraft/World';
import { CacheHelper } from './CacheHelper';

const logger = debug('graft:helper:Minecraft');
export class MinecraftHelper {
	private static readonly pickFirstWorld = true;

	public static get Worlds(): World[] {
		return this.Profiles.reduce<World[]>((worlds, profile) => ([...worlds, ...profile.Worlds]), []);
	}

	public static get Profiles(): Profile[] {
		return CacheHelper.Get('game-profiles', () => {
			const profiles: Profile[] = [];
			const profilesJson = this.ProfilesJson.profiles;

			for (const key in profilesJson) {
				const profile = profilesJson[key];
				logger('building profile `%s:%s`', profile.type, profile.name);

				try {
					const profileGameDir = profile.gameDir || this.GameFolder;
					const profileJarPath = this.GetJarPath(profile.type, profile.lastVersionId);

					profiles.push(new Profile(
						profile.name,
						profile.type,
						profileGameDir,
						profileJarPath
					));

					logger('building profile `%s:%s` - done', profile.type, profile.name);
				} catch {
					// invalid profile, skip
					logger('building profile `%s:%s` - skip', profile.type, profile.name);
				}
			}

			return profiles;
		});
	}

	private static get ProfilesJson(): ProfilesJson {
		return CacheHelper.Get('game-profiles-json', () => {
			const profilesPath = resolve(this.GameFolder, 'launcher_profiles.json');

			logger('checking profiles file %s', profilesPath);
			if (existsSync(profilesPath)) {
				logger('checking profiles file %s - found', profilesPath);
				return require(profilesPath) as ProfilesJson;
			}

			logger('unable to find profiles json');
			throw new NotFoundError('profiles json');
		});
	}

	private static get GameFolder(): string {
		return CacheHelper.Get('game-folder', () => {
			const homeFolder = process.env.HOME;

			if (homeFolder == undefined || homeFolder == '' || !existsSync(homeFolder)) {
				throw new NotFoundError('home folder');
			}

			const firstPlatformFolderToCheck = [
				resolve(homeFolder, '.minecraft'),
				resolve(homeFolder, 'AppData', 'Roaming', '.minecraft')
			];

			const foldersToCheck = [
				...((process.platform === 'win32') ? firstPlatformFolderToCheck.reverse() : firstPlatformFolderToCheck)
			];

			while (foldersToCheck.length > 0) {
				const folderToCheck = foldersToCheck.shift() as string;

				logger('checking game folder %s', folderToCheck);
				if (existsSync(folderToCheck)) {
					logger('checking game folder %s - found', folderToCheck);
					return folderToCheck;
				}
			}

			logger('checking game folder - failed');
			throw new NotFoundError('game folder');
		});
	}

	public static GetWorldByTarget(target: string): World {
		if (target.indexOf(':') < 0) {
			target = `:${target}`;
		}

		const [profileName, worldName] = target.split(':');

		const worlds = this.Worlds.filter(p =>
			p.Name == worldName &&
			(profileName == '' || p.Profile.Name == profileName));

		if (worlds.length === 1 || this.pickFirstWorld) {
			return worlds[0];
		}

		throw new ToManyResultsError('world', worlds.length);
	}

	public static GetWorldsForProfile(profile: Profile): World[] {
		return CacheHelper.Get(`profile-${profile.Name}-worlds`, () => {
			const savesFolder = resolve(profile.Folder, 'saves');

			const saveFolders = FastGlob('*', {
				cwd: savesFolder,
				onlyDirectories: true
			});

			const worlds: World[] = [];

			for (const key in saveFolders) {
				const saveFolder = saveFolders[key];

				const worldName = saveFolder.split('/').reverse()[0];
				const worldFolder = resolve(saveFolder, saveFolder);

				worlds.push(new World(
					worldName,
					profile,
					worldFolder
				));
			}

			return worlds;
		});
	}

	public static GetJarPath(type: ProfilesJsonProfileType, version: ProfilesJsonProfileVersion): string {
		return CacheHelper.Get(`game-jar-path-${type}-${version}`, () => {
			if (type === 'latest-release' || type === 'latest-snapshot') {
				version = this.GetLatestInstalledJarVersion(type);
			}

			return this.GetJarPathByVersion(version);
		});
	}

	public static GetJarPathByVersion(version: ProfilesJsonProfileVersion): string {
		return CacheHelper.Get(`game-jar-path-${version}`, () => {
			const versionFolder = resolve(this.GameFolder, 'versions');
			const jarPath = resolve(versionFolder, version, `${version}.jar`);

			logger('checking jar path `%s`', jarPath);
			if (!existsSync(jarPath)) {
				logger('checking jar path `%s` - error', jarPath);
				throw new NotFoundError(jarPath);
			}

			logger('checking jar path `%s` - found', jarPath);
			return jarPath;
		});
	}

	private static GetLatestInstalledJarVersion(type: ProfilesJsonProfileType): string {
		const versionFolder = resolve(this.GameFolder, 'versions');

		return CacheHelper.Get(`game-latest-version-${type}`, () => {
			const jarFiles = FastGlob('**/*.jar', {
				cwd: versionFolder,
				onlyFiles: true
			});

			const stableJars: SemVer[] = [];
			const snapshotJars: string[] = [];

			logger('looking for jar files');
			for (const key in jarFiles) {
				const jarFile = jarFiles[key];
				const jarVersionAsString = jarFile.split('/').reverse()[0].replace('.jar', '');

				try {
					const jarVersion = new SemVer(jarVersionAsString);
					stableJars.push(jarVersion);
					logger('looking for jar files - found stable %s', jarVersion);
				} catch {
					snapshotJars.push(jarVersionAsString);
					logger('looking for jar files - found snapshot %s', jarVersionAsString);
				}
			}

			if (type === 'latest-release') {
				return stableJars.sort((cur, next) => cur < next ? -1 : 1)[0].format();
			} else {
				return snapshotJars.sort((cur, next) => cur < next ? -1 : 1)[0];
			}
		});
	}
}
