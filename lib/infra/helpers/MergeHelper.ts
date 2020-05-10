import { debug } from 'debug';
import { concatArrays, merge as MergeAnything } from 'merge-anything';
import { File, FileType } from '../../domain/File';

const tracer = debug('grafter:trace:helpers:Merge');
export class MergeHelper {
	public static CreateReducer(type: FileType): (first: string, second: File) => string {
		tracer('creating merger for `%s`', type);

		switch (type) {
			case 'tags': return this.JsonReducer;
			default: return this.StringReducer;
		}
	}

	private static StringReducer(first: string, second: File): string {
		return [first, second.Content].join('\n');
	}

	private static JsonReducer(first: string, second: File): string {
		if (first == '' || second.Content == '') {
			return first || second.Content;
		}

		const json1 = JSON.parse(first);
		const json2 = JSON.parse(second.Content);

		return JSON.stringify(MergeAnything({
			extensions: [concatArrays]
		}, json1, json2));
	}
}
