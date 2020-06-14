import { BlockFunction, Function } from '../../..';
import { AdvancementIdTyping, BiomeIdTyping, BlockIdTyping, DimensionIdTyping, EffectIdTyping, EnchantmentIdTyping, EntityIdTyping, FluidIdTyping, ItemIdTyping, LootTableIdTyping, MapIconIdTyping, PotionIdTyping, RecipeIdTyping, StatIdTyping, StatTypeIdTyping, StructureIdTyping, TagIdTyping } from '../Names';
import { Condition } from './values/Conditions';
import { MinMax } from './values/Generic';

export type LootTableType
	= 'minecraft:empty'
	| 'minecraft:entity'
	| 'minecraft:chest'
	| 'minecraft:fishing'
	| 'minecraft:gift'
	| 'minecraft:advancement_reward'
	| 'minecraft:barter'
	| 'minecraft:generic';

export type LootTable<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	>
	= BlockLootTable<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| OtherLootTable<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>;

export interface BlockLootTable<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> {
	type: 'minecraft:block';
	pools: BlockLootTablePool<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface OtherLootTable<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> {
	type: LootTableType;
	pools: OtherLootTablePool<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface BlockLootTablePool<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> {
	rolls: MinMax;
	bonus_rolls?: MinMax;
	entries: BlockLootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface OtherLootTablePool<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> {
	rolls: MinMax;
	bonus_rolls?: MinMax;
	entries: OtherLootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export type BlockLootTablePoolEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	>
	= OtherLootTablePoolItemEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| LootTablePoolTagEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| LootTablePoolLootTableEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| OtherLootTablePoolGroupEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| OtherLootTablePoolAlternativesEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| OtherLootTablePoolSequenceEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| LootTablePoolDynamicEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| LootTablePoolEmptyEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;

export type OtherLootTablePoolEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	>
	= OtherLootTablePoolItemEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| LootTablePoolTagEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| LootTablePoolLootTableEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| OtherLootTablePoolGroupEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| BlockLootTablePoolAlternativesEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| BlockLootTablePoolSequenceEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>
	| LootTablePoolDynamicEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| LootTablePoolEmptyEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;

interface LootTablePoolEntryBase<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping
	> {
	weight?: number;
	quality?: number;
	conditions?: Condition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>[];
}

export interface BlockLootTablePoolItemEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:item';
	name: ItemIdType;
	functions?: BlockFunction<EffectIdType, EnchantmentIdType, EntityIdType, MapIconIdType, StructureIdType>[];
}

export interface OtherLootTablePoolItemEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:item';
	name: ItemIdType;
	functions?: Function<EffectIdType, EnchantmentIdType, EntityIdType, MapIconIdType, StructureIdType>[];
}

export interface LootTablePoolTagEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:tag';
	name: TagIdType;
	expand?: boolean;
}

export interface LootTablePoolLootTableEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:loot_table';
	name: LootTableIdType;
}

export interface BlockLootTablePoolGroupEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:group';
	name: string;
	children: BlockLootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface OtherLootTablePoolGroupEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:group';
	name: string;
	children: OtherLootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface BlockLootTablePoolAlternativesEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:alternatives';
	children: BlockLootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface OtherLootTablePoolAlternativesEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:alternatives';
	children: OtherLootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface BlockLootTablePoolSequenceEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:sequence';
	children: BlockLootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface OtherLootTablePoolSequenceEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	LootTableIdType extends LootTableIdTyping,
	MapIconIdType extends MapIconIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping,
	TagIdType extends TagIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:sequence';
	children: OtherLootTablePoolEntry<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, LootTableIdType, MapIconIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType, TagIdType>[];
}

export interface LootTablePoolDynamicEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:dynamic';
	name: 'contents' | 'self';
}

export interface LootTablePoolEmptyEntry<
	AdvancementIdType extends AdvancementIdTyping,
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	EffectIdType extends EffectIdTyping,
	EnchantmentIdType extends EnchantmentIdTyping,
	EntityIdType extends EntityIdTyping,
	FluidIdType extends FluidIdTyping,
	ItemIdType extends ItemIdTyping,
	PotionIdType extends PotionIdTyping,
	RecipeIdType extends RecipeIdTyping,
	StatIdType extends StatIdTyping,
	StatTypeIdType extends StatTypeIdTyping,
	StructureIdType extends StructureIdTyping
	> extends LootTablePoolEntryBase<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType> {
	type: 'minecraft:empty';
	name: string;
}
