import { MinMax } from './Generic';
import { TextComponent } from './TextComponent';

export type Function<
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	MapIconIdType extends string,
	StructureIdType extends string
	>
	= ApplyBonusFunction<EnchantmentIdType>
	| CopyNbtFunction<EntityIdType>
	| CopyStateFunction
	| EnchantRandomlyFunction<EnchantmentIdType>
	| EnchantWithLevelsFunction
	| ExplorationMapFunction<MapIconIdType, StructureIdType>
	| FurnaceSmeltFunction
	| FillPlayerHeadFunction<EntityIdType>
	| LimitCountFunction
	| LootingEnchantFunction
	| SetAttributesFunction
	| SetCountFunction
	| SetDamageFunction
	| SetLoreFunction<EntityIdType>
	| SetNameFunction<EntityIdType>
	| SetNbtFunction
	| SetStewEffectFunction<EffectIdType>;

export type BlockFunction<
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	MapIconIdType extends string,
	StructureIdType extends string
	>
	= Function<EffectIdType, EnchantmentIdType, EntityIdType, MapIconIdType, StructureIdType>
	| CopyBlockFunction
	| ExplosionDecayFunction
	| SetContentsFunction;

export type ApplyBonusFunction<EnchantmentIdType extends string>
	= BinomialApplyBonusFunction<EnchantmentIdType>
	| UniformApplyBonusFunction<EnchantmentIdType>
	| OreDropsApplyBonusFunction<EnchantmentIdType>;

interface BinomialApplyBonusFunction<EnchantmentIdType extends string> {
	function: 'minecraft:apply_bonus';
	enchantment?: EnchantmentIdType;
	formula: 'binomial_with_bonus_count';
	parameters: {
		extra: number;
		probability: number;
	};
}

interface UniformApplyBonusFunction<EnchantmentIdType extends string> {
	function: 'minecraft:apply_bonus';
	enchantment?: EnchantmentIdType;
	formula: 'uniform_bonus_count';
	parameters: {
		bonusMultiplier: number;
	};
}

interface OreDropsApplyBonusFunction<EnchantmentIdType extends string> {
	function: 'minecraft:apply_bonus';
	enchantment?: EnchantmentIdType;
	formula: 'ore_drops';
}

export interface CopyBlockFunction {
	function: 'minecraft:copy_block';
	source: 'block_entity';
}

export interface CopyNbtFunction<EntityIdType extends string> {
	function: 'minecraft:copy_nbt';
	source: 'block_entity' | EntityIdType;
	ops?: {
		source: string;
		target: string;
		op: 'replace' | 'append' | 'merge'
	}[];
}

export interface CopyStateFunction {
	function: 'minecraft:copy_state';
	properties: string[];
}

export interface EnchantRandomlyFunction<EnchantmentIdType extends string> {
	function: 'minecraft:enchant_randomly';
	enchantments: EnchantmentIdType[];
}

export interface EnchantWithLevelsFunction {
	function: 'minecraft:enchant_with_levels';
	treasure?: boolean;
	levels: MinMax;
}

export interface ExplorationMapFunction<MapIconIdType extends string, StructureIdType extends string> {
	function: 'minecraft:exploration_map';
	destination: StructureIdType;
	decoration?: MapIconIdType;
	zoom?: number;
	search_radius?: number;
	skip_existing_chunks?: boolean;
}

export interface ExplosionDecayFunction {
	function: 'minecraft:explosion_decay';
}

export interface FurnaceSmeltFunction {
	function: 'minecraft:furnace_smelt';
}

export interface FillPlayerHeadFunction<EntityIdType extends string> {
	function: 'minecraft:fill_player_head';
	entity: EntityIdType;
}

export interface LimitCountFunction {
	function: 'minecraft:limit_count';
	limit: MinMax;
}

export interface LootingEnchantFunction {
	function: 'minecraft:looting_enchant';
	count: MinMax;
	limit?: number;
}

export interface SetAttributesFunction {
	function: 'minecraft:set_attributes';
	modifiers: {
		name: string;
		attribute: string;
		operation: 'addition' | 'multiply_base' | 'multiply_total';
		amount: MinMax;
		id?: string;
		slot: 'mainhand' | 'offhand' | 'feet' | 'legs' | 'chest' | 'head';
	}[];
}

export interface SetContentsFunction {
	function: 'minecraft:set_contents';
	// TODO: figure out what an entry is..
	entries: {}[];
}

export interface SetCountFunction {
	function: 'minecraft:set_count';
	count: number | {
		type: 'uniform';
		uniform: {
			min: number;
			max: number;
		};
	} | {
		type: 'binomial',
		binomial: {
			n: number;
			p: number;
		};
	};
}

export interface SetDamageFunction {
	function: 'minecraft:set_damage';
	damage: MinMax;
}

export interface SetLoreFunction<EntityIdType extends string> {
	function: 'minecraft:set_lore';
	lore: TextComponent,
	entity: EntityIdType
	replace?: boolean;
}

export interface SetNameFunction<EntityIdType extends string> {
	function: 'minecraft:set_name';
	name: TextComponent;
	entity: EntityIdType;
}

export interface SetNbtFunction {
	function: 'minecraft:set_nbt';
	tag: string;
}

export interface SetStewEffectFunction<EffectIdType extends string> {
	function: 'minecraft:set_stew_effect';
	effects: {
		type: EffectIdType;
		duration: number;
	}[];
}
