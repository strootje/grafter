import { writeFile } from 'fs';
import * as Mkdirp from 'mkdirp';
import { basename, dirname, resolve } from 'path';
import { CentralDirectory, Open as Unzipper } from 'unzipper';
import { promisify } from 'util';
import { Dict, Set } from '../../../types/Generic';
import { NotFoundError } from '../../domain/errors';
import { Target } from '../../domain/Target';
const WriteFileAsync = promisify(writeFile);
const MkdirpAsync = promisify(Mkdirp);

type TypeName
	= 'advancement'
	| 'biome'
	| 'block'
	| 'dimension'
	| 'effect'
	| 'enchantment'
	| 'entity'
	| 'fluid'
	| 'item'
	| 'loot_table'
	| 'map_icon'
	| 'particle'
	| 'potion'
	| 'recipe'
	| 'stat'
	| 'stat_type'
	| 'structure'
	| 'tag';

type Types = Set<TypeName, Set<'types' | 'builder', boolean>>;

interface GenerateNameFilesCallback {
	(type: TypeName, count: number): void;
}

interface GenerateBuilderFilesCallback {
	(type: TypeName): void;
}

interface GenerateIndexFileCallback {
	(): void;
}

export class GenerateHelper {
	private readonly types: Types;

	private constructor(
		private readonly directory: CentralDirectory,
		private readonly target: Target,
		private readonly output: string
	) {
		this.types = {
			advancement: { types: false, builder: false },
			biome: { types: false, builder: false },
			block: { types: false, builder: false },
			dimension: { types: false, builder: false },
			effect: { types: false, builder: false },
			enchantment: { types: false, builder: false },
			entity: { types: false, builder: false },
			fluid: { types: false, builder: false },
			item: { types: false, builder: false },
			loot_table: { types: false, builder: false },
			map_icon: { types: false, builder: false },
			particle: { types: false, builder: false },
			potion: { types: false, builder: false },
			recipe: { types: false, builder: false },
			stat: { types: false, builder: false },
			stat_type: { types: false, builder: false },
			structure: { types: false, builder: false },
			tag: { types: false, builder: false }
		};
	}

	public static async CreateAsync(target: Target, output: string): Promise<GenerateHelper> {
		const directory = await Unzipper.file(target.Profile.JarPath);
		return new GenerateHelper(directory, target, output);
	}


	public async GenerateNameFilesAsync(callback?: GenerateNameFilesCallback): Promise<void> {
		const keys = await this.ReadFileAsync<Dict<string>>('assets/minecraft/lang/en_us.json');

		const ToDict = (items: string[]): Dict<string> => items
			.map(p => ({ [TextGenerator.ToCamelCase(p)]: `minecraft:${p}` }))
			.reduce((prev, cur) => ({ ...prev, ...cur }), {});

		const GetKeys = (prefix: string): string[] => Object.keys(keys)
			.filter(p => p.startsWith(prefix))
			.map(p => p.replace(prefix, ''))
			.filter(p => p.indexOf('.') < 0);

		const GetValuesFromKeys = (prefix?: string) => (name: TypeName): Dict<string> => ToDict(
			GetKeys(prefix || `${name}.minecraft.`));

		const GetValuesFromFiles = (path: string) => (name: TypeName): Dict<string> => ToDict(this.directory.files
			.filter(p => p.path.startsWith(`${path}/${name}`))
			.map(p => basename(p.path).split('.').shift() as string));

		const AddExtra = (values: Dict<string>, transformer: (values: Dict<string>) => Dict<string>): Dict<string> => ({
			...values,
			...transformer(values)
		});

		const types: Set<TypeName, (name: TypeName) => (Dict<string> | PromiseLike<Dict<string>>)> = {
			advancement: GetValuesFromFiles('data/minecraft'),
			biome: GetValuesFromKeys(),
			block: GetValuesFromKeys(),
			dimension: () => ToDict(['overworld', 'the_end', 'the_nether']),
			effect: GetValuesFromKeys(),
			enchantment: GetValuesFromKeys(),
			entity: GetValuesFromKeys(),
			fluid: () => ToDict(['lava', 'water']),
			item: GetValuesFromKeys(),
			loot_table: GetValuesFromFiles('data/minecraft'),
			map_icon: () => ToDict(['player', 'frame', 'red_marker', 'blue_marker', 'target_x', 'target_point', 'player_off_map', 'player_off_limits', 'mansion', 'monument', ...GetKeys('color.minecraft.').map(p => `banner_${p}`), 'red_x']), // todo
			particle: GetValuesFromFiles('assets/minecraft'),
			potion: (name: TypeName) => AddExtra(GetValuesFromKeys('item.minecraft.potion.effect.')(name), values => ({
				...ToDict(Object.keys(values).map(p => values[p].replace('minecraft:', '')).filter(p => ['leaping', 'swiftness', 'slowness', 'healing', 'harming', 'poison', 'regeneration', 'strength', 'turtle_master'].indexOf(p) >= 0).map(p => `strong_${p}`)),
				...ToDict(Object.keys(values).map(p => values[p].replace('minecraft:', '')).filter(p => ['night_vision', 'invisibility', 'leaping', 'fire_resistance', 'swiftness', 'slowness', 'poison', 'regeneration', 'strength', 'weakness', 'turtle_master', 'slow_falling'].indexOf(p) >= 0).map(p => `long_${p}`)),
			})),
			recipe: GetValuesFromFiles('data/minecraft'),
			stat: GetValuesFromKeys(),
			stat_type: (name: TypeName) => AddExtra(GetValuesFromKeys()(name), () => ToDict(['custom'])),
			structure: GetValuesFromFiles('data/minecraft'),
			tag: GetValuesFromFiles('data/minecraft')
		};

		await Promise.all(Object.keys(types).map(async (name: TypeName) => {
			const values = await types[name](name);
			const filedata = TextGenerator.GenerateNamesFile(this.target, name, values);
			this.types[name].types = true;

			await this.WriteFileAsync(`names/${TextGenerator.ToCamelCase(TextGenerator.ToPlural(name))}.ts`, filedata);
			callback && callback(name, Object.keys(values).length);
		}));
	}

	public async GenerateBuilderFilesAsync(callback?: GenerateBuilderFilesCallback): Promise<void> {
		const types: Partial<Set<TypeName, TypeName[]>> = {
			loot_table: ['advancement', 'biome', 'block', 'dimension', 'effect', 'enchantment', 'entity', 'fluid', 'item', 'loot_table', 'map_icon', 'potion', 'recipe', 'stat', 'stat_type', 'structure', 'tag']
		};

		await Promise.all(Object.keys(types).map(async (name: TypeName) => {
			const deps = types[name]!;
			const filedata = TextGenerator.GenerateBuilderFile(this.target, name, deps);
			this.types[name].builder = true;

			await this.WriteFileAsync(`data/${TextGenerator.ToCamelCase(name)}.ts`, filedata);
			callback && callback(name);
		}));
	}

	public async GenerateIndexFileAsync(callback?: GenerateIndexFileCallback): Promise<void> {
		const filedata = TextGenerator.GenerateIndexFile(this.target, this.types);
		await this.WriteFileAsync('index.ts', filedata);
		callback && callback();
	}

	public async ReadFileAsync<T>(path: string): Promise<T> {
		const file = this.directory.files.find(p => p.path === path);

		if (!file) {
			throw new NotFoundError(path);
		}

		const raw = (await file.buffer()).toString();
		const json = JSON.parse(raw) as T;
		return json;
	}

	public async WriteFileAsync(path: string, data: string): Promise<void> {
		const fullpath = resolve(this.output, path);
		await MkdirpAsync(dirname(fullpath));
		await WriteFileAsync(fullpath, `${data}${data.endsWith('\n') || '\n'}`, 'utf-8');
	}
}



class TextGenerator {
	public static GenerateNamesFile(target: Target, name: TypeName, values: Dict<string>): string {
		const [singular, plural] = this.GetNames(name);

		return [
			this.GenerateHeader(target),
			`export type ${singular}Id = ${Object.keys(values).map(p => `'${values[p]}'`).join('|')};`,
			`export interface ${plural}Type { ${Object.keys(values).map(p => `readonly '${p}': ${singular}Id;`).join(' ')} };`,
			`export const ${plural}: ${plural}Type={ ${Object.keys(values).map(p => `'${p}':'${values[p]}'`).join(',')} };`
		].join('\n');
	}

	public static GenerateBuilderFile(target: Target, name: TypeName, deps: TypeName[]): string {
		const [singular] = this.GetNames(name);

		return [
			this.GenerateHeader(target),
			`import { ${singular} } from 'grafter';`,
			...deps.map(dep => `import { ${this.ToCamelCase(dep)}Id } from '..';`),
			`export type Typed${singular} = ${singular}<${deps.map(p => `${this.ToCamelCase(p)}Id`).join(',')}>;`,
			// `export const BuildLootTable = CreateBuilder<Typed${singular}>();`
		].join('\n');
	}

	public static GenerateIndexFile(target: Target, values: Types): string {
		const types = Object.keys(values).filter((p: keyof Types) => values[p].types).map(p => this.ToCamelCase(this.ToPlural(p)));
		const builders = Object.keys(values).filter((p: keyof Types) => values[p].builder).map(p => this.ToCamelCase(p));

		return [
			this.GenerateHeader(target),
			...types.map(p => `import { ${p} } from './names/${p}';`),
			...types.map(p => `export * from './names/${p}';`),
			...builders.map(p => `export { Typed${p} as ${p} } from './data/${p}';`),
			`export const Minecraft = { ${types.join(',')} };`
		].join('\n');
	}

	private static GenerateHeader(target: Target): string {
		return [
			'// this file is generated',
			'// - by	: grafter',
			`// - at	: ${new Date().toISOString()}`,
			`// - jar	: ${target.Profile.JarPath}`
		].join('\n');
	}

	public static GetNames(name: string): [string, string] {
		return [
			this.ToCamelCase(name),
			this.ToCamelCase(this.ToPlural(name))
		]
	}

	public static ToCamelCase(name: string): string {
		return name.split('_').map(p => `${p[0].toUpperCase()}${p.substring(1)}`).join('');
	}

	public static ToPlural(name: string): string {
		return `${name.replace(/y$/, 'ie')}s`;
	}
}
