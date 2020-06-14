import { Dict } from '../../../Generic';
import { AdvancementIdTyping, BiomeIdTyping, BlockIdTyping, DimensionIdTyping, EffectIdTyping, EnchantmentIdTyping, EntityIdTyping, FluidIdTyping, ItemIdTyping, PotionIdTyping, RecipeIdTyping, StatIdTyping, StatTypeIdTyping, StructureIdTyping } from '../../Names';
import { Entities, MinMax } from './Generic';
import { DamagePredicate, EntityPredicate, ItemPredicate, LocationPredicate } from './Predicates';

export type Condition<
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
	>
	= AlternativeCondition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| BlockStatePropertyCondition<BlockIdType>
	| DamageSourcePropertiesCondition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| EntityPropertiesCondition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| EntityScoresCondition
	| InvertedCondition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>
	| KilledByPlayerCondition
	| LocationCheckCondition<BiomeIdType, BlockIdType, DimensionIdType, FluidIdType, StructureIdType>
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
	condition: 'minecraft:alternative';
	terms: Condition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>[];
}

export interface BlockStatePropertyCondition<
	BlockIdType extends BlockIdTyping
	> {
	condition: 'minecraft:block_state_property';
	block: BlockIdType;
	properties: Dict<string>;
}

export interface DamageSourcePropertiesCondition<
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
	condition: 'minecraft:damage_source_properties';
	predicate?: DamagePredicate<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;
}

export interface EntityPropertiesCondition<
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
	condition: 'minecraft:entity_properties';
	entity: Entities;
	predicate?: EntityPredicate<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;
}

export interface EntityScoresCondition {
	condition: 'minecraft:entity_scores';
	entity: Entities;
	scores: Dict<MinMax>;
}

export interface InvertedCondition<
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
	condition: 'minecraft:inverted';
	term: Condition<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;
}

export interface KilledByPlayerCondition {
	condition: 'minecraft:killed_by_player';
	inverse?: boolean;
}

export interface LocationCheckCondition<
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	FluidIdType extends FluidIdTyping,
	StructureIdType extends StructureIdTyping
	> {
	condition: 'minecraft:location_check';
	offsetX?: number;
	offsetY?: number;
	offsetZ?: number;
	predicate?: LocationPredicate<BiomeIdType, BlockIdType, DimensionIdType, FluidIdType, StructureIdType>;
}

export interface MatchToolCondition<
	EnchantmentIdType extends EnchantmentIdTyping,
	ItemIdType extends ItemIdTyping,
	PotionIdType extends PotionIdTyping
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
	EnchantmentIdType extends EnchantmentIdTyping
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
	EnchantmentIdType extends EnchantmentIdTyping
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
