import { debug } from 'debug';
import { concatArrays, merge as MergeAnything } from 'merge-anything';

const logger = debug('graft:helpers:Merge');
export class MergeHelper {
	public static CreateReducer(filepath: string): (first: string, second: string) => string {
		const filepathext = filepath.split('.').reverse()[0];
		logger('creating merger for `%s`', filepathext);

		switch (filepathext) {
			case 'json': return this.JsonReducer;
			default: return this.StringReducer;
		}
	}

	private static StringReducer(first: string, second: string): string {
		return [first, second].join('\n');
	}

	private static JsonReducer(first: string, second: string): string {
		if (first == '' || second == '') {
			return first || second;
		}

		const json1 = JSON.parse(first);
		const json2 = JSON.parse(second);

		return JSON.stringify(MergeAnything({
			extensions: [concatArrays]
		}, json1, json2));
	}
}
