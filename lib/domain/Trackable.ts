import { Subject, Subscription } from 'rxjs';
import { Tracker } from './Tracker';

export abstract class Trackable<TAdded = string, TChanged = TAdded, TRemoved = TAdded> {
	private readonly added$: Subject<TAdded>;
	private readonly changed$: Subject<TChanged>;
	private readonly removed$: Subject<TRemoved>;

	constructor() {
		this.added$ = new Subject<TAdded>();
		this.changed$ = new Subject<TChanged>();
		this.removed$ = new Subject<TRemoved>();
	}

	public get Added$(): Subject<TAdded> {
		return this.added$;
	}

	public get Changed$(): Subject<TChanged> {
		return this.changed$;
	}

	public get Removed$(): Subject<TRemoved> {
		return this.removed$;
	}

	public Subscribe(tracker: Tracker<TAdded, TChanged, TRemoved>): [Subscription, Subscription, Subscription] {
		return [
			this.Added$.subscribe(tracker.HandleAdded.bind(tracker)),
			this.Changed$.subscribe(tracker.HandleChanged.bind(tracker)),
			this.Removed$.subscribe(tracker.HandleRemoved.bind(tracker))
		]
	}

	public Complete(): void {
		this.added$.complete();
		this.changed$.complete();
		this.removed$.complete();
	}
}
