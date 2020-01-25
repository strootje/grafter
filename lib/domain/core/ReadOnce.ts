import { debug } from 'debug';
import { stream as FastGlob } from 'fast-glob';
import { Readable } from '../Readable';

const logger = debug('graft:domain:ReadOnce');
const tracer = debug('graft:trace:domain:ReadOnce');
export class ReadOnce extends Readable {
	public async ProcessFilesAsyncInternal(): Promise<void> {
		const files = FastGlob('**/*', {
			cwd: this.pack.Folder
		});

		logger('looking for files in `%s`', this.pack.Folder);
		for await (const filepath of files) {
			const filepathAsString = filepath as string;

			tracer('found file %s', filepath);
			this.Added$.next({ filepath: filepathAsString });
		}
	}
}
