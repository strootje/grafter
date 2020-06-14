import { Dict, Set } from '../../../Generic';
import { AdvancementIdTyping, BiomeIdTyping, BlockIdTyping, DimensionIdTyping, EffectIdTyping, EnchantmentIdTyping, EntityIdTyping, FluidIdTyping, ItemIdTyping, PotionIdTyping, RecipeIdTyping, StatIdTyping, StatTypeIdTyping, StructureIdTyping } from '../../Names';
import { MinMax, MinMaxPure, NbtString } from './Generic';

export interface LocationPredicate<
	BiomeIdType extends BiomeIdTyping,
	BlockIdType extends BlockIdTyping,
	DimensionIdType extends DimensionIdTyping,
	FluidIdType extends FluidIdTyping,
	StructureIdType extends StructureIdTyping
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
	EnchantmentIdType extends EnchantmentIdTyping,
	ItemIdType extends ItemIdTyping,
	PotionIdType extends PotionIdTyping
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
