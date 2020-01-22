import { debug } from 'debug';

export type CacheFetcher<T> = () => T;
export type CacheFetcherAsync<T> = () => Promise<T>;

export interface CacheOpts {
	expireIn?: number;
}

interface CacheStore {
	[key: string]: any;
}

const logger = debug('graft:helpers:Cache');
export class CacheHelper {
	private static cache: CacheStore = {};

	public static Get<T>(key: string, fetcher: CacheFetcher<T>): T {
		if (!this.cache[key]) {
			logger('storing `%s` to cache', key);
			this.cache[key] = fetcher();
		}

		logger('getting `%s` from cache', key);
		return this.cache[key];
	}

	public static async GetAsync<T>(key: string, fetcherAsync: CacheFetcherAsync<T>): Promise<T> {
		if (!this.cache[key]) {
			logger('storing `%s` to cache', key);
			this.cache[key] = await fetcherAsync();
		}

		logger('getting `%s` from cache', key);
		return this.cache[key];
	}
}
