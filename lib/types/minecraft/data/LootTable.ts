import { BlockFunction, Function } from '../../..';
import { Condition } from './values/Conditions';
import { MinMax } from './values/Generic';

export type LootTableTypes
	= 'minecraft:empty'
	| 'minecraft:entity'
	| 'minecraft:chest'
	| 'minecraft:fishing'
	| 'minecraft:gift'
	| 'minecraft:advancement_reward'
	| 'minecraft:barter'
	| 'minecraft:generic';

export type LootTable<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	ItemIdType extends string,
	LootTableIdType extends string,
	MapIconIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string,
	TagIdType extends string
	>
	= BlockLootTable<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, BlockFunction<EffectIdType, EnchantmentIdType, EntityIdType, MapIconIdType, StructureIdType>, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| OtherLootTable<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, Function<EffectIdType, EnchantmentIdType, EntityIdType, MapIconIdType, StructureIdType>, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>;

export interface BlockLootTable<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	FunctionType extends {},
	ItemIdType extends string,
	LootTableIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string,
	TagIdType extends string
	> {
	type: 'minecraft:block';
	pools: LootTablePool<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface OtherLootTable<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	FunctionType extends {},
	ItemIdType extends string,
	LootTableIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string,
	TagIdType extends string
	> {
	type: LootTableTypes;
	pools: LootTablePool<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface LootTablePool<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	FunctionType extends {},
	ItemIdType extends string,
	LootTableIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string,
	TagIdType extends string
	> {
	rolls: MinMax;
	bonus_rolls?: MinMax;
	entries: LootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export type LootTablePoolEntry<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	FunctionType extends {},
	ItemIdType extends string,
	LootTableIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string,
	TagIdType extends string
	>
	= LootTablePoolItemEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| LootTablePoolTagEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| LootTablePoolLootTableEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| LootTablePoolGroupEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| LootTablePoolAlternativesEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| LootTablePoolSequenEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| LootTablePoolDynamicEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| LootTablePoolEmptyEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;

interface LootTablePoolEntryBase<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	ItemIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string
	> {
	weight?: number;
	quality?: number;
	conditions?: Condition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>[];
}

export interface LootTablePoolItemEntry<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	FunctionType extends {},
	ItemIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:item';
	name: ItemIdType;
	functions?: FunctionType[];
}

export interface LootTablePoolTagEntry<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	ItemIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string,
	TagIdType extends string
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:tag';
	name: TagIdType;
	expand?: boolean;
}

export interface LootTablePoolLootTableEntry<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	ItemIdType extends string,
	LootTableIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:loot_table';
	name: LootTableIdType;
}

export interface LootTablePoolGroupEntry<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	FunctionType extends {},
	ItemIdType extends string,
	LootTableIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string,
	TagIdType extends string
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:group';
	name: string;
	children: LootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface LootTablePoolAlternativesEntry<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	FunctionType extends {},
	ItemIdType extends string,
	LootTableIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string,
	TagIdType extends string
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:alternatives';
	name: string;
	children: LootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface LootTablePoolSequenEntry<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	FunctionType extends {},
	ItemIdType extends string,
	LootTableIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string,
	TagIdType extends string
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:sequence';
	name: string;
	children: LootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, FunctionType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface LootTablePoolDynamicEntry<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	ItemIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:dynamic';
	name: 'contents' | 'self';
}

export interface LootTablePoolEmptyEntry<
	AdvancementIdType extends string,
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EffectIdType extends string,
	EnchantmentIdType extends string,
	EntityIdType extends string,
	FluidIdType extends string,
	ItemIdType extends string,
	PotionIdType extends string,
	RecipeIdType extends string,
	StatIdType extends string,
	StatTypeIdType extends string,
	StructureIdType extends string
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:empty';
	name: string;
}
