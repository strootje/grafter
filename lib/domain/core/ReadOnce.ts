import { stream as FastGlob } from 'fast-glob';
import { Readable } from '../Readable';

export class ReadOnce extends Readable {
	public async ProcessFilesAsync(): Promise<void> {
		const files = FastGlob('**/*', {
			cwd: this.pack.Folder
		});

		this.logger('looking for files');
		for await (const filepath of files) {
			const filepathAsString = filepath as string;

			this.tracer('adding file %s', filepath);
			this.Added$.next(filepathAsString);
		}
	}
}
