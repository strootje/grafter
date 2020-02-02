export interface SourceAttributes {
	[key: string]: string;
}

export abstract class Sourceable<T> {
	public constructor(
		private readonly attributes: SourceAttributes,
		private readonly content: string
	) {
	}

	public abstract get Attributes(): SourceAttributes;
	public abstract get Content(): string;
}
