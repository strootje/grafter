import { debug } from 'debug';
import { stream as FastGlob } from 'fast-glob';
import { Sourceable } from '../Sourceable';

const logger = debug('graft:domain:SourceReader');
export class SourceReader extends Sourceable {
	public async ProcessFilesAsyncInternal(): Promise<void> {
		const files = FastGlob('**/*', {
			cwd: this.pack.Folder
		});

		for await (const filepath of files) {
			const filepathAsString = filepath as string;
			logger('found file %s', filepath);
			this.addedSubject.next(filepathAsString);
		}
	}
}
