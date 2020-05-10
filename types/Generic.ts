export interface Dict<T> { [key: string]: T };
export type Set<TKeys extends string, TValue> = { [key in TKeys]: TValue };
export interface Default<T> {
	default: T;
}
