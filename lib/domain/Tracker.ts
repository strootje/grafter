export interface Tracker<TAdded = string, TChanged = TAdded, TRemoved = TAdded> {
	HandleAdded(args: TAdded): void;
	HandleChanged(args: TChanged): void;
	HandleRemoved(args: TRemoved): void;
}
