import { Dict } from '../../../Generic';
import { MinMax } from './Generic';
import { DamagePredicate, EntityPredicate, ItemPredicate, LocationPredicate } from './Predicates';

export type Condition<
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
	>
	= AlternativeCondition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| BlockStatePropertyCondition<BlockIdType>
	| DamageSourcePropertiesCondition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| EntityPropertiesCondition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| EntityScoresCondition<EntityIdType>
	| InvertedCondition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| KilledByPlayerCondition
	| LocationCheckCondition<BiomeIdType, BlockIdType, DimensionIdType, EntityIdType, StructureIdType>
	| MatchToolCondition<EnchantmentIdType, ItemIdType, PotionIdType>
	| RandomChanceCondition
	| RandomChanceWithLootingCondition
	| ReferenceCondition
	| SurvivesExplosionCondition
	| TableBonusCondition<EnchantmentIdType>
	| TimeCheckCondition
	| ToolEnchantmentCondition<EnchantmentIdType>
	| WeatherCheckCondition;

export interface AlternativeCondition<
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
	condition: 'minecraft:alternative';
	terms: Condition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>[];
}

export interface BlockStatePropertyCondition<
	BlockIdType extends string
	> {
	condition: 'minecraft:block_state_property';
	block: BlockIdType;
	properties: Dict<string>;
}

export interface DamageSourcePropertiesCondition<
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
	condition: 'minecraft:damage_source_properties';
	predicate?: DamagePredicate<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;
}

export interface EntityPropertiesCondition<
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
	condition: 'minecraft:entity_properties';
	entity: EntityIdType;
	predicate?: EntityPredicate<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;
}

export interface EntityScoresCondition<
	EntityIdType extends string
	> {
	condition: 'minecraft:entity_scores';
	entity: EntityIdType;
	scores: Dict<MinMax>;
}

export interface InvertedCondition<
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
	condition: 'minecraft:inverted';
	term: Condition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;
}

export interface KilledByPlayerCondition {
	condition: 'minecraft:killed_by_player';
	inverse?: boolean;
}

export interface LocationCheckCondition<
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	EntityIdType extends string,
	StructureIdType extends string
	> {
	condition: 'minecraft:location_check';
	offsetX?: number;
	offsetY?: number;
	offsetZ?: number;
	predicate?: LocationPredicate<BiomeIdType, BlockIdType, DimensionIdType, EntityIdType, StructureIdType>;
}

export interface MatchToolCondition<
	EnchantmentIdType extends string,
	ItemIdType extends string,
	PotionIdType extends string
	> {
	condition: 'minecraft:match_tool';
	predicate?: ItemPredicate<EnchantmentIdType, ItemIdType, PotionIdType>;
}

export interface RandomChanceCondition {
	condition: 'minecraft:random_chance';
	chance: number;
}

export interface RandomChanceWithLootingCondition {
	condition: 'minecraft:random_chance_with_looting';
	chance: number;
	looting_multiplier: number;
}

export interface ReferenceCondition {
	condition: 'minecraft:reference';
	name: string;
}

export interface SurvivesExplosionCondition {
	condition: 'minecraft:survives_explosion';
}

export interface TableBonusCondition<
	EnchantmentIdType extends string
	> {
	condition: 'minecraft:table_bonus';
	enchantment: EnchantmentIdType;
	chances: number;
}

export interface TimeCheckCondition {
	condition: 'minecraft:time_check';
	value?: MinMax;
	period?: number;
}

export interface ToolEnchantmentCondition<
	EnchantmentIdType extends string
	> {
	condition: 'minecraft:tool_enchantment';
	enchantments: {
		enchantment: EnchantmentIdType
		levels: MinMax;
	}[];
}

export interface WeatherCheckCondition {
	condition: 'minecraft:weather_check';
	raining?: boolean;
	thundering?: boolean;
}
