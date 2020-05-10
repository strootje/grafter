import { Dict, Set } from '../../../Generic';
import { MinMax, MinMaxPure, NbtString } from './Generic';

export interface LocationPredicate<
	BiomeIdType extends string,
	BlockIdType extends string,
	DimensionIdType extends string,
	FluidIdType extends string,
	StructureIdType extends string
	> {
	biome?: BiomeIdType;
	block?: {
		block: BlockIdType,
		tag: string,
		nbt: NbtString,
		state: Dict<MinMax>
	};
	dimension?: DimensionIdType;
	feature?: StructureIdType;
	fluid?: {
		fluid: FluidIdType,
		tag: string,
		state: Dict<MinMax>
	};
	light?: { light: MinMax };
	position?: Partial<Set<'x' | 'y' | 'z', MinMax>>;
}

export interface ItemPredicate<
	EnchantmentIdType extends string,
	ItemIdType extends string,
	PotionIdType extends string
	> {
	count?: MinMax;
	durability?: MinMax;
	enchantments?: {
		enchantment: EnchantmentIdType,
		levels?: MinMax
	}[];
	stored_enchantments?: {
		enchantment: EnchantmentIdType,
		levels?: MinMax
	}[];
	item?: ItemIdType;
	nbt?: NbtString;
	potion?: PotionIdType;
	tag?: string;
}

export interface EntityPredicate<
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
	distance?: Partial<Set<'absolute' | 'horizontal' | 'x' | 'y' | 'z', MinMaxPure>>;
	effects?: Partial<Set<EffectIdType, Partial<Set<'amplifier' | 'duration', MinMax>>>>;
	equipment?: ItemPredicate<EnchantmentIdType, ItemIdType, PotionIdType>;
	flags: Partial<Set<'is_on_fire' | 'is_sneaking' | 'is_sprinting' | 'is_swimming' | 'is_baby', boolean>>;
	location?: LocationPredicate<BiomeIdType, BlockIdType, DimensionIdType, FluidIdType, StructureIdType>;
	nbt?: NbtString;
	player?: {
		advancements?: Partial<Set<AdvancementIdType, boolean | Partial<Set<string, boolean>>>>,
		gamemode?: 'survival' | 'adventure' | 'creative' | 'spectator',
		level?: MinMax,
		recipes?: Partial<Set<RecipeIdType, boolean>>,
		stats?: {
			type: StatTypeIdType,
			stat: StatIdType,
			value: MinMax
		}[],
		team?: string,
		type?: EntityIdType
	}
}

export interface DamagePredicate<
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
	bypasses_armor?: boolean;
	bypasses_invulnerability?: boolean;
	bypasses_magic?: boolean;
	direct_entity?: EntityPredicate<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;
	is_explosion?: boolean;
	is_fire?: boolean;
	is_magic?: boolean;
	is_projectile?: boolean;
	is_lightning?: boolean;
	source_entity?: EntityPredicate<AdvancementIdType, BiomeIdType, BlockIdType, DimensionIdType, EffectIdType, EnchantmentIdType, EntityIdType, FluidIdType, ItemIdType, PotionIdType, RecipeIdType, StatIdType, StatTypeIdType, StructureIdType>;
}
