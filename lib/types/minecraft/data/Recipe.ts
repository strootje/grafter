import { Set } from "../../Generic";
import { ItemIdTyping } from "../Names";

type SpecialRecipeType
	= 'minecraft:crafting_special_armordye'
	| 'minecraft:crafting_special_bannerduplicate'
	| 'minecraft:crafting_special_bookcloning'
	| 'minecraft:crafting_special_firework_rocket'
	| 'minecraft:crafting_special_firework_star'
	| 'minecraft:crafting_special_firework_star_fade'
	| 'minecraft:crafting_special_mapcloning'
	| 'minecraft:crafting_special_mapextending'
	| 'minecraft:crafting_special_repairitem'
	| 'minecraft:crafting_special_shielddecoration'
	| 'minecraft:crafting_special_shulkerboxcoloring'
	| 'minecraft:crafting_special_tippedarrow'
	| 'minecraft:crafting_special_suspiciousstew';

type CraftableRecipeType
	= 'minecraft:blasting'
	| 'minecraft:campfire_cooking'
	| 'minecraft:crafting_shaped'
	| 'minecraft:crafting_shapeless'
	| 'minecraft:smelting'
	| 'minecraft:smoking'
	| 'minecraft:stonecutting';

export type RecipeType = SpecialRecipeType | CraftableRecipeType;

export type Recipe<
	ItemIdType extends ItemIdTyping
	>
	= SpecialRecipe
	| BlastingRecipe<ItemIdType>
	| CampfireCookingRecipe<ItemIdType>
	| CraftingShapedRecipe<ItemIdType>
	| CraftingShapelessRecipe<ItemIdType>
	| SmeltingRecipe<ItemIdType>
	| SmokingRecipe<ItemIdType>
	| StonecuttingRecipe<ItemIdType>;

interface RecipeBase<
	TypeName extends string
	> {
	type: TypeName;
	group?: string;
}

interface CookingRecipeBase<
	ItemIdType extends ItemIdTyping
	> {
	ingredient: RecipeIngredient<ItemIdType> | RecipeIngredient<ItemIdType>[];
	result: ItemIdType;
	experience: number;
	cookingtime?: number;
}

export interface SpecialRecipe {
	type: SpecialRecipeType;
}

export interface BlastingRecipe<
	ItemIdType extends ItemIdTyping
	> extends RecipeBase<'minecraft:blasting'>, CookingRecipeBase<ItemIdType> {
}

export interface CampfireCookingRecipe<
	ItemIdType extends ItemIdTyping
	> extends RecipeBase<'minecraft:campfire_cooking'>, CookingRecipeBase<ItemIdType> {
}

export interface CraftingShapedRecipe<
	ItemIdType extends ItemIdTyping
	> extends RecipeBase<'minecraft:crafting_shaped'> {
	pattern: [string, string?, string?];
	key: Set<string, RecipeIngredient<ItemIdType> | RecipeIngredient<ItemIdType>[]>;
	result: RecipeResult<ItemIdType>;
}

export interface CraftingShapelessRecipe<
	ItemIdType extends ItemIdTyping
	> extends RecipeBase<'minecraft:crafting_shapeless'> {
	ingredients: RecipeIngredient<ItemIdType> | [RecipeIngredient<ItemIdType>,
		RecipeIngredient<ItemIdType>?,
		RecipeIngredient<ItemIdType>?,
		RecipeIngredient<ItemIdType>?,
		RecipeIngredient<ItemIdType>?,
		RecipeIngredient<ItemIdType>?,
		RecipeIngredient<ItemIdType>?,
		RecipeIngredient<ItemIdType>?,
		RecipeIngredient<ItemIdType>?];
	result: RecipeResult<ItemIdType>;
}

export interface SmeltingRecipe<
	ItemIdType extends ItemIdTyping
	> extends RecipeBase<'minecraft:smelting'>, CookingRecipeBase<ItemIdType> {
}

export interface SmokingRecipe<
	ItemIdType extends ItemIdTyping
	> extends RecipeBase<'minecraft:smoking'>, CookingRecipeBase<ItemIdType> {
}

export interface StonecuttingRecipe<
	ItemIdType extends ItemIdTyping
	> extends RecipeBase<'minecraft:stonecutting'> {
	ingredient: RecipeIngredient<ItemIdType> | RecipeIngredient<ItemIdType>[];
	result: ItemIdType;
	count: number;
}

export interface RecipeIngredient<
	ItemIdType extends ItemIdTyping
	> {
	item: ItemIdType;
	tag?: string;
}

export interface RecipeResult<
	ItemIdType extends ItemIdTyping
	> {
	count?: number;
	item: ItemIdType;
}
