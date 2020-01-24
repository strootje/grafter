import { debug } from 'debug';

export type CacheFetcher<T> = () => T;

export interface CacheOpts {
	expireIn?: number;
}

interface CacheStore {
	[key: string]: any;
}

// const logger = debug('graft:helpers:Cache');
const tracer = debug('graft:trace:helpers:Cache');
export class CacheHelper {
	private static cache: CacheStore = {};

	public static Get<T>(key: string, fetcher: CacheFetcher<T>): T {
		if (!this.cache[key]) {
			this.cache[key] = fetcher();

			tracer('storing `%s` to cache', key);
		}

		tracer('getting `%s` from cache', key);
		return this.cache[key];
	}

	public static Scoped<T>(scope: string, key: string, fetcher: CacheFetcher<T>): T {
		return this.Get(`${scope}:${key}`, fetcher);
	}
}
